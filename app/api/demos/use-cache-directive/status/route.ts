import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      status: 'hit',
      timestamp: new Date().toISOString(),
      age: Math.floor(Math.random() * 3600), // Simulated cache age in seconds
      size: 2048,
      method: 'use cache'
    });
  } catch (error) {
    console.error('Error fetching cache status:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        timestamp: new Date().toISOString(),
        method: 'use cache'
      }, 
      { status: 500 }
    );
  }
}
