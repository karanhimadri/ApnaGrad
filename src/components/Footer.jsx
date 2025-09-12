import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-white">NoteNest</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Empowering students with comprehensive study materials, previous year questions, 
              and certificates to excel in their academic journey.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/notes" className="hover:text-blue-400 transition-colors">Browse Notes</Link></li>
              <li><Link href="/pyqs" className="hover:text-blue-400 transition-colors">PYQs</Link></li>
              <li><Link href="/certificate" className="hover:text-blue-400 transition-colors">Certificates</Link></li>
              <li><Link href="/premium" className="hover:text-blue-400 transition-colors">Premium Plans</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-400">© {currentYear} NoteNest. All rights reserved.</p>
          <p className="text-gray-400 mt-2 sm:mt-0">Made for students • MAKAUT & beyond</p>
        </div>
      </div>
    </footer>
  );
}
