import Link from 'next/link';
import { ArrowRight, MapPin, Users, Heart, Search, Plus, MessageSquare } from 'lucide-react';
import BusinessCard from '@/components/BusinessCard';
import { getBusinesses, getCategories } from '@/lib/database';

export default async function HomePage() {
  // Get featured businesses and categories
  const featuredBusinesses = getBusinesses({ featured: true }).slice(0, 3);
  const categories = getCategories().slice(0, 6); // Show first 6 categories

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Regina's Dog
              <span className="block text-blue-600">Community Hub</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Find the best dog-friendly spots, services, and events in Regina. 
              Built by locals, for locals—completely free to use!
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/browse"
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Find a Spot
              </Link>
              <Link
                href="/submit"
                className="w-full sm:w-auto bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your Business
              </Link>
              <Link
                href="/suggest"
                className="w-full sm:w-auto bg-gray-100 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Suggest a Spot
              </Link>
            </div>

            {/* Community Stats */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                <span>Regina, Saskatchewan</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                <span>Community Built</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                <span>100% Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-lg text-gray-600">
              Explore what Regina has to offer for you and your dog
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group p-6 text-center bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-all duration-200"
              >
                <div className="text-2xl mb-2">🐕</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 text-sm">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/browse"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Categories
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      {featuredBusinesses.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Spots
              </h2>
              <p className="text-lg text-gray-600">
                Check out these highlighted businesses in our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/browse"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
              >
                Browse All Businesses
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Community Message */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Built by Regina Dog Owners, for Regina Dog Owners
          </h2>
          <p className="text-xl mb-8 opacity-90">
            This isn't a corporate directory—it's a grassroots community project. 
            Help us make it better by submitting your favorite spots or suggesting 
            places we should add.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Submit Your Business
            </Link>
            <Link
              href="/suggest"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Suggest a Business
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
