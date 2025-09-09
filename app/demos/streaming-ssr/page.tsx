import Link from 'next/link';
import { getCachingMethodById } from '@/lib/demo-data';
import { PerformanceMetrics } from '@/components/performance-metrics';
import { CacheRefreshButton } from '@/components/cache-refresh-button';
import { CodeExample } from '@/components/code-example';
import { Suspense } from 'react';

// Fast content that loads immediately
async function FastContent() {
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return (
    <div style={{ 
      background: '#f0fdf4', 
      padding: '16px', 
      borderRadius: '8px',
      border: '1px solid #bbf7d0'
    }}>
      <h4>⚡ Fast Content (50ms)</h4>
      <p>This content loads quickly and is cached at the CDN level.</p>
      <p><strong>Loaded at:</strong> {new Date().toISOString()}</p>
    </div>
  );
}

// Slow content that loads with delay
async function SlowContent() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return (
    <div style={{ 
      background: '#fef3c7', 
      padding: '16px', 
      borderRadius: '8px',
      border: '1px solid #fcd34d'
    }}>
      <h4>🐌 Slow Content (1000ms)</h4>
      <p>This content takes longer to load but streams in progressively.</p>
      <p><strong>Loaded at:</strong> {new Date().toISOString()}</p>
      <p>Complex data processing completed: {Math.floor(Math.random() * 1000000)} operations</p>
    </div>
  );
}

// Loading component
function LoadingFallback({ text }: { text: string }) {
  return (
    <div style={{ 
      background: '#f3f4f6', 
      padding: '16px', 
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: '8px' }}>⏳ Loading {text}...</div>
      <div style={{ 
        width: '100%', 
        height: '4px', 
        background: '#e5e7eb', 
        borderRadius: '2px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{ 
          width: '20%', 
          height: '100%', 
          background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
          borderRadius: '2px',
          position: 'absolute',
          animation: 'loading 1.5s ease-in-out infinite'
        }} />
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes loading {
            0% { transform: translateX(-100%) }
            100% { transform: translateX(100%) }
          }
        `
      }} />
    </div>
  );
}

export default async function StreamingSSRDemo() {
  const method = getCachingMethodById('streaming-ssr');
  
  if (!method) {
    return <div>Method not found</div>;
  }

  const performanceData = {
    loadTime: 25, // Good perceived performance
    cacheHitRate: 80,
    dataSize: 2048, // Estimated
    revalidationTime: 500,
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
          <h3>Streaming Content</h3>
          
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '16px' }}>
            This page demonstrates streaming SSR where fast content loads immediately
            while slow content streams in progressively. Watch how the page becomes 
            interactive before all content is loaded.
          </p>

          {/* Fast content loads immediately */}
          <div style={{ marginBottom: '16px' }}>
            <Suspense fallback={<LoadingFallback text="fast content" />}>
              <FastContent />
            </Suspense>
          </div>

          {/* Slow content streams in later */}
          <div style={{ marginBottom: '16px' }}>
            <Suspense fallback={<LoadingFallback text="slow content" />}>
              <SlowContent />
            </Suspense>
          </div>

          <div style={{ 
            background: '#eff6ff', 
            padding: '16px', 
            borderRadius: '8px',
            border: '1px solid #bfdbfe',
            marginBottom: '16px'
          }}>
            <h4>🚀 Streaming Benefits:</h4>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Fast Time to First Byte (TTFB)</li>
              <li>Progressive content loading</li>
              <li>Better perceived performance</li>
              <li>SEO-friendly server-side rendering</li>
              <li>Cached at multiple levels</li>
            </ul>
          </div>

          <CacheRefreshButton methodId="streaming-ssr" />
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
