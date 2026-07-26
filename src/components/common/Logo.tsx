import React from 'react'
import { motion } from 'framer-motion'

interface LogoProps {
  variant?: 'full' | 'icon' | 'small'
  className?: string
  animated?: boolean
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '', animated = false }) => {
  if (variant === 'icon') {
    const el = (
      <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 ${className}`}>
        <span className="text-white font-bold text-sm">C</span>
      </div>
    )
    if (animated) return <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>{el}</motion.div>
    return el
  }

  if (variant === 'small') {
    const el = (
      <div className={`flex items-center justify-center w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-cyan-400 ${className}`}>
        <span className="text-white font-bold text-[10px]">C</span>
      </div>
    )
    if (animated) return <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>{el}</motion.div>
    return el
  }

  const el = (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex-shrink-0">
        <span className="text-white font-bold text-sm">C</span>
      </div>
      <span className="text-lg font-bold text-white tracking-tight">Celesti</span>
      <span className="text-lg font-light text-blue-500">.</span>
    </div>
  )

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
          {el}
        </motion.div>
      </motion.div>
    )
  }
  return el
}

export default Logo
