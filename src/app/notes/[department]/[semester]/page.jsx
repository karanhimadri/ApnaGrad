"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CSE } from "@/assets/asset.js";

export default function SemesterPage() {
  const params = useParams();
  const { department, semester } = params;

  // For now, only CSE data is available
  const departmentData = department === "cse" ? CSE : null;
  const semesterData = departmentData?.find(s => s.semester === parseInt(semester));

  const departmentInfo = {
    cse: { name: "CSE", fullName: "Computer Science Engineering" },
    ece: { name: "ECE", fullName: "Electronics & Communication Engineering" },
    me: { name: "ME", fullName: "Mechanical Engineering" },
    ce: { name: "CE", fullName: "Civil Engineering" },
    ee: { name: "EE", fullName: "Electrical Engineering" }
  };

  const currentDept = departmentInfo[department] || departmentInfo.cse;

  // Subject Card Component
  const SubjectCard = ({ subject, index }) => (
    <div className={`p-6 rounded-xl border-2 transition-all duration-200 ${subject.available
      ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg cursor-pointer'
      : 'bg-gray-50 border-gray-200 opacity-70 cursor-not-allowed'
      }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${subject.available ? 'bg-blue-50' : 'bg-gray-100'
          } flex items-center justify-center`}>
          <span className={`text-lg font-bold ${subject.available ? 'text-blue-700' : 'text-gray-500'
            }`}>
            {index + 1}
          </span>
        </div>
        <span className={`text-sm px-3 py-1 rounded-full ${subject.available
          ? 'bg-green-100 text-green-700'
          : 'bg-orange-100 text-orange-600'
          }`}>
          {subject.available ? 'Available' : 'Coming Soon'}
        </span>
      </div>

      <h3 className={`text-lg font-semibold mb-3 ${subject.available ? 'text-gray-900' : 'text-gray-600'
        }`}>
        {subject.name}
      </h3>

      <div className="flex items-center justify-between">
        <div className={`flex items-center space-x-2 ${subject.available ? 'text-gray-700' : 'text-gray-500'
          }`}>
          {subject.available && subject.pdfLink && subject.pdfLink !== "#" ? (
            <>
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-green-600">PDF Available</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-sm">Study Material</span>
            </>
          )}
        </div>
        {subject.available && (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </div>
    </div>
  );

  if (!semesterData) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-4">
              <Link
                href={`/notes/${department}`}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Link href="/notes" className="hover:text-gray-900 transition-colors">Notes</Link>
                  <span>/</span>
                  <Link href={`/notes/${department}`} className="hover:text-gray-900 transition-colors">
                    {currentDept.name}
                  </Link>
                  <span>/</span>
                  <span>Semester {semester}</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Semester {semester} - {currentDept.fullName}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Not Found Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-gray-400 mb-6">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Semester Not Found</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              The requested semester data is not available or doesn't exist.
            </p>
            <Link
              href={`/notes/${department}`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to {currentDept.name} Semesters
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const availableSubjects = semesterData.subjects.filter(s => s.available).length;
  const totalSubjects = semesterData.subjects.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <Link
              href={`/notes/${department}`}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Link href="/notes" className="hover:text-gray-900 transition-colors">Notes</Link>
                <span>/</span>
                <Link href={`/notes/${department}`} className="hover:text-gray-900 transition-colors">
                  {currentDept.name}
                </Link>
                <span>/</span>
                <span>Semester {semester}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Semester {semester} - {currentDept.fullName}
              </h1>
              <div className="flex items-center gap-4 mt-3">
                <span className={`px-3 py-1 rounded-full text-sm ${semesterData.available
                  ? 'bg-green-100 text-green-700'
                  : 'bg-orange-100 text-orange-600'
                  }`}>
                  {semesterData.available ? 'Available' : 'Coming Soon'}
                </span>
                <span className="text-gray-600">
                  {availableSubjects} of {totalSubjects} subjects available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Subjects</h2>
          <p className="text-gray-600">Study materials and notes for each subject</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {semesterData.subjects.map((subject, index) => (
            <SubjectCard key={index} subject={subject} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
