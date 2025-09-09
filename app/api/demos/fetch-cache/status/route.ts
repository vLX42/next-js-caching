import { NextResponse } from 'next/server';

export async function GET() {
  // Mock fetch cache status
  const cacheInfo = {
    status: Math.random() > 0.2 ? 'hit' : 'miss', // 80% hit rate
    timestamp: new Date().toISOString(),
    age: Math.floor(Math.random() * 300), // 0-300 seconds
    size: 8192,
    method: 'fetch() cache',
    cacheControl: 'max-age=300',
    etag: `"${Math.random().toString(36).substring(7)}"`,
    lastModified: new Date(Date.now() - Math.random() * 300000).toISOString(),
    revalidate: Math.random() > 0.5 ? 'force-cache' : 'no-cache',
    next: {
      revalidate: 300,
      tags: ['fetch-data']
    }
  };

  return NextResponse.json(cacheInfo);
}
