# Next.js 15 Caching Showcase

> ⚠️ **Next.js 15 Breaking Changes**: This demo showcases the **newest** caching patterns including breaking changes where `fetch()` is no longer cached by default and new experimental features like `"use cache"` directive.

A comprehensive demonstration of **cutting-edge** caching strategies available in Next.js 15, featuring the latest caching approaches with live examples and performance metrics.

## 🆕 Next.js 15 Key Changes

### ⚠️ Breaking Changes
- **`fetch()` no longer cached by default** - Must explicitly opt-in with `next: { revalidate }`
- **Router cache behavior changes** - Pages segments opt out by default
- **Updated route segment config** - New caching options

### ✨ New Features  
- **`"use cache"` directive** - Future replacement for `unstable_cache`
- **`cacheLife` API** - Built-in cache profiles (seconds, minutes, hours, days, weeks, max)
- **`cacheTag` functions** - Enhanced selective revalidation
- **Component-level caching** - Cache individual React components
- **Nested caching support** - Different cache lifetimes per component

## 🚀 Features

- **10+ Caching Strategies**: Complete coverage of Next.js 15 caching methods (including newest experimental features)
- **Live Demos**: Interactive examples with real-time cache status
- **Performance Metrics**: Visual performance data for each strategy
- **Code Examples**: Detailed implementation examples with Next.js 15 updates
- **Real-time Cache Status**: Live monitoring of cache hit/miss rates
- **TypeScript**: Full type safety throughout the application

## 📋 Caching Methods Demonstrated

### 🆕 Latest Next.js 15 Features
1. **"use cache" Directive** - Next.js 15's newest caching approach
2. **Cache Tags & Selective Revalidation** - Fine-grained cache invalidation
3. **Updated fetch() Patterns** - Explicit opt-in caching (breaking change)

### 🔧 Core Caching Strategies  
4. **Static Generation** - Pre-rendered pages at build time
5. **Server Components** - React Server Components with caching
6. **API Route Caching** - HTTP caching for API endpoints
7. **Function-Level Caching** - `"use cache"` directive for expensive operations
8. **Incremental Static Regeneration (ISR)** - Background revalidation
9. **Dynamic Route Caching** - Cache dynamic routes with parameters
10. **Streaming SSR** - Server-side rendering with progressive loading

## 🛠 Tech Stack

- **Next.js 15** (canary) - Latest features and caching improvements
- **TypeScript** - Type-safe development
- **React 18** - Modern React features
- **CSS** - Custom styling (no framework dependencies)
- **Jest** - Unit testing framework
- **Playwright** - End-to-end testing

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/next-js-caching.git
cd next-js-caching
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Next.js 15 Configuration

This project uses the latest Next.js 15 experimental features. The key configuration in `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable newest Next.js 15 caching features
    useCache: true,           // Enable 'use cache' directive
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
      }
    }
  }
};
```

### 🆕 New Features Used

- **`useCache: true`** - Enables the new `"use cache"` directive
- **`cacheComponents: true`** - Enables component-level caching
- **Custom `cacheLife` profiles** - Define reusable cache configurations

## 🧪 Testing

Run different types of tests:

```bash
# Run all unit tests
npm run test:unit

# Run contract tests (API testing)
npm run test:contract

# Run end-to-end tests
npm run test:e2e

# Run all tests
npm run test:all
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── demos/             # Individual caching demo pages
│   ├── api/               # API routes with caching
│   ├── page.tsx           # Homepage
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── cache-method-card.tsx
│   ├── cache-status.tsx
│   ├── performance-metrics.tsx
│   └── ...
├── lib/                   # Utility libraries
│   ├── models/           # TypeScript data models
│   ├── demo-data.ts      # Static demo data
│   ├── cache-utils.ts    # Cache utilities
│   └── performance.ts    # Performance tracking
├── tests/                # Test suites
│   ├── unit/            # Unit tests
│   ├── contract/        # API contract tests
│   └── e2e/             # End-to-end tests
└── scripts/              # Build and utility scripts
```

## 💡 Next.js 15 Code Examples

### 🆕 "use cache" Directive (Newest Feature)

```typescript
'use cache'

import { unstable_cacheLife as cacheLife } from 'next/cache';

export default async function MyPage() {
  // Set cache profile for entire route
  cacheLife('hours'); // Built-in profiles: seconds, minutes, hours, days, weeks, max
  
  const data = await expensiveOperation();
  return <div>{data}</div>;
}
```

### 🏷️ Cache Tags for Selective Revalidation

```typescript
'use cache'

import { unstable_cacheTag as cacheTag, revalidateTag } from 'next/cache';

async function getUserData() {
  'use cache'
  cacheTag('user-data'); // Tag this cached data
  return await fetchUserData();
}

// Later, selectively revalidate only user data
await revalidateTag('user-data');
```

### ⚠️ Updated fetch() Patterns (Breaking Change in v15)

```typescript
// ❌ OLD (v14): Automatically cached
const response = await fetch('/api/data');

// ✅ NEW (v15): Must explicitly opt-in to caching
const cached = await fetch('/api/data', {
  next: { revalidate: 60 } // Explicit caching required
});

// ⚠️ NEW DEFAULT: Uncached by default
const fresh = await fetch('/api/data'); // Always fresh in v15
```

## 🎯 Demo Highlights

### Function-Level Caching
```typescript
async function expensiveCalculation(input: string) {
  "use cache";
  
  // Expensive computation
  return processData(input);
}

// Function is automatically cached when called
const result = await expensiveCalculation("data");
```

### ISR with Background Revalidation
```typescript
export const revalidate = 30; // Revalidate every 30 seconds

export default async function ISRPage() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

### API Route Caching
```typescript
export async function GET() {
  const data = await fetchExpensiveData();
  
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
    }
  });
}
```

## 📊 Performance Features

- **Real-time Cache Status**: Monitor cache hit/miss rates
- **Performance Metrics**: Load times, data sizes, TTL
- **Cache Refresh Controls**: Manual cache invalidation
- **Visual Indicators**: Cache status with color coding

## 🔧 Configuration

The project uses Next.js 15 beta features. Key configurations:

- **next.config.js**: Optimized for caching demonstrations
- **TypeScript**: Strict mode enabled
- **Jest**: Configured for Next.js with DOM testing
- **Playwright**: E2E testing configuration

## 📚 Learning Resources

Each demo includes:
- Implementation details
- Benefits and trade-offs
- Use case recommendations
- Performance considerations
- Code examples

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-demo`
3. Commit changes: `git commit -am 'Add new caching demo'`
4. Push to branch: `git push origin feature/new-demo`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚡ Next.js 15 Features Used

- **"use cache"**: Function-level caching
- **Server Components**: Enhanced caching
- **fetch() cache**: Improved request caching
- **Incremental Static Regeneration**: Background revalidation
- **Dynamic Routes**: Parameter-based caching
- **Streaming**: Progressive content loading

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   lsof -ti:3000 | xargs kill -9
   npm run dev
   ```

2. **Cache not updating**
   - Use the cache refresh buttons in each demo
   - Clear browser cache
   - Restart development server

3. **TypeScript errors**
   ```bash
   npm run lint
   ```

## 📞 Support

If you encounter any issues or have questions:

1. Check the [GitHub Issues](https://github.com/yourusername/next-js-caching/issues)
2. Create a new issue with detailed information
3. Join the discussion in our [Discussions](https://github.com/yourusername/next-js-caching/discussions)

---

Built with ❤️ using Next.js 15 and modern web technologies.
