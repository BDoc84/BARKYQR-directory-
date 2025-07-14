import { NextRequest, NextResponse } from 'next/server';
import { getBusinesses, createBusiness, initDatabase } from '@/lib/database';
import { BusinessSubmission } from '@/types';

export async function GET(request: NextRequest) {
  try {
    // Initialize database if not already done
    initDatabase();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';
    
    const filters = {
      ...(category && { category }),
      ...(search && { search }),
      ...(featured && { featured }),
    };
    
    const businesses = getBusinesses(filters);
    return NextResponse.json(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch businesses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Initialize database if not already done
    initDatabase();
    
    const body = await request.json() as BusinessSubmission;
    
    // Basic validation
    if (!body.name || !body.category_id || !body.description || !body.address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const businessId = createBusiness(body);
    
    return NextResponse.json(
      { message: 'Business submitted successfully', id: businessId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating business:', error);
    return NextResponse.json(
      { error: 'Failed to create business' },
      { status: 500 }
    );
  }
}