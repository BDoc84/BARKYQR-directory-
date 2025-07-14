import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventsBanner from '@/components/EventsBanner';
import BusinessCard from '@/components/BusinessCard';
import { getApprovedListings, getActiveEvents } from '@/lib/data';
import { BusinessListing, WeeklyEvent } from '@/lib/types';

interface HomeProps {
  featuredListings: BusinessListing[];
  events: WeeklyEvent[];
}

export default function Home({ featuredListings, events }: HomeProps) {
  return (
    <Layout>
      {/* Events Banner */}
      <EventsBanner events={events} />

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Regina's Dog Business
              <span className="block text-bark-blue-600">Directory</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover dog-friendly businesses in Regina, SK. From groomers to daycares, 
              trainers to dog parks - find everything your furry friend needs!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/listings"
                className="bg-bark-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-bark-blue-700 transition-colors"
              >
                Browse Businesses
              </Link>
              <Link
                href="/submit"
                className="border-2 border-bark-blue-600 text-bark-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-bark-blue-50 transition-colors"
              >
                Add Your Business
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Listings */}
      {featuredListings.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Businesses
              </h2>
              <p className="text-lg text-gray-600">
                Check out some of Regina's top dog-friendly businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredListings.slice(0, 6).map((listing) => (
                <BusinessCard key={listing.id} listing={listing} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/listings"
                className="inline-flex items-center text-bark-blue-600 hover:text-bark-blue-700 font-semibold"
              >
                View All Businesses
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Community Section */}
      <div className="bg-bark-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Built by Regina Dog Owners, for Regina Dog Owners
          </h2>
          <p className="text-xl mb-8 opacity-90">
            BarkYQR is a community-driven directory. Help us grow by adding your 
            favorite dog businesses and services to help fellow pet parents in Regina!
          </p>
          <Link
            href="/submit"
            className="bg-white text-bark-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Submit Your Business
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const featuredListings = getApprovedListings();
    const events = getActiveEvents();

    return {
      props: {
        featuredListings,
        events,
      },
      revalidate: 300, // Revalidate every 5 minutes
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        featuredListings: [],
        events: [],
      },
    };
  }
};
