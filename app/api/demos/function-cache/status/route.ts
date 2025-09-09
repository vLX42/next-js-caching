import { NextResponse } from 'next/server';

export async function GET() {
  // Mock function cache status
  const cacheInfo = {
    status: Math.random() > 0.3 ? 'hit' : 'miss', // 70% hit rate
    timestamp: new Date().toISOString(),
    age: Math.floor(Math.random() * 60), // 0-60 seconds
    size: 2048, // Fixed size for function cache
    method: 'unstable_cache',
    cacheKey: 'expensive-computation',
    revalidateIn: 60 - Math.floor(Math.random() * 60),
    tags: ['computation'],
    lastComputation: new Date(Date.now() - Math.random() * 60000).toISOString()
  };

  return NextResponse.json(cacheInfo);
}
