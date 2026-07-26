import React from 'react'
import { motion } from 'framer-motion'

interface LogoProps {
  variant?: 'full' | 'icon' | 'small'
  className?: string
  animated?: boolean
}

const GradientIcon: React.FC<{ size: number }> = ({ size }) => (
  <div
    style={{ width: size, height: size, fontSize: size * 0.5, lineHeight: `${size}px` }}
    className="relative flex-shrink-0 rounded-lg text-center font-bold text-white select-none"
  >
    <svg width={size} height={size} viewBox="0 0 36 36" className="absolute inset-0">
      <defs>
        <linearGradient id="gi" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="36" height="36" rx="8" fill="url(#gi)" opacity="0.15" />
      <rect x="2" y="2" width="32" height="32" rx="6" stroke="url(#gi)" strokeWidth="1.5" fill="none" />
    </svg>
    <span className="relative" style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>C</span>
  </div>
)

const FullSvg: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center gap-2 ${className ?? ''}`}>
    <GradientIcon size={32} />
    <span className="text-lg font-bold text-[#F9FAFB] tracking-tight">Celesti</span>
    <span className="text-lg font-light text-blue-500">.</span>
  </div>
)

const IconSvg: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
  <div className={className} style={{ width: size, height: size }}>
    <GradientIcon size={size} />
  </div>
)

const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '', animated = false }) => {
  if (variant === 'icon') {
    const el = <IconSvg size={32} className={className} />
    if (animated) return <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>{el}</motion.div>
    return el
  }

  if (variant === 'small') {
    const el = <IconSvg size={20} className={className} />
    if (animated) return <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>{el}</motion.div>
    return el
  }

  const el = <FullSvg className={`h-8 w-auto ${className}`} />
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
