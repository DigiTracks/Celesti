import React from 'react'

export interface StatusBadgeProps {
  label: string
  variant: 'completed' | 'in_progress' | 'hold' | 'failed' | 'quarantined'
  pulse?: boolean
}

const variantStyles: Record<StatusBadgeProps['variant'], string> = {
  completed: 'bg-emerald-500/10 text-emerald-pass border-emerald-500/30',
  in_progress: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  hold: 'bg-amber-500/10 text-amber-ops border-amber-500/30',
  failed: 'bg-red-500/10 text-red-fail border-red-500/30',
  quarantined: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ label, variant, pulse }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${pulse ? 'animate-pulse' : ''}`}
  >
    {pulse && <span className={`w-1.5 h-1.5 rounded-full bg-current animate-pulse`} />}
    {label}
  </span>
)

export default StatusBadge
