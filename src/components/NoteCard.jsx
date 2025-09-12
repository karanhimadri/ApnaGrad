import Link from "next/link";

export default function NoteCard({ title, subject, href, difficulty = "Intermediate" }) {
  const difficultyColors = {
    "Beginner": "bg-green-100 text-green-800",
    "Intermediate": "bg-yellow-100 text-yellow-800", 
    "Advanced": "bg-red-100 text-red-800"
  };

  return (
    <Link href={href} className="group block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:shadow-blue-100 transition-all duration-200 hover:-translate-y-1">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="text-gray-600 mt-1 text-sm">{subject}</p>
          </div>
          <div className="ml-3">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>View</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
