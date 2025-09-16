import Link from "next/link";
import { departments, CSE_Notes } from "@/assets/asset";
import { notFound } from "next/navigation";

export default function BranchPage({ params }) {
  const { branch } = params;

  const department = departments.find(
    (dept) => dept.name.toLowerCase() === branch.toLowerCase()
  );

  if (!department) {
    notFound();
  }

  if (!department.available) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Coming Soon
          </h1>
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            {department.fullName} materials are not available yet.
          </p>
          <Link
            href="/btech"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-1"
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
            Back to Branches
          </Link>
        </div>
      </div>
    );
  }

  const semesterData = branch.toLowerCase() === "cse" ? CSE_Notes : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Link
              href="/btech"
              className="p-2 rounded-md bg-white shadow-sm hover:shadow-md transition"
            >
              <svg
                className="w-5 h-5 text-gray-600"
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
            <h1 className="ml-3 text-xl md:text-3xl font-bold text-gray-900">
              {department.name}{" "}
              <span className="text-blue-600">Semesters</span>
            </h1>
          </div>
          <p className="text-gray-600 text-sm md:text-base max-w-xl">
            {department.fullName} - Choose a semester to access study materials
          </p>
        </div>

        {/* Semesters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {semesterData.map((semester) => (
            <Link
              key={semester.semester}
              href={`/btech/${branch.toLowerCase()}/${semester.semester}`}
              className={`group rounded-md border border-blue-200 bg-white transition p-3 flex flex-col ${semester.available
                  ? "hover:shadow-md hover:border-blue-300"
                  : "opacity-60 cursor-not-allowed"
                }`}
            >
              {/* Top Row */}
              <div className="flex justify-between items-start mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-sm font-bold">
                  {semester.semester}
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${semester.available
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {semester.available ? "Available" : "Soon"}
                </span>
              </div>

              {/* Info */}
              <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 mb-1">
                Semester {semester.semester}
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                {semester.semester <= 2
                  ? "Foundation"
                  : semester.semester <= 4
                    ? "Core"
                    : semester.semester <= 6
                      ? "Specialization"
                      : "Advanced"}
              </p>

              <div className="flex items-center text-xs text-gray-500 mb-2">
                <svg
                  className="w-3.5 h-3.5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span>{semester.subjects.length} subjects</span>
              </div>

              {semester.available && (
                <div className="flex items-center text-xs text-blue-600 group-hover:text-blue-700 mt-auto">
                  <span>View</span>
                  <svg
                    className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform"
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
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
