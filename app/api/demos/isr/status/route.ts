import { NextResponse } from 'next/server';

export async function GET() {
  // Mock ISR cache status
  const now = new Date();
  const age = Math.floor(Math.random() * 30); // 0-30 seconds (revalidate period)
  
  const cacheInfo = {
    status: age < 25 ? 'fresh' : 'stale', // Fresh if under 25 seconds
    timestamp: now.toISOString(),
    age: age,
    size: 4096,
    method: 'ISR',
    revalidateInterval: 30,
    lastRegenerated: new Date(now.getTime() - age * 1000).toISOString(),
    nextRevalidation: new Date(now.getTime() + (30 - age) * 1000).toISOString(),
    backgroundRevalidation: age > 25,
    regenerationStrategy: 'background'
  };

  return NextResponse.json(cacheInfo);
}
