# Quickstart Guide: Next.js Caching Showcase

## Overview
This guide helps you quickly set up and run the Next.js 15 caching showcase application to explore different caching strategies.

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Basic understanding of Next.js concepts

## Quick Setup

### 1. Environment Setup
```bash
# Ensure you're using Node.js 18+
node --version

# Install Next.js 15 (latest canary/beta)
npm install next@canary react@latest react-dom@latest
```

### 2. Project Structure
```
next-js-caching/
├── app/                    # App Router directory
│   ├── page.tsx           # Homepage with caching overview
│   ├── demos/             # Demo pages for each caching method
│   │   ├── static-generation/
│   │   ├── server-components/
│   │   ├── api-routes/
│   │   └── function-cache/
│   └── api/               # API routes with caching demos
├── components/            # Reusable components
├── lib/                   # Utility functions and cache helpers
└── next.config.js         # Next.js configuration
```

### 3. Development Server
```bash
# Start development server
npm run dev

# Open browser to http://localhost:3000
```

## Quick Test Scenarios

### Test 1: Static Generation Demo
**Goal**: Verify static page generation with revalidation

1. Navigate to `/demos/static-generation`
2. Observe initial page load time
3. Click "Refresh Cache" button
4. Verify page revalidation behavior
5. Check performance metrics display

**Expected Result**: Page loads instantly from cache, shows cache hit/miss status

### Test 2: API Route Caching
**Goal**: Test API route caching with cache() API

1. Navigate to `/demos/api-routes`
2. Click "Fetch Data" button multiple times
3. Observe response times and cache status
4. Click "Invalidate Cache" button
5. Fetch data again to see cache miss

**Expected Result**: First request slow, subsequent requests fast from cache

### Test 3: Server Components Caching
**Goal**: Verify React Server Components automatic caching

1. Navigate to `/demos/server-components`
2. Interact with different server components
3. Observe component rendering performance
4. Check cache statistics

**Expected Result**: Server components render efficiently with automatic caching

### Test 4: Function-Level Caching
**Goal**: Test unstable_cache() for expensive operations

1. Navigate to `/demos/function-cache`
2. Trigger expensive computation
3. Observe initial computation time
4. Repeat operation to see cached result
5. Check cache TTL countdown

**Expected Result**: First computation slow, cached results instant

## Validation Checklist

### Functional Validation
- [ ] Homepage displays all caching method cards
- [ ] Each demo page loads without errors
- [ ] Cache refresh buttons work correctly
- [ ] Performance metrics display accurate data
- [ ] Cache status indicators update properly
- [ ] Code examples are visible and formatted

### Performance Validation
- [ ] Static pages load under 100ms (after cache)
- [ ] API routes respond under 50ms (cached)
- [ ] Server components render efficiently
- [ ] Function cache reduces computation time by >90%
- [ ] No memory leaks during cache operations

### Cache Behavior Validation
- [ ] Cache hits return instantly
- [ ] Cache misses show expected delay
- [ ] Cache invalidation works correctly
- [ ] TTL expiration behaves as configured
- [ ] Stale-while-revalidate works properly

## Troubleshooting

### Common Issues

**Issue**: "Module not found" errors
**Solution**: Ensure Next.js 15 canary is installed: `npm install next@canary`

**Issue**: Cache not working in development
**Solution**: Some caching behaviors only work in production build: `npm run build && npm start`

**Issue**: Performance metrics not updating
**Solution**: Check browser developer tools for JavaScript errors

**Issue**: API routes returning stale data
**Solution**: Verify cache headers and revalidation configuration

### Debug Mode
Enable detailed cache logging:
```bash
DEBUG=next:cache npm run dev
```

### Performance Monitoring
Use built-in Next.js analytics:
```bash
ANALYZE=true npm run build
```

## Next Steps

1. **Explore Code**: Check implementation details in each demo directory
2. **Modify Configs**: Experiment with different cache settings
3. **Add Metrics**: Implement additional performance monitoring
4. **Production Deploy**: Test caching behavior in production environment

## Key Learning Outcomes

After completing this quickstart, you should understand:
- How Next.js 15 handles different types of caching
- When to use each caching strategy
- How to implement and configure cache behavior
- How to measure and optimize cache performance
- Best practices for cache invalidation and revalidation

## Support Resources

- Next.js 15 Caching Documentation
- Demo source code with inline comments
- Performance monitoring dashboard
- Cache configuration examples
