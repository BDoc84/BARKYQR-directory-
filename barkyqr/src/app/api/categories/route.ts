import { NextResponse } from 'next/server';
import { getCategories, initDatabase } from '@/lib/database';

export async function GET() {
  try {
    // Initialize database if not already done
    initDatabase();
    
    const categories = getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}