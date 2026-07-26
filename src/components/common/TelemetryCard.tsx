import React from 'react'
import { motion } from 'framer-motion'

interface TelemetryCardProps {
  sensorName: string
  value: number
  unit: string
  targetRange: [number, number]
  isCompliant: boolean
}

const TelemetryCard: React.FC<TelemetryCardProps> = ({
  sensorName,
  value,
  unit,
  targetRange,
  isCompliant,
}) => {
  const pct = ((value - targetRange[0]) / (targetRange[1] - targetRange[0])) * 100

  return (
    <div className="card-gradient p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-muted uppercase tracking-wider">{sensorName}</span>
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${isCompliant ? 'bg-emerald-500/10 text-emerald-pass' : 'bg-red-500/10 text-red-fail'}`}>
          {isCompliant ? 'IN SPEC' : 'ALERT'}
        </span>
      </div>
      <motion.p
        key={value}
        initial={{ opacity: 0.5, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold font-mono"
      >
        {value.toFixed(1)} <span className="text-xs text-text-muted font-sans">{unit}</span>
      </motion.p>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
          className={`h-full rounded-full ${isCompliant ? 'bg-emerald-pass' : 'bg-red-fail'}`}
        />
      </div>
      <p className="text-[10px] text-text-muted font-mono">
        Range: {targetRange[0]} – {targetRange[1]} {unit}
      </p>
    </div>
  )
}

export default TelemetryCard
