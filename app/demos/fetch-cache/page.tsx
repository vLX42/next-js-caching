import Link from 'next/link';
import { getCachingMethodById } from '@/lib/demo-data';
import { PerformanceMetrics } from '@/components/performance-metrics';
import { CacheRefreshButton } from '@/components/cache-refresh-button';
import { CodeExample } from '@/components/code-example';
import { CacheStatus } from '@/components/cache-status';

// Demonstrate different fetch caching strategies
async function fetchWithCache() {
  // This fetch will be cached by Next.js automatically
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    next: { 
      revalidate: 60, // Cache for 60 seconds
      tags: ['posts'] // Tag for selective invalidation
    }
  });
  
  const data = await response.json();
  
  return {
    ...data,
    fetchedAt: new Date().toISOString(),
    cacheInfo: {
      strategy: 'fetch-with-revalidate',
      revalidateAfter: 60,
      tags: ['posts']
    }
  };
}

async function fetchWithForceCache() {
  // This demonstrates force-cache behavior
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/2', {
    cache: 'force-cache' // Cache indefinitely until manually invalidated
  });
  
  const data = await response.json();
  
  return {
    ...data,
    fetchedAt: new Date().toISOString(),
    cacheInfo: {
      strategy: 'force-cache',
      description: 'Cached indefinitely'
    }
  };
}

async function fetchWithNoCache() {
  // This demonstrates no-cache behavior
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/3', {
    cache: 'no-cache' // Always fetch fresh data
  });
  
  const data = await response.json();
  
  return {
    ...data,
    fetchedAt: new Date().toISOString(),
    cacheInfo: {
      strategy: 'no-cache',
      description: 'Always fresh data'
    }
  };
}

export default async function FetchCacheDemo() {
  const method = getCachingMethodById('fetch-cache');
  
  // Fetch with different caching strategies
  const [cachedData, forceCachedData, noCacheData] = await Promise.all([
    fetchWithCache(),
    fetchWithForceCache(), 
    fetchWithNoCache()
  ]);
  
  if (!method) {
    return <div>Method not found</div>;
  }

  const performanceData = {
    loadTime: 30, // Varies based on cache hits
    cacheHitRate: 75,
    dataSize: JSON.stringify(cachedData).length + JSON.stringify(forceCachedData).length + JSON.stringify(noCacheData).length,
    revalidationTime: 60,
    ttl: 60
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="hero">
        <h1>{method.name}</h1>
        <p>{method.description}</p>
        <Link href="/" style={{ color: '#4f46e5', textDecoration: 'none' }}>
          ← Back to Showcase
        </Link>
      </div>

      {/* Demo Content */}
      <div className="section">
        <h2>Live Demo</h2>
        
        {/* Revalidate Strategy */}
        <div className="method-card" style={{ marginBottom: '24px' }}>
          <h3>Fetch with Revalidate (60s)</h3>
          <div style={{ 
            background: '#f8fafc', 
            padding: '16px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            fontFamily: 'monospace'
          }}>
            <div><strong>Title:</strong> {cachedData.title}</div>
            <div><strong>User ID:</strong> {cachedData.userId}</div>
            <div><strong>Fetched At:</strong> {cachedData.fetchedAt}</div>
            <div><strong>Strategy:</strong> {cachedData.cacheInfo.strategy}</div>
            <div><strong>Revalidate After:</strong> {cachedData.cacheInfo.revalidateAfter}s</div>
          </div>
        </div>

        {/* Force Cache Strategy */}
        <div className="method-card" style={{ marginBottom: '24px' }}>
          <h3>Force Cache (Indefinite)</h3>
          <div style={{ 
            background: '#f8fafc', 
            padding: '16px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            fontFamily: 'monospace'
          }}>
            <div><strong>Title:</strong> {forceCachedData.title}</div>
            <div><strong>User ID:</strong> {forceCachedData.userId}</div>
            <div><strong>Fetched At:</strong> {forceCachedData.fetchedAt}</div>
            <div><strong>Strategy:</strong> {forceCachedData.cacheInfo.strategy}</div>
            <div><strong>Description:</strong> {forceCachedData.cacheInfo.description}</div>
          </div>
        </div>

        {/* No Cache Strategy */}
        <div className="method-card" style={{ marginBottom: '24px' }}>
          <h3>No Cache (Always Fresh)</h3>
          <div style={{ 
            background: '#f8fafc', 
            padding: '16px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            fontFamily: 'monospace'
          }}>
            <div><strong>Title:</strong> {noCacheData.title}</div>
            <div><strong>User ID:</strong> {noCacheData.userId}</div>
            <div><strong>Fetched At:</strong> {noCacheData.fetchedAt}</div>
            <div><strong>Strategy:</strong> {noCacheData.cacheInfo.strategy}</div>
            <div><strong>Description:</strong> {noCacheData.cacheInfo.description}</div>
          </div>
        </div>

        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '16px' }}>
          Three different fetch caching strategies demonstrated above. Notice how the timestamps
          and caching behavior differ based on the strategy used.
        </p>

        <CacheRefreshButton methodId="fetch-cache" />
        
        <CacheStatus 
          endpoint="/api/demos/fetch-cache"
          label="Fetch Cache Status"
          method="fetch()"
        />
      </div>

      {/* Performance Metrics */}
      <div className="section">
        <h2>Performance Metrics</h2>
        <PerformanceMetrics metrics={performanceData} />
      </div>

      {/* Code Example */}
      <div className="section">
        <h2>Implementation</h2>
        <CodeExample code={method.codeExample} language="typescript" />
      </div>

      {/* Benefits & Use Cases */}
      <div className="getting-started">
        <div className="getting-started-content">
          <div>
            <h3>Key Benefits</h3>
            <ul>
              {method.benefits.map((benefit, index) => (
                <li key={index}>• {benefit}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Use Cases</h3>
            <ul>
              {method.useCases.map((useCase, index) => (
                <li key={index}>• {useCase}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
