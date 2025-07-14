import { GetStaticProps, GetStaticPaths } from 'next';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getApprovedListings, getListingById } from '@/lib/data';
import { BusinessListing } from '@/lib/types';

interface ListingPageProps {
  listing: BusinessListing | null;
}

export default function ListingPage({ listing }: ListingPageProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (!listing) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Business Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            This business listing could not be found or is no longer available.
          </p>
          <Link
            href="/listings"
            className="bg-bark-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-bark-blue-700 transition-colors"
          >
            Browse All Businesses
          </Link>
        </div>
      </Layout>
    );
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === listing.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? listing.photos.length - 1 : prev - 1
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/listings"
            className="inline-flex items-center text-bark-blue-600 hover:text-bark-blue-700 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Listings
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Photo Gallery */}
          {listing.photos.length > 0 && (
            <div className="relative h-96">
              <Image
                src={listing.photos[currentPhotoIndex]}
                alt={`${listing.name} - Photo ${currentPhotoIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              
              {/* Navigation Arrows */}
              {listing.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Photo Counter */}
              {listing.photos.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentPhotoIndex + 1} / {listing.photos.length}
                </div>
              )}
            </div>
          )}

          {/* Photo Thumbnails */}
          {listing.photos.length > 1 && (
            <div className="p-4 border-b">
              <div className="flex space-x-2 overflow-x-auto">
                {listing.photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${
                      index === currentPhotoIndex ? 'ring-2 ring-bark-blue-600' : ''
                    }`}
                  >
                    <Image
                      src={photo}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Business Info */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {listing.name}
            </h1>

            <div className="flex items-center text-gray-600 mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-lg">{listing.location}</span>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 text-lg leading-relaxed">
                {listing.description}
              </p>
            </div>

            {/* Contact Links */}
            {(listing.website || listing.instagram) && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact & Links
                </h3>
                <div className="flex flex-wrap gap-4">
                  {listing.website && (
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-bark-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-bark-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Visit Website
                    </a>
                  )}
                  {listing.instagram && (
                    <a
                      href={listing.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.004 5.367 18.635.001 12.017.001zm3.94 6.767c.112 0 .224.01.336.03.896.159 1.504.906 1.504 1.867v6.72c0 1.867-.608 2.717-1.504 2.878-.112.02-.224.03-.336.03h-7.88c-.112 0-.224-.01-.336-.03-.896-.161-1.504-.906-1.504-1.867v-6.72c0-1.867.608-2.717 1.504-2.878.112-.02.224-.03.336-.03h7.88z"/>
                        <path d="M12.017 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.4a2.9 2.9 0 110-5.8 2.9 2.9 0 010 5.8z"/>
                        <circle cx="16.717" cy="7.283" r="1.2"/>
                      </svg>
                      Follow on Instagram
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submission Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Listed on {new Date(listing.submittedAt).toLocaleDateString('en-CA', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const listings = getApprovedListings();
  const paths = listings.map((listing) => ({
    params: { id: listing.id },
  }));

  return {
    paths,
    fallback: 'blocking', // Enable ISR for new listings
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  
  if (!id) {
    return {
      notFound: true,
    };
  }

  const listing = getListingById(id);

  if (!listing || listing.status !== 'approved') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      listing,
    },
    revalidate: 300, // Revalidate every 5 minutes
  };
};