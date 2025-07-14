import fs from 'fs';
import path from 'path';
import { BusinessListing, WeeklyEvent } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const LISTINGS_FILE = path.join(DATA_DIR, 'listings.json');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');

// Initialize data directory and files
function initializeData() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  if (!fs.existsSync(LISTINGS_FILE)) {
    fs.writeFileSync(LISTINGS_FILE, JSON.stringify([]), 'utf8');
  }
  
  if (!fs.existsSync(EVENTS_FILE)) {
    // Initialize with some sample events
    const sampleEvents: WeeklyEvent[] = [
      {
        id: '1',
        name: 'Regina Dog Park Meetup',
        date: '2024-01-20',
        time: '10:00 AM',
        description: 'Weekly meetup at Kinsmen Dog Park for socialization',
        isActive: true
      },
      {
        id: '2',
        name: 'Puppy Training Class',
        date: '2024-01-22',
        time: '6:00 PM',
        description: 'Basic training for puppies 6 months and under',
        isActive: true
      },
      {
        id: '3',
        name: 'Dog-Friendly Market',
        date: '2024-01-25',
        time: '9:00 AM',
        description: 'Bring your pup to the Regina Farmers Market',
        isActive: true
      }
    ];
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(sampleEvents, null, 2), 'utf8');
  }
}

// Business Listings Functions
export function getAllListings(): BusinessListing[] {
  initializeData();
  try {
    const data = fs.readFileSync(LISTINGS_FILE, 'utf8');
    return JSON.parse(data) || [];
  } catch (error) {
    console.error('Error reading listings:', error);
    return [];
  }
}

export function getApprovedListings(): BusinessListing[] {
  return getAllListings().filter(listing => listing.status === 'approved');
}

export function getPendingListings(): BusinessListing[] {
  return getAllListings().filter(listing => listing.status === 'pending');
}

export function addListing(listing: Omit<BusinessListing, 'id' | 'submittedAt'>): BusinessListing {
  initializeData();
  const listings = getAllListings();
  
  const newListing: BusinessListing = {
    ...listing,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: 'pending'
  };
  
  listings.push(newListing);
  fs.writeFileSync(LISTINGS_FILE, JSON.stringify(listings, null, 2), 'utf8');
  
  return newListing;
}

export function updateListingStatus(id: string, status: 'approved' | 'rejected'): boolean {
  initializeData();
  const listings = getAllListings();
  const listingIndex = listings.findIndex(l => l.id === id);
  
  if (listingIndex === -1) return false;
  
  listings[listingIndex].status = status;
  if (status === 'approved') {
    listings[listingIndex].approvedAt = new Date().toISOString();
  }
  
  fs.writeFileSync(LISTINGS_FILE, JSON.stringify(listings, null, 2), 'utf8');
  return true;
}

export function deleteListing(id: string): boolean {
  initializeData();
  const listings = getAllListings();
  const filteredListings = listings.filter(l => l.id !== id);
  
  if (filteredListings.length === listings.length) return false;
  
  fs.writeFileSync(LISTINGS_FILE, JSON.stringify(filteredListings, null, 2), 'utf8');
  return true;
}

export function deleteListingPhoto(listingId: string, photoPath: string): boolean {
  initializeData();
  const listings = getAllListings();
  const listingIndex = listings.findIndex(l => l.id === listingId);
  
  if (listingIndex === -1) return false;
  
  listings[listingIndex].photos = listings[listingIndex].photos.filter(p => p !== photoPath);
  fs.writeFileSync(LISTINGS_FILE, JSON.stringify(listings, null, 2), 'utf8');
  
  // Also delete the actual file
  try {
    const fullPath = path.join(process.cwd(), 'public', photoPath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.error('Error deleting photo file:', error);
  }
  
  return true;
}

// Events Functions
export function getAllEvents(): WeeklyEvent[] {
  initializeData();
  try {
    const data = fs.readFileSync(EVENTS_FILE, 'utf8');
    return JSON.parse(data) || [];
  } catch (error) {
    console.error('Error reading events:', error);
    return [];
  }
}

export function getActiveEvents(): WeeklyEvent[] {
  const events = getAllEvents();
  const today = new Date().toISOString().split('T')[0];
  
  return events.filter(event => {
    return event.isActive && event.date >= today;
  });
}

// Utility function to get listing by ID
export function getListingById(id: string): BusinessListing | null {
  const listings = getAllListings();
  return listings.find(l => l.id === id) || null;
}