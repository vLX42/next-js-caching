import Link from 'next/link';
import { getCachingMethodById } from '@/lib/demo-data';
import { PerformanceMetrics } from '@/components/performance-metrics';
import { CacheRefreshButton } from '@/components/cache-refresh-button';
import { CodeExample } from '@/components/code-example';

// This demonstrates Static Generation with revalidation
export const revalidate = 60; // Revalidate every 60 seconds

async function getStaticData() {
  // Simulate data fetching with some delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    timestamp: new Date().toISOString(),
    data: 'This content was statically generated and cached',
    randomValue: Math.floor(Math.random() * 1000),
    buildInfo: {
      generatedAt: new Date().toISOString(),
      cacheKey: 'static-generation-demo',
      revalidateTime: 60
    }
  };
}

export default async function StaticGenerationDemo() {
  const method = getCachingMethodById('static-generation');
  const staticData = await getStaticData();
  
  if (!method) {
    return <div>Method not found</div>;
  }

  const performanceData = {
    loadTime: 5, // Very fast due to static generation
    cacheHitRate: 95,
    dataSize: JSON.stringify(staticData).length,
    revalidationTime: 100,
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
        <div className="method-card">
          <h3>Statically Generated Content</h3>
          <div style={{ 
            background: '#f8fafc', 
            padding: '16px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            fontFamily: 'monospace'
          }}>
            <div><strong>Content:</strong> {staticData.data}</div>
            <div><strong>Generated At:</strong> {staticData.buildInfo.generatedAt}</div>
            <div><strong>Random Value:</strong> {staticData.randomValue}</div>
            <div><strong>Cache Key:</strong> {staticData.buildInfo.cacheKey}</div>
            <div><strong>Revalidate Every:</strong> {staticData.buildInfo.revalidateTime} seconds</div>
          </div>
          
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '16px' }}>
            This content is generated at build time and cached. It will be regenerated 
            in the background every 60 seconds when a request comes in.
          </p>

          <CacheRefreshButton methodId="static-generation" />
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
