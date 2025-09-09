'use client';

import { useState } from 'react';

interface CodeExampleProps {
  code: string;
  language?: string;
}

export function CodeExample({ code, language = 'javascript' }: CodeExampleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div style={{ 
      background: '#1e1e1e', 
      borderRadius: '8px', 
      overflow: 'hidden',
      border: '1px solid #333'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        background: '#2d2d2d',
        borderBottom: '1px solid #333'
      }}>
        <span style={{ 
          color: '#9ca3af', 
          fontSize: '14px',
          fontFamily: 'monospace'
        }}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            padding: '4px 8px',
            background: copied ? '#10b981' : '#374151',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontFamily: 'monospace'
          }}
        >
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>
      
      {/* Code Content */}
      <pre style={{
        margin: 0,
        padding: '16px',
        color: '#e5e7eb',
        fontSize: '14px',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
        lineHeight: '1.5',
        overflow: 'auto'
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
