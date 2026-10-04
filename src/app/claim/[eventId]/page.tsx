export default async function ClaimPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  return (
    <section className="max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">Claim your badge</h1>
      <article className="space-y-3 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold">Event preview</h2>
        <p className="break-all text-sm text-slate-500">Event ID: {eventId}</p>
        <p>Event title, date, description, and badge image will appear here.</p>
      </article>
      <p className="text-slate-600">Email login and badge minting are not connected yet.</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button disabled className="rounded-lg border border-slate-300 px-5 py-3">Log in by email</button>
        <button disabled className="rounded-lg bg-violet-700 px-5 py-3 text-white">Get badge</button>
      </div>
      <p className="text-sm text-slate-500">Planned states: loading, success with a Devnet Explorer link, already claimed, and error.</p>
    </section>
  );
}
