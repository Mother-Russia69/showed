export default function CreatePage() {
  return (
    <section className="max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">Create event</h1>
      <p className="text-slate-600">Form preview. Saving events will be implemented later.</p>
      <form className="space-y-4">
        <label className="block space-y-2"><span>Title</span><input name="title" placeholder="Community meetup" required /></label>
        <label className="block space-y-2"><span>Description</span><textarea name="description" rows={4} /></label>
        <label className="block space-y-2"><span>Date</span><input name="date" type="date" required /></label>
        <label className="block space-y-2"><span>Image URL</span><input name="image_url" type="url" placeholder="https://example.com/badge.png" /></label>
        <button type="button" disabled className="rounded-lg bg-violet-700 px-5 py-3 text-white">Save event (coming soon)</button>
      </form>
      <div className="rounded-lg border border-dashed border-slate-300 p-5 text-slate-500">Claim link and downloadable QR code will appear here after saving.</div>
    </section>
  );
}
