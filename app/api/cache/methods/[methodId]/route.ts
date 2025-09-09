import { NextRequest, NextResponse } from 'next/server';
import { getCachingMethodById } from '@/lib/demo-data';
import { CachePerformanceMonitor } from '@/lib/cache-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { methodId: string } }
) {
  try {
    const startTime = performance.now();
    const { methodId } = params;
    
    // Get specific caching method
    const method = getCachingMethodById(methodId);
    
    if (!method) {
      // Record cache miss for non-existent method
      CachePerformanceMonitor.recordMiss(`cache-method-${methodId}`, performance.now() - startTime);
      
      return NextResponse.json(
        { error: 'Caching method not found' },
        { 
          status: 404,
          headers: {
            'X-Cache-Status': 'MISS',
          },
        }
      );
    }
    
    // Record performance metrics
    const responseTime = performance.now() - startTime;
    CachePerformanceMonitor.recordHit(`cache-method-${methodId}`, responseTime);
    
    return NextResponse.json(method, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=120',
        'X-Cache-Status': 'HIT',
        'X-Response-Time': `${responseTime.toFixed(2)}ms`,
        'X-Method-Id': methodId,
      },
    });
  } catch (error) {
    console.error(`Error fetching caching method ${params.methodId}:`, error);
    
    // Record cache miss due to error
    CachePerformanceMonitor.recordMiss(`cache-method-${params.methodId}`, 0);
    
    return NextResponse.json(
      { error: 'Failed to fetch caching method' },
      { 
        status: 500,
        headers: {
          'X-Cache-Status': 'ERROR',
        },
      }
    );
  }
}
