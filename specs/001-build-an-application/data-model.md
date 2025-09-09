# Data Model: Next.js Caching Showcase

## Core Entities

### CachingMethod
Represents a specific caching strategy demonstration.

**Fields:**
- `id`: string - Unique identifier (e.g., "static-generation", "api-routes")
- `name`: string - Display name (e.g., "Static Generation", "API Route Caching")
- `type`: string - Category (e.g., "page", "api", "component", "function")
- `description`: string - Brief explanation of the caching method
- `betaFeature`: boolean - Whether this uses Next.js 15 beta features
- `demoPath`: string - URL path to the demo page
- `codeExample`: string - Code snippet showing the implementation
- `benefits`: string[] - List of performance benefits
- `useCases`: string[] - When to use this caching method

**Validation Rules:**
- `id` must be unique and URL-safe
- `name` must be non-empty
- `type` must be one of: "page", "api", "component", "function", "data"
- `demoPath` must start with "/"

**State Transitions:**
- Initial: Created with demo data
- Cached: Demo has been loaded and cached
- Refreshed: Cache has been invalidated and refreshed
- Error: Cache operation failed

### DemoInteraction
Represents user actions within a caching demo.

**Fields:**
- `id`: string - Unique identifier
- `methodId`: string - Reference to CachingMethod.id
- `actionType`: string - Type of action performed
- `timestamp`: Date - When the action occurred
- `cacheState`: string - State of cache before action
- `result`: object - Result of the action
- `performanceMetrics`: object - Timing and performance data

**Validation Rules:**
- `methodId` must reference existing CachingMethod
- `actionType` must be one of: "view", "refresh", "invalidate", "revalidate"
- `cacheState` must be one of: "hit", "miss", "stale", "fresh", "error"
- `timestamp` must be valid Date

**State Transitions:**
- Pending: Action initiated
- Processing: Cache operation in progress
- Complete: Action completed successfully
- Failed: Action failed with error

### PerformanceMetrics
Represents performance data for caching operations.

**Fields:**
- `loadTime`: number - Time to load content (ms)
- `cacheHitRate`: number - Percentage of cache hits (0-100)
- `dataSize`: number - Size of cached data (bytes)
- `revalidationTime`: number - Time for cache revalidation (ms)
- `ttl`: number - Time to live for cached data (seconds)

**Validation Rules:**
- All numeric fields must be non-negative
- `cacheHitRate` must be between 0 and 100
- `ttl` can be null for indefinite cache

## Relationships

### CachingMethod → DemoInteraction
- One-to-many: Each caching method can have multiple interactions
- Foreign key: `DemoInteraction.methodId` references `CachingMethod.id`

### DemoInteraction → PerformanceMetrics
- One-to-one: Each interaction has associated performance metrics
- Embedded: Performance metrics stored within DemoInteraction.result

## Demo Data Structure

### Static Data
```typescript
const cachingMethods: CachingMethod[] = [
  {
    id: "static-generation",
    name: "Static Generation",
    type: "page",
    description: "Pre-render pages at build time with optional revalidation",
    betaFeature: false,
    demoPath: "/demos/static-generation",
    // ... other fields
  },
  {
    id: "server-components",
    name: "React Server Components",
    type: "component", 
    description: "Automatic caching of Server Component payloads",
    betaFeature: true,
    demoPath: "/demos/server-components",
    // ... other fields
  }
  // ... other methods
];
```

### Dynamic Data
- Demo interactions stored in memory during session
- Performance metrics calculated in real-time
- Cache states tracked per demo instance

## API Data Flow

### Demo Page Load
1. Fetch CachingMethod by id
2. Initialize DemoInteraction with "view" action
3. Record PerformanceMetrics
4. Display demo with current cache state

### Cache Refresh Action
1. Create DemoInteraction with "refresh" action
2. Invalidate relevant cache
3. Measure revalidation time
4. Update PerformanceMetrics
5. Return updated cache state

### Cache Status Check
1. Query current cache state for method
2. Calculate performance metrics
3. Return cache hit/miss statistics
4. Display TTL and freshness info
