/**
 * Demo data generator for the Next.js caching showcase
 */

import { CachingMethod } from './models/caching-method';

/**
 * Static demo data for caching methods
 */
export const cachingMethods: CachingMethod[] = [
  {
    id: 'static-generation',
    name: 'Static Generation',
    type: 'page',
    description: 'Pre-render pages at build time with optional revalidation using generateStaticParams and revalidate.',
    betaFeature: false,
    demoPath: '/demos/static-generation',
    codeExample: `export const revalidate = 60; // Revalidate every 60 seconds

export default async function StaticPage() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}`,
    benefits: [
      'Fastest possible page loads',
      'Excellent SEO performance',
      'Reduced server load',
      'Better Core Web Vitals'
    ],
    useCases: [
      'Marketing pages',
      'Blog posts',
      'Product catalogs',
      'Documentation sites'
    ]
  },
  {
    id: 'server-components',
    name: 'React Server Components',
    type: 'component',
    description: 'Automatic caching of Server Component payloads with smart invalidation.',
    betaFeature: true,
    demoPath: '/demos/server-components',
    codeExample: `async function ServerComponent() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 300 } // Cache for 5 minutes
  });
  
  return <div>{data}</div>;
}`,
    benefits: [
      'Automatic payload caching',
      'Reduced client-side JavaScript',
      'Better performance',
      'Seamless hydration'
    ],
    useCases: [
      'Data-heavy components',
      'Real-time dashboards',
      'User-specific content',
      'Complex layouts'
    ]
  },
  {
    id: 'api-routes',
    name: 'API Route Caching',
    type: 'api',
    description: 'Cache API responses using the new cache() API and Route Handlers.',
    betaFeature: true,
    demoPath: '/demos/api-routes',
    codeExample: `import { cache } from 'react';

const getData = cache(async () => {
  return await fetch('https://api.example.com/data');
});

export async function GET() {
  const data = await getData();
  return Response.json(data);
}`,
    benefits: [
      'Reduced database queries',
      'Faster API responses',
      'Lower server costs',
      'Better scalability'
    ],
    useCases: [
      'Database queries',
      'External API calls',
      'Computed data',
      'Authentication checks'
    ]
  },
  {
    id: 'use-cache-directive',
    name: '"use cache" Directive',
    type: 'page',
    description: 'Next.js 15\'s newest caching directive for route and component-level caching.',
    betaFeature: true,
    demoPath: '/demos/use-cache-directive',
    codeExample: `'use cache'

import { unstable_cacheLife as cacheLife } from 'next/cache';

export default async function MyPage() {
  cacheLife('hours'); // Built-in cache profiles
  
  const data = await expensiveOperation();
  return <div>{data}</div>;
}`,
    benefits: [
      'Future replacement for unstable_cache',
      'Built-in cache profiles',
      'Route-level caching',
      'Automatic serialization',
      'Nested caching support'
    ],
    useCases: [
      'Entire page caching',
      'Component-level caching',
      'Function caching',
      'API routes',
      'Static content'
    ]
  },
  {
    id: 'cache-tags',
    name: 'Cache Tags & Selective Revalidation',
    type: 'function',
    description: 'Use cache tags for fine-grained cache invalidation with revalidateTag().',
    betaFeature: true,
    demoPath: '/demos/cache-tags',
    codeExample: `'use cache'

import { unstable_cacheTag as cacheTag, revalidateTag } from 'next/cache';

async function getUserData() {
  'use cache'
  cacheTag('user-data');
  return await fetchUserData();
}

// Selectively revalidate only user data
await revalidateTag('user-data');`,
    benefits: [
      'Selective cache invalidation',
      'Fine-grained control',
      'Performance optimization',
      'Logical data grouping',
      'On-demand revalidation'
    ],
    useCases: [
      'User-specific data',
      'Content management',
      'E-commerce catalogs',
      'Real-time updates',
      'Multi-tenant apps'
    ]
  },
  {
    id: 'function-cache',
    name: 'Function-Level Caching',
    type: 'function',
    description: 'Cache expensive function calls using the "use cache" directive for granular control.',
    betaFeature: true,
    demoPath: '/demos/function-cache',
    codeExample: `async function expensiveCalculation(input: string) {
  "use cache";
  
  // Expensive operation
  return performComplexCalculation(input);
}

// Function is automatically cached when called
const result = await expensiveCalculation("data");`,
    benefits: [
      'Cache specific functions',
      'Automatic cache management',
      'Memory efficient',
      'Future-proof syntax'
    ],
    useCases: [
      'Complex calculations',
      'Data transformations',
      'Machine learning inference',
      'Image processing'
    ]
  },
  {
    id: 'fetch-cache',
    name: 'fetch() Caching',
    type: 'data',
    description: 'Built-in fetch() caching with Request Memoization and revalidation.',
    betaFeature: false,
    demoPath: '/demos/fetch-cache',
    codeExample: `// Automatic caching with revalidation
const response = await fetch('https://api.example.com/data', {
  next: { 
    revalidate: 60,
    tags: ['api-data'] 
  }
});

// Manual cache invalidation
import { revalidateTag } from 'next/cache';
await revalidateTag('api-data');`,
    benefits: [
      'Automatic request deduplication',
      'Built-in revalidation',
      'Tag-based invalidation',
      'Zero configuration'
    ],
    useCases: [
      'External API calls',
      'Database queries',
      'File system reads',
      'Remote data fetching'
    ]
  },
  {
    id: 'isr',
    name: 'Incremental Static Regeneration',
    type: 'page',
    description: 'Enhanced ISR with on-demand revalidation and improved caching strategies.',
    betaFeature: false,
    demoPath: '/demos/isr',
    codeExample: `export const revalidate = 60; // Background revalidation

export default async function ISRPage({ params }) {
  const data = await fetch(\`https://api.example.com/\${params.id}\`);
  return <div>{data}</div>;
}

// On-demand revalidation
import { revalidatePath } from 'next/cache';
await revalidatePath('/demos/isr/[id]');`,
    benefits: [
      'Static performance',
      'Fresh content',
      'On-demand updates',
      'Scalable architecture'
    ],
    useCases: [
      'E-commerce products',
      'News articles',
      'User profiles',
      'Dynamic content'
    ]
  },
  {
    id: 'dynamic-routes',
    name: 'Dynamic Route Caching',
    type: 'page',
    description: 'Cache dynamic routes using generateStaticParams with smart pregeneration.',
    betaFeature: false,
    demoPath: '/demos/dynamic-routes',
    codeExample: `export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts');
  return posts.map(post => ({ id: post.id }));
}

export default async function DynamicPage({ params }) {
  const post = await fetch(\`https://api.example.com/posts/\${params.id}\`);
  return <div>{post.title}</div>;
}`,
    benefits: [
      'Pregenerated dynamic pages',
      'Reduced build times',
      'Smart caching',
      'SEO optimization'
    ],
    useCases: [
      'Blog posts',
      'Product pages',
      'User profiles',
      'Category pages'
    ]
  },
  {
    id: 'streaming-ssr',
    name: 'Streaming SSR',
    type: 'component',
    description: 'Stream server-rendered content with Suspense boundaries and progressive caching.',
    betaFeature: true,
    demoPath: '/demos/streaming-ssr',
    codeExample: `import { Suspense } from 'react';

export default function StreamingPage() {
  return (
    <div>
      <h1>Instant Content</h1>
      <Suspense fallback={<Loading />}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}

async function SlowComponent() {
  const data = await slowApiCall();
  return <div>{data}</div>;
}`,
    benefits: [
      'Progressive loading',
      'Better perceived performance',
      'Reduced TTFB',
      'Improved user experience'
    ],
    useCases: [
      'Data-heavy pages',
      'Real-time content',
      'Personalized experiences',
      'Large applications'
    ]
  }
];

/**
 * Get all caching methods
 */
export function getAllCachingMethods(): CachingMethod[] {
  return cachingMethods;
}

/**
 * Get a specific caching method by ID
 */
export function getCachingMethodById(id: string): CachingMethod | undefined {
  return cachingMethods.find(method => method.id === id);
}

/**
 * Get caching methods by type
 */
export function getCachingMethodsByType(type: CachingMethod['type']): CachingMethod[] {
  return cachingMethods.filter(method => method.type === type);
}

/**
 * Get beta feature methods
 */
export function getBetaFeatureMethods(): CachingMethod[] {
  return cachingMethods.filter(method => method.betaFeature);
}

/**
 * Generate demo data with artificial delay
 */
export async function generateDemoData(type: 'fast' | 'slow' | 'dynamic' | 'static', delay = 0): Promise<any> {
  if (delay > 0) {
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  const timestamp = new Date().toISOString();
  const id = Math.random().toString(36).substr(2, 9);

  switch (type) {
    case 'fast':
      return {
        id,
        type: 'fast',
        content: 'This is fast cached content',
        timestamp,
        cached: true,
        loadTime: 5
      };
    
    case 'slow':
      return {
        id,
        type: 'slow',
        content: 'This is slow content that benefits from caching',
        timestamp,
        cached: false,
        loadTime: 2000
      };
    
    case 'dynamic':
      return {
        id,
        type: 'dynamic',
        content: `Dynamic content generated at ${timestamp}`,
        timestamp,
        cached: false,
        loadTime: Math.random() * 1000
      };
    
    case 'static':
      return {
        id: 'static-content',
        type: 'static',
        content: 'This is static content that never changes',
        timestamp: '2025-01-01T00:00:00.000Z',
        cached: true,
        loadTime: 1
      };
    
    default:
      throw new Error(`Unknown demo data type: ${type}`);
  }
}
