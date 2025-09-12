"use client";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { departments } from "@/assets/asset";

export default function NotesPage() {

  function handleSearch(q) {
    console.log("search:", q);
  }

  // Department Card Component
  const DepartmentCard = ({ department }) => {
    const colorClasses = {
      blue: 'border-blue-200 hover:border-blue-300 hover:shadow-blue-50',
      purple: 'border-purple-200 hover:border-purple-300 hover:shadow-purple-50',
      green: 'border-green-200 hover:border-green-300 hover:shadow-green-50',
      orange: 'border-orange-200 hover:border-orange-300 hover:shadow-orange-50',
      red: 'border-red-200 hover:border-red-300 hover:shadow-red-50'
    };

    const bgClasses = {
      blue: 'bg-blue-50',
      purple: 'bg-purple-50',
      green: 'bg-green-50',
      orange: 'bg-orange-50',
      red: 'bg-red-50'
    };

    const textClasses = {
      blue: 'text-blue-700',
      purple: 'text-purple-700',
      green: 'text-green-700',
      orange: 'text-orange-700',
      red: 'text-red-700'
    };

    const CardContent = () => (
      <div className={`p-6 rounded-xl border-2 transition-all duration-200 ${department.available
          ? `bg-white ${colorClasses[department.color]} hover:shadow-lg cursor-pointer`
          : 'bg-gray-50 border-gray-200 opacity-70 cursor-not-allowed'
        }`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${department.available ? bgClasses[department.color] : 'bg-gray-100'
            }`}>
            <span className={`text-lg font-bold ${department.available ? textClasses[department.color] : 'text-gray-500'
              }`}>
              {department.name}
            </span>
          </div>
          <div className="text-right">
            <span className={`text-sm px-2 py-1 rounded-full ${department.available
                ? 'bg-green-100 text-green-700'
                : 'bg-orange-100 text-orange-600'
              }`}>
              {department.available ? 'Available' : 'Coming Soon'}
            </span>
          </div>
        </div>

        <h3 className={`text-xl font-semibold mb-2 ${department.available ? 'text-gray-900' : 'text-gray-600'
          }`}>
          {department.fullName}
        </h3>

        <p className={`text-sm mb-4 ${department.available ? 'text-gray-600' : 'text-gray-500'
          }`}>
          {department.description}
        </p>

        <div className="flex items-center justify-between">
          <span className={`text-sm ${department.available ? 'text-gray-700' : 'text-gray-500'
            }`}>
            {department.count} study materials
          </span>
          {department.available && (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
      </div>
    );

    if (department.available) {
      return (
        <Link href={`/notes/${department.name.toLowerCase()}`}>
          <CardContent />
        </Link>
      );
    }

    return <CardContent />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Study Materials</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover comprehensive notes, assignments, and study guides from top students and educators.
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Choose Your Department</h2>
          <p className="text-gray-600">Select a department to browse study materials by semester</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <DepartmentCard key={department.name} department={department} />
          ))}
        </div>
      </div>
    </div>
  );
}
