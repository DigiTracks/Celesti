import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertTriangle, Clock, Shield } from 'lucide-react'

interface GenealogyNodeProps {
  nodeId: string
  partName: string
  serialOrLot: string
  supplierName: string
  cocStatus: 'VERIFIED' | 'PENDING' | 'FLAGGED'
  depth?: number
  isLast?: boolean
}

const statusConfig = {
  VERIFIED: { icon: CheckCircle, color: 'text-emerald-pass', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  PENDING: { icon: Clock, color: 'text-amber-ops', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  FLAGGED: { icon: AlertTriangle, color: 'text-red-fail', bg: 'bg-red-500/10', border: 'border-red-500/30' },
}

const GenealogyNode: React.FC<GenealogyNodeProps> = ({ nodeId: _nodeId, partName, serialOrLot, supplierName, cocStatus, depth = 0, isLast = false }) => {
  const cfg = statusConfig[cocStatus]
  const Icon = cfg.icon

  return (
    <div className="relative flex items-start gap-3">
      {depth > 0 && (
        <div className="absolute left-[11px] top-0 bottom-1/2 w-px bg-border-subtle" />
      )}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`w-6 h-6 rounded-full ${cfg.bg} border ${cfg.border} flex items-center justify-center z-10`}
        >
          <Icon className={`w-3 h-3 ${cfg.color}`} />
        </motion.div>
        {!isLast && <div className="w-px h-full min-h-[4rem] bg-border-subtle" />}
      </div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={`flex-1 pb-4 ${cfg.bg} border ${cfg.border} rounded-xl p-3 space-y-1`}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-text-main">{partName}</p>
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${cfg.bg} ${cfg.color}`}>{cocStatus}</span>
        </div>
        <p className="text-xs text-text-muted font-mono">{serialOrLot}</p>
        <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
          <Shield className="w-3 h-3" />
          {supplierName}
        </div>
      </motion.div>
    </div>
  )
}

export default GenealogyNode
