import Database from 'better-sqlite3';
import { join } from 'path';
import { 
  Category, 
  Business, 
  Event, 
  AdminUser, 
  BusinessSubmission,
  BusinessSuggestion,
  EventSubmission,
  SiteStats 
} from '@/types';
import bcrypt from 'bcryptjs';

const dbPath = join(process.cwd(), 'data', 'barkyqr.db');
let db: Database.Database;

// Initialize database
export function initDatabase() {
  // Create data directory if it doesn't exist
  const fs = require('fs');
  const dataDir = join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  
  // Create tables
  createTables();
  insertDefaultData();
  
  return db;
}

function createTables() {
  // Categories table
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      icon TEXT,
      \`order\` INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Businesses table
  db.exec(`
    CREATE TABLE IF NOT EXISTS businesses (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category_id TEXT NOT NULL,
      description TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      website TEXT,
      social_links TEXT, -- JSON
      images TEXT, -- JSON array
      features TEXT, -- JSON
      is_featured BOOLEAN DEFAULT FALSE,
      is_approved BOOLEAN DEFAULT FALSE,
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
      submitted_by_owner BOOLEAN DEFAULT TRUE,
      submitted_by_name TEXT,
      submitted_by_email TEXT,
      submitted_by_comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories (id)
    )
  `);

  // Events table
  db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      end_date TEXT,
      location TEXT NOT NULL,
      contact_info TEXT,
      website TEXT,
      images TEXT, -- JSON array
      is_featured BOOLEAN DEFAULT FALSE,
      is_approved BOOLEAN DEFAULT FALSE,
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Admin users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'moderator')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Business suggestions table (for non-owners)
  db.exec(`
    CREATE TABLE IF NOT EXISTS business_suggestions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category_id TEXT NOT NULL,
      comment TEXT,
      suggested_by_name TEXT,
      suggested_by_email TEXT,
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'rejected')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories (id)
    )
  `);

  // Create indexes
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category_id);
    CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status);
    CREATE INDEX IF NOT EXISTS idx_businesses_featured ON businesses(is_featured);
    CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
    CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
  `);
}

function insertDefaultData() {
  // Check if categories already exist
  const existingCategories = db.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number };
  
  if (existingCategories.count === 0) {
    // Insert default categories
    const categories = [
      { id: '1', name: 'Dog Daycares', slug: 'dog-daycares', description: 'Professional daycare services for your furry friends', order: 1 },
      { id: '2', name: 'Groomers', slug: 'groomers', description: 'Professional grooming services', order: 2 },
      { id: '3', name: 'Dog Trainers', slug: 'dog-trainers', description: 'Professional training services', order: 3 },
      { id: '4', name: 'Walkers', slug: 'walkers', description: 'Dog walking services', order: 4 },
      { id: '5', name: 'Dog-Friendly Patios', slug: 'dog-friendly-patios', description: 'Restaurants and cafes that welcome dogs', order: 5 },
      { id: '6', name: 'Veterinary Clinics', slug: 'veterinary-clinics', description: 'Veterinary care and medical services', order: 6 },
      { id: '7', name: 'Pet Stores', slug: 'pet-stores', description: 'Pet supplies and accessories', order: 7 },
      { id: '8', name: 'Rescues & Adoption', slug: 'rescues-adoption', description: 'Animal rescue organizations and adoption centers', order: 8 },
      { id: '9', name: 'Events', slug: 'events', description: 'Dog-related events and activities', order: 9 },
      { id: '10', name: 'Other', slug: 'other', description: 'Other dog-related services', order: 10 }
    ];

    const insertCategory = db.prepare(`
      INSERT INTO categories (id, name, slug, description, \`order\`)
      VALUES (?, ?, ?, ?, ?)
    `);

    for (const category of categories) {
      insertCategory.run(category.id, category.name, category.slug, category.description, category.order);
    }

    console.log('Default categories inserted');
  }

  // Check if admin user exists
  const existingAdmin = db.prepare('SELECT COUNT(*) as count FROM admin_users').get() as { count: number };
  
  if (existingAdmin.count === 0) {
    // Create default admin user (password: admin123)
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    const insertAdmin = db.prepare(`
      INSERT INTO admin_users (id, email, password_hash, name, role)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    insertAdmin.run(
      '1', 
      'admin@barkyqr.com', 
      hashedPassword, 
      'BarkYQR Admin', 
      'admin'
    );

    console.log('Default admin user created: admin@barkyqr.com / admin123');
  }
}

// Get database instance
export function getDatabase() {
  if (!db) {
    return initDatabase();
  }
  return db;
}

// Category functions
export function getCategories(): Category[] {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM categories ORDER BY `order` ASC');
  return stmt.all() as Category[];
}

export function getCategoryBySlug(slug: string): Category | null {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM categories WHERE slug = ?');
  return stmt.get(slug) as Category | null;
}

// Business functions
export function getBusinesses(filters: { category?: string; search?: string; featured?: boolean; approved?: boolean } = {}): Business[] {
  const db = getDatabase();
  let query = `
    SELECT b.*, c.name as category_name, c.slug as category_slug
    FROM businesses b
    LEFT JOIN categories c ON b.category_id = c.id
    WHERE 1=1
  `;
  const params: any[] = [];

  if (filters.approved !== false) {
    query += ' AND b.status = ?';
    params.push('approved');
  }

  if (filters.category) {
    query += ' AND c.slug = ?';
    params.push(filters.category);
  }

  if (filters.search) {
    query += ' AND (b.name LIKE ? OR b.description LIKE ? OR b.address LIKE ?)';
    const searchTerm = `%${filters.search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  if (filters.featured) {
    query += ' AND b.is_featured = ?';
    params.push(true);
  }

  query += ' ORDER BY b.is_featured DESC, b.name ASC';

  const stmt = db.prepare(query);
  const results = stmt.all(...params) as any[];

  return results.map(row => ({
    ...row,
    images: row.images ? JSON.parse(row.images) : [],
    social_links: row.social_links ? JSON.parse(row.social_links) : {},
    features: row.features ? JSON.parse(row.features) : {},
    category: row.category_name ? {
      id: row.category_id,
      name: row.category_name,
      slug: row.category_slug,
    } : undefined
  })) as Business[];
}

export function getBusinessById(id: string): Business | null {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT b.*, c.name as category_name, c.slug as category_slug
    FROM businesses b
    LEFT JOIN categories c ON b.category_id = c.id
    WHERE b.id = ?
  `);
  const result = stmt.get(id) as any;

  if (!result) return null;

  return {
    ...result,
    images: result.images ? JSON.parse(result.images) : [],
    social_links: result.social_links ? JSON.parse(result.social_links) : {},
    features: result.features ? JSON.parse(result.features) : {},
    category: result.category_name ? {
      id: result.category_id,
      name: result.category_name,
      slug: result.category_slug,
    } : undefined
  } as Business;
}

export function createBusiness(data: BusinessSubmission): string {
  const db = getDatabase();
  const id = Date.now().toString();
  
  const stmt = db.prepare(`
    INSERT INTO businesses (
      id, name, category_id, description, address, phone, email, website,
      social_links, images, features, submitted_by_owner, submitted_by_name, submitted_by_email
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    data.name,
    data.category_id,
    data.description,
    data.address,
    data.phone || null,
    data.email || null,
    data.website || null,
    JSON.stringify(data.social_links || {}),
    JSON.stringify([]), // images will be uploaded separately
    JSON.stringify(data.features || {}),
    data.submitted_by_owner,
    data.submitted_by_name || null,
    data.submitted_by_email || null
  );

  return id;
}

// Event functions
export function getEvents(filters: { upcoming?: boolean; approved?: boolean } = {}): Event[] {
  const db = getDatabase();
  let query = 'SELECT * FROM events WHERE 1=1';
  const params: any[] = [];

  if (filters.approved !== false) {
    query += ' AND status = ?';
    params.push('approved');
  }

  if (filters.upcoming) {
    query += ' AND date >= ?';
    params.push(new Date().toISOString().split('T')[0]);
  }

  query += ' ORDER BY date ASC, time ASC';

  const stmt = db.prepare(query);
  const results = stmt.all(...params) as any[];

  return results.map(row => ({
    ...row,
    images: row.images ? JSON.parse(row.images) : []
  })) as Event[];
}

export function createEvent(data: EventSubmission): string {
  const db = getDatabase();
  const id = Date.now().toString();
  
  const stmt = db.prepare(`
    INSERT INTO events (
      id, name, description, date, time, end_date, location, contact_info, website, images
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    data.name,
    data.description,
    data.date,
    data.time,
    data.end_date || null,
    data.location,
    data.contact_info || null,
    data.website || null,
    JSON.stringify([])
  );

  return id;
}

// Business suggestion functions
export function createBusinessSuggestion(data: BusinessSuggestion): string {
  const db = getDatabase();
  const id = Date.now().toString();
  
  const stmt = db.prepare(`
    INSERT INTO business_suggestions (
      id, name, category_id, comment, suggested_by_name, suggested_by_email
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    data.name,
    data.category_id,
    data.comment || null,
    data.suggested_by_name || null,
    data.suggested_by_email || null
  );

  return id;
}

// Admin functions
export function authenticateAdmin(email: string, password: string): AdminUser | null {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM admin_users WHERE email = ?');
  const user = stmt.get(email) as AdminUser | undefined;

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return null;
  }

  return user;
}

export function getSiteStats(): SiteStats {
  const db = getDatabase();
  
  const totalBusinesses = db.prepare('SELECT COUNT(*) as count FROM businesses WHERE status = "approved"').get() as { count: number };
  const totalEvents = db.prepare('SELECT COUNT(*) as count FROM events WHERE status = "approved"').get() as { count: number };
  const pendingBusinesses = db.prepare('SELECT COUNT(*) as count FROM businesses WHERE status = "pending"').get() as { count: number };
  const pendingEvents = db.prepare('SELECT COUNT(*) as count FROM events WHERE status = "pending"').get() as { count: number };
  const featuredBusinesses = db.prepare('SELECT COUNT(*) as count FROM businesses WHERE is_featured = true AND status = "approved"').get() as { count: number };
  
  // Get submissions from the last 7 days
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoStr = weekAgo.toISOString();
  
  const submissionsThisWeek = db.prepare('SELECT COUNT(*) as count FROM businesses WHERE created_at > ?').get(weekAgoStr) as { count: number };
  const eventsThisWeek = db.prepare('SELECT COUNT(*) as count FROM events WHERE created_at > ?').get(weekAgoStr) as { count: number };

  return {
    total_businesses: totalBusinesses.count,
    total_events: totalEvents.count,
    pending_businesses: pendingBusinesses.count,
    pending_events: pendingEvents.count,
    submissions_this_week: submissionsThisWeek.count,
    events_this_week: eventsThisWeek.count,
    featured_businesses: featuredBusinesses.count
  };
}