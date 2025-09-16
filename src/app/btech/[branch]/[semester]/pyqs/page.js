import Link from 'next/link';
import { departments, CSE_PYQs } from '@/assets/asset';
import { notFound } from 'next/navigation';

export default function PYQsPage({ params }) {
  const { branch, semester } = params;
  const semesterNum = parseInt(semester);

  // Find department
  const department = departments.find(
    dept => dept.name.toLowerCase() === branch.toLowerCase()
  );

  if (!department || !department.available) {
    notFound();
  }

  // Get PYQ Data
  const pyqData = branch.toLowerCase() === 'cse'
    ? CSE_PYQs.find(s => s.semester === semesterNum)
    : null;

  if (!pyqData || !pyqData.available) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">PYQs Not Available</h1>
          <p className="text-gray-600 mb-6">
            Previous Year Questions for {department.name} Semester {semester} are not available yet.
          </p>
          <Link href={`/btech/${branch}/${semester}`}
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Semester
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href={`/btech/${branch}/${semester}`}
            className="mr-4 p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Previous Year Questions
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {department.name} - Semester {semester}
            </p>
          </div>
        </div>

        {/* Years Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pyqData.years
            .sort((a, b) => b.year - a.year)
            .map((yearData) => (
              <Link
                key={yearData.year}
                href={yearData.available ? `/btech/${branch}/${semester}/pyqs/${yearData.year}` : '#'}
                className={`block ${!yearData.available ? 'cursor-not-allowed' : ''}`}
              >
                <div className={`
                  bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between
                  hover:shadow-md transition-all duration-200
                  ${yearData.available ? 'hover:border-purple-300' : 'opacity-60'}
                `}>
                  {/* Left Section */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {yearData.year}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {yearData.subjects.filter(s => s.available).length}/{yearData.subjects.length} available
                      </p>
                    </div>
                  </div>

                  {/* Status + CTA */}
                  <div className="flex flex-col items-end text-xs">
                    <span className={`px-2 py-0.5 rounded-full font-medium 
                      ${yearData.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      {yearData.available ? 'Available' : 'Soon'}
                    </span>
                    {yearData.available && (
                      <span className="text-purple-600 mt-2 flex items-center space-x-1">
                        <span>View</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
