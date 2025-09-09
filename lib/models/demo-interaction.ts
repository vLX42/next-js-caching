/**
 * DemoInteraction model - represents user actions within a caching demo
 */

export interface DemoInteraction {
  id: string;
  methodId: string;
  actionType: 'view' | 'refresh' | 'invalidate' | 'revalidate';
  timestamp: Date;
  cacheState: 'hit' | 'miss' | 'stale' | 'fresh' | 'error';
  result: Record<string, any>;
  performanceMetrics: PerformanceMetrics;
}

export interface PerformanceMetrics {
  loadTime: number; // milliseconds
  cacheHitRate: number; // 0-100 percentage
  dataSize: number; // bytes
  revalidationTime: number; // milliseconds
  ttl?: number; // seconds, null for indefinite
}

export interface DemoInteractionState {
  state: 'pending' | 'processing' | 'complete' | 'failed';
  error?: string;
}

/**
 * Validation function for DemoInteraction
 */
export function validateDemoInteraction(interaction: Partial<DemoInteraction>): string[] {
  const errors: string[] = [];

  if (!interaction.id || typeof interaction.id !== 'string') {
    errors.push('id must be a non-empty string');
  }

  if (!interaction.methodId || typeof interaction.methodId !== 'string') {
    errors.push('methodId must be a non-empty string');
  }

  if (!interaction.actionType || !['view', 'refresh', 'invalidate', 'revalidate'].includes(interaction.actionType)) {
    errors.push('actionType must be one of: view, refresh, invalidate, revalidate');
  }

  if (!interaction.timestamp || !(interaction.timestamp instanceof Date)) {
    errors.push('timestamp must be a valid Date');
  }

  if (!interaction.cacheState || !['hit', 'miss', 'stale', 'fresh', 'error'].includes(interaction.cacheState)) {
    errors.push('cacheState must be one of: hit, miss, stale, fresh, error');
  }

  if (!interaction.result || typeof interaction.result !== 'object') {
    errors.push('result must be an object');
  }

  if (interaction.performanceMetrics) {
    const metricsErrors = validatePerformanceMetrics(interaction.performanceMetrics);
    errors.push(...metricsErrors);
  } else {
    errors.push('performanceMetrics is required');
  }

  return errors;
}

/**
 * Validation function for PerformanceMetrics
 */
export function validatePerformanceMetrics(metrics: Partial<PerformanceMetrics>): string[] {
  const errors: string[] = [];

  if (typeof metrics.loadTime !== 'number' || metrics.loadTime < 0) {
    errors.push('loadTime must be a non-negative number');
  }

  if (typeof metrics.cacheHitRate !== 'number' || metrics.cacheHitRate < 0 || metrics.cacheHitRate > 100) {
    errors.push('cacheHitRate must be a number between 0 and 100');
  }

  if (typeof metrics.dataSize !== 'number' || metrics.dataSize < 0) {
    errors.push('dataSize must be a non-negative number');
  }

  if (typeof metrics.revalidationTime !== 'number' || metrics.revalidationTime < 0) {
    errors.push('revalidationTime must be a non-negative number');
  }

  if (metrics.ttl !== undefined && metrics.ttl !== null && (typeof metrics.ttl !== 'number' || metrics.ttl < 0)) {
    errors.push('ttl must be null or a non-negative number');
  }

  return errors;
}

/**
 * Create a new DemoInteraction with validation
 */
export function createDemoInteraction(data: Partial<DemoInteraction>): DemoInteraction {
  const errors = validateDemoInteraction(data);
  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(', ')}`);
  }
  
  return data as DemoInteraction;
}

/**
 * Create PerformanceMetrics with validation
 */
export function createPerformanceMetrics(data: Partial<PerformanceMetrics>): PerformanceMetrics {
  const errors = validatePerformanceMetrics(data);
  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(', ')}`);
  }
  
  return data as PerformanceMetrics;
}
