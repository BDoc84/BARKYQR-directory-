# BarkYQR MVP - Regina's Dog Business Directory

A modern, community-driven directory for dog-friendly businesses in Regina, Saskatchewan. Built with Next.js, featuring business submissions, photo uploads, admin moderation, and weekly events.

## 🚀 Features

### Public Features
- **Homepage** with rotating weekly events banner
- **Business submission form** with photo uploads (up to 5 photos, JPG/PNG only)
- **Public listing display** in clean grid format
- **Individual business pages** with photo galleries and contact links
- **Mobile-first responsive design** using BarkYQR brand colors (black, blue, white)

### Admin Features
- **Secure admin dashboard** at `/admin`
- **Business approval/rejection** workflow
- **Photo moderation** with individual photo deletion
- **Complete listing management** (approve, reject, delete)
- **Real-time statistics** (pending, approved, rejected counts)

### Technical Features
- **Local JSON storage** for business listings and events
- **File upload handling** with validation and size limits
- **Auto-hiding events** (events past their date are automatically filtered)
- **Static generation** with ISR for performance
- **Admin authentication** with simple password protection

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Styling**: TailwindCSS with custom brand colors
- **File Uploads**: Formidable for server-side processing
- **Storage**: Local JSON files + `/public/uploads` for images
- **TypeScript**: Full type safety
- **Deployment**: Optimized for Vercel

## 📁 Project Structure

```
barkyqr-mvp/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.tsx       # Main app layout with header/footer
│   │   ├── BusinessCard.tsx # Business listing card
│   │   └── EventsBanner.tsx # Weekly events display
│   ├── lib/                 # Utility functions and data management
│   │   ├── types.ts         # TypeScript type definitions
│   │   └── data.ts          # JSON file operations and business logic
│   ├── pages/               # Next.js pages
│   │   ├── api/             # API routes
│   │   │   ├── submit.ts    # Business submission endpoint
│   │   │   └── admin/       # Admin API routes
│   │   ├── listings/        # Business listings pages
│   │   ├── index.tsx        # Homepage
│   │   ├── submit.tsx       # Business submission form
│   │   └── admin.tsx        # Admin dashboard
│   └── styles/
│       └── globals.css      # Global styles and utilities
├── public/
│   └── uploads/             # Uploaded business photos (auto-created)
├── data/                    # JSON storage files (auto-created)
└── ...
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd barkyqr-mvp
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 3. Admin Access
- Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
- **Password**: `barkyqr2024`

## 💾 Data Storage

### Business Listings
- Stored in `/data/listings.json`
- Auto-created on first submission
- Contains business info, status, and photo paths

### Events
- Stored in `/data/events.json`
- Pre-populated with sample events using dynamic dates
- Events auto-hide after their date passes

### Uploaded Photos
- Stored in `/public/uploads/`
- Accessible via `/uploads/filename.jpg`
- Original filenames are randomized for security

## 🔧 Configuration

### Admin Password
Update in `/src/pages/api/admin/auth.ts`:
```typescript
const ADMIN_PASSWORD = 'your-secure-password';
```

### Brand Colors
Defined in `tailwind.config.ts`:
```typescript
'bark-blue': {
  600: '#2563eb', // Primary blue
  // ... other shades
},
'bark-black': '#000000',
'bark-white': '#ffffff',
```

### File Upload Limits
Configure in `/src/pages/api/submit.ts`:
```typescript
maxFileSize: 5 * 1024 * 1024, // 5MB limit
maxFiles: 5,                   // Max 5 photos
```

## 📝 Usage Guide

### For Business Owners
1. Visit `/submit`
2. Fill out business information
3. Upload up to 5 photos (JPG/PNG, max 5MB each)
4. Submit and wait for admin approval
5. Business appears in public listings once approved

### For Administrators
1. Login at `/admin` with password: `barkyqr2024`
2. Review pending submissions
3. Approve ✅ or reject ❌ listings
4. Delete 🗑️ inappropriate photos or entire listings
5. Monitor site statistics

### For Visitors
1. Browse businesses at `/listings`
2. View individual business details with photo galleries
3. Check weekly events on homepage
4. Contact businesses via website/Instagram links

## 🚀 Deployment to Vercel

### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel

# Follow prompts to configure your project
```

### Option 2: Git Integration
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js and deploys

### Important Deployment Notes

⚠️ **File Upload Limitations**: 
- Vercel serverless functions have size limits
- For production, consider:
  - AWS S3 for file storage
  - Cloudinary for image management
  - Database instead of JSON files

🔒 **Security for Production**:
- Use environment variables for admin password
- Implement proper session management
- Add rate limiting for submissions
- Use HTTPS for admin access

## 🔮 Future Enhancements

### Near Term
- **Google Calendar integration** for dynamic events
- **Email notifications** for new submissions
- **Search and filtering** for business listings
- **Image optimization** and resizing

### Long Term
- **Database migration** (PostgreSQL, MongoDB)
- **User accounts** for business owners
- **Review system** for businesses
- **Map integration** for business locations
- **API for mobile apps**

## 🛡️ Security Considerations

### Current Implementation (MVP)
- Simple password authentication
- Basic file validation
- No rate limiting
- Local file storage

### Production Recommendations
- JWT tokens with expiration
- Database with proper authentication
- Rate limiting and CSRF protection
- Cloud storage for uploads
- SSL/HTTPS enforcement

## 🐛 Troubleshooting

### Common Issues

**"Module not found" errors**
```bash
npm install
rm -rf .next
npm run dev
```

**Upload directory not created**
- Ensure `/public/uploads/` exists
- Check file permissions

**Admin login not working**
- Verify password in `/src/pages/api/admin/auth.ts`
- Clear browser localStorage

**Images not displaying**
- Check file paths in JSON data
- Verify files exist in `/public/uploads/`

## 📄 License

Open source project for the Regina dog community.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ for Regina's dog community**

*Need help? Check the issues section or contact the development team.*
