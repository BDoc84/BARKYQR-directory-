import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Mission */}
          <div className="space-y-4">
            <div className="text-xl font-bold">
              <span className="text-black">Bark</span>
              <span className="text-blue-600">YQR</span>
            </div>
            <p className="text-gray-600 text-sm">
              A community-built directory to help dog owners in Regina find the best spots, services, and events for their furry friends.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/browse" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Browse Businesses
              </Link>
              <Link href="/events" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Upcoming Events
              </Link>
              <Link href="/submit" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Submit Your Business
              </Link>
              <Link href="/suggest" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Suggest a Business
              </Link>
            </div>
          </div>

          {/* Community Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Community</h3>
            <p className="text-sm text-gray-600">
              Free for everyone, built by locals, for locals. Help us grow Regina's dog community!
            </p>
            <div className="text-sm text-gray-600">
              <span>Made with </span>
              <Heart className="h-4 w-4 inline text-red-500" />
              <span> in Regina, SK</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} BarkYQR. A community project for Regina dog owners.
          </p>
        </div>
      </div>
    </footer>
  );
}