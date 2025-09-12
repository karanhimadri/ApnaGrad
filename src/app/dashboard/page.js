export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <aside className="rounded border border-black/10 p-4">Sidebar (placeholder)</aside>
        <section className="rounded border border-black/10 p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="p-2">Title</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Semester</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-black/5">
                <td className="p-2">Data Structures</td>
                <td className="p-2">CSE</td>
                <td className="p-2">3</td>
                <td className="p-2">Edit | Delete</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
