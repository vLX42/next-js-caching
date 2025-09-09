'use client';

import { formatPerformanceMetrics } from '@/lib/models/performance-metrics';

interface PerformanceMetricsProps {
  metrics: {
    loadTime: number;
    cacheHitRate: number;
    dataSize: number;
    revalidationTime: number;
    ttl?: number;
  };
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  const formatted = formatPerformanceMetrics(metrics);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-number" style={{ color: '#10b981' }}>
          {formatted.loadTime}
        </div>
        <div className="stat-label">Load Time</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-number" style={{ color: '#3b82f6' }}>
          {formatted.cacheHitRate}
        </div>
        <div className="stat-label">Cache Hit Rate</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-number" style={{ color: '#8b5cf6' }}>
          {formatted.dataSize}
        </div>
        <div className="stat-label">Data Size</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-number" style={{ color: '#f59e0b' }}>
          {formatted.revalidationTime}
        </div>
        <div className="stat-label">Revalidation Time</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-number" style={{ color: '#ef4444' }}>
          {formatted.ttl}
        </div>
        <div className="stat-label">TTL</div>
      </div>
    </div>
  );
}
