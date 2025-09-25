"use client";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import NoteCard from "@/components/NoteCard";
import Banner from "@/components/Banner";
import { useEffect, useState } from "react";
import authService from "@/lib/auth";
import { sem7BannerCards, placementBannerCards } from "@/assets/asset";

export default function Home() {
  const [showBanner, setShowBanner] = useState(true);

  const quickAccess = [
    {
      title: "B.Tech Notes",
      description: "Semester-wise notes for all branches",
      icon: "📖",
      link: "/btech",
      color: "from-blue-500 to-blue-600",
      popular: true
    },
    {
      title: "Previous Year Questions",
      description: "Year-wise PYQ collections",
      icon: "📝",
      link: "/btech/cse/3/pyqs",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Free Certificates",
      description: "Generate professional certificates",
      icon: "🏆",
      link: "/free-certificates",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Placement Preparation",
      description: "Coding & aptitude practice",
      icon: "�",
      link: "/placement",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "GATE Preparation",
      description: "Subject-wise GATE content",
      icon: "🎯",
      link: "/gate",
      color: "from-red-500 to-red-600"
    },
    {
      title: "Premium Access",
      description: "Unlock exclusive content",
      icon: "⭐",
      link: "/premium",
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  const featured = [
    { title: "Discrete Mathematics", subject: "Computer Science • Sem 3", href: "/notes/sem-3/dm", difficulty: "Intermediate" },
    { title: "Digital Signal Processing", subject: "Electronics • Sem 6", href: "/notes/sem-6/dsp", difficulty: "Advanced" },
    { title: "Operating Systems", subject: "Computer Science • Sem 4", href: "/notes/sem-4/os", difficulty: "Intermediate" },
    { title: "Circuit Analysis", subject: "Electrical • Sem 2", href: "/notes/sem-2/circuits", difficulty: "Beginner" },
    { title: "Data Structures", subject: "Computer Science • Sem 3", href: "/notes/sem-3/dsa", difficulty: "Intermediate" },
    { title: "Control Systems", subject: "Electronics • Sem 5", href: "/notes/sem-5/control", difficulty: "Advanced" }
  ];

  const stats = [
    { number: "10,000+", label: "Students" },
    { number: "500+", label: "Study Materials" },
    { number: "50+", label: "Subjects Covered" },
    { number: "95%", label: "Success Rate" }
  ];

  useEffect(() => {
    async function profile() {
      const res = await authService.getUserProfile("68c48dd3003a20a65b08");
      console.log(res)
    }
    profile();
  }, [])

  return (
    <div className="min-h-screen">
      {/* Announcement Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <p className="text-sm font-medium">Coming Soon: AI Study Planner & Advanced Analytics!</p>
                    <p className="text-xs opacity-90">Get personalized study schedules and track your progress</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden pb-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="text-center space-y-8 sm:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              <span className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-white text-blue-800 rounded-full text-sm font-semibold shadow-sm border border-blue-100">
                🎓 Trusted by 10,000+ Students Nationwide
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                ApnaGrad<br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Apna Success
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                Your ultimate destination for engineering notes, PYQs, certificates, and placement preparation.
                Join thousands of successful graduates who achieved their dreams with ApnaGrad.
              </p>
            </div>

            <div className="max-w-2xl mx-auto relative z-10" id="search">
              <SearchBar onSearch={(q) => console.log("home search:", q)} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <Link href="/btech" className="w-full sm:w-auto btn-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all">
                <span className="flex items-center justify-center gap-2">
                  Explore Notes
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link href="/btech/cse/3/pyqs" className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm hover:shadow-lg">
                <span className="flex items-center justify-center gap-2">
                  Practice PYQs
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-white relative z-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Quick Access to Everything
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jump directly to what you need. No more searching around - your academic success is just one click away.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickAccess.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-transparent"
              >
                {item.popular && (
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} text-white text-2xl mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                  Access Now
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7th Semester Banner */}
      <Banner
        title="🎓 For 7th Sem - Here are notes for these subjects"
        cards={sem7BannerCards}
        bgColor="bg-white"
      />

      {/* Placement Preparation Banner */}
      <Banner
        title="🚀 Placement Preparation - Start your journey here"
        cards={placementBannerCards}
        bgColor="bg-white"
      />

      {/* Promotional Banners */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🚀</span>
                <span className="bg-white bg-opacity-20 text-amber-300 px-3 py-1 rounded-full text-sm font-semibold">
                  New Launch
                </span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Premium Membership Now Available!
              </h3>
              <p className="text-xl text-blue-100 mb-6">
                Get unlimited access to exclusive content, advanced analytics, and priority support.
              </p>
              <Link
                href="/premium"
                className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Upgrade to Premium
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <div className="text-white">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🎯</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Free
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Generate Professional Certificates
              </h3>
              <p className="text-lg text-blue-100 mb-6">
                Create certificates for MAR points, participation, and achievements instantly.
              </p>
              <Link
                href="/free-certificates"
                className="inline-flex items-center border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get Free Certificate
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Notes Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Study Materials</h2>
              <p className="text-xl text-gray-600">Hand-picked resources from our top contributors</p>
            </div>
            <Link href="/notes" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((note, index) => (
              <NoteCard key={index} {...note} />
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Our Students
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real students who achieved their academic goals with ApnaGrad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Rahul Singh</h4>
                  <p className="text-sm text-gray-600">CSE, Final Year</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;ApnaGrad&rsquo;s PYQ collection helped me improve my semester grades from 7.2 to 8.9 CGPA. The organized content made exam preparation so much easier!&rdquo;
              </p>
              <div className="flex text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Priya Sharma</h4>
                  <p className="text-sm text-gray-600">ECE, 3rd Year</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;Got placed in TCS through their placement preparation materials. The coding questions and mock interviews were exactly what I needed!&rdquo;
              </p>
              <div className="flex text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Amit Kumar</h4>
                  <p className="text-sm text-gray-600">Mechanical, 2nd Year</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;The certificate generator helped me get 20 MAR points for extracurricular activities. Simple, fast, and professional quality!&rdquo;
              </p>
              <div className="flex text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/testimonials"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
            >
              Read More Success Stories
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Studies?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have improved their grades using our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all shadow-lg">
              Get Started Free
            </Link>
            <Link href="/premium" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all">
              View Premium Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
