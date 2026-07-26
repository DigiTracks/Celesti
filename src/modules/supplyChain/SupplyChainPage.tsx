import React, { useState } from 'react'
import { Truck, Search, Shield, FileText, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import StatusBadge from '@/components/common/StatusBadge'
import EnterpriseDataTable from '@/components/common/EnterpriseDataTable'
import ActionDrawer from '@/components/common/ActionDrawer'
import PainPointBanner from '@/components/common/PainPointBanner'
import { suppliers } from '@/json/suppliers'
import { genealogy } from '@/json/genealogy'
import type { Supplier, GenealogyRecord } from '@/types'

const supplierColumns = [
  { key: 'name', header: 'Supplier', sortable: true, render: (r: Supplier) => <span className="text-sm font-medium text-text-main">{r.name}</span> },
  { key: 'tier', header: 'Tier', sortable: true, render: (r: Supplier) => <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-text-muted">T{r.tier}</span> },
  { key: 'auditScore', header: 'Audit Score', sortable: true, render: (r: Supplier) => (
    <div className="flex items-center gap-2">
      <span className={`font-mono text-xs ${r.auditScore >= 90 ? 'text-emerald-pass' : r.auditScore >= 80 ? 'text-amber-ops' : 'text-red-fail'}`}>{r.auditScore}</span>
      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${r.auditScore >= 90 ? 'bg-emerald-pass' : r.auditScore >= 80 ? 'bg-amber-ops' : 'bg-red-fail'}`} style={{ width: `${r.auditScore}%` }} />
      </div>
    </div>
  )},
  { key: 'amlStatus', header: 'AML Status', sortable: true, render: (r: Supplier) => (
    <StatusBadge
      label={r.amlStatus.toUpperCase()}
      variant={r.amlStatus === 'approved' ? 'completed' : r.amlStatus === 'conditional' ? 'hold' : 'failed'}
      pulse={r.amlStatus === 'conditional'}
    />
  )},
  { key: 'as9100Certified', header: 'AS9100', sortable: true, render: (r: Supplier) => r.as9100Certified
    ? <CheckCircle className="w-4 h-4 text-emerald-pass" />
    : <XCircle className="w-4 h-4 text-red-fail" />
  },
  { key: 'location', header: 'Location', sortable: true, render: (r: Supplier) => <span className="text-xs text-text-muted">{r.location}</span> },
]

const SupplyChainPage: React.FC = () => {
  const [selectedGen, setSelectedGen] = useState<GenealogyRecord | null>(null)

  const cocVariant = (status: GenealogyRecord['cocStatus']) => {
    switch (status) {
      case 'VERIFIED': return 'completed' as const
      case 'PENDING': return 'hold' as const
      case 'FLAGGED': return 'failed' as const
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-main">Supply Chain & Genealogy</h1>
        <p className="text-xs text-text-muted mt-1">Back-to-Birth Traceability · AS9163 CoC Validation · Supplier Management</p>
      </div>

      <PainPointBanner
        pain="Averaging 8 days to trace a flight-critical fastener back to its Mill Test Report. Manual cross-reference of 3 separate systems. Supplier audit scores buried in email threads — AML compliance at risk."
        solution="Back-to-birth genealogy with full DAG visualization. Trace any serial number to heat lot, MTR, and AS9163 CoC in under 3 seconds. Supplier AML with real-time audit scores and AS9100 certification status."
        impact="8-day trace → under 3 seconds"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="card-gradient p-4">
          <p className="text-xs text-text-muted mb-1">Qualified Suppliers</p>
          <p className="text-2xl font-bold font-mono text-text-main">{suppliers.filter(s => s.amlStatus === 'approved').length}</p>
        </div>
        <div className="card-gradient p-4">
          <p className="text-xs text-text-muted mb-1">Avg Audit Score</p>
          <p className="text-2xl font-bold font-mono text-text-main">{Math.round(suppliers.reduce((s, su) => s + su.auditScore, 0) / suppliers.length)}</p>
        </div>
        <div className="card-gradient p-4">
          <p className="text-xs text-text-muted mb-1">CoC Verified</p>
          <p className="text-2xl font-bold font-mono text-text-main">{genealogy.filter(g => g.cocStatus === 'VERIFIED').length}</p>
        </div>
        <div className="card-gradient p-4">
          <p className="text-xs text-text-muted mb-1">Flagged Records</p>
          <p className="text-2xl font-bold font-mono text-red-fail">{genealogy.filter(g => g.cocStatus === 'FLAGGED').length}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-gradient p-4 space-y-3">
          <h2 className="text-sm font-semibold text-text-main flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-400" />
            Approved Manufacturers List (AML)
          </h2>
          <EnterpriseDataTable
            data={suppliers.filter(s => s.amlStatus !== 'suspended')}
            columns={supplierColumns}
            pageSize={6}
          />
        </div>

        <div className="card-gradient p-4 space-y-3" data-tour="genealogy-graph">
          <h2 className="text-sm font-semibold text-text-main flex items-center gap-2">
            <Search className="w-4 h-4 text-cyan-clean" />
            Material Genealogy & CoC Status
          </h2>
          <EnterpriseDataTable
            data={genealogy.slice(0, 30)}
            columns={[
              { key: 'serialNumber', header: 'Serial #', sortable: true, render: (r: GenealogyRecord) => <span className="font-mono text-xs text-blue-400">{r.serialNumber}</span> },
              { key: 'lotNumber', header: 'Lot', sortable: true, render: (r: GenealogyRecord) => <span className="font-mono text-xs text-text-muted">{r.lotNumber}</span> },
              { key: 'heatCode', header: 'Heat Code', sortable: true, render: (r: GenealogyRecord) => <span className="font-mono text-xs text-text-muted">{r.heatCode}</span> },
              { key: 'cocStatus', header: 'CoC', sortable: true, render: (r: GenealogyRecord) => (
                <StatusBadge label={r.cocStatus} variant={cocVariant(r.cocStatus)} pulse={r.cocStatus === 'FLAGGED'} />
              )},
              { key: 'id', header: 'Parent Nodes', render: (r: GenealogyRecord) => (
                <span className="text-xs text-text-muted font-mono">{r.parentNodes.length}</span>
              )},
            ]}
            onRowClick={(row) => setSelectedGen(row)}
            pageSize={6}
            searchKeys={['serialNumber', 'lotNumber', 'heatCode']}
          />
        </div>
      </div>

      <ActionDrawer
        isOpen={!!selectedGen}
        onClose={() => setSelectedGen(null)}
        title={`Genealogy: ${selectedGen?.serialNumber ?? ''}`}
        subtitle={`Lot ${selectedGen?.lotNumber ?? ''} · Heat ${selectedGen?.heatCode ?? ''}`}
      >
        {selectedGen && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {selectedGen.cocStatus === 'VERIFIED' ? (
                <FileText className="w-5 h-5 text-emerald-pass" />
              ) : selectedGen.cocStatus === 'FLAGGED' ? (
                <AlertTriangle className="w-5 h-5 text-red-fail" />
              ) : (
                <Shield className="w-5 h-5 text-amber-ops" />
              )}
              <span className="text-sm text-text-main font-medium">
                CoC: {selectedGen.cocStatus}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-text-muted mb-1">Part</p>
                <p className="font-mono text-text-main">{selectedGen.partId}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-text-muted mb-1">Supplier</p>
                <p className="font-mono text-text-main">{selectedGen.supplierId}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-text-muted mb-1">Work Order</p>
                <p className="font-mono text-blue-400">{selectedGen.woId}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-text-muted mb-1">MTR</p>
                <p className="font-mono text-text-muted text-[10px]">{selectedGen.mtrUrl}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-text-muted">Parent Nodes ({selectedGen.parentNodes.length})</p>
              <div className="flex flex-wrap gap-1">
                {selectedGen.parentNodes.map((pid) => (
                  <span key={pid} className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono text-text-muted">{pid}</span>
                ))}
                {selectedGen.parentNodes.length === 0 && (
                  <span className="text-xs text-text-muted">Root node — no upstream parents</span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-text-muted">Child Nodes ({selectedGen.childNodes.length})</p>
              <div className="flex flex-wrap gap-1">
                {selectedGen.childNodes.map((cid) => (
                  <span key={cid} className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono text-text-muted">{cid}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </ActionDrawer>
    </div>
  )
}

export default SupplyChainPage
