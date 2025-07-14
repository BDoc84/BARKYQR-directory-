import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllListings, updateListingStatus, deleteListing, deleteListingPhoto } from '@/lib/data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Simple auth check - in production use proper session management
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer admin-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'PATCH':
      return handlePatch(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const listings = getAllListings();
    res.status(200).json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
}

function handlePatch(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, status } = req.body;
    
    if (!id || !status || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    const success = updateListingStatus(id, status);
    if (!success) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.status(200).json({ success: true, message: `Listing ${status}` });
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({ error: 'Failed to update listing' });
  }
}

function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, photoPath } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: 'Listing ID required' });
    }

    let success;
    if (photoPath) {
      // Delete specific photo
      success = deleteListingPhoto(id, photoPath);
      if (!success) {
        return res.status(404).json({ error: 'Photo not found' });
      }
      res.status(200).json({ success: true, message: 'Photo deleted' });
    } else {
      // Delete entire listing
      success = deleteListing(id);
      if (!success) {
        return res.status(404).json({ error: 'Listing not found' });
      }
      res.status(200).json({ success: true, message: 'Listing deleted' });
    }
  } catch (error) {
    console.error('Error deleting:', error);
    res.status(500).json({ error: 'Failed to delete' });
  }
}