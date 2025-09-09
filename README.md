# Next.js 15 Caching Showcase

A comprehensive demonstration of caching strategies available in Next.js 15, featuring eight different caching approaches with live examples and performance metrics.

## 🚀 Features

- **8 Caching Strategies**: Complete coverage of Next.js 15 caching methods
- **Live Demos**: Interactive examples with real-time cache status
- **Performance Metrics**: Visual performance data for each strategy
- **Code Examples**: Detailed implementation examples
- **Real-time Cache Status**: Live monitoring of cache hit/miss rates
- **TypeScript**: Full type safety throughout the application

## 📋 Caching Methods Demonstrated

1. **Static Generation** - Pre-rendered pages at build time
2. **Server Components** - React Server Components with caching
3. **API Route Caching** - HTTP caching for API endpoints
4. **Function-Level Caching** - `unstable_cache()` for expensive operations
5. **fetch() Cache** - Built-in fetch request caching
6. **Incremental Static Regeneration (ISR)** - Background revalidation
7. **Dynamic Route Caching** - Cache dynamic routes with parameters
8. **Streaming SSR** - Server-side rendering with progressive loading

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

## 🎯 Demo Highlights

### Function-Level Caching
```typescript
import { unstable_cache } from 'next/cache';

const cachedFunction = unstable_cache(
  async (input: string) => {
    // Expensive computation
    return processData(input);
  },
  ['cache-key'],
  { revalidate: 60 }
);
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

- **unstable_cache**: Function-level caching
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
