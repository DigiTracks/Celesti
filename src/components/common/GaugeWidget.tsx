import React from 'react'
import { motion } from 'framer-motion'

interface GaugeWidgetProps {
  value: number
  min?: number
  max?: number
  threshold?: number
  label: string
  unit?: string
  status?: 'pass' | 'warning' | 'fail'
}

const GaugeWidget: React.FC<GaugeWidgetProps> = ({ value, min = 0, max = 100, threshold: _threshold = 80, label, unit = '%', status = 'pass' }) => {
  const angle = ((value - min) / (max - min)) * 180
  const colorMap = { pass: '#10B981', warning: '#F59E0B', fail: '#EF4444' }
  const color = colorMap[status]

  const polarToCartesian = (cx: number, cy: number, r: number, a: number) => ({
    x: cx + r * Math.cos((a - 90) * Math.PI / 180),
    y: cy + r * Math.sin((a - 90) * Math.PI / 180),
  })

  const bgArc = `M ${polarToCartesian(60, 55, 45, 0).x} ${polarToCartesian(60, 55, 45, 0).y} A 45 45 0 0 1 ${polarToCartesian(60, 55, 45, 180).x} ${polarToCartesian(60, 55, 45, 180).y}`
  const valArc = `M ${polarToCartesian(60, 55, 45, 0).x} ${polarToCartesian(60, 55, 45, 0).y} A 45 45 0 ${angle > 90 ? 1 : 0} 1 ${polarToCartesian(60, 55, 45, Math.min(angle, 180)).x} ${polarToCartesian(60, 55, 45, Math.min(angle, 180)).y}`

  return (
    <div className="flex flex-col items-center space-y-1">
      <svg width="120" height="70" viewBox="0 0 120 70" className="overflow-visible">
        <path d={bgArc} fill="none" stroke="#1F2937" strokeWidth="6" strokeLinecap="round" />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: angle / 180 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          d={valArc}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <motion.text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          x="60" y="52" textAnchor="middle"
          className="text-[18px] font-bold font-mono fill-text-main"
        >
          {value}
        </motion.text>
      </svg>
      <p className="text-[10px] text-text-muted font-medium">{label}</p>
      {unit && <p className="text-[9px] text-text-muted/60 font-mono">{unit}</p>}
    </div>
  )
}

export default GaugeWidget
