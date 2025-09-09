import { NextResponse } from 'next/server';

export async function GET() {
  // Mock static generation cache status
  const cacheInfo = {
    status: 'fresh', // Static generation is always fresh until rebuild
    timestamp: new Date().toISOString(),
    age: 0, // Static content has no age concept
    size: 6144,
    method: 'Static Generation',
    buildTime: new Date(Date.now() - Math.random() * 86400000).toISOString(), // Built within last day
    nextBuild: 'on-demand', // Static generation rebuilds on deployment
    prerendered: true,
    staticRoute: true,
    optimizations: ['gzip', 'brotli', 'minification']
  };

  return NextResponse.json(cacheInfo);
}
