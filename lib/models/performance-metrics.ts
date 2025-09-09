/**
 * PerformanceMetrics model - represents performance data for caching operations
 * This is also exported from demo-interaction.ts but provided here for completeness
 */

export interface PerformanceMetrics {
  loadTime: number; // milliseconds
  cacheHitRate: number; // 0-100 percentage
  dataSize: number; // bytes
  revalidationTime: number; // milliseconds
  ttl?: number; // seconds, null for indefinite cache
}

export interface CacheStatus {
  methodId: string;
  state: 'hit' | 'miss' | 'stale' | 'fresh' | 'error';
  lastUpdated: Date;
  ttl?: number; // remaining seconds
  size: number; // bytes
  hitCount: number;
  missCount: number;
}

/**
 * Calculate cache hit rate from hit and miss counts
 */
export function calculateCacheHitRate(hitCount: number, missCount: number): number {
  const total = hitCount + missCount;
  if (total === 0) return 0;
  return Math.round((hitCount / total) * 100);
}

/**
 * Format performance metrics for display
 */
export function formatPerformanceMetrics(metrics: PerformanceMetrics): Record<string, string> {
  return {
    loadTime: `${metrics.loadTime}ms`,
    cacheHitRate: `${metrics.cacheHitRate}%`,
    dataSize: formatBytes(metrics.dataSize),
    revalidationTime: `${metrics.revalidationTime}ms`,
    ttl: metrics.ttl ? `${metrics.ttl}s` : 'Indefinite',
  };
}

/**
 * Format bytes in human-readable format
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Create cache status from interaction data
 */
export function createCacheStatus(
  methodId: string,
  interactions: Array<{ cacheState: string; timestamp: Date; performanceMetrics: PerformanceMetrics }>
): CacheStatus {
  const latestInteraction = interactions[interactions.length - 1];
  const hitCount = interactions.filter(i => i.cacheState === 'hit').length;
  const missCount = interactions.filter(i => i.cacheState === 'miss').length;

  return {
    methodId,
    state: latestInteraction?.cacheState as CacheStatus['state'] || 'miss',
    lastUpdated: latestInteraction?.timestamp || new Date(),
    ttl: latestInteraction?.performanceMetrics.ttl,
    size: latestInteraction?.performanceMetrics.dataSize || 0,
    hitCount,
    missCount,
  };
}
