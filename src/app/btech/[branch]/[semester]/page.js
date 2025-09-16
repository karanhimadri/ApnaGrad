"use client";

import Link from "next/link";
import { use } from "react";
import { departments, CSE_Notes, CSE_PYQs } from "@/assets/asset";
import { notFound } from "next/navigation";
import {
  FileText,
  BookOpen,
  FlaskConical,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  FolderOpen,
} from "lucide-react";

export default function SemesterPage({ params }) {
  const { branch, semester } = use(params);
  const semesterNum = parseInt(semester);

  const department = departments.find(
    (dept) => dept.name.toLowerCase() === branch.toLowerCase()
  );

  if (!department || !department.available) {
    notFound();
  }

  const semesterData =
    branch.toLowerCase() === "cse"
      ? CSE_Notes.find((s) => s.semester === semesterNum)
      : null;

  const pyqData =
    branch.toLowerCase() === "cse"
      ? CSE_PYQs.find((s) => s.semester === semesterNum)
      : null;

  if (!semesterData) {
    notFound();
  }

  const categories = [
    {
      title: "Study Notes",
      description: "Comprehensive notes and study materials",
      icon: FileText,
      href: `/btech/${branch}/${semester}/notes`,
      color: "blue",
      available: semesterData.available,
      count: semesterData.subjects.length,
      badge: "Notes",
    },
    {
      title: "Previous Year Questions",
      description: "Past exam papers and question banks",
      icon: BookOpen,
      href: `/btech/${branch}/${semester}/pyqs`,
      color: "purple",
      available: pyqData?.available || false,
      count: pyqData?.years?.length || 0,
      badge: "PYQs",
    },
    {
      title: "Lab Manuals",
      description: "Laboratory guides and experiment manuals",
      icon: FlaskConical,
      href: `/btech/${branch}/${semester}/lab-manuals`,
      color: "green",
      available: false,
      count: 0,
      badge: "Lab",
    },
    {
      title: "Projects",
      description: "Project ideas and implementation guides",
      icon: Lightbulb,
      href: `/btech/${branch}/${semester}/projects`,
      color: "orange",
      available: false,
      count: 0,
      badge: "Projects",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              href={`/btech/${branch}`}
              className="p-2 rounded-md bg-white shadow-sm hover:shadow-md transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="ml-3 text-xl md:text-3xl font-bold text-gray-900">
              <span className="text-blue-600">{department.name}</span> Semester{" "}
              {semester}
            </h1>
          </div>
          <p className="text-gray-600 text-sm md:text-base">
            Choose a category to access study materials
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.title}
                href={category.available ? category.href : "#"}
                className={`group rounded-md border border-gray-200 bg-white transition p-4 flex flex-col ${category.available
                    ? "hover:shadow-md hover:border-blue-300"
                    : "opacity-60 cursor-not-allowed"
                  }`}
              >
                {/* Top row */}
                <div className="flex justify-between items-start mb-2">
                  <div
                    className={`w-10 h-10 rounded-md flex items-center justify-center ${category.color === "blue"
                        ? "bg-blue-100 text-blue-600"
                        : category.color === "purple"
                          ? "bg-purple-100 text-purple-600"
                          : category.color === "green"
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-600"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${category.available
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {category.available ? "Available" : "Soon"}
                  </span>
                </div>

                {/* Info */}
                <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 mb-1">
                  {category.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                  {category.description}
                </p>

                <div className="flex items-center justify-between mt-auto text-xs">
                  <div className="flex items-center text-gray-500">
                    <FolderOpen className="w-3.5 h-3.5 mr-1" />
                    <span>
                      {category.count > 0
                        ? `${category.count} ${category.badge}`
                        : "Coming soon"}
                    </span>
                  </div>

                  {category.available && (
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                      <span className="font-medium">Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
