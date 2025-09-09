'use client';

import { useState } from 'react';

interface CacheRefreshButtonProps {
  methodId: string;
}

export function CacheRefreshButton({ methodId }: CacheRefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      // Simulate cache refresh API call
      const response = await fetch(`/api/cache/methods/${methodId}/refresh`, {
        method: 'POST',
      });
      
      if (response.ok) {
        setLastRefresh(new Date());
        // Optionally refresh the page to show updated content
        window.location.reload();
      } else {
        console.error('Failed to refresh cache');
      }
    } catch (error) {
      console.error('Error refreshing cache:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        style={{
          padding: '8px 16px',
          background: isRefreshing ? '#9ca3af' : '#4f46e5',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: isRefreshing ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        {isRefreshing ? '🔄 Refreshing...' : '🔄 Refresh Cache'}
      </button>
      
      {lastRefresh && (
        <span style={{ fontSize: '14px', color: '#6b7280' }}>
          Last refreshed: {lastRefresh.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
