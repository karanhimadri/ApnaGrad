"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      {/* Main Search Container */}
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
          <svg 
            className="h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* Search Input */}
        <input
          className="
            block w-full 
            pl-10 pr-3 py-3 sm:pl-12 sm:pr-4 sm:py-4
            text-base sm:text-lg
            bg-white
            border-2 border-gray-200 rounded-lg sm:rounded-xl
            placeholder-gray-500 text-gray-900
            transition-all duration-200
            shadow-sm hover:shadow-md
            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
            hover:border-gray-300
          "
          placeholder="Search notes, subjects, topics..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch?.(q)}
        />
        
        {/* Search Button - Hidden on mobile, visible on larger screens */}
        <div className="hidden sm:flex absolute inset-y-0 right-0 items-center pr-2">
          <button
            className="
              px-4 py-2 rounded-lg font-medium text-white
              bg-blue-600 hover:bg-blue-700
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            "
            onClick={() => onSearch?.(q)}
          >
            Search
          </button>
        </div>
      </div>

      {/* Mobile Search Button */}
      <div className="mt-3 sm:hidden">
        <button
          className="
            w-full py-3 rounded-lg font-medium text-white
            bg-blue-600 hover:bg-blue-700
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          "
          onClick={() => onSearch?.(q)}
        >
          Search
        </button>
      </div>

      {/* Popular Searches */}
      <div className="mt-4 sm:mt-6">
        <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
          <span className="text-xs sm:text-sm font-medium text-gray-500">Popular:</span>
          {["Data Structures", "OS", "Mathematics", "DBMS"].map((tag) => (
            <button
              key={tag}
              className="
                text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 
                rounded-full font-medium
                bg-gray-100 text-gray-700 
                hover:bg-blue-100 hover:text-blue-700
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
              "
              onClick={() => {
                setQ(tag);
                onSearch?.(tag);
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Access Categories */}
      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
        {[
          { icon: "📚", label: "Notes" },
          { icon: "📝", label: "PYQs" },
          { icon: "🎓", label: "Subjects" },
          { icon: "🏆", label: "Certificates" }
        ].map((category, index) => (
          <button 
            key={index}
            className="
              p-2 sm:p-3 rounded-lg bg-white 
              border border-gray-200 hover:border-gray-300 
              hover:bg-gray-50 transition-all duration-200 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
              text-center
            "
          >
            <div className="text-lg sm:text-xl mb-1">{category.icon}</div>
            <div className="text-xs sm:text-sm font-medium text-gray-700">{category.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
