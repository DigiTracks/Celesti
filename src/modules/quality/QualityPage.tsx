import React, { useState } from 'react'
import { ClipboardCheck, AlertTriangle, Shield } from 'lucide-react'
import KPICard from '@/components/common/KPICard'
import StatusBadge from '@/components/common/StatusBadge'
import EnterpriseDataTable from '@/components/common/EnterpriseDataTable'
import ActionDrawer from '@/components/common/ActionDrawer'
import PainPointBanner from '@/components/common/PainPointBanner'
import { ncrs, capas } from '@/json/quality_ncrs'
import type { NCR, CAPA } from '@/types'

const severityColors: Record<NCR['severity'], string> = {
  minor: 'text-amber-ops bg-amber-500/10',
  major: 'text-red-fail bg-red-500/10',
  critical: 'text-purple-400 bg-purple-500/10',
}

const ncrColumns = [
  { key: 'ncrNumber', header: 'NCR #', sortable: true, render: (r: NCR) => <span className="font-mono text-xs text-red-400">{r.ncrNumber}</span> },
  { key: 'severity', header: 'Severity', sortable: true, render: (r: NCR) => <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${severityColors[r.severity]}`}>{r.severity.toUpperCase()}</span> },
  { key: 'clause', header: 'AS9100D Clause', sortable: true, render: (r: NCR) => <span className="text-xs text-text-muted font-mono">{r.clause.split(' —')[0]}</span> },
  { key: 'raisedBy', header: 'Raised By', sortable: true, render: (r: NCR) => <span className="text-xs text-text-muted">{r.raisedBy}</span> },
  { key: 'status', header: 'Status', sortable: true, render: (r: NCR) => (
    <StatusBadge
      label={r.status.replace(/_/g, ' ').toUpperCase()}
      variant={r.status === 'open' ? 'failed' : r.status === 'under_review' ? 'hold' : r.status === 'disposition_pending' ? 'hold' : 'completed'}
      pulse={r.status === 'open'}
    />
  )},
  { key: 'raisedAt', header: 'Date', sortable: true, render: (r: NCR) => <span className="text-xs font-mono text-text-muted">{new Date(r.raisedAt).toLocaleDateString()}</span> },
]

const QualityPage: React.FC = () => {
  const [selectedNCR, setSelectedNCR] = useState<NCR | null>(null)
  const openNCRs = ncrs.filter((n) => n.status === 'open').length
  const closedNCRs = ncrs.filter((n) => n.status === 'closed').length

  const openCAPAs = capas.filter((c) => c.status === 'in_progress' || c.status === 'draft').length
  const closedCAPAs = capas.filter((c) => c.status === 'closed').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-main">AS9100D Quality & Non-Conformance Center</h1>
        <p className="text-xs text-text-muted mt-1">Defense & Aerospace Quality Management System — NCR / MRB / CAPA</p>
      </div>

      <PainPointBanner
        pain="NCRs logged on paper travelers with 72-hour average response time. MRB reviews backlogged by 2 weeks. CAPA closure often exceeds 90-day target. No automated link between shop-floor torque failures and quality record creation."
        solution="Torque failure on shop floor auto-raises NCR under AS9100D Clause 8.7. MRB disposition workflow with digital signatures. CAPA tracking with 90-day enforcement. Full audit trail from WO step failure → NCR → CAPA → closure."
        impact="72hr response → instant auto-raise"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard title="Open NCRs" value={openNCRs} status="warning" />
        <KPICard title="Closed NCRs" value={closedNCRs} status="pass" />
        <KPICard title="Active CAPAs" value={openCAPAs} status="warning" trend={{ value: 15, isPositive: false }} />
        <KPICard title="CAPA Closure Rate" value={closedCAPAs} unit={`/ ${capas.length}`} status={closedCAPAs / capas.length > 0.5 ? 'pass' : 'warning'} />
      </div>

      <div className="card-gradient p-4 space-y-3" data-tour="ncr-table">
        <h2 className="text-sm font-semibold text-text-main flex items-center gap-2">
          <ClipboardCheck className="w-4 h-4 text-red-400" />
          Non-Conformance Reports (NCRs)
        </h2>
        <EnterpriseDataTable
          data={ncrs}
          columns={ncrColumns}
          onRowClick={(row) => setSelectedNCR(row)}
          pageSize={8}
          searchKeys={['ncrNumber', 'description', 'raisedBy']}
        />
      </div>

      <ActionDrawer
        isOpen={!!selectedNCR}
        onClose={() => setSelectedNCR(null)}
        title={selectedNCR?.ncrNumber ?? ''}
        subtitle={`Severity: ${selectedNCR?.severity.toUpperCase()} · ${selectedNCR?.status.replace(/_/g, ' ')}`}
      >
        {selectedNCR && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className={`w-5 h-5 ${severityColors[selectedNCR.severity].split(' ')[0]}`} />
              <p className="text-sm text-text-main">{selectedNCR.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-text-muted mb-1">AS9100D Clause</p>
                <p className="font-mono text-text-main">{selectedNCR.clause}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-text-muted mb-1">Raised By</p>
                <p className="font-mono text-text-main">{selectedNCR.raisedBy}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-text-muted mb-1">Date Raised</p>
                <p className="font-mono text-text-main">{new Date(selectedNCR.raisedAt).toLocaleDateString()}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-text-muted mb-1">Work Order</p>
                <p className="font-mono text-blue-400">{selectedNCR.woId}</p>
              </div>
            </div>
            {selectedNCR.disposition && (
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                <p className="text-xs text-blue-400 font-medium mb-1">MRB Disposition</p>
                <p className="text-xs text-text-muted">{selectedNCR.disposition}</p>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs font-medium text-blue-400 hover:bg-blue-500/20 transition-all">
                Assign to MRB Review
              </button>
              <button className="flex-1 px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs font-medium text-emerald-pass hover:bg-emerald-500/20 transition-all">
                Close NCR
              </button>
            </div>
          </div>
        )}
      </ActionDrawer>

      <div className="card-gradient p-4 space-y-3">
        <h2 className="text-sm font-semibold text-text-main flex items-center gap-2">
          <Shield className="w-4 h-4 text-amber-ops" />
          Corrective Action Plans (CAPAs)
        </h2>
        <EnterpriseDataTable
          data={capas.slice(0, 20)}
          columns={[
            { key: 'capaNumber', header: 'CAPA #', sortable: true, render: (r: CAPA) => <span className="font-mono text-xs text-amber-ops">{r.capaNumber}</span> },
            { key: 'rootCause', header: 'Root Cause', sortable: true, render: (r: CAPA) => <span className="text-xs text-text-muted max-w-[200px] truncate block">{r.rootCause}</span> },
            { key: 'owner', header: 'Owner', sortable: true, render: (r: CAPA) => <span className="text-xs text-text-muted">{r.owner}</span> },
            { key: 'status', header: 'Status', sortable: true, render: (r: CAPA) => (
              <StatusBadge
                label={r.status.replace(/_/g, ' ').toUpperCase()}
                variant={r.status === 'draft' ? 'hold' : r.status === 'in_progress' ? 'in_progress' : r.status === 'verified' ? 'completed' : 'completed'}
              />
            )},
            { key: 'targetDate', header: 'Target', sortable: true, render: (r: CAPA) => <span className="text-xs font-mono text-text-muted">{r.targetDate}</span> },
          ]}
          pageSize={8}
        />
      </div>
    </div>
  )
}

export default QualityPage
