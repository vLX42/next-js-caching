import Link from 'next/link';
import { getCachingMethodById } from '@/lib/demo-data';
import { PerformanceMetrics } from '@/components/performance-metrics';
import { CacheRefreshButton } from '@/components/cache-refresh-button';
import { CodeExample } from '@/components/code-example';
import { CacheStatus } from '@/components/cache-status';

// Expensive computation that we want to cache using "use cache" directive
async function expensiveComputation(input: string) {
  "use cache";
  
  console.log('Running expensive computation for:', input);
  // Simulate expensive operation
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    input,
    result: input.split('').reverse().join(''),
    computedAt: new Date().toISOString(),
    iterations: Math.floor(Math.random() * 1000000),
    processingTime: 200
  };
}

export default async function FunctionCacheDemo() {
  const method = getCachingMethodById('function-cache');
  
  // This will be cached after the first call using "use cache" directive
  const computationResult = await expensiveComputation('next-js-caching-demo');
  
  if (!method) {
    return <div>Method not found</div>;
  }

  const performanceData = {
    loadTime: 10, // Fast due to function caching
    cacheHitRate: 95,
    dataSize: JSON.stringify(computationResult).length,
    revalidationTime: 200,
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
          <h3>Cached Function Result</h3>
          <div style={{ 
            background: '#f8fafc', 
            padding: '16px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            fontFamily: 'monospace'
          }}>
            <div><strong>Input:</strong> {computationResult.input}</div>
            <div><strong>Result:</strong> {computationResult.result}</div>
            <div><strong>Computed At:</strong> {computationResult.computedAt}</div>
            <div><strong>Iterations:</strong> {computationResult.iterations.toLocaleString()}</div>
            <div><strong>Processing Time:</strong> {computationResult.processingTime}ms</div>
          </div>
          
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '16px' }}>
            This expensive computation is cached using Next.js 15&apos;s &quot;use cache&quot; directive.
            The result is cached automatically, making subsequent calls instant.
          </p>

          <CacheRefreshButton methodId="function-cache" />
          
          <CacheStatus 
            endpoint="/api/demos/function-cache"
            label="Function Cache Status"
            method="use-cache"
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
