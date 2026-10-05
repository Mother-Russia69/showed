import { randomUUID } from "node:crypto";
import { open, readFile, rename, unlink } from "node:fs/promises";
import { resolve } from "node:path";
import { generateKeyPair, getAddressFromPublicKey } from "@solana/kit";

function hasCode(error: unknown, code: string): boolean {
  return error instanceof Error && "code" in error && error.code === code;
}

async function main() {
  const envPath = resolve(process.cwd(), ".env.local");
  const lockPath = `${envPath}.generate-keypair.lock`;
  // Prevent two instances of this script from replacing each other's key.
  const lock = await open(lockPath, "wx", 0o600).catch((error: unknown) => {
    if (hasCode(error, "EEXIST")) {
      throw new Error("Another keypair generator is running, or its lock file remains. No key was generated.");
    }
    throw error;
  });
  let tempPath: string | undefined;

  try {
    const contents = await readFile(envPath, "utf8").catch((error: unknown) => {
      if (hasCode(error, "ENOENT")) return "";
      throw error;
    });

    // Treat even an empty assignment as existing. Ignore commented-out lines.
    if (/^[\t \uFEFF]*(?:export[\t ]+)?SERVER_KEYPAIR[\t ]*=/m.test(contents)) {
      console.log("SERVER_KEYPAIR already exists in .env.local. Nothing was changed.");
      return;
    }
    if (Object.hasOwn(process.env, "SERVER_KEYPAIR")) {
      console.log("SERVER_KEYPAIR already exists in the process environment. Nothing was changed.");
      return;
    }

    const keypair = await generateKeyPair(true);
    const address = await getAddressFromPublicKey(keypair.publicKey);
    const privateKey = new Uint8Array(await crypto.subtle.exportKey("pkcs8", keypair.privateKey));
    const publicKey = new Uint8Array(await crypto.subtle.exportKey("raw", keypair.publicKey));
    // Solana keypair file format: 32-byte private seed followed by 32-byte public key.
    const secretKey = new Uint8Array(64);
    secretKey.set(privateKey.subarray(privateKey.length - 32));
    secretKey.set(publicKey, 32);

    const newline = contents.includes("\r\n") ? "\r\n" : "\n";
    const separator = contents.length > 0 && !contents.endsWith("\n") ? newline : "";
    const updated = `${contents}${separator}SERVER_KEYPAIR=${JSON.stringify(Array.from(secretKey))}${newline}`;
    privateKey.fill(0);
    secretKey.fill(0);

    // Write privately, then atomically replace the file to avoid partial env writes.
    tempPath = `${envPath}.generate-keypair-${randomUUID()}.tmp`;
    const temporary = await open(tempPath, "wx", 0o600);
    try {
      await temporary.writeFile(updated, "utf8");
      await temporary.sync();
    } finally {
      await temporary.close();
    }
    await rename(tempPath, envPath);
    tempPath = undefined;

    console.log(`Public address: ${address}`);
    console.log("SERVER_KEYPAIR saved to .env.local (owner-only access). Secret key was not printed.");
  } finally {
    try {
      if (tempPath) await unlink(tempPath);
    } finally {
      await lock.close();
      await unlink(lockPath);
    }
  }
}

main().catch(() => {
  // Do not dump errors or objects that might contain private key material.
  console.error("Could not generate or save the keypair. Check .env.local permissions and whether another generator is running (.env.local.generate-keypair.lock).");
  process.exitCode = 1;
});
