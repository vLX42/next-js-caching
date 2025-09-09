/**
 * Cache utilities for the Next.js caching showcase
 */

import { revalidateTag, revalidatePath } from 'next/cache';
import { cache } from 'react';

/**
 * Cache configuration interface
 */
export interface CacheConfig {
  ttl?: number; // Time to live in seconds
  tags?: string[]; // Cache tags for invalidation
  revalidate?: number; // Revalidation interval
}

/**
 * Create a cached function with configuration
 */
export function createCachedFunction<T extends (...args: any[]) => any>(
  fn: T,
  keyPrefix: string,
  config: CacheConfig = {}
): T {
  return cache(fn) as T;
}

/**
 * Cache invalidation utilities
 */
export class CacheManager {
  /**
   * Invalidate cache by tag
   */
  static async invalidateByTag(tag: string): Promise<void> {
    try {
      await revalidateTag(tag);
    } catch (error) {
      console.error(`Failed to invalidate cache tag ${tag}:`, error);
      throw error;
    }
  }

  /**
   * Invalidate cache by path
   */
  static async invalidateByPath(path: string): Promise<void> {
    try {
      await revalidatePath(path);
    } catch (error) {
      console.error(`Failed to invalidate cache path ${path}:`, error);
      throw error;
    }
  }

  /**
   * Invalidate multiple tags
   */
  static async invalidateMultipleTags(tags: string[]): Promise<void> {
    const promises = tags.map(tag => this.invalidateByTag(tag));
    await Promise.all(promises);
  }

  /**
   * Invalidate multiple paths
   */
  static async invalidateMultiplePaths(paths: string[]): Promise<void> {
    const promises = paths.map(path => this.invalidateByPath(path));
    await Promise.all(promises);
  }
}

/**
 * Fetch with caching configuration
 */
export async function cachedFetch(
  url: string, 
  config: CacheConfig & RequestInit = {}
): Promise<Response> {
  const { ttl, tags, revalidate, ...fetchConfig } = config;
  
  const nextConfig: any = {};
  if (revalidate !== undefined) {
    nextConfig.revalidate = revalidate;
  }
  if (tags) {
    nextConfig.tags = tags;
  }

  return fetch(url, {
    ...fetchConfig,
    next: nextConfig
  } as any);
}

/**
 * Performance monitoring for cache operations
 */
export class CachePerformanceMonitor {
  private static metrics = new Map<string, {
    hits: number;
    misses: number;
    totalTime: number;
    lastAccess: Date;
  }>();

  /**
   * Record a cache hit
   */
  static recordHit(key: string, responseTime: number): void {
    const current = this.metrics.get(key) || { hits: 0, misses: 0, totalTime: 0, lastAccess: new Date() };
    current.hits++;
    current.totalTime += responseTime;
    current.lastAccess = new Date();
    this.metrics.set(key, current);
  }

  /**
   * Record a cache miss
   */
  static recordMiss(key: string, responseTime: number): void {
    const current = this.metrics.get(key) || { hits: 0, misses: 0, totalTime: 0, lastAccess: new Date() };
    current.misses++;
    current.totalTime += responseTime;
    current.lastAccess = new Date();
    this.metrics.set(key, current);
  }

  /**
   * Get cache statistics
   */
  static getStats(key: string) {
    const stats = this.metrics.get(key);
    if (!stats) {
      return {
        hitRate: 0,
        totalRequests: 0,
        averageResponseTime: 0,
        lastAccess: null
      };
    }

    const totalRequests = stats.hits + stats.misses;
    return {
      hitRate: totalRequests > 0 ? (stats.hits / totalRequests) * 100 : 0,
      totalRequests,
      averageResponseTime: totalRequests > 0 ? stats.totalTime / totalRequests : 0,
      lastAccess: stats.lastAccess
    };
  }

  /**
   * Get all cache statistics
   */
  static getAllStats() {
    const result: Record<string, any> = {};
    this.metrics.forEach((stats, key) => {
      const totalRequests = stats.hits + stats.misses;
      result[key] = {
        hitRate: totalRequests > 0 ? (stats.hits / totalRequests) * 100 : 0,
        totalRequests,
        averageResponseTime: totalRequests > 0 ? stats.totalTime / totalRequests : 0,
        lastAccess: stats.lastAccess,
        hits: stats.hits,
        misses: stats.misses
      };
    });
    return result;
  }

  /**
   * Reset statistics
   */
  static reset(key?: string): void {
    if (key) {
      this.metrics.delete(key);
    } else {
      this.metrics.clear();
    }
  }
}

/**
 * Cache timing utility
 */
export async function withTiming<T>(
  operation: () => Promise<T>,
  onComplete?: (duration: number, result: T) => void
): Promise<T> {
  const start = performance.now();
  try {
    const result = await operation();
    const duration = performance.now() - start;
    onComplete?.(duration, result);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    onComplete?.(duration, null as any);
    throw error;
  }
}

/**
 * Create a cache key from parameters
 */
export function createCacheKey(prefix: string, ...params: any[]): string {
  const serialized = params.map(param => 
    typeof param === 'object' ? JSON.stringify(param) : String(param)
  ).join('|');
  return `${prefix}:${serialized}`;
}
