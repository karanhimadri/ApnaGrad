"use client";
import { useState, useRef, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Sample suggestions (you can make this dynamic based on your data)
  const suggestions = [
    "Data Structures and Algorithms",
    "Operating Systems",
    "Database Management System",
    "Computer Networks",
    "Software Engineering",
    "Machine Learning",
    "Object Oriented Programming",
    "Computer Graphics",
    "Artificial Intelligence",
    "Discrete Mathematics"
  ];

  const filteredSuggestions = q ?
    suggestions.filter(item =>
      item.toLowerCase().includes(q.toLowerCase())
    ) :
    suggestions.slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    setIsFocused(true);
    setIsDropdownOpen(true);
  };

  const handleInputChange = (e) => {
    setQ(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setQ(suggestion);
    setIsDropdownOpen(false);
    setIsFocused(false);
    onSearch?.(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsDropdownOpen(false);
      setIsFocused(false);
      onSearch?.(q);
    }
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleSearch = () => {
    setIsDropdownOpen(false);
    setIsFocused(false);
    onSearch?.(q);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0" ref={containerRef}>
      {/* Main Search Container */}
      <div className="relative">
        {/* Search Box */}
        <div
          className={`
            relative flex items-center
            bg-white border rounded-full
            transition-all duration-200 ease-in-out
            hover:shadow-md
            ${isFocused || isDropdownOpen ?
              'shadow-lg border-transparent ring-1 ring-blue-200' :
              'border-gray-300 shadow-sm'
            }
          `}
        >
          {/* Search Icon */}
          <div className="pl-4 pr-2 flex items-center">
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
            ref={inputRef}
            className="
              flex-1 py-3 px-2 text-base
              bg-transparent border-none outline-none
              placeholder-gray-500 text-gray-900
            "
            placeholder="Search notes, subjects, PYQs..."
            value={q}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyPress}
            autoComplete="off"
          />

          {/* Clear Button */}
          {q && (
            <button
              className="px-2 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setQ("");
                inputRef.current?.focus();
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Search Button */}
          <button
            className="
              px-4 py-2 mr-1 text-gray-600 hover:text-blue-600
              transition-colors duration-200
              focus:outline-none
            "
            onClick={handleSearch}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Dropdown Suggestions */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 z-50bg-white border border-gray-200 rounded-2xl shadow-lg max-h-96 overflow-y-auto">
            {/* Search Results Header */}
            {q && (
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search for "{q}"
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div className="py-2">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="
                    w-full text-left px-4 py-2 
                    hover:bg-gray-50 
                    transition-colors duration-150
                    focus:outline-none focus:bg-gray-50
                    flex items-center gap-3
                  "
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-gray-700">{suggestion}</span>
                </button>
              ))}

              {/* Popular Searches */}
              {!q && (
                <>
                  <div className="px-4 py-2 border-t border-gray-100 mt-2">
                    <div className="text-sm font-medium text-gray-500">Popular Searches</div>
                  </div>
                  {["Data Structures", "OS", "DBMS", "Networks"].map((tag) => (
                    <button
                      key={tag}
                      className="
                        w-full text-left px-4 py-2 
                        hover:bg-gray-50 
                        transition-colors duration-150
                        focus:outline-none focus:bg-gray-50
                        flex items-center gap-3
                      "
                      onClick={() => handleSuggestionClick(tag)}
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span className="text-gray-700">{tag}</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
