import { test, expect } from '@playwright/test';

test.describe('Next.js Caching Showcase', () => {
  test('homepage loads and displays all caching methods', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check page title
    await expect(page).toHaveTitle(/Next.js 15 Caching Showcase/);
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Next.js 15 Caching Showcase');
    
    // Check that all 8 caching method cards are present
    const cards = page.locator('.method-card');
    await expect(cards).toHaveCount(8);
    
    // Check specific caching methods
    await expect(page.locator('text=Static Generation')).toBeVisible();
    await expect(page.locator('text=Server Components')).toBeVisible();
    await expect(page.locator('text=API Route Caching')).toBeVisible();
    await expect(page.locator('text=Function Cache')).toBeVisible();
    await expect(page.locator('text=fetch() Cache')).toBeVisible();
    await expect(page.locator('text=Incremental Static Regeneration')).toBeVisible();
    await expect(page.locator('text=Dynamic Route Caching')).toBeVisible();
    await expect(page.locator('text=Streaming SSR')).toBeVisible();
  });

  test('function cache demo page works', async ({ page }) => {
    await page.goto('http://localhost:3000/demos/function-cache');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('Function Cache');
    
    // Check cached computation result is displayed
    await expect(page.locator('text=Input:')).toBeVisible();
    await expect(page.locator('text=Result:')).toBeVisible();
    await expect(page.locator('text=Computed At:')).toBeVisible();
    
    // Check cache refresh button exists
    await expect(page.locator('text=Refresh Cache')).toBeVisible();
    
    // Check cache status component
    await expect(page.locator('text=Function Cache Status')).toBeVisible();
    
    // Check back link works
    await page.click('text=← Back to Showcase');
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('ISR demo page works', async ({ page }) => {
    await page.goto('http://localhost:3000/demos/isr');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('Incremental Static Regeneration');
    
    // Check ISR data is displayed
    await expect(page.locator('text=Timestamp:')).toBeVisible();
    await expect(page.locator('text=Last Regenerated:')).toBeVisible();
    await expect(page.locator('text=Next Revalidation:')).toBeVisible();
    
    // Check cache status component
    await expect(page.locator('text=ISR Cache Status')).toBeVisible();
  });

  test('fetch cache demo page works', async ({ page }) => {
    await page.goto('http://localhost:3000/demos/fetch-cache');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('fetch() Cache');
    
    // Check different fetch strategies are shown
    await expect(page.locator('text=Cached Fetch')).toBeVisible();
    await expect(page.locator('text=No Cache Fetch')).toBeVisible();
    await expect(page.locator('text=Force Cache Fetch')).toBeVisible();
    
    // Check cache status component
    await expect(page.locator('text=Fetch Cache Status')).toBeVisible();
  });

  test('API endpoints work', async ({ page, request }) => {
    // Test cache methods API
    const methodsResponse = await request.get('http://localhost:3000/api/cache/methods');
    expect(methodsResponse.ok()).toBeTruthy();
    const methods = await methodsResponse.json();
    expect(methods).toHaveLength(8);
    
    // Test cache status API
    const statusResponse = await request.get('http://localhost:3000/api/cache/status');
    expect(statusResponse.ok()).toBeTruthy();
    const status = await statusResponse.json();
    expect(status).toHaveProperty('status');
    expect(status).toHaveProperty('timestamp');
    
    // Test function cache status API
    const functionCacheResponse = await request.get('http://localhost:3000/api/demos/function-cache/status');
    expect(functionCacheResponse.ok()).toBeTruthy();
    const functionCacheStatus = await functionCacheResponse.json();
    expect(functionCacheStatus).toHaveProperty('method', 'use-cache');
  });

  test('navigation between demos works', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Click on a demo card
    await page.click('.method-card:first-child a');
    
    // Should navigate to a demo page
    await expect(page.url()).toMatch(/\/demos\//);
    
    // Back link should work
    await page.click('text=← Back to Showcase');
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('performance metrics display correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/demos/function-cache');
    
    // Check performance metrics section exists
    await expect(page.locator('text=Performance Metrics')).toBeVisible();
    
    // Check that performance data is displayed
    await expect(page.locator('text=Load Time')).toBeVisible();
    await expect(page.locator('text=Cache Hit Rate')).toBeVisible();
    await expect(page.locator('text=Data Size')).toBeVisible();
  });
});
