import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeftRight } from 'lucide-react'

interface DiffLine {
  key: string
  left: string
  right: string
  status: 'same' | 'added' | 'removed' | 'modified'
}

interface SplitDiffPanelProps {
  title?: string
  leftLabel?: string
  rightLabel?: string
  lines: DiffLine[]
}

const statusStyles = {
  same: 'text-text-muted',
  added: 'bg-emerald-500/10 text-emerald-pass',
  removed: 'bg-red-500/10 text-red-fail',
  modified: 'bg-amber-500/10 text-amber-ops',
}

const SplitDiffPanel: React.FC<SplitDiffPanelProps> = ({ title = 'Diff View', leftLabel = 'Source', rightLabel = 'Target', lines }) => {
  return (
    <div className="border border-border-subtle rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border-subtle bg-slate-900/50">
        <ArrowLeftRight className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-xs font-medium text-text-main">{title}</span>
        <span className="ml-auto text-[10px] text-text-muted font-mono">{lines.filter(l => l.status !== 'same').length} changes</span>
      </div>
      <div className="grid grid-cols-2 divide-x divide-border-subtle">
        <div className="p-2">
          <p className="text-[10px] font-mono text-text-muted px-2 pb-1 uppercase tracking-wider">{leftLabel}</p>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
              className={`px-2 py-1 text-[11px] font-mono rounded ${statusStyles[line.status]}`}
            >
              {line.status === 'removed' ? <span className="line-through opacity-60">{line.left}</span> : line.left}
            </motion.div>
          ))}
        </div>
        <div className="p-2">
          <p className="text-[10px] font-mono text-text-muted px-2 pb-1 uppercase tracking-wider">{rightLabel}</p>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
              className={`px-2 py-1 text-[11px] font-mono rounded ${statusStyles[line.status]}`}
            >
              {line.status === 'added' ? <strong>{line.right}</strong> : line.right}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SplitDiffPanel
