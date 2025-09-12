export default function OrganizerCard({ subject, count = 0 }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
          Available
        </span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{subject}</h3>
      <p className="text-sm text-gray-600 mb-4">{count} Previous Year Questions</p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">Question Papers</span>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
