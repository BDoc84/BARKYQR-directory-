export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Business {
  id: string;
  name: string;
  category_id: string;
  category?: Category;
  description: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  social_links?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  images: string[];
  features?: {
    dog_friendly_seating?: boolean;
    open_to_events?: boolean;
    outdoor_space?: boolean;
    parking_available?: boolean;
  };
  is_featured: boolean;
  is_approved: boolean;
  status: 'pending' | 'approved' | 'rejected';
  submitted_by_owner: boolean;
  submitted_by_name?: string;
  submitted_by_email?: string;
  submitted_by_comment?: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  end_date?: string;
  location: string;
  contact_info?: string;
  website?: string;
  images: string[];
  is_featured: boolean;
  is_approved: boolean;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface BusinessSubmission {
  name: string;
  category_id: string;
  description: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  social_links?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  features?: {
    dog_friendly_seating?: boolean;
    open_to_events?: boolean;
    outdoor_space?: boolean;
    parking_available?: boolean;
  };
  submitted_by_owner: boolean;
  submitted_by_name?: string;
  submitted_by_email?: string;
}

export interface BusinessSuggestion {
  name: string;
  category_id: string;
  comment?: string;
  suggested_by_name?: string;
  suggested_by_email?: string;
}

export interface EventSubmission {
  name: string;
  description: string;
  date: string;
  time: string;
  end_date?: string;
  location: string;
  contact_info?: string;
  website?: string;
}

export interface SearchFilters {
  category?: string;
  search?: string;
  featured?: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: 'admin' | 'moderator';
  created_at: string;
  updated_at: string;
}

export interface SiteStats {
  total_businesses: number;
  total_events: number;
  pending_businesses: number;
  pending_events: number;
  submissions_this_week: number;
  events_this_week: number;
  featured_businesses: number;
}