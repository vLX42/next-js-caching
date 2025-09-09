'use client';

import Link from 'next/link';
import { CachingMethod } from '@/lib/models/caching-method';

interface CacheMethodCardProps {
  method: CachingMethod;
  featured?: boolean;
}

export function CacheMethodCard({ method, featured = false }: CacheMethodCardProps) {
  const cardClass = `method-card ${featured ? 'featured' : ''}`;

  const getTypeClass = (type: string) => {
    switch (type) {
      case 'page': return 'tag tag-page';
      case 'api': return 'tag tag-api';
      case 'component': return 'tag tag-component';
      case 'function': return 'tag tag-function';
      case 'data': return 'tag tag-data';
      default: return 'tag';
    }
  };

  return (
    <Link href={method.demoPath} className={cardClass}>
      {/* Header */}
      <div className="method-header">
        <div>
          <h3 className="method-title">{method.name}</h3>
          <div className="method-tags">
            <span className={getTypeClass(method.type)}>
              {method.type}
            </span>
            {method.betaFeature && (
              <span className="tag tag-beta">Beta</span>
            )}
            {featured && (
              <span className="tag tag-new">🚀 New</span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="method-description">
        {method.description}
      </p>

      {/* Benefits Preview */}
      <div className="method-benefits">
        <h4 className="benefits-title">Key Benefits</h4>
        <div className="benefits-list">
          {method.benefits.slice(0, 2).map((benefit, index) => (
            <span key={index} className="benefit-tag">
              {benefit}
            </span>
          ))}
          {method.benefits.length > 2 && (
            <span className="benefit-tag">
              +{method.benefits.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="method-footer">
        <span>Interactive Demo</span>
        <span className="cta">Try it now →</span>
      </div>
    </Link>
  );
}
