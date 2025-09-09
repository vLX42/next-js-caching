/**
 * Performance tracking utilities for caching demonstrations
 */

import { DemoInteraction, PerformanceMetrics } from './models/demo-interaction';

/**
 * Performance tracker for measuring cache operations
 */
export class PerformanceTracker {
  private startTime: number;
  private measurements: Map<string, number> = new Map();

  constructor() {
    this.startTime = performance.now();
  }

  /**
   * Mark a point in time for measurement
   */
  mark(label: string): void {
    this.measurements.set(label, performance.now());
  }

  /**
   * Measure time between two marks
   */
  measure(startMark: string, endMark: string): number {
    const start = this.measurements.get(startMark);
    const end = this.measurements.get(endMark);
    
    if (start === undefined || end === undefined) {
      throw new Error(`Marks not found: ${startMark}, ${endMark}`);
    }
    
    return end - start;
  }

  /**
   * Get elapsed time since tracker creation
   */
  getElapsedTime(): number {
    return performance.now() - this.startTime;
  }

  /**
   * Create performance metrics from measurements
   */
  createMetrics(
    cacheHitRate: number,
    dataSize: number,
    ttl?: number
  ): PerformanceMetrics {
    const loadTime = this.getElapsedTime();
    const revalidationTime = this.measurements.get('revalidation') || 0;

    return {
      loadTime: Math.round(loadTime),
      cacheHitRate: Math.round(cacheHitRate * 100) / 100,
      dataSize: Math.round(dataSize),
      revalidationTime: Math.round(revalidationTime),
      ttl
    };
  }
}

/**
 * Global performance monitoring for cache operations
 */
export class GlobalPerformanceMonitor {
  private static instance: GlobalPerformanceMonitor;
  private interactions: DemoInteraction[] = [];
  private methodStats = new Map<string, {
    hits: number;
    misses: number;
    totalLoadTime: number;
    lastAccess: Date;
  }>();

  static getInstance(): GlobalPerformanceMonitor {
    if (!this.instance) {
      this.instance = new GlobalPerformanceMonitor();
    }
    return this.instance;
  }

  /**
   * Record a demo interaction
   */
  recordInteraction(interaction: DemoInteraction): void {
    this.interactions.push(interaction);
    this.updateMethodStats(interaction);
  }

  /**
   * Update method-specific statistics
   */
  private updateMethodStats(interaction: DemoInteraction): void {
    const stats = this.methodStats.get(interaction.methodId) || {
      hits: 0,
      misses: 0,
      totalLoadTime: 0,
      lastAccess: new Date()
    };

    if (interaction.cacheState === 'hit' || interaction.cacheState === 'fresh') {
      stats.hits++;
    } else if (interaction.cacheState === 'miss' || interaction.cacheState === 'stale') {
      stats.misses++;
    }

    stats.totalLoadTime += interaction.performanceMetrics.loadTime;
    stats.lastAccess = interaction.timestamp;
    
    this.methodStats.set(interaction.methodId, stats);
  }

  /**
   * Get performance statistics for a specific method
   */
  getMethodStats(methodId: string) {
    const stats = this.methodStats.get(methodId);
    if (!stats) {
      return {
        hitRate: 0,
        totalRequests: 0,
        averageLoadTime: 0,
        lastAccess: null
      };
    }

    const totalRequests = stats.hits + stats.misses;
    return {
      hitRate: totalRequests > 0 ? (stats.hits / totalRequests) * 100 : 0,
      totalRequests,
      averageLoadTime: totalRequests > 0 ? stats.totalLoadTime / totalRequests : 0,
      lastAccess: stats.lastAccess,
      hits: stats.hits,
      misses: stats.misses
    };
  }

  /**
   * Get all method statistics
   */
  getAllMethodStats() {
    const result: Record<string, any> = {};
    this.methodStats.forEach((stats, methodId) => {
      const totalRequests = stats.hits + stats.misses;
      result[methodId] = {
        hitRate: totalRequests > 0 ? (stats.hits / totalRequests) * 100 : 0,
        totalRequests,
        averageLoadTime: totalRequests > 0 ? stats.totalLoadTime / totalRequests : 0,
        lastAccess: stats.lastAccess,
        hits: stats.hits,
        misses: stats.misses
      };
    });
    return result;
  }

  /**
   * Get recent interactions for a method
   */
  getRecentInteractions(methodId: string, limit = 10): DemoInteraction[] {
    return this.interactions
      .filter(interaction => interaction.methodId === methodId)
      .slice(-limit)
      .reverse();
  }

  /**
   * Clear statistics for a method
   */
  clearMethodStats(methodId: string): void {
    this.methodStats.delete(methodId);
    this.interactions = this.interactions.filter(
      interaction => interaction.methodId !== methodId
    );
  }

  /**
   * Clear all statistics
   */
  clearAllStats(): void {
    this.methodStats.clear();
    this.interactions = [];
  }
}

/**
 * Utility function to measure cache operation performance
 */
export async function measureCacheOperation<T>(
  operation: () => Promise<T>,
  methodId: string,
  actionType: DemoInteraction['actionType'] = 'view'
): Promise<{ result: T; interaction: DemoInteraction }> {
  const tracker = new PerformanceTracker();
  const startTime = new Date();
  
  try {
    tracker.mark('operation-start');
    const result = await operation();
    tracker.mark('operation-end');
    
    // Simulate cache state determination (in real implementation, this would come from actual cache)
    const cacheState = Math.random() > 0.3 ? 'hit' : 'miss';
    const dataSize = JSON.stringify(result).length;
    
    const performanceMetrics = tracker.createMetrics(
      cacheState === 'hit' ? 1 : 0,
      dataSize,
      300 // 5 minute TTL
    );

    const interaction: DemoInteraction = {
      id: `${methodId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      methodId,
      actionType,
      timestamp: startTime,
      cacheState,
      result: result as any,
      performanceMetrics
    };

    // Record the interaction globally
    GlobalPerformanceMonitor.getInstance().recordInteraction(interaction);

    return { result, interaction };
  } catch (error) {
    tracker.mark('operation-error');
    
    const performanceMetrics = tracker.createMetrics(0, 0);
    const interaction: DemoInteraction = {
      id: `${methodId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      methodId,
      actionType,
      timestamp: startTime,
      cacheState: 'error',
      result: { error: error instanceof Error ? error.message : 'Unknown error' },
      performanceMetrics
    };

    GlobalPerformanceMonitor.getInstance().recordInteraction(interaction);
    
    throw error;
  }
}

/**
 * Format performance metrics for display
 */
export function formatPerformanceMetrics(metrics: PerformanceMetrics) {
  return {
    loadTime: `${metrics.loadTime}ms`,
    cacheHitRate: `${metrics.cacheHitRate.toFixed(1)}%`,
    dataSize: formatBytes(metrics.dataSize),
    revalidationTime: `${metrics.revalidationTime}ms`,
    ttl: metrics.ttl ? `${metrics.ttl}s` : 'No expiry'
  };
}

/**
 * Format bytes in human-readable format
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
