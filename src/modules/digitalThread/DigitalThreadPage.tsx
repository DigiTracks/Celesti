import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle } from 'lucide-react'
import { useThreadStore } from '@/stores/useThreadStore'
import type { BomNode } from '@/stores/useThreadStore'
import PainPointBanner from '@/components/common/PainPointBanner'

const mockEbom: BomNode[] = [
  { id: 'EB-01', level: 0, partNumber: 'SAT-205-PLM-00', name: 'SAT-205 Comm Satellite (EbOM)', rev: 'C4', qty: 1, type: 'ebom', hasDiff: false },
  { id: 'EB-02', level: 1, partNumber: 'RF-1001-01', name: 'S-Band Transceiver Assembly', rev: 'B2', qty: 2, type: 'ebom', hasDiff: true },
  { id: 'EB-03', level: 1, partNumber: 'ST-2002-03', name: 'Primary Structure Frame', rev: 'A8', qty: 1, type: 'ebom', hasDiff: false },
  { id: 'EB-04', level: 1, partNumber: 'IC-3003-01', name: 'FPGA Telemetry Controller', rev: 'D1', qty: 3, type: 'ebom', hasDiff: true },
  { id: 'EB-05', level: 1, partNumber: 'HR-4004-02', name: 'RF Harness Assembly', rev: 'C2', qty: 4, type: 'ebom', hasDiff: false },
  { id: 'EB-06', level: 2, partNumber: 'RF-1001-01-A', name: 'S-Band RF Module', rev: 'B2', qty: 2, type: 'ebom', hasDiff: false },
  { id: 'EB-07', level: 2, partNumber: 'IC-3003-01-A', name: 'VHDL Logic Core', rev: 'D1', qty: 3, type: 'ebom', hasDiff: true },
  { id: 'EB-08', level: 2, partNumber: 'FT-5005-01', name: 'Ti M6 Fastener Kit', rev: 'A3', qty: 48, type: 'ebom', hasDiff: false },
]

const mockMbom: BomNode[] = [
  { id: 'MB-01', level: 0, partNumber: 'SAT-205-MES-00', name: 'SAT-205 Mfg BOM (MbOM)', rev: 'C5', qty: 1, type: 'mbom', hasDiff: false },
  { id: 'MB-02', level: 1, partNumber: 'RF-1001-02', name: 'S-Band Transceiver Assy (Alt)', rev: 'B3', qty: 2, type: 'mbom', hasDiff: true },
  { id: 'MB-03', level: 1, partNumber: 'ST-2002-03', name: 'Primary Structure Frame', rev: 'A8', qty: 1, type: 'mbom', hasDiff: false },
  { id: 'MB-04', level: 1, partNumber: 'IC-3003-02', name: 'SoC Telemetry Controller', rev: 'D2', qty: 3, type: 'mbom', hasDiff: true },
  { id: 'MB-05', level: 1, partNumber: 'HR-4004-02', name: 'RF Harness Assembly', rev: 'C3', qty: 4, type: 'mbom', hasDiff: true },
  { id: 'MB-06', level: 2, partNumber: 'RF-1001-02-A', name: 'S-Band RF Module (Alt freq)', rev: 'B3', qty: 2, type: 'mbom', hasDiff: true },
  { id: 'MB-07', level: 2, partNumber: 'IC-3003-02-A', name: 'SoC Firmware Core', rev: 'D2', qty: 3, type: 'mbom', hasDiff: true },
  { id: 'MB-08', level: 2, partNumber: 'FT-5005-02', name: 'Ti M8 Fastener Kit', rev: 'A2', qty: 48, type: 'mbom', hasDiff: true },
]

const DigitalThreadPage: React.FC = () => {
  const { ebom, mbom, selectedNode, setEbom, setMbom, selectNode } = useThreadStore()

  React.useEffect(() => {
    setEbom(mockEbom)
    setMbom(mockMbom)
  }, [setEbom, setMbom])

  const renderTree = (nodes: BomNode[], _type: 'ebom' | 'mbom') => (
    <div className="space-y-1">
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          layout
          onClick={() => selectNode(node)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition-all text-xs ${
            selectedNode?.id === node.id
              ? 'border-border-accent bg-blue-500/10'
              : node.hasDiff
              ? 'border-amber-500/20 bg-amber-500/5'
              : 'border-border-subtle hover:border-slate-700'
          }`}
          style={{ marginLeft: `${node.level * 20}px` }}
        >
          {node.hasDiff ? (
            <AlertTriangle className="w-3.5 h-3.5 text-amber-ops flex-shrink-0" />
          ) : (
            <CheckCircle className="w-3.5 h-3.5 text-emerald-pass flex-shrink-0" />
          )}
          <div className="min-w-0 flex-1">
            <p className="font-medium text-text-main truncate">{node.partNumber}</p>
            <p className="text-[10px] text-text-muted truncate">{node.name} · Rev {node.rev}</p>
          </div>
          <span className="text-[10px] text-text-muted font-mono flex-shrink-0">x{node.qty}</span>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6" data-tour="bom-diff">
      <div>
        <h1 className="text-xl font-bold text-text-main">Integrated Digital Thread</h1>
        <p className="text-xs text-text-muted mt-1">
          PLM-to-MES BOM Reconciliation — SAT-205 Communication Satellite Program
        </p>
      </div>

      <PainPointBanner
        pain="Engineering BOM (EbOM) and Manufacturing BOM (MbOM) drift apart at 12% per program. Outdated revisions reach the shop floor. ECOs take weeks to propagate. 1 in 8 assemblies uses wrong revision part."
        solution="Side-by-side EbOM/MbOM diff with color-coded discrepancies. Real-time revision comparison and ECO change propagation. Engineering changes reflected on shop floor instantly — zero configuration drift."
        impact="12% discrepancy → zero drift"
      />

      <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
        <AlertTriangle className="w-4 h-4 text-amber-ops" />
        <span className="text-xs text-amber-ops font-medium">
          4 configuration discrepancies detected between EbOM (Rev C4) and MbOM (Rev C5)
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-gradient p-4 space-y-3">
          <h2 className="text-sm font-semibold text-text-main flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            Engineering BOM (EbOM) · Rev C4
          </h2>
          {renderTree(ebom, 'ebom')}
        </div>

        <div className="card-gradient p-4 space-y-3">
          <h2 className="text-sm font-semibold text-text-main flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-pass" />
            Manufacturing BOM (MbOM) · Rev C5
          </h2>
          {renderTree(mbom, 'mbom')}
        </div>
      </div>

      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-gradient p-4 space-y-3"
        >
          <h2 className="text-sm font-semibold text-text-main">Selected Node Details</h2>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <p className="text-text-muted mb-1">Part Number</p>
              <p className="font-mono text-text-main">{selectedNode.partNumber}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <p className="text-text-muted mb-1">Name</p>
              <p className="text-text-main">{selectedNode.name}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <p className="text-text-muted mb-1">Revision</p>
              <p className="font-mono text-text-main">{selectedNode.rev}</p>
            </div>
          </div>
          {selectedNode.hasDiff && (
            <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-ops">
              <AlertTriangle className="w-3.5 h-3.5" />
              Configuration difference detected — ECO #ECR-7781 pending approval
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default DigitalThreadPage
