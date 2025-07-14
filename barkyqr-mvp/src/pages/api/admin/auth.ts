import type { NextApiRequest, NextApiResponse } from 'next';

const ADMIN_PASSWORD = 'barkyqr2024'; // In production, use environment variables

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password required' });
    }

    if (password === ADMIN_PASSWORD) {
      // In production, use proper JWT or session management
      res.status(200).json({ 
        success: true, 
        token: 'admin-token',
        message: 'Login successful' 
      });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}