"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { pyqCSE } from "@/assets/asset.js";
import SubjectCard from "@/components/SubjectCard";

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
  }

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {yearData.subjects.map((subject, index) => (
            <SubjectCard
              key={index}
              subject={subject}
              downloadingSubject={downloadingSubject}
              handleView={handleView}
              handleDownload={handleDownload}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
