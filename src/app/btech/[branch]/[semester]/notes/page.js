"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { departments, CSE_Notes } from "@/assets/asset";
import { ArrowLeft, BookOpen, FileText, Download, ArrowRight } from "lucide-react";
import { use } from "react";

export default function NotesPage({ params }) {
  const { branch, semester } = use(params);
  const semesterNum = parseInt(semester);

  // Find the department
  const department = departments.find(
    (dept) => dept.name.toLowerCase() === branch.toLowerCase()
  );

  if (!department || !department.available) {
    notFound();
  }

  // For now, only CSE data
  const semesterData = branch.toLowerCase() === "cse" ? CSE_Notes.find((s) => s.semester === semesterNum) : null;

  if (!semesterData || !semesterData.available) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Notes Not Available
          </h1>
          <p className="text-gray-600 mb-6">
            Notes for {department.name} Semester {semester} are not available
            yet.
          </p>
          <Link
            href={`/btech/${branch}/${semester}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Semester
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link
            href={`/btech/${branch}/${semester}`}
            className="mr-3 p-2 rounded-md bg-white shadow-sm hover:shadow-md transition"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              <span className="text-blue-600">Study Notes</span>
            </h1>
            <p className="text-sm text-gray-600">
              {department.name} — Semester {semester}
            </p>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {semesterData.subjects.map((subject, index) => (
            <Link
              key={index}
              href={
                subject.available
                  ? `/btech/${branch}/${semester}/notes/${encodeURIComponent(
                    subject.name
                      .toLowerCase()
                      .replace(/[^a-z0-9]/g, "-")
                  )}`
                  : "#"
              }
              className={`group block ${!subject.available ? "cursor-not-allowed" : ""
                }`}
            >
              <div
                className={`relative bg-white rounded-lg border border-gray-200 p-4 flex flex-col h-48 transition-all ${subject.available
                  ? "hover:shadow-md hover:-translate-y-1 hover:border-blue-300"
                  : "opacity-60"
                  }`}
              >
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${subject.available
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {subject.available ? "Available" : "Soon"}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>

                {/* Info */}
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-2 mb-1">
                  {subject.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  Code: {department.name}-{semester}-
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto">
                  <div className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Notes</span>
                  </div>
                  {subject.fileId && (
                    <div className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </div>
                  )}
                </div>

                {subject.available && (
                  <div className="flex items-center text-xs text-blue-600 group-hover:text-blue-700 mt-2">
                    <span>View Notes</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition" />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
