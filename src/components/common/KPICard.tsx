import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import type { KPIMetric } from '@/types'

const statusColors: Record<KPIMetric['status'], string> = {
  pass: 'text-emerald-pass border-emerald-pass/30',
  warning: 'text-amber-ops border-amber-ops/30',
  fail: 'text-red-fail border-red-fail/30',
  neutral: 'text-text-muted border-border-subtle',
}

const KPICard: React.FC<KPIMetric & { onClick?: () => void }> = ({
  title,
  value,
  unit,
  trend,
  status,
  onClick,
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`card-gradient p-4 min-w-[180px] flex-1 text-left border-l-2 ${statusColors[status]} transition-all duration-fast hover:border-glow`}
  >
    <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">{title}</p>
    <p className="text-2xl font-bold font-mono text-text-main">
      {value}
      {unit && <span className="text-xs text-text-muted ml-1 font-sans">{unit}</span>}
    </p>
    {trend && (
      <div className="flex items-center gap-1 mt-1">
        {trend.isPositive ? (
          <TrendingUp className="w-3.5 h-3.5 text-emerald-pass" />
        ) : (
          <TrendingDown className="w-3.5 h-3.5 text-red-fail" />
        )}
        <span className={`text-xs font-mono ${trend.isPositive ? 'text-emerald-pass' : 'text-red-fail'}`}>
          {trend.isPositive ? '+' : ''}{trend.value}%
        </span>
      </div>
    )}
  </motion.button>
)

export default KPICard
