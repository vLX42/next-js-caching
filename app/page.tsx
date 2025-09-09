import { getAllCachingMethods, getBetaFeatureMethods } from '@/lib/demo-data';
import { CacheMethodCard } from '@/components/cache-method-card';

export default function HomePage() {
  const allMethods = getAllCachingMethods();
  const betaMethods = getBetaFeatureMethods();

  return (
    <main className="container">
      {/* Header */}
      <div className="hero">
        <h1>
          Next.js 15 Caching
          <span className="subtitle">Showcase</span>
        </h1>
        <p>
          Explore the newest and most powerful caching strategies in Next.js 15, 
          including beta features and performance optimizations.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#4f46e5' }}>{allMethods.length}</div>
          <div className="stat-label">Caching Strategies</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#f97316' }}>{betaMethods.length}</div>
          <div className="stat-label">Beta Features</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#10b981' }}>100%</div>
          <div className="stat-label">Next.js 15 Native</div>
        </div>
      </div>

      {/* Beta Features Highlight */}
      <div className="section">
        <h2>🚀 Beta & Cutting-Edge Features</h2>
        <div className="methods-grid">
          {betaMethods.map((method) => (
            <CacheMethodCard key={method.id} method={method} featured />
          ))}
        </div>
      </div>

      {/* All Caching Methods */}
      <div className="section">
        <h2>All Caching Strategies</h2>
        <div className="methods-grid">
          {allMethods.map((method) => (
            <CacheMethodCard key={method.id} method={method} />
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <div className="getting-started">
        <h2>🎯 Getting Started</h2>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>
          This showcase demonstrates the powerful caching capabilities in Next.js 15. 
          Each demo is interactive and shows real performance metrics.
        </p>
        <div className="getting-started-content">
          <div>
            <h3>What You&apos;ll Learn</h3>
            <ul>
              <li>• When to use each caching strategy</li>
              <li>• Performance impact measurements</li>
              <li>• Implementation best practices</li>
              <li>• Cache invalidation techniques</li>
            </ul>
          </div>
          <div>
            <h3>Interactive Features</h3>
            <ul>
              <li>• Live cache refresh demonstrations</li>
              <li>• Real-time performance monitoring</li>
              <li>• Code examples for each strategy</li>
              <li>• Cache hit/miss statistics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>
          Built with Next.js 15 • Showcasing native caching capabilities • 
          <a 
            href="https://github.com/peterbiro/next-js-caching" 
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source Code
          </a>
        </p>
      </div>
    </main>
  );
}
