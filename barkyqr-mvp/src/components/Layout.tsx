import Link from 'next/link';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold">
                <span className="text-bark-black">Bark</span>
                <span className="text-bark-blue-600">YQR</span>
              </div>
              <span className="ml-2 text-sm text-gray-500 hidden sm:inline">
                Regina's Dog Directory
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-bark-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/listings" 
                className="text-gray-700 hover:text-bark-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Browse
              </Link>
              <Link 
                href="/submit" 
                className="bg-bark-blue-600 text-white hover:bg-bark-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Submit Business
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-bark-blue-600 p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 border-t">
                <Link 
                  href="/" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-bark-blue-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/listings" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-bark-blue-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse
                </Link>
                <Link 
                  href="/submit" 
                  className="block px-3 py-2 text-base font-medium bg-bark-blue-600 text-white hover:bg-bark-blue-700 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Submit Business
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-xl font-bold mb-2">
              <span className="text-bark-black">Bark</span>
              <span className="text-bark-blue-600">YQR</span>
            </div>
            <p className="text-gray-600 text-sm">
              Regina's community-built dog directory
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Built with ❤️ for Regina dog owners
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}