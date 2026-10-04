import { NextResponse } from "next/server";

// TODO: verify Privy token, find event, enforce UNIQUE(event_id, wallet),
// mint on Solana Devnet, store claim, and return the transaction signature.
export async function POST() {
  return NextResponse.json(
    { error: "NOT_IMPLEMENTED", message: "Badge claiming is not implemented yet." },
    { status: 501 },
  );
}
