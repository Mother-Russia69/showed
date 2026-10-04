import Link from "next/link";
export default function HomePage() {
  return (
    <section className="space-y-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">You showed up.</h1>
      <p className="max-w-xl text-xl text-slate-600">Turn event attendance into a collectible badge with email login, no wallet setup, and no fees.</p>
      <Link href="/create" className="inline-block rounded-lg bg-violet-700 px-5 py-3 font-semibold text-white">Create event</Link>
      <p className="text-sm text-slate-500">Scaffold preview. Event creation and badge minting are not connected yet.</p>
    </section>
  );
}
