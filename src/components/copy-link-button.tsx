"use client";
import { useState } from "react";
export function CopyLinkButton() {
  const [status, setStatus] = useState("Copy link");
  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); setStatus("Copied!"); }
    catch { setStatus("Could not copy link"); }
  }
  return <button onClick={copyLink} className="rounded-lg border border-slate-300 px-4 py-2" aria-live="polite">{status}</button>;
}
