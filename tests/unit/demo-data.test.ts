import { getCachingMethodById, getAllCachingMethods } from '@/lib/demo-data';
import { PerformanceTracker } from '@/lib/performance';
import type { CachingMethod } from '@/lib/models/caching-method';

describe('Demo Data Functions', () => {
  test('getAllCachingMethods returns all 10 methods', () => {
    const methods = getAllCachingMethods();
    expect(methods).toHaveLength(10);
    
    const expectedMethods = [
      'static-generation',
      'server-components', 
      'api-routes',
      'use-cache-directive',
      'cache-tags',
      'function-cache',
      'fetch-cache',
      'isr',
      'dynamic-routes',
      'streaming-ssr'
    ];
    
    expectedMethods.forEach(id => {
      expect(methods.find((method: CachingMethod) => method.id === id)).toBeDefined();
    });
  });

  test('getCachingMethodById returns correct method', () => {
    const method = getCachingMethodById('function-cache');
    expect(method).toBeDefined();
    expect(method?.id).toBe('function-cache');
    expect(method?.name).toBe('Function-Level Caching');
    expect(method?.description).toContain('use cache');
  });

  test('getCachingMethodById returns undefined for invalid id', () => {
    const method = getCachingMethodById('invalid-id');
    expect(method).toBeUndefined();
  });

  test('all methods have required properties', () => {
    const methods = getAllCachingMethods();
    
    methods.forEach((method: CachingMethod) => {
      expect(method).toHaveProperty('id');
      expect(method).toHaveProperty('name');
      expect(method).toHaveProperty('description');
      expect(method).toHaveProperty('codeExample');
      expect(method).toHaveProperty('benefits');
      expect(method).toHaveProperty('useCases');
      
      expect(typeof method.id).toBe('string');
      expect(typeof method.name).toBe('string');
      expect(typeof method.description).toBe('string');
      expect(typeof method.codeExample).toBe('string');
      expect(Array.isArray(method.benefits)).toBe(true);
      expect(Array.isArray(method.useCases)).toBe(true);
    });
  });
});

describe('Performance Tracker', () => {
  test('PerformanceTracker can mark and measure', () => {
    const tracker = new PerformanceTracker();
    
    tracker.mark('start');
    // Small delay
    const start = performance.now();
    while (performance.now() - start < 1) {
      // Wait 1ms
    }
    tracker.mark('end');
    
    const duration = tracker.measure('start', 'end');
    expect(duration).toBeGreaterThan(0);
  });

  test('PerformanceTracker throws error for invalid marks', () => {
    const tracker = new PerformanceTracker();
    
    expect(() => {
      tracker.measure('invalid-start', 'invalid-end');
    }).toThrow('Marks not found');
  });
});
