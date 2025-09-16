"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { departments, CSE_Notes } from "@/assets/asset";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Download,
  Eye,
  Layers,
  FlaskConical,
} from "lucide-react";
import { use } from "react";

function slugToSubjectName(slug, subjects) {
  return subjects.find(
    (subject) => subject.name.toLowerCase().replace(/[^a-z0-9]/g, "-") === slug
  );
}

export default function SubjectNotesPage({ params }) {
  const { branch, semester, subject: subjectSlug } = use(params);
  const semesterNum = parseInt(semester);

  // Find department
  const department = departments.find((dept) => dept.name.toLowerCase() === branch.toLowerCase());

  if (!department || !department.available) {
    notFound();
  }

  // Find semester data (CSE only for now)
  const semesterData =
    branch.toLowerCase() === "cse"
      ? CSE_Notes.find((s) => s.semester === semesterNum)
      : null;

  if (!semesterData) {
    notFound();
  }

  // Find subject
  const subjectData = slugToSubjectName(
    decodeURIComponent(subjectSlug),
    semesterData.subjects
  );

  if (!subjectData) {
    notFound();
  }

  if (!subjectData.available) {
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
            Notes for {subjectData.name} are not available yet.
          </p>
          <Link
            href={`/btech/${branch}/${semester}/notes`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link
            href={`/btech/${branch}/${semester}/notes`}
            className="mr-3 p-2 rounded-md bg-white shadow-sm hover:shadow-md transition"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              {subjectData.name}
            </h1>
            <p className="text-sm text-gray-600">
              {department.name} — Semester {semester}
            </p>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* PDF Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                Study Notes
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Comprehensive study material for {subjectData.name}
              </p>

              {subjectData.fileId ? (
                <div>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition">
                      <Eye className="w-4 h-4 mr-2" />
                      View PDF
                    </button>
                    <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm transition">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </div>

                  {/* PDF Viewer Placeholder */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center text-sm text-gray-500">
                    <FileText className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    PDF Viewer will load here
                    <p className="text-xs text-gray-400 mt-1">
                      File ID: {subjectData.fileId}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">PDF file not available yet</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Related Subjects */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm">
              <h3 className="font-bold text-gray-900 mb-3">Related Subjects</h3>
              <div className="space-y-2 text-black">
                {semesterData.subjects
                  .filter((s) => s.name !== subjectData.name && s.available)
                  .slice(0, 3)
                  .map((relatedSubject, index) => (
                    <Link
                      key={index}
                      href={`/btech/${branch}/${semester}/notes/${encodeURIComponent(
                        relatedSubject.name
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "-")
                      )}`}
                      className="block p-2 rounded-md border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition"
                    >
                      {relatedSubject.name}
                    </Link>
                  ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm">
              <h3 className="font-bold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2 text-black">
                <Link
                  href={`/btech/${branch}/${semester}/pyqs`}
                  className="flex items-center gap-2 p-2 rounded-md border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition"
                >
                  <Layers className="w-4 h-4 text-purple-600" />
                  <span>View PYQs</span>
                </Link>
                <Link
                  href={`/btech/${branch}/${semester}`}
                  className="flex items-center gap-2 p-2 rounded-md border border-gray-100 hover:border-orange-300 hover:bg-orange-50 transition"
                >
                  <FlaskConical className="w-4 h-4 text-orange-600" />
                  <span>Lab Manuals</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
