'use client';

import { useState } from 'react';

export function CacheTagButtons() {
  const [isRevalidating, setIsRevalidating] = useState(false);

  const handleRevalidateTag = async (tag: string) => {
    setIsRevalidating(true);
    
    try {
      const response = await fetch(`/api/revalidate-tag?tag=${tag}`, { 
        method: 'POST' 
      });
      
      if (response.ok) {
        // Optionally show success message or refresh page
        console.log(`Successfully revalidated tag: ${tag}`);
        // You could show a toast notification here instead of page reload
        setTimeout(() => window.location.reload(), 500);
      } else {
        console.error(`Failed to revalidate tag: ${tag}`);
      }
    } catch (error) {
      console.error('Error revalidating tag:', error);
    } finally {
      setIsRevalidating(false);
    }
  };

  return (
    <div className="demo-section">
      <h3>🎯 Selective Cache Invalidation</h3>
      <p style={{ color: '#64748b', marginBottom: '1rem' }}>
        Test granular cache invalidation by clearing specific tagged data:
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button 
          style={{
            background: '#10b981',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            opacity: isRevalidating ? 0.7 : 1
          }}
          onClick={() => handleRevalidateTag('user-data')}
          disabled={isRevalidating}
        >
          {isRevalidating ? 'Revalidating...' : 'Revalidate User Data Only'}
        </button>
        <button 
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            opacity: isRevalidating ? 0.7 : 1
          }}
          onClick={() => handleRevalidateTag('posts')}
          disabled={isRevalidating}
        >
          {isRevalidating ? 'Revalidating...' : 'Revalidate Posts Only'}
        </button>
      </div>
    </div>
  );
}
