import { NextRequest, NextResponse } from 'next/server';
import { getAllCachingMethods } from '@/lib/demo-data';
import { CachePerformanceMonitor } from '@/lib/cache-utils';

export async function GET(request: NextRequest) {
  try {
    // Simulate cache operation timing
    const startTime = performance.now();
    
    // Get all caching methods
    const methods = getAllCachingMethods();
    
    // Record performance metrics
    const responseTime = performance.now() - startTime;
    CachePerformanceMonitor.recordHit('cache-methods', responseTime);
    
    return NextResponse.json(methods, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        'X-Cache-Status': 'HIT',
        'X-Response-Time': `${responseTime.toFixed(2)}ms`,
      },
    });
  } catch (error) {
    console.error('Error fetching caching methods:', error);
    
    // Record cache miss due to error
    CachePerformanceMonitor.recordMiss('cache-methods', 0);
    
    return NextResponse.json(
      { error: 'Failed to fetch caching methods' },
      { 
        status: 500,
        headers: {
          'X-Cache-Status': 'MISS',
        },
      }
    );
  }
}
