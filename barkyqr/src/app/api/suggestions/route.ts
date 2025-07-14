import { NextRequest, NextResponse } from 'next/server';
import { createBusinessSuggestion, initDatabase } from '@/lib/database';
import { BusinessSuggestion } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Initialize database if not already done
    initDatabase();
    
    const body = await request.json() as BusinessSuggestion;
    
    // Basic validation
    if (!body.name || !body.category_id) {
      return NextResponse.json(
        { error: 'Business name and category are required' },
        { status: 400 }
      );
    }
    
    const suggestionId = createBusinessSuggestion(body);
    
    return NextResponse.json(
      { message: 'Business suggestion submitted successfully', id: suggestionId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating business suggestion:', error);
    return NextResponse.json(
      { error: 'Failed to submit suggestion' },
      { status: 500 }
    );
  }
}