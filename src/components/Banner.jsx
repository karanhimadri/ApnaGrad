import Link from "next/link";
import { useState, useRef } from "react";

export default function Banner({ 
  title, 
  cards = [], 
  bgColor = "bg-white",
  className = ""
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <section className={`py-12 ${bgColor} border-t border-b border-gray-200 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-gray-600">
              Quick access to what's trending and popular right now
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full border transition-all duration-200 ${
                canScrollLeft 
                  ? 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50' 
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`p-2 rounded-full border transition-all duration-200 ${
                canScrollRight 
                  ? 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50' 
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            onScroll={checkScrollButtons}
            className="flex gap-6 overflow-x-hidden scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cards.map((card, index) => (
              <BannerCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BannerCard({ 
  title, 
  subject, 
  href, 
  icon = "📚", 
  isNew = false,
  color = "from-blue-500 to-blue-600"
}) {
  return (
    <Link 
      href={href} 
      className="group flex-shrink-0 w-80 bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 relative"
    >
      {/* New Badge */}
      {isNew && (
        <div className="absolute -top-3 -right-3 bg-green-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full border-2 border-white shadow-sm">
          New
        </div>
      )}

      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${color} text-white text-2xl mb-4 shadow-md`}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      
      {subject && (
        <p className="text-gray-600 mb-4 line-clamp-2">{subject}</p>
      )}

      {/* Footer */}
      <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
        Visit Now
        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </Link>
  );
}