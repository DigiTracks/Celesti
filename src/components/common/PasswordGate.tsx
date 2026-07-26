import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Eye, EyeOff, Lock } from 'lucide-react'
import Logo from './Logo'

const PasswordGate: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const [value, setValue] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const correct = import.meta.env.VITE_APP_PASSWORD || 'celesti'
    if (value === correct) {
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-bg-base flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm space-y-8"
      >
        <div className="text-center space-y-4">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <Logo variant="full" className="h-10 justify-center" animated />
          </motion.div>
          <div className="space-y-2">
            <p className="text-sm text-text-muted">Enterprise Digital Platform Demo</p>
            <div className="flex items-center justify-center gap-2 text-[10px] text-amber-ops font-mono">
              <Shield className="w-3 h-3" />
              ITAR / EAR CONTROLLED — ACCESS RESTRICTED
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className={`space-y-4 bg-bg-surface/50 border ${error ? 'border-red-500/50' : 'border-border-subtle'} rounded-2xl p-6 backdrop-blur-sm`}
          animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type={showPw ? 'text' : 'password'}
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(false) }}
              placeholder="Enter access password"
              className="w-full pl-10 pr-10 py-3 bg-slate-900/50 border border-border-subtle rounded-xl text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-border-accent transition-all"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-fail font-mono text-center">
              Invalid password. Access denied.
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all"
          >
            Unlock Platform
          </button>

          <p className="text-[10px] text-text-muted/60 text-center">
            Authorized personnel only. All access is logged per ITAR compliance.
          </p>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default PasswordGate
