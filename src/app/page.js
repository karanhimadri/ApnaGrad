"use client";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import NoteCard from "@/components/NoteCard";

export default function Home() {
  const features = [
    {
      icon: "📚",
      title: "Comprehensive Notes",
      desc: "Access curated notes from top students and professors across all subjects and semesters."
    },
    {
      icon: "🎯", 
      title: "Previous Year Questions",
      desc: "Practice with organized previous year questions to ace your exams with confidence."
    },
    {
      icon: "🏆",
      title: "Digital Certificates", 
      desc: "Generate professional certificates for MAR points, participation, and achievements."
    },
    {
      icon: "⚡",
      title: "Smart Search",
      desc: "Find exactly what you need with our intelligent search across all study materials."
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      desc: "Study anywhere, anytime with our responsive design optimized for all devices."
    },
    {
      icon: "🔄",
      title: "Regular Updates",
      desc: "Get the latest syllabus updates and fresh content uploaded by the community."
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="text-center space-y-8 sm:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              <span className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-white text-blue-800 rounded-full text-sm font-semibold shadow-sm border border-blue-100">
                🎓 Trusted by 10,000+ Students Worldwide
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Study Smarter,<br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Not Harder
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                Access comprehensive study materials, previous year questions, and tools designed 
                to help you excel in your academic journey. Join thousands of successful students.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <SearchBar onSearch={(q) => console.log("home search:", q)} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <Link href="/notes" className="w-full sm:w-auto btn-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all">
                <span className="flex items-center justify-center gap-2">
                  Explore Notes
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link href="/pyqs" className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm hover:shadow-lg">
                <span className="flex items-center justify-center gap-2">
                  Browse PYQs
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
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

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and resources designed to accelerate your learning and academic success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
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
