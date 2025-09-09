/**
 * Contract test for GET /api/cache/methods
 * This test defines the expected API contract and should FAIL initially
 */

describe('/api/cache/methods API Contract', () => {
  it('should return array of caching methods', async () => {
    const response = await fetch('http://localhost:3000/api/cache/methods');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    
    if (data.length > 0) {
      const method = data[0];
      expect(method).toHaveProperty('id');
      expect(method).toHaveProperty('name');
      expect(method).toHaveProperty('type');
      expect(method).toHaveProperty('description');
      expect(method).toHaveProperty('betaFeature');
      expect(method).toHaveProperty('demoPath');
      expect(typeof method.id).toBe('string');
      expect(typeof method.name).toBe('string');
      expect(['page', 'api', 'component', 'function', 'data']).toContain(method.type);
      expect(typeof method.description).toBe('string');
      expect(typeof method.betaFeature).toBe('boolean');
      expect(typeof method.demoPath).toBe('string');
      expect(method.demoPath).toMatch(/^\/demos\//);
    }
  });

  it('should handle CORS headers', async () => {
    const response = await fetch('http://localhost:3000/api/cache/methods');
    expect(response.headers.get('content-type')).toContain('application/json');
  });
});
