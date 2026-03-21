'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  width,
  height,
  lines = 1
}: SkeletonProps) {
  const baseClasses = 'skeleton animate-pulse';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
    rounded: 'rounded-xl'
  };

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '2rem'),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: i * 0.1 
            }}
            className={`${baseClasses} ${variantClasses[variant]}`}
            style={{
              ...style,
              width: i === lines - 1 ? '60%' : '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

// Card skeleton for dashboard
export function CardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border/50 rounded-xl p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width="40%" height="1rem" />
        <Skeleton variant="circular" width="2rem" height="2rem" />
      </div>
      <Skeleton variant="text" width="60%" height="2rem" />
      <div className="flex items-center gap-2">
        <Skeleton variant="text" width="30%" height="0.75rem" />
        <Skeleton variant="rectangular" width="3rem" height="1rem" />
      </div>
    </motion.div>
  );
}

// Stats card skeleton
export function StatsCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width="50%" height="1rem" />
        <Skeleton variant="circular" width="1.5rem" height="1.5rem" />
      </div>
      <Skeleton variant="text" width="40%" height="2rem" />
      <Skeleton variant="text" width="70%" height="0.75rem" />
    </motion.div>
  );
}

// Table skeleton
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 p-4 border-b border-border/50">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={`header-${i}`} variant="text" height="1rem" />
        ))}
      </div>
      
      {/* Rows */}
      {[...Array(rows)].map((_, rowIndex) => (
        <motion.div
          key={`row-${rowIndex}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: rowIndex * 0.1 }}
          className="grid grid-cols-4 gap-4 p-4 border-b border-border/30"
        >
          {[...Array(4)].map((_, colIndex) => (
            <Skeleton key={`cell-${rowIndex}-${colIndex}`} variant="text" height="1rem" />
          ))}
        </motion.div>
      ))}
    </div>
  );
}
