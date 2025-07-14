import { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { BusinessListing } from '@/lib/types';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [listings, setListings] = useState<BusinessListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if already authenticated
    const savedToken = localStorage.getItem('admin-token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchListings(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (response.ok) {
        setToken(result.token);
        localStorage.setItem('admin-token', result.token);
        setIsAuthenticated(true);
        fetchListings(result.token);
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchListings = async (authToken: string) => {
    try {
      const response = await fetch('/api/admin/listings', {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      if (response.ok) {
        const data = await response.json();
        setListings(data);
      }
    } catch (err) {
      console.error('Error fetching listings:', err);
    }
  };

  const handleListingAction = async (listingId: string, action: 'approved' | 'rejected' | 'delete') => {
    try {
      if (action === 'delete') {
        const response = await fetch('/api/admin/listings', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ id: listingId }),
        });

        if (response.ok) {
          setListings(prev => prev.filter(l => l.id !== listingId));
        }
      } else {
        const response = await fetch('/api/admin/listings', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ id: listingId, status: action }),
        });

        if (response.ok) {
          setListings(prev => prev.map(l => 
            l.id === listingId ? { ...l, status: action } : l
          ));
        }
      }
    } catch (err) {
      console.error('Error updating listing:', err);
    }
  };

  const handlePhotoDelete = async (listingId: string, photoPath: string) => {
    try {
      const response = await fetch('/api/admin/listings', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: listingId, photoPath }),
      });

      if (response.ok) {
        setListings(prev => prev.map(l => 
          l.id === listingId 
            ? { ...l, photos: l.photos.filter(p => p !== photoPath) }
            : l
        ));
      }
    } catch (err) {
      console.error('Error deleting photo:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    setIsAuthenticated(false);
    setToken('');
    setListings([]);
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Admin Login
            </h1>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bark-blue-500 focus:border-transparent"
                  placeholder="Enter admin password"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-bark-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-bark-blue-700 focus:ring-2 focus:ring-bark-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Default password: barkyqr2024</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const pendingListings = listings.filter(l => l.status === 'pending');
  const approvedListings = listings.filter(l => l.status === 'approved');
  const rejectedListings = listings.filter(l => l.status === 'rejected');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">
              Pending Approval
            </h3>
            <p className="text-3xl font-bold text-yellow-600">
              {pendingListings.length}
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Approved
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {approvedListings.length}
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              Rejected
            </h3>
            <p className="text-3xl font-bold text-red-600">
              {rejectedListings.length}
            </p>
          </div>
        </div>

        {/* Pending Listings */}
        {pendingListings.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Pending Approval ({pendingListings.length})
            </h2>
            <div className="space-y-6">
              {pendingListings.map((listing) => (
                <ListingCard 
                  key={listing.id} 
                  listing={listing} 
                  onAction={handleListingAction}
                  onPhotoDelete={handlePhotoDelete}
                  isPending={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Listings */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All Listings ({listings.length})
          </h2>
          <div className="space-y-6">
            {listings.map((listing) => (
              <ListingCard 
                key={listing.id} 
                listing={listing} 
                onAction={handleListingAction}
                onPhotoDelete={handlePhotoDelete}
                isPending={false}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface ListingCardProps {
  listing: BusinessListing;
  onAction: (listingId: string, action: 'approved' | 'rejected' | 'delete') => void;
  onPhotoDelete: (listingId: string, photoPath: string) => void;
  isPending: boolean;
}

function ListingCard({ listing, onAction, onPhotoDelete, isPending }: ListingCardProps) {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {listing.name}
          </h3>
          <p className="text-gray-600 mb-1">{listing.location}</p>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              listing.status === 'approved' ? 'bg-green-100 text-green-800' :
              listing.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {listing.status}
            </span>
            <span className="text-sm text-gray-500">
              Submitted {new Date(listing.submittedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {isPending && (
            <>
              <button
                onClick={() => onAction(listing.id, 'approved')}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
              >
                ✅ Approve
              </button>
              <button
                onClick={() => onAction(listing.id, 'rejected')}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
              >
                ❌ Reject
              </button>
            </>
          )}
          <button
            onClick={() => onAction(listing.id, 'delete')}
            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{listing.description}</p>

      {/* Contact Info */}
      {(listing.website || listing.instagram) && (
        <div className="mb-4 text-sm">
          {listing.website && (
            <p className="text-bark-blue-600">
              Website: <a href={listing.website} target="_blank" rel="noopener noreferrer" className="underline">
                {listing.website}
              </a>
            </p>
          )}
          {listing.instagram && (
            <p className="text-pink-600">
              Instagram: <a href={listing.instagram} target="_blank" rel="noopener noreferrer" className="underline">
                {listing.instagram}
              </a>
            </p>
          )}
        </div>
      )}

      {/* Photos */}
      {listing.photos.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-2">
            Photos ({listing.photos.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {listing.photos.map((photo, index) => (
              <div key={index} className="relative group">
                <div className="relative h-24 rounded-lg overflow-hidden">
                  <Image
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </div>
                <button
                  onClick={() => onPhotoDelete(listing.id, photo)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}