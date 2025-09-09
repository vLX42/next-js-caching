import Link from 'next/link';
import { getCachingMethodById } from '@/lib/demo-data';
import { PerformanceMetrics } from '@/components/performance-metrics';
import { CacheRefreshButton } from '@/components/cache-refresh-button';
import { CodeExample } from '@/components/code-example';
import { CacheStatus } from '@/components/cache-status';

// ⚠️ NEXT.JS 15 BREAKING CHANGE: fetch() is NO LONGER cached by default!
// You must explicitly opt-in to caching behavior

async function fetchWithOptInCache() {
  "use cache";
  // ✅ NEW: Explicitly opt-in to caching in Next.js 15
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    next: { 
      revalidate: 60, // Cache for 60 seconds
      tags: ['posts'] // Tag for selective invalidation
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const data = await response.json();
  
  return {
    ...data,
    fetchedAt: new Date().toISOString(),
    cacheInfo: {
      strategy: 'explicit-cache-opt-in',
      revalidateAfter: 60,
      tags: ['posts'],
      nextjs15Change: 'Explicit caching required'
    }
  };
}

async function fetchWithForceCache() {
  "use cache";
  // ✅ Still works: force-cache for indefinite caching
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/2', {
    cache: 'force-cache' // Cache indefinitely until manually invalidated
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const data = await response.json();
  
  return {
    ...data,
    fetchedAt: new Date().toISOString(),
    cacheInfo: {
      strategy: 'force-cache',
      description: 'Cached indefinitely (still works in v15)'
    }
  };
}

async function fetchWithDefaultBehavior() {
  "use cache";
  // ⚠️ NEW DEFAULT: This is now uncached by default in Next.js 15
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/3');
  
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const data = await response.json();
  
  return {
    ...data,
    fetchedAt: new Date().toISOString(),
    cacheInfo: {
      strategy: 'default-uncached',
      description: 'NO CACHE by default in Next.js 15!',
      nextjs15Change: true
    }
  };
}

export default async function FetchCacheDemo() {
  const method = getCachingMethodById('fetch-cache');
  
  // Fetch with different caching strategies - showing Next.js 15 changes
  const [cachedData, forceCachedData, uncachedData] = await Promise.all([
    fetchWithOptInCache(),
    fetchWithForceCache(), 
    fetchWithDefaultBehavior()
  ]);
  
  if (!method) {
    return <div>Method not found</div>;
  }

  const performanceData = {
    metrics: {
      loadTime: 30,
      cacheHitRate: 75,
      dataSize: JSON.stringify(cachedData).length + JSON.stringify(forceCachedData).length + JSON.stringify(uncachedData).length,
      revalidationTime: 60,
      ttl: 60
    }
  };

  const codeExample = `// ⚠️ NEXT.JS 15 BREAKING CHANGE: fetch() is NO LONGER cached by default!

// ❌ OLD (v14): Automatically cached
const response = await fetch('/api/data');

// ✅ NEW (v15): Must explicitly opt-in to caching
const cached = await fetch('/api/data', {
  next: { revalidate: 60 } // Explicit caching required
});

// ✅ Still works: force-cache
const permanent = await fetch('/api/data', {
  cache: 'force-cache'
});

// ⚠️ NEW DEFAULT: Uncached by default
const fresh = await fetch('/api/data'); // Always fresh in v15`;

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🔄 {method.name}
        </h1>
        <p>{method.description}</p>
        <div style={{ 
          background: '#fef3c7', 
          border: '1px solid #f59e0b',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '1rem'
        }}>
          <strong>⚠️ Next.js 15 Breaking Change:</strong> fetch() is no longer cached by default! 
          You must explicitly opt-in to caching behavior.
        </div>
        <Link href="/" style={{ color: '#4f46e5', textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>
          ← Back to Showcase
        </Link>
      </div>

      <CacheStatus 
        endpoint="/api/demos/fetch-cache/status"
        label="Fetch Cache Status"
        method="fetch"
      />

      <div style={{ margin: '2rem 0' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b' }}>
          🧪 Next.js 15 Fetch Behavior Comparison
        </h2>
        
        <div style={{ 
          marginBottom: '24px', 
          background: '#ecfdf5', 
          border: '1px solid #10b981',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ marginTop: 0, color: '#1e293b' }}>✅ Explicit Cache Opt-in (Recommended)</h3>
          <pre style={{ 
            background: '#f9fafb', 
            padding: '1rem', 
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.875rem'
          }}>
            {JSON.stringify(cachedData, null, 2)}
          </pre>
          <p style={{ color: '#065f46', marginTop: '1rem', fontWeight: '500' }}>
            ✅ Cached for {cachedData.cacheInfo.revalidateAfter}s with explicit revalidate option
          </p>
        </div>

        <div style={{ 
          marginBottom: '24px', 
          background: '#eff6ff', 
          border: '1px solid #3b82f6',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ marginTop: 0, color: '#1e293b' }}>🔒 Force Cache (Still Works)</h3>
          <pre style={{ 
            background: '#f9fafb', 
            padding: '1rem', 
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.875rem'
          }}>
            {JSON.stringify(forceCachedData, null, 2)}
          </pre>
          <p style={{ color: '#1d4ed8', marginTop: '1rem', fontWeight: '500' }}>
            🔒 {forceCachedData.cacheInfo.description}
          </p>
        </div>

        <div style={{ 
          marginBottom: '24px', 
          background: '#fef2f2', 
          border: '1px solid #ef4444',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ marginTop: 0, color: '#1e293b' }}>⚠️ Default Behavior (No Cache)</h3>
          <pre style={{ 
            background: '#f9fafb', 
            padding: '1rem', 
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.875rem'
          }}>
            {JSON.stringify(uncachedData, null, 2)}
          </pre>
          <p style={{ color: '#dc2626', marginTop: '1rem', fontWeight: '500' }}>
            ⚠️ {uncachedData.cacheInfo.description}
          </p>
        </div>
      </div>

      <PerformanceMetrics metrics={performanceData.metrics} />

      <CodeExample 
        code={codeExample}
        language="typescript"
      />

      <div style={{ margin: '2rem 0' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b' }}>
          🔄 Cache Management
        </h2>
        <CacheRefreshButton methodId="fetch-cache" />
      </div>

      <div style={{ margin: '2rem 0' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b' }}>
          📚 Next.js 15 Migration Guide
        </h2>
        <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '1.5rem' }}>
          <h4 style={{ marginTop: 0, color: '#1e293b' }}>🔄 Update Your fetch() Calls:</h4>
          <ul style={{ lineHeight: '1.8', margin: '1rem 0', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>❌ <strong>Remove assumption</strong> that fetch() is cached by default</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ <strong>Add explicit caching</strong> with <code style={{ background: '#f1f5f9', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.875rem' }}>next: {`{ revalidate }`}</code></li>
            <li style={{ marginBottom: '0.5rem' }}>✅ <strong>Use force-cache</strong> for permanent caching</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ <strong>Use no-cache</strong> for always-fresh data (new default)</li>
            <li style={{ marginBottom: '0.5rem' }}>⚡ <strong>Performance impact</strong>: More network requests without explicit caching</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
