"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { pyqCSE } from "@/assets/asset.js";

export default function PYQSemesterPage() {
  const params = useParams();
  const { department, semester } = params;

  // For now, only CSE data is available
  const departmentData = department === "cse" ? pyqCSE : null;
  const semesterData = departmentData?.find(
    (sem) => sem.semester === parseInt(semester)
  );

  const departmentInfo = {
    cse: {
      name: "CSE",
      fullName: "Computer Science Engineering",
    },
    ece: {
      name: "ECE",
      fullName: "Electronics & Communication Engineering",
    },
    me: {
      name: "ME",
      fullName: "Mechanical Engineering",
    },
    ce: {
      name: "CE",
      fullName: "Civil Engineering",
    },
    ee: {
      name: "EE",
      fullName: "Electrical Engineering",
    },
  };

  const currentDept = departmentInfo[department] || departmentInfo.cse;

  // Year Card Component
  const YearCard = ({ yearData }) => {
    const availableSubjects = yearData.subjects.filter((s) => s.available).length;
    const totalSubjects = yearData.subjects.length;

    const CardContent = () => (
      <div
        className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 ${yearData.available
          ? "bg-white border-purple-200 hover:border-purple-300 hover:shadow-lg cursor-pointer"
          : "bg-gray-50 border-gray-200 opacity-70 cursor-not-allowed"
          }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${yearData.available ? "bg-purple-50" : "bg-gray-100"
              }`}
          >
            <span
              className={`text-base sm:text-lg font-bold ${yearData.available ? "text-purple-700" : "text-gray-500"
                }`}
            >
              {yearData.year}
            </span>
          </div>
          <span
            className={`text-xs sm:text-sm px-2 py-0.5 rounded-full ${yearData.available
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-600"
              }`}
          >
            {yearData.available ? "Available" : "Coming Soon"}
          </span>
        </div>

        <h3
          className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 ${yearData.available ? "text-gray-900" : "text-gray-600"
            }`}
        >
          Year {yearData.year}
        </h3>

        <div
          className={`text-xs sm:text-sm mb-3 sm:mb-4 ${yearData.available ? "text-gray-600" : "text-gray-500"
            }`}
        >
          <p className="mb-1">{totalSubjects} subjects total</p>
          {yearData.available && (
            <p className="hidden sm:block text-green-600">
              {availableSubjects} papers available
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div
            className={`flex items-center space-x-1 sm:space-x-2 ${yearData.available ? "text-gray-700" : "text-gray-500"
              }`}
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-xs sm:text-sm">Question Papers</span>
          </div>
          {yearData.available && (
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>
      </div>
    );

    if (yearData.available) {
      return (
        <Link href={`/pyqs/${department}/${semester}/${yearData.year}`}>
          <CardContent />
        </Link>
      );
    }

    return <CardContent />;
  };

  if (!departmentData || !semesterData) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-4 mb-6">
              <Link
                href={`/pyqs/${department}`}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {currentDept.fullName} - Semester {semester}
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                  Previous year question papers not available
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-gray-400 mb-6">
              <svg
                className="w-20 h-20 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Previous year question papers for Semester {semester} are being
              prepared. Stay tuned for updates!
            </p>
            <Link
              href={`/pyqs/${department}`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Semesters
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href={`/pyqs/${department}`}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {currentDept.fullName}
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Semester {semester} - Previous Year Question Papers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Choose Year
          </h2>
          <p className="text-gray-600">
            Select a year to view question papers for all subjects
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {semesterData.pyqs.map((yearData) => (
            <YearCard key={yearData.year} yearData={yearData} />
          ))}
        </div>
      </div>
    </div>
  );
}
