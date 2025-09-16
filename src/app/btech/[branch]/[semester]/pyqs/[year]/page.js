'use client';

import { use } from 'react';
import Link from 'next/link';
import { departments, CSE_PYQs } from '@/assets/asset';
import { notFound } from 'next/navigation';

export default function YearPYQsPage({ params }) {
  const { branch, semester, year } = use(params);
  const semesterNum = parseInt(semester);
  const yearNum = parseInt(year);

  // Find department
  const department = departments.find(
    dept => dept.name.toLowerCase() === branch.toLowerCase()
  );
  if (!department || !department.available) notFound();

  // Only CSE data
  const pyqData = branch.toLowerCase() === 'cse'
    ? CSE_PYQs.find(s => s.semester === semesterNum)
    : null;
  if (!pyqData) notFound();

  // Specific year
  const yearData = pyqData.years.find(y => y.year === yearNum);
  if (!yearData) notFound();

  if (!yearData.available) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            {year} Papers Not Available
          </h1>
          <p className="text-gray-600 mb-4 text-sm">
            PYQ papers for this year will be available soon.
          </p>
          <Link
            href={`/btech/${branch}/${semester}/pyqs`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
          >
            ← Back to Years
          </Link>
        </div>
      </div>
    );
  }

  const handleViewPDF = (subject) => {
    if (subject.fileId && subject.available) {
      const viewLink = `https://drive.google.com/file/d/${subject.fileId}/view?usp=sharing`;
      window.open(viewLink, '_blank');
    }
  };

  const handleDownloadPDF = (subject) => {
    if (subject.fileId && subject.available) {
      const downloadLink = `https://drive.google.com/uc?export=download&id=${subject.fileId}`;
      const link = document.createElement('a');
      link.href = downloadLink;
      link.download = `${subject.name}_${year}_PYQ.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Link
              href={`/btech/${branch}/${semester}/pyqs`}
              className="p-2 rounded-md bg-white border border-gray-200 hover:bg-gray-50"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {year} Question Papers
              </h1>
              <p className="text-sm text-gray-600">
                {department.name} • Semester {semester}
              </p>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="text-sm text-gray-500">
            <Link href="/btech" className="hover:text-blue-600">BTech</Link> /
            <Link href={`/btech/${branch}`} className="hover:text-blue-600 ml-1">{department.name}</Link> /
            <Link href={`/btech/${branch}/${semester}`} className="hover:text-blue-600 ml-1">Sem {semester}</Link> /
            <Link href={`/btech/${branch}/${semester}/pyqs`} className="hover:text-blue-600 ml-1">PYQs</Link> /
            <span className="ml-1 text-gray-900">{year}</span>
          </div>
        </div>

        {/* Papers count */}
        <p className="text-sm text-gray-600 mb-4">
          {yearData.subjects.filter(s => s.available).length} of {yearData.subjects.length} papers available
        </p>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {yearData.subjects.map((subject, idx) => (
            <div
              key={idx}
              className={`flex items-start justify-between p-4 bg-white rounded-lg border transition
                ${subject.available ? 'hover:shadow-sm hover:border-blue-300' : 'opacity-60'}
              `}
            >
              {/* Left Info */}
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  {subject.name}
                </h3>
                {subject.available ? (
                  <p className="text-xs text-gray-500">Available</p>
                ) : (
                  <p className="text-xs text-gray-500">Coming soon</p>
                )}
              </div>

              {/* Right Actions */}
              {subject.available ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewPDF(subject)}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDownloadPDF(subject)}
                    className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Download
                  </button>
                </div>
              ) : (
                <span className="text-xs text-gray-400">—</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
