import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Eye, EyeOff, Lock } from 'lucide-react'

const PasswordGate: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const [value, setValue] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const correct = import.meta.env.VITE_APP_PASSWORD || 'earth@123'
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
        className="w-full max-w-sm"
      >
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex items-center justify-center mx-auto"
            style={{ width: '240px', height: '140px' }}
          >
            {/* Orbit rings */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ perspective: '800px' }}
            >
              <div
                className="w-[200px] h-[120px] rounded-full border border-blue-500/10"
                style={{ transform: 'rotateX(75deg)' }}
              />
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ perspective: '800px' }}
            >
              <div
                className="w-[150px] h-[90px] rounded-full border border-blue-500/5"
                style={{ transform: 'rotateX(75deg)' }}
              />
            </div>
            {/* Satellites */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ perspective: '800px' }}
            >
              <div
                className="relative"
                style={{
                  width: 0,
                  height: 0,
                  transform: 'rotateX(75deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  style={{
                    animation: 'spin 5s linear infinite',
                    transformOrigin: '0 0',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 shadow-lg shadow-blue-500/40"
                    style={{ transform: 'translateX(85px) translateY(-50%)' }}
                  />
                </div>
                <div
                  style={{
                    animation: 'spin 7s linear infinite reverse',
                    transformOrigin: '0 0',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 shadow-lg shadow-cyan-400/30"
                    style={{ transform: 'translateX(-75px) translateY(-50%)' }}
                  />
                </div>
                <div
                  style={{
                    animation: 'spin 9s linear infinite',
                    transformOrigin: '0 0',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                  }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-blue-500/40 to-cyan-400/40 border border-blue-400/30 shadow-lg"
                    style={{ transform: 'translateX(100px) translateY(-50%)' }}
                  />
                </div>
              </div>
            </div>
            {/* Brandmark C */}
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20 z-10"
            >
              <span className="text-white font-bold text-sm">C</span>
            </motion.div>
            {/* Celesti text */}
            <div className="z-10 ml-2">
              <motion.h1
                animate={{
                  textShadow: [
                    '0 0 20px rgba(59,130,246,0)',
                    '0 0 30px rgba(59,130,246,0.3)',
                    '0 0 20px rgba(59,130,246,0)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="text-2xl font-bold text-white tracking-tight"
              >
                Celesti
                <span className="text-2xl font-light text-blue-500">.</span>
              </motion.h1>
            </div>
          </motion.div>
          <div className="space-y-1">
            <p className="text-xs text-text-muted">Enterprise Digital Platform Demo</p>
            <div className="flex items-center justify-center gap-1.5 text-[9px] text-amber-ops font-mono">
              <Shield className="w-2.5 h-2.5" />
              ITAR / EAR CONTROLLED — ACCESS RESTRICTED
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className={`mt-4 space-y-3 bg-bg-surface/50 border ${error ? 'border-red-500/50' : 'border-border-subtle'} rounded-xl p-4 backdrop-blur-sm`}
          animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
            <input
              type={showPw ? 'text' : 'password'}
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                setError(false)
              }}
              placeholder="Enter access password"
              className="w-full pl-9 pr-9 py-2.5 bg-slate-900/50 border border-border-subtle rounded-lg text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-border-accent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
            >
              {showPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-fail font-mono text-center"
            >
              Invalid password. Access denied.
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-all"
          >
            Unlock Platform
          </button>

          <p className="text-[9px] text-text-muted/60 text-center">
            Authorized personnel only. All access is logged per ITAR compliance.
          </p>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default PasswordGate
