'use cache'

import Link from 'next/link';
import { getCachingMethodById } from '@/lib/demo-data';
import { PerformanceMetrics } from '@/components/performance-metrics';
import { CacheRefreshButton } from '@/components/cache-refresh-button';
import { CodeExample } from '@/components/code-example';
import { CacheStatus } from '@/components/cache-status';
import { CacheTagButtons } from '@/components/cache-tag-buttons';
import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from 'next/cache';

async function getCachedUserData() {
  'use cache'
  cacheLife('minutes');
  cacheTag('user-data');
  
  // Simulate expensive user data fetch
  await new Promise(resolve => setTimeout(resolve, 150));
  
  return {
    id: 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
    lastLogin: new Date().toISOString(),
    preferences: {
      theme: 'dark',
      notifications: true
    },
    fetchedAt: new Date().toISOString()
  };
}

async function getCachedPosts() {
  'use cache'
  cacheLife('hours');
  cacheTag('posts');
  
  // Simulate expensive posts fetch
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: 1,
      title: 'Understanding Next.js 15 Caching',
      content: 'The new caching system is amazing...',
      author: 'John Doe',
      publishedAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Cache Tags for Selective Revalidation',
      content: 'Cache tags allow fine-grained control...',
      author: 'John Doe',
      publishedAt: new Date().toISOString()
    }
  ];
}

export default async function CacheTagDemo() {
  cacheLife('default'); // Page-level cache
  
  const method = getCachingMethodById('cache-tags');
  
  // These functions have different cache tags
  const userData = await getCachedUserData();
  const posts = await getCachedPosts();
  
  if (!method) {
    return <div>Method not found</div>;
  }

  const performanceData = {
    metrics: {
      loadTime: 8,
      cacheHitRate: 94,
      dataSize: JSON.stringify({ userData, posts }).length,
      revalidationTime: 150,
      ttl: 300 // 5 minutes for user data
    }
  };

  const codeExample = `'use cache'

import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from 'next/cache';

async function getUserData() {
  'use cache'
  cacheLife('minutes');
  cacheTag('user-data'); // Specific tag for this data
  
  return await fetchUserData();
}

async function getPosts() {
  'use cache'  
  cacheLife('hours');
  cacheTag('posts'); // Different tag for posts
  
  return await fetchPosts();
}

// Revalidate specific cached data
import { revalidateTag } from 'next/cache';

// Only revalidate user data, posts remain cached
await revalidateTag('user-data');`;

  return (
    <div className="container">
      {/* Header */}
      <div className="hero">
        <h1>🏷️ {method.name}</h1>
        <p>{method.description}</p>
        <Link href="/" style={{ color: '#4f46e5', textDecoration: 'none' }}>
          ← Back to Showcase
        </Link>
      </div>

      {/* Cache Status */}
      <CacheStatus 
        endpoint="/api/demos/cache-tags/status"
        label="Tagged Cache Status"
        method="cacheTag"
      />

      {/* Demo Content */}
      <div className="demo-section">
        <h2>👤 User Data (tag: &apos;user-data&apos;)</h2>
        <div className="card">
          <pre style={{ 
            background: '#f8fafc', 
            padding: '1rem', 
            borderRadius: '8px',
            overflow: 'auto'
          }}>
            {JSON.stringify(userData, null, 2)}
          </pre>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '1rem' }}>
            ⏱️ Cache Life: 5 minutes | 🏷️ Tag: &apos;user-data&apos;
          </p>
        </div>
      </div>

      <div className="demo-section">
        <h2>📝 Posts (tag: &apos;posts&apos;)</h2>
        <div className="card">
          <pre style={{ 
            background: '#f8fafc', 
            padding: '1rem', 
            borderRadius: '8px',
            overflow: 'auto'
          }}>
            {JSON.stringify(posts, null, 2)}
          </pre>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '1rem' }}>
            ⏱️ Cache Life: 1 hour | 🏷️ Tag: &apos;posts&apos;
          </p>
        </div>
      </div>

      {/* Performance Metrics */}
      <PerformanceMetrics metrics={performanceData.metrics} />

      {/* Code Example */}
      <CodeExample 
        code={codeExample}
        language="typescript"
      />

      {/* Cache Controls */}
            {/* Cache Controls */}
      <CacheTagButtons />

      {/* Key Features */}
      <div className="demo-section">
        <h2>✨ Key Features</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>✅ <strong>Selective revalidation</strong>: Revalidate only specific cached data</li>
          <li>✅ <strong>Fine-grained control</strong>: Different cache lifetimes per tag</li>
          <li>✅ <strong>API integration</strong>: revalidateTag() for on-demand updates</li>
          <li>✅ <strong>Performance optimization</strong>: Keep unrelated data cached</li>
          <li>✅ <strong>Tag-based organization</strong>: Logical grouping of cached content</li>
        </ul>
      </div>
    </div>
  );
}
