'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  className 
}: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={`relative overflow-hidden bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-border/50 ${className}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-lg" />
            <Icon className="h-4 w-4 text-primary relative" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {value}
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>{description}</span>
            {trend && (
              <span className={`inline-flex items-center px-1.5 rounded-full font-medium ${
                trend.isPositive 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
        </CardContent>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-orange-400/5 pointer-events-none" />
      </Card>
    </motion.div>
  );
}
