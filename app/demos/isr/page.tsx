import Link from 'next/link';
import { getCachingMethodById } from '@/lib/demo-data';
import { PerformanceMetrics } from '@/components/performance-metrics';
import { CacheRefreshButton } from '@/components/cache-refresh-button';
import { CodeExample } from '@/components/code-example';
import { CacheStatus } from '@/components/cache-status';

// ISR with background revalidation
export const revalidate = 30; // Revalidate every 30 seconds

async function getISRData() {
  // Simulate data fetching
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const now = new Date();
  
  return {
    timestamp: now.toISOString(),
    data: 'Content generated with Incremental Static Regeneration',
    pageViews: Math.floor(Math.random() * 10000),
    lastRegenerated: now.toISOString(),
    nextRevalidation: new Date(now.getTime() + 30 * 1000).toISOString(),
    isrConfig: {
      revalidateInterval: 30,
      regenerationStrategy: 'background',
      fallbackBehavior: 'blocking'
    },
    contentHash: Math.random().toString(36).substring(7)
  };
}

export default async function ISRDemo() {
  const method = getCachingMethodById('isr');
  const isrData = await getISRData();
  
  if (!method) {
    return <div>Method not found</div>;
  }

  const performanceData = {
    loadTime: 8, // Very fast for cached content
    cacheHitRate: 92,
    dataSize: JSON.stringify(isrData).length,
    revalidationTime: 150,
    ttl: 30
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
          <h3>ISR Content</h3>
          <div style={{ 
            background: '#f8fafc', 
            padding: '16px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            fontFamily: 'monospace'
          }}>
            <div><strong>Content:</strong> {isrData.data}</div>
            <div><strong>Generated At:</strong> {isrData.timestamp}</div>
            <div><strong>Page Views:</strong> {isrData.pageViews.toLocaleString()}</div>
            <div><strong>Last Regenerated:</strong> {isrData.lastRegenerated}</div>
            <div><strong>Next Revalidation:</strong> {isrData.nextRevalidation}</div>
            <div><strong>Content Hash:</strong> {isrData.contentHash}</div>
            <div><strong>Revalidate Interval:</strong> {isrData.isrConfig.revalidateInterval}s</div>
          </div>
          
          <div style={{ 
            background: '#fef3c7', 
            padding: '12px', 
            borderRadius: '6px', 
            marginBottom: '16px',
            fontSize: '0.9rem'
          }}>
            <strong>ISR Behavior:</strong> This page is statically generated at build time, 
            then regenerated in the background every 30 seconds when traffic comes in. 
            Users always get fast static content while fresh content is generated behind the scenes.
          </div>

          <CacheRefreshButton methodId="isr" />
          
          <CacheStatus 
            endpoint="/api/demos/isr"
            label="ISR Cache Status"
            method="ISR"
          />
           <CacheStatus 
             endpoint="/api/demos/isr"
             label="ISR Cache Status"
             method="ISR"
           />
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
