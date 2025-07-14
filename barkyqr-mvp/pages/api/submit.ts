import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { addListing } from '@/lib/data';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      maxFiles: 5,
      filter: ({ mimetype }) => {
        return mimetype === 'image/jpeg' || mimetype === 'image/png';
      },
    });

    const [fields, files] = await form.parse(req);

    // Extract form data
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const location = Array.isArray(fields.location) ? fields.location[0] : fields.location;
    const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
    const website = Array.isArray(fields.website) ? fields.website[0] : fields.website;
    const instagram = Array.isArray(fields.instagram) ? fields.instagram[0] : fields.instagram;

    // Validate required fields
    if (!name || !location || !description) {
      return res.status(400).json({ error: 'Name, location, and description are required' });
    }

    // Process uploaded photos
    const photos: string[] = [];
    const photoFiles = files.photos || [];
    const fileArray = Array.isArray(photoFiles) ? photoFiles : [photoFiles];

    for (const file of fileArray) {
      if (file && file.filepath) {
        const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${path.extname(file.originalFilename || '')}`;
        const newPath = path.join(uploadDir, filename);
        
        // Move file to permanent location
        fs.renameSync(file.filepath, newPath);
        photos.push(`/uploads/${filename}`);
      }
    }

    // Create listing
    const listing = addListing({
      name: name as string,
      location: location as string,
      description: description as string,
      website: website as string || undefined,
      instagram: instagram as string || undefined,
      photos,
      status: 'pending',
    });

    res.status(200).json({ 
      success: true, 
      message: 'Business submitted successfully! Awaiting approval.',
      listingId: listing.id 
    });

  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ error: 'Failed to submit business' });
  }
}