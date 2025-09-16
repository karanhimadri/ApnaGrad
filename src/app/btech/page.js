import Link from "next/link";
import { departments } from "@/assets/asset";
import { Cpu, CircuitBoard, Hammer, BookOpen, Wrench } from "lucide-react";

// Map short codes (department.name) to Lucide icons
const iconMap = {
  cse: Cpu,
  ece: CircuitBoard,
  me: Hammer,
  ce: BookOpen,
  ee: Wrench,
};

export default function BTechPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
            B.Tech <span className="text-blue-600">Engineering</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your engineering branch to access study materials, notes, and previous year questions
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {departments.map((department) => {
            const key = department.name.toLowerCase();
            const Icon = iconMap[key] || BookOpen;

            return (
              <Link
                key={department.name}
                href={`/btech/${key}`}
                className="group block"
              >
                <div
                  className={`
                    relative bg-white rounded-lg border border-gray-200 p-4
                    transition-all duration-300 hover:shadow-md hover:-translate-y-1
                    h-[17rem] w-full flex flex-col
                    ${department.available
                      ? "hover:border-blue-300 cursor-pointer"
                      : "opacity-60 cursor-not-allowed"}
                  `}
                >
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`
                        inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                        ${department.available
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"}
                      `}
                    >
                      {department.available ? "Available" : "Coming Soon"}
                    </span>
                  </div>

                  {/* Department Icon */}
                  <div
                    className={`
                      w-9 h-9 rounded-md flex items-center justify-center mb-2 flex-shrink-0
                      ${department.color === "blue"
                        ? "bg-blue-100"
                        : department.color === "purple"
                          ? "bg-purple-100"
                          : department.color === "green"
                            ? "bg-green-100"
                            : department.color === "orange"
                              ? "bg-orange-100"
                              : "bg-red-100"}
                    `}
                  >
                    <Icon
                      className={`
                        w-5 h-5
                        ${department.color === "blue"
                          ? "text-blue-600"
                          : department.color === "purple"
                            ? "text-purple-600"
                            : department.color === "green"
                              ? "text-green-600"
                              : department.color === "orange" ? "text-orange-600" : "text-red-600"} `} />
                  </div>

                  {/* Department Info */}
                  <div className="flex flex-col flex-1 gap-10">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[2.5rem]">
                        {department.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {department.fullName}
                      </p>
                      <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                        {department.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <BookOpen className="w-4 h-4" />
                        <span>{department.count} resources</span>
                      </div>

                      {department.available && (
                        <div className="flex items-center space-x-1 text-xs text-blue-600 group-hover:text-blue-700">
                          <span>Explore</span>
                          <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            More engineering branches coming soon! Currently featuring Computer Science Engineering materials.
          </p>
        </div>
      </div>
    </div>
  );
}
