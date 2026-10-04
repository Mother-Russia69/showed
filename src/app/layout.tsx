import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Showed", description: "Proof of attendance without a wallet — Solana Devnet.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-200 bg-white">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4" aria-label="Main navigation">
            <Link href="/" className="text-xl font-bold">Showed</Link>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-800">Solana Devnet · scaffold</span>
          </nav>
        </header>
        <main className="mx-auto max-w-4xl px-5 py-12">{children}</main>
      </body>
    </html>
  );
}
