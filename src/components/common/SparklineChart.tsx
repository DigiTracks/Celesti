import React from 'react'
import { motion } from 'framer-motion'

interface SparklineChartProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  className?: string
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data, width = 120, height = 32, color = '#3B82F6', className = '' }) => {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)

  const points = data.map((v, i) => `${i * stepX},${height - ((v - min) / range) * (height - 4) - 2}`).join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className}>
      <motion.polyline
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SparklineChart
