import React from 'react'
import { AlertOctagon, Inbox, RefreshCw, ShieldAlert } from 'lucide-react'

export const EmptyStateCard: React.FC<{
  title: string
  message: string
  onReset?: () => void
}> = ({ title, message, onReset }) => (
  <div className="p-12 text-center border border-dashed border-border-subtle rounded-xl bg-bg-base/40 space-y-4">
    <Inbox className="w-12 h-12 text-slate-600 mx-auto" />
    <h3 className="text-lg font-semibold text-text-muted">{title}</h3>
    <p className="text-sm text-text-muted max-w-sm mx-auto">{message}</p>
    {onReset && (
      <button
        onClick={onReset}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-blue-400 rounded-lg transition-all inline-flex items-center space-x-2"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Reset Search Filters</span>
      </button>
    )}
  </div>
)

export const AccessDeniedCard: React.FC<{ requiredClearance: string }> = ({ requiredClearance }) => (
  <div className="p-8 border border-red-500/30 bg-red-950/20 rounded-xl text-center space-y-3">
    <ShieldAlert className="w-10 h-10 text-red-fail mx-auto" />
    <h3 className="text-base font-bold text-red-400">
      ACCESS RESTRICTED — ITAR / EAR CONTROLLED DATA
    </h3>
    <p className="text-xs text-slate-400 max-w-md mx-auto">
      Active Persona clearance level does not satisfy required attribute{' '}
      <span className="font-mono text-amber-ops">[{requiredClearance}]</span>. Access denied per Defense
      Data Regulations.
    </p>
  </div>
)

export const ErrorStateCard: React.FC<{
  message?: string
  onReset?: () => void
}> = ({ message = 'An unexpected error occurred', onReset }) => (
  <div className="p-8 border border-red-500/30 bg-red-950/20 rounded-xl text-center space-y-3">
    <AlertOctagon className="w-10 h-10 text-red-fail mx-auto" />
    <h3 className="text-base font-semibold text-red-400">System Error</h3>
    <p className="text-sm text-slate-400 font-mono">{message}</p>
    {onReset && (
      <button
        onClick={onReset}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-blue-400 rounded-lg transition-all"
      >
        <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
        Retry
      </button>
    )}
  </div>
)

export const OfflineBanner: React.FC = () => (
  <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 text-center">
    <span className="text-xs font-mono text-amber-ops">
      ⚡ Running on Local Edge Cache — No network connection detected
    </span>
  </div>
)

export const AlertBanner: React.FC<{
  message: string
  variant?: 'warning' | 'error' | 'info'
}> = ({ message, variant = 'warning' }) => {
  const colors = {
    warning: 'bg-amber-500/10 border-amber-500/20 text-amber-ops',
    error: 'bg-red-500/10 border-red-500/20 text-red-fail',
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  }
  return (
    <div className={`px-4 py-2 border-b ${colors[variant]} text-center text-xs font-medium`}>
      {message}
    </div>
  )
}
