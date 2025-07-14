'use client';

import { useState, useEffect } from 'react';
import { Check, AlertCircle, Building, Phone, Globe, MapPin } from 'lucide-react';
import { Category, BusinessSubmission } from '@/types';

export default function SubmitBusinessPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<BusinessSubmission>({
    name: '',
    category_id: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    social_links: {
      facebook: '',
      instagram: '',
      twitter: ''
    },
    features: {
      dog_friendly_seating: false,
      open_to_events: false,
      outdoor_space: false,
      parking_available: false
    },
    submitted_by_owner: true,
    submitted_by_name: '',
    submitted_by_email: ''
  });

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name.startsWith('features.')) {
        const featureName = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          features: {
            ...prev.features,
            [featureName]: checkbox.checked
          }
        }));
      } else if (name === 'submitted_by_owner') {
        setFormData(prev => ({
          ...prev,
          submitted_by_owner: checkbox.checked
        }));
      }
    } else if (name.startsWith('social_links.')) {
      const socialPlatform = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        social_links: {
          ...prev.social_links,
          [socialPlatform]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/businesses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to submit business');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Thanks for your submission!
            </h1>
            <p className="text-gray-600 mb-6">
              Your business has been submitted for review. We'll review it within 1-2 business days 
              and it will appear on BarkYQR once approved.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              We may contact you if we need any additional information.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  category_id: '',
                  description: '',
                  address: '',
                  phone: '',
                  email: '',
                  website: '',
                  social_links: { facebook: '', instagram: '', twitter: '' },
                  features: {
                    dog_friendly_seating: false,
                    open_to_events: false,
                    outdoor_space: false,
                    parking_available: false
                  },
                  submitted_by_owner: true,
                  submitted_by_name: '',
                  submitted_by_email: ''
                });
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Another Business
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Submit Your Business
          </h1>
          <p className="text-lg text-gray-600">
            Help grow Regina's dog community by adding your business to our directory
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Tell us about your business and what makes it special for dog owners..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Full address in Regina, SK"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Social Media (Optional)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="url"
                    name="social_links.facebook"
                    value={formData.social_links?.facebook || ''}
                    onChange={handleInputChange}
                    placeholder="https://facebook.com/..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    name="social_links.instagram"
                    value={formData.social_links?.instagram || ''}
                    onChange={handleInputChange}
                    placeholder="https://instagram.com/..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    name="social_links.twitter"
                    value={formData.social_links?.twitter || ''}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Business Features
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="features.dog_friendly_seating"
                    checked={formData.features?.dog_friendly_seating || false}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Dog-friendly seating area</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="features.outdoor_space"
                    checked={formData.features?.outdoor_space || false}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Outdoor space available</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="features.parking_available"
                    checked={formData.features?.parking_available || false}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Parking available</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="features.open_to_events"
                    checked={formData.features?.open_to_events || false}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Open to hosting dog events</span>
                </label>
              </div>
            </div>

            {/* Ownership */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Submission Details
              </h3>

              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="submitted_by_owner"
                    checked={formData.submitted_by_owner}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I am the owner or authorized representative of this business
                  </span>
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="submitted_by_name"
                      value={formData.submitted_by_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="submitted_by_email"
                      value={formData.submitted_by_email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Submitting...' : 'Submit Business'}
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• We'll review your submission within 1-2 business days</li>
            <li>• You'll receive an email confirmation once your business is approved</li>
            <li>• Your business will appear in search results and category pages</li>
            <li>• This service is completely free for Regina businesses</li>
          </ul>
        </div>
      </div>
    </div>
  );
}