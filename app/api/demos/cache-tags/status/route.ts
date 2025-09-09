import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      status: 'hit',
      timestamp: new Date().toISOString(),
      age: Math.floor(Math.random() * 300), // Cache age in seconds
      size: 4096,
      method: 'cacheTag',
      tags: ['user-data', 'posts']
    });
  } catch (error) {
    console.error('Error fetching cache status:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        timestamp: new Date().toISOString(),
        method: 'cacheTag'
      }, 
      { status: 500 }
    );
  }
}
