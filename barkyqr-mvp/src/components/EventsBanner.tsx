import Image from 'next/image';
import { WeeklyEvent } from '@/lib/types';

interface EventsBannerProps {
  events: WeeklyEvent[];
}

export default function EventsBanner({ events }: EventsBannerProps) {
  if (events.length === 0) return null;

  return (
    <div className="bg-bark-blue-50 border-t border-b border-bark-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🐕 What's On This Week
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg p-6 shadow-sm border">
              {event.image && (
                <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {event.name}
              </h3>
              
              <div className="flex items-center text-bark-blue-600 mb-2">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">
                  {new Date(event.date).toLocaleDateString('en-CA', { 
                    weekday: 'long',
                    month: 'short', 
                    day: 'numeric' 
                  })}
                  {event.time && ` at ${event.time}`}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm">
                {event.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* TODO: Connect to Google Calendar or Notion DB */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            💡 Future: Connect to Google Calendar or Notion for dynamic events
          </p>
        </div>
      </div>
    </div>
  );
}