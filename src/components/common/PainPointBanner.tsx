import React from 'react'
import { AlertTriangle, CheckCircle } from 'lucide-react'

interface PainPointBannerProps {
  pain: string
  solution: string
  impact?: string
}

const PainPointBanner: React.FC<PainPointBannerProps> = ({ pain, solution, impact }) => (
  <div className="grid md:grid-cols-2 gap-3 mb-6">
    <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-red-fail mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[10px] font-mono text-red-fail uppercase tracking-wider mb-0.5">The Pain Point</p>
          <p className="text-xs text-text-muted leading-relaxed">{pain}</p>
          {impact && <p className="text-[10px] font-mono text-amber-ops mt-1">Impact: {impact}</p>}
        </div>
      </div>
    </div>
    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3">
      <div className="flex items-start gap-2">
        <CheckCircle className="w-4 h-4 text-emerald-pass mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[10px] font-mono text-emerald-pass uppercase tracking-wider mb-0.5">Celesti Solution</p>
          <p className="text-xs text-text-muted leading-relaxed">{solution}</p>
        </div>
      </div>
    </div>
  </div>
)

export default PainPointBanner
