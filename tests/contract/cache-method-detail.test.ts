/**
 * Contract test for GET /api/cache/methods/{methodId}
 * This test defines the expected API contract and should FAIL initially
 */

describe('/api/cache/methods/{methodId} API Contract', () => {
  it('should return specific caching method details', async () => {
    const response = await fetch('http://localhost:3000/api/cache/methods/static-generation');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('id', 'static-generation');
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('type');
    expect(data).toHaveProperty('description');
    expect(data).toHaveProperty('betaFeature');
    expect(data).toHaveProperty('demoPath');
    expect(data).toHaveProperty('codeExample');
    expect(data).toHaveProperty('benefits');
    expect(data).toHaveProperty('useCases');
    
    expect(typeof data.name).toBe('string');
    expect(['page', 'api', 'component', 'function', 'data']).toContain(data.type);
    expect(typeof data.description).toBe('string');
    expect(typeof data.betaFeature).toBe('boolean');
    expect(typeof data.demoPath).toBe('string');
    expect(typeof data.codeExample).toBe('string');
    expect(Array.isArray(data.benefits)).toBe(true);
    expect(Array.isArray(data.useCases)).toBe(true);
  });

  it('should return 404 for non-existent method', async () => {
    const response = await fetch('http://localhost:3000/api/cache/methods/non-existent');
    expect(response.status).toBe(404);
  });
});
