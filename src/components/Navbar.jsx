"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Handle mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    // Set initial scroll state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (path) => pathname === path;

  const navLinks = [
    { href: "/notes", label: "Notes" },
    { href: "/pyqs", label: "PYQs" },
    { href: "/certificate", label: "Certificates" },
    { href: "/premium", label: "Premium" }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${mounted && scrolled
      ? 'bg-white backdrop-blur-md border-b border-gray-300 shadow-md'
      : 'bg-white backdrop-blur-md border-b border-gray-200 shadow-sm'
      }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">NoteNest</span>
              <span className="text-xs text-gray-500 -mt-1 hidden sm:block">Study Smarter</span>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            aria-label="Toggle menu"
            className="lg:hidden relative inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setOpen(!open)}
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${open ? 'rotate-45 top-3' : 'top-1'
                }`} />
              <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${open ? 'opacity-0' : 'top-3'
                }`} />
              <span className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${open ? '-rotate-45 top-3' : 'top-5'
                }`} />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${isActive(link.href)
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                <span>{link.label}</span>
                {isActive(link.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>
            ))}

            {/* Auth buttons */}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="border-t border-gray-200 bg-white backdrop-blur-md">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${isActive(link.href)
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                <span>{link.label}</span>
                {isActive(link.href) && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </Link>
            ))}

            {/* Mobile auth buttons */}
            <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Sign Up Free
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
