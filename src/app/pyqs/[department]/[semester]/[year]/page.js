"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { pyqCSE } from "@/assets/asset.js";

export default function PYQYearPage() {
  const params = useParams();
  const { department, semester, year } = params;
  const [downloadingSubject, setDownloadingSubject] = useState(null);

  // For now, only CSE data is available
  const departmentData = department === "cse" ? pyqCSE : null;
  const semesterData = departmentData?.find(sem => sem.semester === parseInt(semester));
  const yearData = semesterData?.pyqs.find(y => y.year === parseInt(year));

  // Handle download functionality
  const handleDownload = async (subject) => {
    if (!subject.available || !subject.fileId || subject.fileId === "") {
      return;
    }

    setDownloadingSubject(subject.name);

    try {
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create download URL from fileId
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${subject.fileId}`;
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloadingSubject(null);
    }
  };

  // Handle view functionality - available for all users
  const handleView = (subject) => {
    if (!subject.available || !subject.fileId || subject.fileId === "") {
      return;
    }

    // Create preview URL from fileId
    const previewUrl = `https://drive.google.com/file/d/${subject.fileId}/preview`;
    window.open(previewUrl, '_blank');
  };  // Subject Card Component
  const SubjectCard = ({ subject }) => {
    const isDownloading = downloadingSubject === subject.name;

    return (
      <div className={`group p-4 rounded-lg border transition-all duration-200 ${subject.available ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
        : 'bg-gray-50 border-gray-200 opacity-70'}`}>

        <div className="flex items-start justify-between mb-3">
          <div className={`w-8 h-8 rounded-md flex items-center justify-center ${subject.available ? 'bg-blue-50' : 'bg-gray-100'}`}>
            <svg className={`w-4 h-4 ${subject.available ? 'text-blue-600' : 'text-gray-400'}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          <span className={`text-xs px-2 py-1 rounded-full ${subject.available
            ? 'bg-green-100 text-green-700'
            : 'bg-orange-100 text-orange-600'
            }`}>
            {subject.available ? 'Available' : 'Coming Soon'}
          </span>
        </div>

        <h3 className={`text-base font-semibold mb-3 line-clamp-2 ${subject.available ? 'text-gray-900' : 'text-gray-600'
          }`}>
          {subject.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-1 ${subject.available ? 'text-gray-600' : 'text-gray-500'
            }`}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs">PDF</span>
          </div>

          {subject.available && subject.fileId && subject.fileId !== "" && (
            <div className="flex items-center space-x-2">
              {/* View Button - Always available */}
              <button
                onClick={() => handleView(subject)}
                className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded transition-all duration-200"
                title="View PDF"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>View</span>
              </button>

              {/* Download Button - Available for all users */}
              <button
                onClick={() => handleDownload(subject)}
                disabled={isDownloading}
                className={`flex items-center space-x-1 px-2 py-1 text-xs rounded transition-all duration-200 ${isDownloading
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                title="Download PDF"
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin w-3 h-3">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <span>...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!departmentData || !semesterData || !yearData) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-4 mb-6">
              <Link
                href={`/pyqs/${department}/${semester}`}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {department.toUpperCase()} Department
                </h1>
                <p className="text-xl text-gray-600 mt-2">Semester {semester} - Year {year}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Not Found Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-gray-400 mb-6">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Not Available</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Question papers for {year} are not available or coming soon.
            </p>
            <Link
              href={`/pyqs/${department}/${semester}`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Years
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href={`/pyqs/${department}/${semester}`}
              className="text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Go back"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {department.toUpperCase()} Department
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mt-1">
                Semester {semester} - Year {year} Question Papers
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Question Papers</h2>
            <p className="text-gray-600">View and download papers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {yearData.subjects.map((subject, index) => (
            <SubjectCard key={index} subject={subject} />
          ))}
        </div>
      </div>
    </div>
  );
}
