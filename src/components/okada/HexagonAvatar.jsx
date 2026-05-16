import React from 'react';
import { cn } from '@/lib/utils';

export default function HexagonAvatar({ src, alt = 'Avatar', size = 64, className, glow }) {
  const clipId = `hex-${Math.random().toString(36).slice(2)}`;
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      {glow && (
        <div className="absolute inset-0 rounded-full pulse-glow opacity-50" />
      )}
      <svg width={size} height={size} viewBox="0 0 100 100" className="absolute inset-0">
        <defs>
          <clipPath id={clipId}>
            <polygon points="50,2 93,25 93,75 50,98 7,75 7,25" />
          </clipPath>
          <linearGradient id={`grad-${clipId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 0.8 }} />
          </linearGradient>
        </defs>
        <polygon
          points="50,2 93,25 93,75 50,98 7,75 7,25"
          fill="none"
          stroke={`url(#grad-${clipId})`}
          strokeWidth="3"
        />
        {src ? (
          <image href={src} x="5" y="5" width="90" height="90" clipPath={`url(#${clipId})`} preserveAspectRatio="xMidYMid slice" />
        ) : (
          <polygon points="50,2 93,25 93,75 50,98 7,75 7,25" fill="hsl(var(--muted))" clipPath={`url(#${clipId})`} />
        )}
      </svg>
    </div>
  );
}
