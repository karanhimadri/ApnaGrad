const SubjectCard = ({ subject, downloadingSubject, handleView, handleDownload }) => {
  const isDownloading = downloadingSubject === subject.name;
  const isAvailable = subject.available;

  return (
    <div
      className={`flex flex-col justify-between gap-4 p-4 rounded-lg border transition-all duration-200 h-36 w-full
        ${isAvailable
          ? "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
          : "bg-gray-50 border-gray-200 opacity-70 cursor-not-allowed"
        }`}
    >
      {/* Top: Icon + Title */}
      <div className="flex items-start space-x-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center
            ${isAvailable ? "bg-blue-50" : "bg-gray-200"}`}
        >
          <svg
            className={`w-4 h-4 ${isAvailable ? "text-blue-600" : "text-gray-400"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        <h3
          className={`text-sm font-semibold leading-snug break-words line-clamp-2
            ${isAvailable ? "text-gray-900" : "text-gray-500"}`}
          title={subject.name}
        >
          {subject.name}
        </h3>
      </div>

      {/* Bottom: Actions */}
      <div className="flex items-center justify-end space-x-2">
        {/* View Button */}
        <button
          onClick={() => handleView(subject)}
          disabled={!isAvailable}
          className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200
            ${isAvailable
              ? "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>View</span>
        </button>

        {/* Download Button */}
        <button
          onClick={() => handleDownload(subject)}
          disabled={isDownloading || !isAvailable}
          className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200
            ${isDownloading
              ? "bg-blue-100 text-blue-600 cursor-wait"
              : isAvailable
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-red-100 text-red-400 cursor-not-allowed"
            }`}
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
                <path
                  className="opacity-75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M4 12a8 8 0 018-8v4m0 0l3-3m-3 3L9 5"
                />
              </svg>
              <span>Loading...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SubjectCard;
