'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CreditsChartProps {
  data: Array<{
    day: string;
    used: number;
    remaining: number;
  }>;
}

export function CreditsChart({ data }: CreditsChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Credits Usage This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="day" 
                className="text-xs"
                stroke="currentColor"
                strokeOpacity={0.5}
              />
              <YAxis 
                className="text-xs"
                stroke="currentColor"
                strokeOpacity={0.5}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  backdropFilter: 'blur(8px)',
                }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Bar 
                dataKey="used" 
                fill="url(#colorGradient)" 
                radius={[8, 8, 0, 0]}
                className="drop-shadow-sm"
              />
              <Bar 
                dataKey="remaining" 
                fill="url(#colorGradient2)" 
                radius={[8, 8, 0, 0]}
                className="drop-shadow-sm"
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="colorGradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-green-400/5 pointer-events-none rounded-lg" />
      </Card>
    </motion.div>
  );
}
