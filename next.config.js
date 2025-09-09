/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable newest Next.js 15 caching features
    useCache: true,           // Enable 'use cache' directive (replacement for unstable_cache)
    cacheComponents: true,    // Enable component-level caching
    cacheLife: {
      // Custom cache profiles for different use cases
      blog: {
        stale: 60 * 60 * 24,        // 1 day
        revalidate: 60 * 60,        // 1 hour
        expire: 60 * 60 * 24 * 7,   // 1 week
      },
      api: {
        stale: 60,                  // 1 minute
        revalidate: 30,             // 30 seconds
        expire: 60 * 5,             // 5 minutes
      },
      static: {
        stale: 60 * 60 * 24 * 30,   // 30 days
        revalidate: 60 * 60 * 24,   // 1 day
        expire: 60 * 60 * 24 * 365, // 1 year
      }
    }
  },
  serverExternalPackages: [],
  // Enable caching optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configure headers for caching demos
  async headers() {
    return [
      {
        source: '/api/demo-data/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=30',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
