'use cache'

import Link from 'next/link';
import { getCachingMethodById } from '@/lib/demo-data';
import { PerformanceMetrics } from '@/components/performance-metrics';
import { CacheRefreshButton } from '@/components/cache-refresh-button';
import { CodeExample } from '@/components/code-example';
import { CacheStatus } from '@/components/cache-status';
import { unstable_cacheLife as cacheLife } from 'next/cache';

// This entire page is cached using the new "use cache" directive
// This is the future replacement for unstable_cache

export default async function UseCacheDemo() {
  // Set cache life for this entire route
  cacheLife('hours'); // Uses the predefined 'hours' profile
  
  const method = getCachingMethodById('use-cache-directive');
  
  // Simulate expensive computation that benefits from caching
  const startTime = Date.now();
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate work
  
  const computationData = {
    timestamp: new Date().toISOString(),
    randomValue: Math.random(),
    processingTime: Date.now() - startTime,
    cached: true
  };
  
  if (!method) {
    return <div>Method not found</div>;
  }

  const performanceData = {
    loadTime: 5, // Fast due to route-level caching
    cacheHitRate: 98,
    dataSize: JSON.stringify(computationData).length,
    revalidationTime: 100,
    ttl: 3600 // 1 hour
  };

  const codeExample = `'use cache'

import { unstable_cacheLife as cacheLife } from 'next/cache';

export default async function MyPage() {
  // Set cache profile for entire route
  cacheLife('hours'); // or 'days', 'weeks', 'max'
  
  // All expensive operations in this route are cached
  const data = await expensiveOperation();
  
  return <div>{data}</div>;
}`;

  return (
    <div className="container">
      {/* Header */}
      <div className="hero">
        <h1>🚀 {method.name}</h1>
        <p>{method.description}</p>
        <Link href="/" style={{ color: '#4f46e5', textDecoration: 'none' }}>
          ← Back to Showcase
        </Link>
      </div>

      {/* Cache Status */}
      <CacheStatus 
        endpoint="/api/demos/use-cache-directive/status"
        label="Route-Level Cache Status"
        method="use cache"
      />

      {/* Demo Content */}
      <div className="demo-section">
        <h2>📊 Cached Computation Result</h2>
        <div className="card">
          <pre style={{ 
            background: '#f8fafc', 
            padding: '1rem', 
            borderRadius: '8px',
            overflow: 'auto'
          }}>
            {JSON.stringify(computationData, null, 2)}
          </pre>
          <p style={{ 
            marginTop: '1rem', 
            color: '#64748b',
            fontSize: '0.875rem' 
          }}>
            This entire page is cached using the newest &quot;use cache&quot; directive.
            Refresh the page to see the same cached values until revalidation.
          </p>
        </div>
      </div>

      {/* Performance Metrics */}
      <PerformanceMetrics metrics={performanceData} />

      {/* Code Example */}
      <CodeExample 
        code={codeExample}
        language="typescript"
      />

      {/* Cache Controls */}
      <div className="demo-section">
        <h2>🔄 Cache Management</h2>
        <CacheRefreshButton 
          methodId="use-cache-directive"
        />
      </div>

      {/* Key Features */}
      <div className="demo-section">
        <h2>✨ Key Features</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>✅ <strong>Route-level caching</strong>: Entire page cached with one directive</li>
          <li>✅ <strong>Built-in cache profiles</strong>: &apos;seconds&apos;, &apos;minutes&apos;, &apos;hours&apos;, &apos;days&apos;, &apos;weeks&apos;, &apos;max&apos;</li>
          <li>✅ <strong>Automatic serialization</strong>: No manual cache key management</li>
          <li>✅ <strong>Future-proof</strong>: Will replace unstable_cache when stable</li>
          <li>✅ <strong>Nested caching support</strong>: Components can have different cache profiles</li>
        </ul>
      </div>
    </div>
  );
}
