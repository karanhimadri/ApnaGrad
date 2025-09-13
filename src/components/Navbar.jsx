"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContextProvider";
import authService from "@/lib/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, userProfile, isAuthenticated, loading, clearUserData, getUserFullName, getUserInitials, isPremium } = useUser();

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
    setProfileOpen(false);
  }, [pathname]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileOpen && !event.target.closest('.profile-dropdown')) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await authService.logout();
      clearUserData(); // Clear context data
      setProfileOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path) => pathname === path || pathname.startsWith(`${path}/`);

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

            {/* Auth buttons / User Profile */}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
              {loading ? (
                // Loading state
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : isAuthenticated ? (
                // User is logged in - show profile dropdown
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {getUserInitials()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium text-gray-900">
                        {getUserFullName()}
                      </span>
                      {isPremium && (
                        <span className="px-2 py-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-medium">
                          PRO
                        </span>
                      )}
                      <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Profile Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{getUserFullName()}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/profile"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile Settings
                        </Link>

                        <Link
                          href="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" />
                          </svg>
                          Dashboard
                        </Link>

                        {!isPremium && (
                          <Link
                            href="/premium"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            Upgrade to Premium
                          </Link>
                        )}

                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // User is not logged in - show login/signup buttons
                <>
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
                </>
              )}
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

            {/* Mobile auth buttons / User Profile */}
            <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
              {loading ? (
                // Loading state
                <div className="flex items-center px-4 py-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mr-3"></div>
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : isAuthenticated ? (
                // User is logged in - show profile info and logout
                <>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {getUserInitials()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{getUserFullName()}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        {isPremium && (
                          <span className="inline-flex px-2 py-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-medium mt-1">
                            PRO
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" />
                    </svg>
                    Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7-7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </Link>

                  {!isPremium && (
                    <Link
                      href="/premium"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      Upgrade to Premium
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full px-4 py-3 text-red-600 hover:text-red-700 font-medium rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </>
              ) : (
                // User is not logged in - show login/signup buttons
                <>
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
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
