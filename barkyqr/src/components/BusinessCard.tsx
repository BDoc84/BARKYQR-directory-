import { Business } from '@/types';
import { MapPin, Phone, Globe, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface BusinessCardProps {
  business: Business;
  showCategory?: boolean;
}

export default function BusinessCard({ business, showCategory = true }: BusinessCardProps) {
  const hasImage = business.images && business.images.length > 0;
  const imageUrl = hasImage ? business.images[0] : '/placeholder-business.svg';

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={business.name}
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {business.is_featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        {showCategory && business.category && (
          <div className="mb-2">
            <Link 
              href={`/category/${business.category.slug}`}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {business.category.name}
            </Link>
          </div>
        )}

        {/* Business Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {business.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {business.description}
        </p>

        {/* Address */}
        <div className="flex items-start text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-1">{business.address}</span>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm">
          {business.phone && (
            <a 
              href={`tel:${business.phone}`}
              className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Phone className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Call</span>
              <span className="sm:hidden">{business.phone}</span>
            </a>
          )}
          
          {business.website && (
            <a 
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Globe className="h-4 w-4 mr-1" />
              <span>Website</span>
            </a>
          )}
        </div>

        {/* Features */}
        {business.features && Object.values(business.features).some(Boolean) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {business.features.dog_friendly_seating && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full border border-green-200">
                Dog-friendly seating
              </span>
            )}
            {business.features.outdoor_space && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                Outdoor space
              </span>
            )}
            {business.features.parking_available && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded-full border border-gray-200">
                Parking
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}