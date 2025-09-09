import { NextResponse } from 'next/server';

export async function GET() {
  // Mock server components cache status
  const cacheInfo = {
    status: Math.random() > 0.4 ? 'hit' : 'miss', // 60% hit rate
    timestamp: new Date().toISOString(),
    age: Math.random() < 0.6 ? Math.floor(Math.random() * 120) : undefined,
    size: 3072,
    method: 'Server Components',
    renderingStrategy: 'server-side',
    componentCache: true,
    dataFreshness: Math.random() > 0.7 ? 'stale' : 'fresh',
    renderTime: Math.floor(Math.random() * 50) + 10, // 10-60ms
    hydration: false // Server components don't hydrate
  };

  return NextResponse.json(cacheInfo);
}
