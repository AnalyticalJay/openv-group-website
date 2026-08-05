import React from 'react';

/**
 * Skeleton Loader Components
 * Animated placeholders for content that loads asynchronously
 * Maintains visual continuity and improves perceived performance
 */

// Base skeleton pulse animation
const skeletonStyles = `
  @keyframes skeleton-pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  .skeleton-base {
    background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
    background-size: 200% 100%;
    animation: skeleton-pulse 2s ease-in-out infinite;
  }
`;

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
}

/**
 * Generic skeleton block
 */
export function SkeletonBlock({
  className = '',
  width = '100%',
  height = '20px',
  borderRadius = '4px',
}: SkeletonProps) {
  return (
    <div
      className={`skeleton-base ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius,
      }}
    />
  );
}

/**
 * Skeleton for text content
 */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBlock
          key={i}
          height={16}
          width={i === lines - 1 ? '80%' : '100%'}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton for card content
 */
export function SkeletonCard() {
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border border-gray-200">
      {/* Card header */}
      <SkeletonBlock height={24} width="60%" borderRadius="6px" />
      
      {/* Card content */}
      <div className="space-y-2">
        <SkeletonBlock height={16} width="100%" />
        <SkeletonBlock height={16} width="95%" />
        <SkeletonBlock height={16} width="85%" />
      </div>
      
      {/* Card footer */}
      <div className="flex gap-2 pt-2">
        <SkeletonBlock height={32} width="30%" borderRadius="6px" />
        <SkeletonBlock height={32} width="30%" borderRadius="6px" />
      </div>
    </div>
  );
}

/**
 * Skeleton for hero section
 */
export function SkeletonHero() {
  return (
    <div className="space-y-6">
      {/* Hero title */}
      <div className="space-y-3">
        <SkeletonBlock height={40} width="70%" borderRadius="8px" />
        <SkeletonBlock height={40} width="60%" borderRadius="8px" />
      </div>
      
      {/* Hero description */}
      <SkeletonText lines={2} />
      
      {/* Hero buttons */}
      <div className="flex gap-4 pt-4">
        <SkeletonBlock height={48} width="120px" borderRadius="8px" />
        <SkeletonBlock height={48} width="120px" borderRadius="8px" />
      </div>
      
      {/* Hero image placeholder */}
      <div className="mt-8">
        <SkeletonBlock height={300} width="100%" borderRadius="12px" />
      </div>
    </div>
  );
}

/**
 * Skeleton for grid of cards
 */
export function SkeletonCardGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/**
 * Skeleton for feature list
 */
export function SkeletonFeatureList({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {/* Icon placeholder */}
          <SkeletonBlock height={48} width={48} borderRadius="8px" />
          
          {/* Content placeholder */}
          <div className="flex-1 space-y-2">
            <SkeletonBlock height={20} width="40%" borderRadius="4px" />
            <SkeletonBlock height={16} width="100%" />
            <SkeletonBlock height={16} width="95%" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton for table
 */
export function SkeletonTable({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-2">
      {/* Table header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <SkeletonBlock key={`header-${i}`} height={20} borderRadius="4px" />
        ))}
      </div>
      
      {/* Table rows */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={`row-${rowIdx}`}
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIdx) => (
            <SkeletonBlock
              key={`cell-${rowIdx}-${colIdx}`}
              height={16}
              width={colIdx === 0 ? '80%' : '100%'}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton for testimonial/review
 */
export function SkeletonTestimonial() {
  return (
    <div className="space-y-4 p-6 bg-white rounded-lg border border-gray-200">
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBlock key={i} height={20} width={20} borderRadius="2px" />
        ))}
      </div>
      
      {/* Review text */}
      <SkeletonText lines={3} />
      
      {/* Author info */}
      <div className="flex gap-3 pt-2">
        <SkeletonBlock height={40} width={40} borderRadius="50%" />
        <div className="flex-1 space-y-2">
          <SkeletonBlock height={16} width="50%" borderRadius="4px" />
          <SkeletonBlock height={14} width="40%" borderRadius="4px" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for avatar with text
 */
export function SkeletonAvatar() {
  return (
    <div className="flex items-center gap-3">
      <SkeletonBlock height={48} width={48} borderRadius="50%" />
      <div className="flex-1 space-y-2">
        <SkeletonBlock height={16} width="60%" borderRadius="4px" />
        <SkeletonBlock height={14} width="50%" borderRadius="4px" />
      </div>
    </div>
  );
}

/**
 * Skeleton for navigation bar
 */
export function SkeletonNavBar() {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      {/* Logo */}
      <SkeletonBlock height={32} width={120} borderRadius="4px" />
      
      {/* Nav items */}
      <div className="flex gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} height={20} width={80} borderRadius="4px" />
        ))}
      </div>
      
      {/* CTA button */}
      <SkeletonBlock height={40} width={100} borderRadius="6px" />
    </div>
  );
}

/**
 * Wrapper component to inject skeleton styles
 */
export function SkeletonProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{skeletonStyles}</style>
      {children}
    </>
  );
}
