import Link from 'next/link';
import { getCachingMethodById } from '@/lib/demo-data';
import { PerformanceMetrics } from '@/components/performance-metrics';
import { CacheRefreshButton } from '@/components/cache-refresh-button';
import { CodeExample } from '@/components/code-example';

// This will fetch from our cached API route
async function fetchApiData() {
  "use cache";
  try {
    const response = await fetch('http://localhost:3001/api/demos/cached-data', {
      cache: 'force-cache', // Force caching of the API response
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch API data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching API data:', error);
    return {
      timestamp: new Date().toISOString(),
      data: 'Fallback data - API not available',
      cached: false,
      error: true
    };
  }
}

export default async function ApiRoutesDemo() {
  const method = getCachingMethodById('api-routes');
  const apiData = await fetchApiData();
  
  if (!method) {
    return <div>Method not found</div>;
  }

  const performanceData = {
    loadTime: 20, // API call overhead
    cacheHitRate: 90,
    dataSize: JSON.stringify(apiData).length,
    revalidationTime: 300,
    ttl: 300 // 5 minutes
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
          <h3>Cached API Response</h3>
          <div style={{ 
            background: '#f8fafc', 
            padding: '16px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            fontFamily: 'monospace'
          }}>
            <div><strong>API Response:</strong> {apiData.data}</div>
            <div><strong>Timestamp:</strong> {apiData.timestamp}</div>
            <div><strong>Cached:</strong> {apiData.cached ? 'Yes' : 'No'}</div>
            <div><strong>Cache Key:</strong> {apiData.cacheKey || 'N/A'}</div>
            {apiData.error && (
              <div style={{ color: '#ef4444' }}>
                <strong>Status:</strong> Using fallback data (API unavailable)
              </div>
            )}
          </div>
          
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '16px' }}>
            This data comes from a cached API route. The response is cached for 5 minutes
            and automatically revalidated when needed.
          </p>

          <CacheRefreshButton methodId="api-routes" />
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
