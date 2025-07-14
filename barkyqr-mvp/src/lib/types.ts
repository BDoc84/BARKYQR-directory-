export interface BusinessListing {
  id: string;
  name: string;
  location: string;
  description: string;
  website?: string;
  instagram?: string;
  photos: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedAt?: string;
}

export interface WeeklyEvent {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD format
  time?: string;
  description: string;
  image?: string;
  isActive: boolean;
}

export interface AdminSession {
  isAuthenticated: boolean;
  loginTime?: string;
}