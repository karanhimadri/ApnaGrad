"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Text */}
        <h1 className="text-5xl font-bold text-gray-900">404</h1>
        <h2 className="text-lg font-semibold text-gray-700 mt-2 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 text-sm">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full px-5 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700"
          >
            Go to Homepage
          </Link>

          <button
            onClick={() => router.back()}
            className="block w-full px-5 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
