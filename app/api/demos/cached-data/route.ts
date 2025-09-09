import { NextResponse } from 'next/server';

// This API route demonstrates caching with Next.js App Router
export async function GET() {
  // Simulate some processing time
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const data = {
    timestamp: new Date().toISOString(),
    data: 'This response is cached using Next.js API route caching',
    cached: true,
    cacheKey: 'api-cached-data',
    randomValue: Math.floor(Math.random() * 1000),
    serverInfo: {
      requestTime: Date.now(),
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=60'
      }
    }
  };

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 's-maxage=300, stale-while-revalidate=60',
    },
  });
}
