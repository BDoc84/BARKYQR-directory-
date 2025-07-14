import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import BusinessCard from '@/components/BusinessCard';
import { getApprovedListings } from '@/lib/data';
import { BusinessListing } from '@/lib/types';

interface ListingsProps {
  listings: BusinessListing[];
}

export default function Listings({ listings }: ListingsProps) {
  return (
    <Layout>
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Dog Businesses in Regina
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing dog-friendly businesses throughout Regina, Saskatchewan. 
              From grooming to training, find everything your furry friend needs!
            </p>
          </div>

          {listings.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{listings.length}</span> approved businesses
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {listings.map((listing) => (
                  <BusinessCard key={listing.id} listing={listing} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🐕</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No businesses listed yet
              </h3>
              <p className="text-gray-600 mb-8">
                Be the first to add your dog business to BarkYQR!
              </p>
              <a
                href="/submit"
                className="bg-bark-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-bark-blue-700 transition-colors"
              >
                Submit Your Business
              </a>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const listings = getApprovedListings();

    return {
      props: {
        listings,
      },
      revalidate: 60, // Revalidate every minute for quicker updates
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        listings: [],
      },
    };
  }
};