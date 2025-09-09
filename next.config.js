/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable experimental features for Next.js 15
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
