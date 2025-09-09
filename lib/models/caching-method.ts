/**
 * CachingMethod model - represents a specific caching strategy demonstration
 */

export interface CachingMethod {
  id: string;
  name: string;
  type: 'page' | 'api' | 'component' | 'function' | 'data';
  description: string;
  betaFeature: boolean;
  demoPath: string;
  codeExample: string;
  benefits: string[];
  useCases: string[];
}

export interface CachingMethodState {
  state: 'initial' | 'cached' | 'refreshed' | 'error';
  lastUpdated?: Date;
  error?: string;
}

/**
 * Validation function for CachingMethod
 */
export function validateCachingMethod(method: Partial<CachingMethod>): string[] {
  const errors: string[] = [];

  if (!method.id || typeof method.id !== 'string') {
    errors.push('id must be a non-empty string');
  } else if (!/^[a-z0-9-]+$/.test(method.id)) {
    errors.push('id must be URL-safe (lowercase, numbers, hyphens only)');
  }

  if (!method.name || typeof method.name !== 'string') {
    errors.push('name must be a non-empty string');
  }

  if (!method.type || !['page', 'api', 'component', 'function', 'data'].includes(method.type)) {
    errors.push('type must be one of: page, api, component, function, data');
  }

  if (!method.description || typeof method.description !== 'string') {
    errors.push('description must be a non-empty string');
  }

  if (typeof method.betaFeature !== 'boolean') {
    errors.push('betaFeature must be a boolean');
  }

  if (!method.demoPath || typeof method.demoPath !== 'string') {
    errors.push('demoPath must be a non-empty string');
  } else if (!method.demoPath.startsWith('/')) {
    errors.push('demoPath must start with "/"');
  }

  if (!method.codeExample || typeof method.codeExample !== 'string') {
    errors.push('codeExample must be a non-empty string');
  }

  if (!Array.isArray(method.benefits)) {
    errors.push('benefits must be an array');
  }

  if (!Array.isArray(method.useCases)) {
    errors.push('useCases must be an array');
  }

  return errors;
}

/**
 * Create a new CachingMethod with validation
 */
export function createCachingMethod(data: Partial<CachingMethod>): CachingMethod {
  const errors = validateCachingMethod(data);
  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(', ')}`);
  }
  
  return data as CachingMethod;
}
