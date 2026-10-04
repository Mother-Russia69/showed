import { CopyLinkButton } from "@/components/copy-link-button";
export default async function ProfilePage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = await params;
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Attendance profile</h1>
      <p className="break-all text-slate-600">{address}</p>
      <CopyLinkButton />
      <dl className="grid grid-cols-2 gap-4 rounded-xl bg-white p-6">
        <div><dt className="text-slate-500">Number of events</dt><dd className="text-2xl font-semibold">—</dd></div>
        <div><dt className="text-slate-500">First event</dt><dd className="text-2xl font-semibold">—</dd></div>
      </dl>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Badges">
        <p className="col-span-full rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-600">Your badges will appear here. Profile data is not connected yet.</p>
      </div>
    </section>
  );
}
