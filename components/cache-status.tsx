'use client';

import { useEffect, useState, useCallback } from 'react';

interface CacheStatusProps {
  endpoint: string;
  label: string;
  method?: string;
}

interface CacheInfo {
  status: 'hit' | 'miss' | 'fresh' | 'stale' | 'error';
  timestamp: string;
  age?: number;
  size?: number;
  method?: string;
}

export function CacheStatus({ endpoint, label, method = 'cache' }: CacheStatusProps) {
  const [cacheInfo, setCacheInfo] = useState<CacheInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const checkCacheStatus = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${endpoint}/status`);
      if (response.ok) {
        const data = await response.json();
        setCacheInfo(data);
      } else {
        setCacheInfo({
          status: 'error',
          timestamp: new Date().toISOString(),
          method
        });
      }
    } catch (error) {
      console.error('Failed to check cache status:', error);
      setCacheInfo({
        status: 'error',
        timestamp: new Date().toISOString(),
        method
      });
    } finally {
      setLoading(false);
    }
  }, [endpoint, method]);

  useEffect(() => {
    checkCacheStatus();
    const interval = setInterval(checkCacheStatus, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [endpoint, checkCacheStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hit': return '#22c55e'; // green
      case 'fresh': return '#10b981'; // emerald
      case 'miss': return '#f59e0b'; // amber
      case 'stale': return '#ef4444'; // red
      case 'error': return '#dc2626'; // red-600
      default: return '#6b7280'; // gray
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hit': return '✓';
      case 'fresh': return '⚡';
      case 'miss': return '○';
      case 'stale': return '⚠';
      case 'error': return '✗';
      default: return '?';
    }
  };

  return (
    <div className="cache-status">
      <div className="cache-status-header">
        <h4>{label}</h4>
        <button 
          onClick={checkCacheStatus} 
          disabled={loading}
          className="refresh-btn"
        >
          {loading ? '⟳' : '↻'}
        </button>
      </div>
      
      {cacheInfo && (
        <div className="cache-info">
          <div 
            className="status-indicator"
            style={{ 
              color: getStatusColor(cacheInfo.status),
              backgroundColor: `${getStatusColor(cacheInfo.status)}20`
            }}
          >
            <span className="status-icon">{getStatusIcon(cacheInfo.status)}</span>
            <span className="status-text">{cacheInfo.status.toUpperCase()}</span>
          </div>
          
          <div className="cache-details">
            <div className="detail-item">
              <span className="detail-label">Last Check:</span>
              <span className="detail-value">
                {new Date(cacheInfo.timestamp).toLocaleTimeString()}
              </span>
            </div>
            
            {cacheInfo.age !== undefined && (
              <div className="detail-item">
                <span className="detail-label">Age:</span>
                <span className="detail-value">{cacheInfo.age}s</span>
              </div>
            )}
            
            {cacheInfo.size !== undefined && (
              <div className="detail-item">
                <span className="detail-label">Size:</span>
                <span className="detail-value">{(cacheInfo.size / 1024).toFixed(2)}KB</span>
              </div>
            )}
            
            <div className="detail-item">
              <span className="detail-label">Method:</span>
              <span className="detail-value">{cacheInfo.method}</span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .cache-status {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          background: #f9fafb;
          margin: 16px 0;
        }

        .cache-status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .cache-status-header h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        .refresh-btn {
          background: none;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 4px 8px;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s;
        }

        .refresh-btn:hover:not(:disabled) {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .refresh-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 6px;
          margin-bottom: 12px;
          font-weight: 500;
          font-size: 13px;
        }

        .status-icon {
          font-weight: bold;
          font-size: 14px;
        }

        .cache-details {
          display: grid;
          gap: 6px;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }

        .detail-label {
          color: #6b7280;
          font-weight: 500;
        }

        .detail-value {
          color: #374151;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
}
