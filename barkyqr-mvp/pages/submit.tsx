import { useState } from 'react';
import Layout from '@/components/Layout';

export default function Submit() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    website: '',
    instagram: '',
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file types and count
    const validFiles = files.filter(file => {
      const isValidType = file.type === 'image/jpeg' || file.type === 'image/png';
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setError('Some files were rejected. Only JPG/PNG files under 5MB are allowed.');
      setTimeout(() => setError(''), 5000);
    }

    setPhotos(prev => {
      const combined = [...prev, ...validFiles];
      return combined.slice(0, 5); // Max 5 photos
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('location', formData.location);
      submitData.append('description', formData.description);
      submitData.append('website', formData.website);
      submitData.append('instagram', formData.instagram);

      photos.forEach(photo => {
        submitData.append('photos', photo);
      });

      const response = await fetch('/api/submit', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(result.error || 'Failed to submit business');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-green-900 mb-4">
              Submitted! Awaiting Approval
            </h1>
            <p className="text-green-800 mb-6">
              Thanks for submitting your business to BarkYQR! We'll review it and get it live soon.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', location: '', description: '', website: '', instagram: '' });
                setPhotos([]);
              }}
              className="bg-bark-blue-600 text-white px-6 py-2 rounded-lg hover:bg-bark-blue-700 transition-colors"
            >
              Submit Another Business
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Submit Your Dog Business
          </h1>
          <p className="text-lg text-gray-600">
            Add your business to Regina's premier dog directory
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Business Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bark-blue-500 focus:border-transparent"
              placeholder="e.g., Happy Tails Dog Grooming"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bark-blue-500 focus:border-transparent"
              placeholder="e.g., 123 Main St, Regina, SK"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bark-blue-500 focus:border-transparent"
              placeholder="Tell us about your business and what makes it special for dogs..."
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bark-blue-500 focus:border-transparent"
              placeholder="https://yourwebsite.com"
            />
          </div>

          {/* Instagram */}
          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
              Instagram
            </label>
            <input
              type="url"
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bark-blue-500 focus:border-transparent"
              placeholder="https://instagram.com/yourhandle"
            />
          </div>

          {/* Photos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos (up to 5, JPG/PNG only)
            </label>
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png"
              onChange={handlePhotoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bark-blue-500 focus:border-transparent"
            />
            
            {/* Photo Preview */}
            {photos.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-bark-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-bark-blue-700 focus:ring-2 focus:ring-bark-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Submitting...' : 'Submit Business'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By submitting, you agree that your business information will be publicly displayed 
            on BarkYQR once approved.
          </p>
        </div>
      </div>
    </Layout>
  );
}