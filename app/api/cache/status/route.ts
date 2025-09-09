import { NextRequest, NextResponse } from 'next/server';

// Mock cache status data - in a real app this would check actual cache storage
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const method = searchParams.get('method') || 'unknown';
  
  // Simulate different cache statuses
  const statuses = ['hit', 'miss', 'fresh', 'stale'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  const cacheInfo = {
    status: randomStatus,
    timestamp: new Date().toISOString(),
    age: randomStatus === 'hit' || randomStatus === 'fresh' ? 
         Math.floor(Math.random() * 300) : undefined,
    size: Math.floor(Math.random() * 50000) + 1000,
    method: method,
    hits: Math.floor(Math.random() * 1000),
    misses: Math.floor(Math.random() * 100),
    hitRate: randomStatus === 'hit' ? 
             Math.floor(Math.random() * 40) + 60 : // 60-100%
             Math.floor(Math.random() * 60) + 20,  // 20-80%
    lastAccessed: new Date(Date.now() - Math.random() * 300000).toISOString(),
    expiresAt: new Date(Date.now() + Math.random() * 3600000).toISOString()
  };

  return NextResponse.json(cacheInfo);
}
