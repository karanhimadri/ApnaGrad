"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContextProvider";
import authService from "@/lib/auth";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Home,
  Star,
  LogOut,
  Lock,
  CreditCard,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const {
    user,
    isAuthenticated,
    loading,
    clearUserData,
    getUserFullName,
    getUserInitials,
    isPremium,
  } = useUser();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  useEffect(() => {
    setOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileOpen && !event.target.closest(".profile-dropdown")) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      clearUserData();
      setProfileOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (path) => pathname === path || pathname.startsWith(`${path}/`);

  const navLinks = [
    { href: "/btech", label: "B. Tech" },
    { href: "/placement", label: "Placement" },
    { href: "/gate", label: "Gate" },
    { href: "/free-certificates", label: "Free Certificates" },
    { href: "/premium", label: "Premium" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${mounted && scrolled
        ? "bg-white backdrop-blur-md border-b border-gray-300 shadow-md"
        : "bg-white backdrop-blur-md border-b border-gray-200 shadow-sm"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">NoteNest</span>
              <span className="text-xs text-gray-500 -mt-1 hidden sm:block">
                Study Smarter
              </span>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${isActive(link.href)
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
                  }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
                )}
              </Link>
            ))}

            {/* User Section */}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
              {loading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : isAuthenticated ? (
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {getUserInitials()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {getUserFullName()}
                    </span>
                    {isPremium && (
                      <span className="px-2 py-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-medium">
                        PRO
                      </span>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

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
                          <User className="w-4 h-4 mr-3" /> Profile Settings
                        </Link>

                        <Link
                          href="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Home className="w-4 h-4 mr-3" /> Dashboard
                        </Link>

                        {!isPremium && (
                          <Link
                            href="/premium"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center px-4 py-2 text-sm font-medium text-amber-400 hover:bg-amber-50 overflow-hidden"
                          >
                            <Star className="w-4 h-4 mr-3" />
                            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-wave">
                              Upgrade to Premium
                            </span>

                            <style jsx>{`
                              @keyframes wave {
                                0% { background-position: -200% 0; }
                                100% { background-position: 200% 0; }
                              }
                              .animate-wave {
                                animation: wave 2s linear infinite;
                              }
                            `}</style>
                          </Link>
                        )}

                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <LogOut className="w-4 h-4 mr-3" /> Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
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
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-gray-200 bg-white backdrop-blur-md">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${isActive(link.href)
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
              {loading ? (
                <div className="flex items-center px-4 py-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mr-3"></div>
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : isAuthenticated ? (
                <>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg flex items-center space-x-3">
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

                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors duration-200"
                  >
                    <Home className="w-5 h-5 mr-2" /> Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors duration-200"
                  >
                    <User className="w-5 h-5 mr-2" /> Profile
                  </Link>

                  {!isPremium && (
                    <Link
                      href="/premium"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200"
                    >
                      <Star className="w-5 h-5 mr-2" /> Upgrade to Premium
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full px-4 py-3 text-red-600 hover:text-red-700 font-medium rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="w-5 h-5 mr-2" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center px-4 py-3 border-2 border-blue-200 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors duration-200"
                  >
                    <Lock className="w-5 h-5 mr-2" /> Login
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <CreditCard className="w-5 h-5 mr-2" /> Sign Up Free
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
