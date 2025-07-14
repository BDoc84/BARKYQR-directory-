# BarkYQR - Regina's Dog Directory

A community-built directory to help dog owners in Regina find the best spots, services, and events for their furry friends.

## 🐕 About BarkYQR

BarkYQR is a local-first platform designed specifically for dog owners in Regina, Saskatchewan. It's a grassroots community project that helps people discover dog-friendly businesses, services, and events throughout the city.

### Key Features

- **Community-Driven**: Built by locals, for locals - completely free to use
- **Mobile-First Design**: Clean, responsive interface optimized for mobile devices
- **Business Directory**: Find daycares, groomers, trainers, walkers, and more
- **Dog-Friendly Patios**: Discover restaurants and cafes that welcome dogs
- **Event Listings**: Stay updated on dog-related events in Regina
- **Easy Submissions**: Simple forms for businesses and community suggestions
- **Admin Dashboard**: Secure moderation tools for content management

## 🎨 Design

- **Brand Colors**: Black, Blue, and White
- **Mobile-First**: Responsive design that works great on all devices
- **Clean & Simple**: User-friendly interface with clear navigation
- **Canadian Tone**: Casual and friendly, designed for real locals

## 🏗️ Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v4
- **Database**: SQLite with better-sqlite3
- **Icons**: Lucide React
- **Language**: TypeScript
- **Authentication**: Basic admin authentication with bcryptjs

## 📋 Features Overview

### Public Features

1. **Homepage**
   - Hero section with clear value proposition
   - Featured categories and businesses
   - Call-to-action buttons for key actions
   - Community messaging

2. **Browse Page**
   - Search functionality
   - Category filtering
   - Featured business filtering
   - Grid/list view toggle
   - Clean business cards with contact info

3. **Business Submission**
   - Comprehensive form for business owners
   - Contact information collection
   - Social media links
   - Business features (dog-friendly seating, parking, etc.)
   - Owner verification

4. **Business Suggestion**
   - Simple form for community members
   - Allows non-owners to suggest businesses
   - Optional contact information

5. **Category Pages**
   - Filtered business listings by category
   - Consistent navigation and search

### Admin Features

- Secure login system
- Business approval/rejection
- Content moderation
- Site statistics
- User management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd barkyqr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Database Setup

The application uses SQLite and will automatically:
- Create the database file in `data/barkyqr.db`
- Initialize all required tables
- Insert default categories
- Create a default admin user

**Default Admin Credentials:**
- Email: `admin@barkyqr.com`
- Password: `admin123`

⚠️ **Important**: Change the default admin password in production!

## 📁 Project Structure

```
barkyqr/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── browse/         # Browse businesses page
│   │   ├── submit/         # Business submission page
│   │   ├── suggest/        # Business suggestion page
│   │   └── ...
│   ├── components/         # Reusable components
│   │   ├── Header.tsx      # Main navigation
│   │   ├── Footer.tsx      # Site footer
│   │   ├── BusinessCard.tsx # Business listing component
│   │   └── ...
│   ├── lib/                # Utility functions
│   │   └── database.ts     # Database operations
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
├── data/                   # SQLite database (auto-created)
└── ...
```

## 🗂️ Categories

The platform includes these default categories:

1. **Dog Daycares** - Professional daycare services
2. **Groomers** - Professional grooming services  
3. **Dog Trainers** - Professional training services
4. **Walkers** - Dog walking services
5. **Dog-Friendly Patios** - Restaurants and cafes that welcome dogs
6. **Veterinary Clinics** - Veterinary care and medical services
7. **Pet Stores** - Pet supplies and accessories
8. **Rescues & Adoption** - Animal rescue organizations
9. **Events** - Dog-related events and activities
10. **Other** - Uncategorized dog-related services

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Management

The database is automatically managed through the application. Key functions:

- `initDatabase()` - Initialize database and create tables
- `getBusinesses()` - Fetch businesses with filtering
- `createBusiness()` - Add new business
- `getCategories()` - Fetch all categories

### Adding New Features

1. Create TypeScript types in `src/types/`
2. Add database functions in `src/lib/database.ts`
3. Create API routes in `src/app/api/`
4. Build React components in `src/components/`
5. Add pages in `src/app/`

## 🎯 Future Enhancements

- **Image Upload**: Allow businesses to upload photos
- **Advanced Search**: Geographic search, filters by features
- **User Reviews**: Community reviews and ratings
- **Events Calendar**: Interactive calendar view
- **Admin Dashboard**: Full admin interface
- **Email Notifications**: Automated approval notifications
- **SEO Optimization**: Enhanced meta tags and structured data
- **Analytics**: Usage tracking and insights

## 🤝 Contributing

This is a community project! Contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🏠 Local Regina Focus

BarkYQR is specifically designed for Regina, Saskatchewan:

- All content is focused on Regina businesses and events
- Address validation expects Regina locations
- Local terminology and Canadian spelling
- Community-first approach rather than corporate

## 📞 Support

For questions, suggestions, or issues:

- Create an issue on GitHub
- Contact the admin through the website
- Join the community discussions

---

Built with ❤️ by the Regina dog community for the Regina dog community.

*Woof!* 🐕
