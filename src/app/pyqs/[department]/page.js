"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { pyqCSE } from "@/assets/asset.js";

export default function PYQDepartmentPage() {
  const params = useParams();
  const department = params.department;

  // For now, only CSE data is available
  const departmentData = department === "cse" ? pyqCSE : null;

  const departmentInfo = {
    cse: {
      name: "CSE",
      fullName: "Computer Science Engineering",
      description: "Previous year question papers for Computer Science and Engineering covering all semesters and subjects."
    },
    ece: {
      name: "ECE",
      fullName: "Electronics & Communication Engineering",
      description: "Previous year question papers for Electronics and Communication Engineering (Coming Soon)"
    },
    me: {
      name: "ME",
      fullName: "Mechanical Engineering",
      description: "Previous year question papers for Mechanical Engineering (Coming Soon)"
    },
    ce: {
      name: "CE",
      fullName: "Civil Engineering",
      description: "Previous year question papers for Civil Engineering (Coming Soon)"
    },
    ee: {
      name: "EE",
      fullName: "Electrical Engineering",
      description: "Previous year question papers for Electrical Engineering (Coming Soon)"
    }
  };

  const currentDept = departmentInfo[department] || departmentInfo.cse;

  // Semester Card Component
  const SemesterCard = ({ semesterData }) => {
    const availableYears = semesterData.pyqs.filter(p => p.available).length;
    const totalYears = semesterData.pyqs.length;

    const CardContent = () => (
      <div className={`p-6 rounded-xl border-2 transition-all duration-200 ${semesterData.available
        ? 'bg-white border-blue-200 hover:border-blue-300 hover:shadow-lg cursor-pointer'
        : 'bg-gray-50 border-gray-200 opacity-70 cursor-not-allowed'}`}>

        <div className="flex items-start justify-between mb-4">
          <span className={`text-sm px-3 py-1 rounded-full ${semesterData.available
            ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-600'}`}>
            {semesterData.available ? 'Available' : 'Coming Soon'}
          </span>
        </div>

        <h3 className={`text-xl font-semibold mb-2 ${semesterData.available ? 'text-gray-900' : 'text-gray-600'
          }`}>
          Semester {semesterData.semester}
        </h3>

        <div className={`text-sm mb-4 ${semesterData.available ? 'text-gray-600' : 'text-gray-500'
          }`}>
          <p className="mb-1">{totalYears} years available</p>
          {semesterData.available && (
            <p className="text-green-600">{availableYears} question papers ready</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-2 ${semesterData.available ? 'text-gray-700' : 'text-gray-500'
            }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm">Question Papers</span>
          </div>
          {semesterData.available && (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
      </div>
    );

    if (semesterData.available) {
      return (
        <Link href={`/pyqs/${department}/${semesterData.semester}`}>
          <CardContent />
        </Link>
      );
    }

    return <CardContent />;
  };

  if (!departmentData) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-4 mb-6">
              <Link
                href="/pyqs"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {currentDept.fullName}
                </h1>
                <p className="text-xl text-gray-600 mt-2">{currentDept.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-gray-400 mb-6">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              We&apos;re working hard to bring you comprehensive previous year question papers for {currentDept.fullName}.
              Stay tuned for updates!
            </p>
            <Link
              href="/pyqs"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Departments
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
              href="/pyqs"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {currentDept.fullName}
              </h1>
              <p className="text-xl text-gray-600 mt-2">{currentDept.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Choose Semester</h2>
          <p className="text-gray-600">Select a semester to browse previous year question papers by year</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departmentData.map((semesterData) => (
            <SemesterCard key={semesterData.semester} semesterData={semesterData} />
          ))}
        </div>
      </div>
    </div>
  );
}