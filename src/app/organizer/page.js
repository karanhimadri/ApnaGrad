import OrganizerCard from "@/components/OrganizerCard";

export default function OrganizerPage() {
  const items = [
    { subject: "Mathematics", count: 12 },
    { subject: "Data Structures", count: 9 },
    { subject: "Operating Systems", count: 7 },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6">
      <h1 className="text-2xl font-semibold">Organizer (PYQs)</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <OrganizerCard key={it.subject} {...it} />
        ))}
      </div>
    </div>
  );
}
