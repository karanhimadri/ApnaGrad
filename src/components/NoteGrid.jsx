import NoteCard from "./NoteCard";
export default function NoteGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((n) => (
        <NoteCard key={`${n.title}-${n.subject}`} {...n} />
      ))}
    </div>
  );
}
