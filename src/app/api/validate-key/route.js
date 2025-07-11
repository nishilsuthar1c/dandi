import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';

export async function POST(request) {
  try {
    const { apiKey } = await request.json();
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    // Query Supabase for the key
    const { data, error } = await supabase
      .from('api_keys')
      .select('name, created_at, is_active')
      .eq('value', apiKey.trim())
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    if (!data.is_active) {
      return NextResponse.json(
        { error: 'API key is inactive' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      keyName: data.name,
      createdAt: data.created_at,
      message: 'API key is valid'
    });

  } catch (error) {
    console.error('API key validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST with JSON body containing apiKey' },
    { status: 405 }
  );
} 