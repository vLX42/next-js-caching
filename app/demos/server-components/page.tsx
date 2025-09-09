import Link from 'next/link';
import { getCachingMethodById } from '@/lib/demo-data';
import { PerformanceMetrics } from '@/components/performance-metrics';
import { CacheRefreshButton } from '@/components/cache-refresh-button';
import { CodeExample } from '@/components/code-example';

// Server Component that runs on the server
async function ServerDataComponent() {
  "use cache";
  // This runs on the server and is cached
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return {
    timestamp: new Date().toISOString(),
    serverInfo: {
      processId: process.pid,
      nodeVersion: process.version,
      platform: process.platform
    },
    randomData: Math.floor(Math.random() * 1000)
  };
}

export default async function ServerComponentsDemo() {
  const method = getCachingMethodById('server-components');
  const serverData = await ServerDataComponent();
  
  if (!method) {
    return <div>Method not found</div>;
  }

  const performanceData = {
    loadTime: 15, // Moderate due to server processing
    cacheHitRate: 85,
    dataSize: JSON.stringify(serverData).length,
    revalidationTime: 50,
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
          <h3>Server Component Data</h3>
          <div style={{ 
            background: '#f8fafc', 
            padding: '16px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            fontFamily: 'monospace'
          }}>
            <div><strong>Server Timestamp:</strong> {serverData.timestamp}</div>
            <div><strong>Process ID:</strong> {serverData.serverInfo.processId}</div>
            <div><strong>Node Version:</strong> {serverData.serverInfo.nodeVersion}</div>
            <div><strong>Platform:</strong> {serverData.serverInfo.platform}</div>
            <div><strong>Random Data:</strong> {serverData.randomData}</div>
          </div>
          
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '16px' }}>
            This data is generated on the server and automatically cached. Server Components
            reduce client-side JavaScript and improve performance.
          </p>

          <CacheRefreshButton methodId="server-components" />
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
