import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Shield } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppStore, MOCK_PERSONAS } from '@/stores/useAppStore'

const roleMeta: Record<string, { color: string; icon: string }> = {
  CEO: { color: 'bg-purple-500', icon: 'EX' },
  MFG_ENGINEER: { color: 'bg-blue-500', icon: 'EN' },
  QUALITY_INSPECTOR: { color: 'bg-emerald-500', icon: 'QI' },
  TECHNICIAN: { color: 'bg-cyan-500', icon: 'TC' },
  SUPPLIER: { color: 'bg-amber-500', icon: 'VS' },
  AUDITOR: { color: 'bg-red-500', icon: 'AU' },
}

const PersonaSwitcher: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { activePersona, setPersona } = useAppStore()
  const navigate = useNavigate()
  const location = useLocation()
  const activeMeta = roleMeta[activePersona.role] ?? { color: 'bg-slate-600', icon: '?' }

  const roleLanding: Record<string, string> = {
    CEO: '/',
    MFG_ENGINEER: '/digital-thread',
    QUALITY_INSPECTOR: '/quality',
    TECHNICIAN: '/shop-floor',
    SUPPLIER: '/supply-chain',
    AUDITOR: '/executive',
  }

  const handleSwitch = (p: typeof activePersona) => {
    setPersona(p)
    setOpen(false)
    navigate(roleLanding[p.role] || '/', { replace: true })
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-subtle hover:border-border-accent transition-all text-sm"
      >
        <div
          className={`w-6 h-6 rounded-full ${activeMeta.color} flex items-center justify-center text-[8px] font-bold text-white`}
        >
          {activeMeta.icon}
        </div>
        <span className="text-text-main text-xs max-w-[120px] truncate">{activePersona.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 top-full mt-2 w-56 bg-bg-surface border border-border-subtle rounded-xl shadow-glass z-50 overflow-hidden"
          >
            <div className="p-2 border-b border-border-subtle">
              <p className="text-[10px] uppercase tracking-wider text-text-muted font-medium px-2 py-1">
                Switch Role
              </p>
            </div>
            {MOCK_PERSONAS.map((p) => {
              const meta = roleMeta[p.role] ?? { color: 'bg-slate-600', icon: '?' }
              const currentOk = p.accessibleRoutes.includes(location.pathname)
              return (
                <button
                  key={p.id}
                  onClick={() => handleSwitch(p)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-slate-800/50 ${activePersona.id === p.id ? 'bg-slate-800/30 border-l-2 border-border-accent' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full ${meta.color} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}
                  >
                    {meta.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-text-main truncate">{p.label}</p>
                    <p className="text-[10px] text-text-muted font-mono">
                      {p.role.replace('_', ' ')} · {p.clearanceLevel.replace('_', ' ')}
                    </p>
                  </div>
                  {!currentOk && p.id !== activePersona.id && (
                    <span title="Route access restricted">
                      <Shield className="w-3 h-3 text-amber-ops flex-shrink-0" />
                    </span>
                  )}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PersonaSwitcher
