import Link from 'next/link';
import { getCachingMethodById } from '@/lib/demo-data';
import { PerformanceMetrics } from '@/components/performance-metrics';
import { CacheRefreshButton } from '@/components/cache-refresh-button';
import { CodeExample } from '@/components/code-example';

// Simulate dynamic route parameters
const sampleRoutes = [
  { id: 'user-123', type: 'User Profile', data: 'John Doe' },
  { id: 'product-456', type: 'Product Page', data: 'Next.js T-Shirt' },
  { id: 'post-789', type: 'Blog Post', data: 'Getting Started with Caching' }
];

async function getDynamicRouteData(routeId: string) {
  // Simulate fetching data based on route parameter
  await new Promise(resolve => setTimeout(resolve, 80));
  
  const route = sampleRoutes.find(r => r.id === routeId) || sampleRoutes[0];
  
  return {
    routeId,
    routeType: route.type,
    content: route.data,
    timestamp: new Date().toISOString(),
    cacheKey: `dynamic-route-${routeId}`,
    generatedAt: new Date().toISOString(),
    dynamicParams: {
      id: routeId,
      category: route.type.toLowerCase().replace(' ', '-'),
      cached: true
    },
    metadata: {
      revalidate: 120, // 2 minutes
      generateStaticParams: true,
      dynamicSegments: ['id']
    }
  };
}

export default async function DynamicRoutesDemo() {
  const method = getCachingMethodById('dynamic-routes');
  
  // Simulate being on a dynamic route - in real app this would come from params
  const currentRouteId = 'user-123';
  const routeData = await getDynamicRouteData(currentRouteId);
  
  if (!method) {
    return <div>Method not found</div>;
  }

  const performanceData = {
    loadTime: 12, // Fast for cached dynamic routes
    cacheHitRate: 88,
    dataSize: JSON.stringify(routeData).length,
    revalidationTime: 80,
    ttl: 120
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
        <div className="method-card">
          <h3>Dynamic Route Content</h3>
          <div style={{ 
            background: '#f8fafc', 
            padding: '16px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            fontFamily: 'monospace'
          }}>
            <div><strong>Route ID:</strong> {routeData.routeId}</div>
            <div><strong>Route Type:</strong> {routeData.routeType}</div>
            <div><strong>Content:</strong> {routeData.content}</div>
            <div><strong>Cache Key:</strong> {routeData.cacheKey}</div>
            <div><strong>Generated At:</strong> {routeData.generatedAt}</div>
            <div><strong>Revalidate Every:</strong> {routeData.metadata.revalidate}s</div>
            <div><strong>Static Params:</strong> {routeData.metadata.generateStaticParams ? 'Yes' : 'No'}</div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <h4>Sample Dynamic Routes:</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {sampleRoutes.map((route) => (
                <div 
                  key={route.id}
                  style={{
                    padding: '8px 12px',
                    background: route.id === currentRouteId ? '#dbeafe' : '#f3f4f6',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    border: route.id === currentRouteId ? '2px solid #3b82f6' : '1px solid #d1d5db'
                  }}
                >
                  <div><strong>/demos/{route.id}</strong></div>
                  <div style={{ color: '#6b7280' }}>{route.type}</div>
                </div>
              ))}
            </div>
          </div>
          
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '16px' }}>
            This demonstrates how dynamic routes can be statically generated and cached.
            Each route segment creates a unique cache entry that can be revalidated independently.
          </p>

          <CacheRefreshButton methodId="dynamic-routes" />
        </div>
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
