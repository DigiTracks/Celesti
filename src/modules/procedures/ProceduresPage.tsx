import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookText, Search, FileText, AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react'
import PainPointBanner from '@/components/common/PainPointBanner'

interface Procedure {
  id: string
  title: string
  category: 'AS9100D' | 'Work Instruction' | 'Quality Procedure' | 'Safety' | 'Calibration'
  documentId: string
  revision: string
  summary: string
  content: string
}

const procedures: Procedure[] = [
  {
    id: 'WI-001', title: 'RF Module Torque Application — Primary Fasteners', category: 'Work Instruction', documentId: 'WI-SAT-205-07', revision: 'C3',
    summary: 'Torque specification and poka-yoke interlock procedure for S-Band transceiver primary fasteners.',
    content: 'Purpose: Ensure correct torque application per IPC-A-620 Class 3.\n\nTools: DTW-770 (cal due 2026-03-15)\nPrimary: 5.6 N·m ±0.3\nFinal: 8.2 N·m ±0.4\n\nIf torque exceeds limit, WO is locked and NCR is auto-raised under AS9100D Clause 8.7.',
  },
  {
    id: 'WI-002', title: 'Cleanroom ISO-8 Particle Count Monitoring', category: 'Safety', documentId: 'WI-CLN-003', revision: 'B1',
    summary: 'Daily particle count verification protocol for ISO-8 cleanroom environments.',
    content: 'Frequency: Every 4 hours\nLocation: Zone C3 (AIT Integration)\nLimit: 3,520 particles/m³ @ 0.5µm\n\nIf exceeded: Stop work, notify facility manager, initiate HVAC review.',
  },
  {
    id: 'WI-003', title: 'AS9100D Non-Conformance Report Creation', category: 'AS9100D', documentId: 'QP-8.7-001', revision: 'D2',
    summary: 'Procedure for creating, classifying, and dispositioning NCRs per AS9100D Clause 8.7.',
    content: 'Severity Classification:\n- Minor: Does not affect form/fit/function\n- Major: Affects fit or function\n- Critical: Affects flight safety\n\nDisposition options: Rework, Repair, Use-as-is, Scrap.',
  },
  {
    id: 'WI-004', title: 'Supplier CoC Verification & Acceptance', category: 'Quality Procedure', documentId: 'QP-SUP-007', revision: 'A4',
    summary: 'Receiving inspection procedure for Certificate of Conformity verification.',
    content: 'Required documents:\n1. AS9163 CoC\n2. Mill Test Report (MTR)\n3. Material cert\n\nVerification steps:\n1. Scan CoC QR code\n2. Verify lot/heat match\n3. Check AML status\n4. Accept or flag in system.',
  },
  {
    id: 'WI-005', title: 'CMM Dimensional Inspection — Bracket ST-0045', category: 'Work Instruction', documentId: 'WI-CMM-022', revision: 'B2',
    summary: 'Coordinate Measuring Machine inspection plan for structural bracket.',
    content: 'Inspection points: 24 GD&T callouts\nDatums: A, B, C\nHole pattern tolerance: ±0.05mm\n\nAcceptance criteria: All points within spec. Flag any excursion >0.1mm to engineering.',
  },
  {
    id: 'WI-006', title: 'CAPA Initiation & Closure Workflow', category: 'Quality Procedure', documentId: 'QP-CAPA-001', revision: 'C1',
    summary: 'Corrective Action Preventive Action lifecycle from initiation to verification.',
    content: 'Stages: Draft → In Progress → Verified → Closed\n\nTimeline: 90 days max from initiation.\nRoot cause analysis required (5-Why or Fishbone).\nEffectiveness check required before closure.',
  },
  {
    id: 'WI-007', title: 'Thermal Vacuum Chamber Operation', category: 'Work Instruction', documentId: 'WI-TVAC-001', revision: 'A1',
    summary: 'TVAC cycle profile for satellite component qualification.',
    content: 'Cycle: -55°C to +125°C\nRamp rate: 5°C/min\nDwell: 30 minutes at each extreme\nChamber pressure: <1×10⁻⁵ Torr\n\nContinuous data logging required.',
  },
  {
    id: 'WI-008', title: 'Calibration Interval Management', category: 'Calibration', documentId: 'QP-CAL-003', revision: 'B3',
    summary: 'Tool and equipment calibration schedule and procedure.',
    content: 'Torque tools: 90 days\nCMM: 180 days\nRF test equipment: 365 days\nThermal chambers: 180 days\n\nOverdue calibration = Equipment lockout until completed.',
  },
  {
    id: 'WI-009', title: 'Harness Assembly & Continuity Test', category: 'Work Instruction', documentId: 'WI-HR-015', revision: 'A2',
    summary: '4-Wire Kelvin continuity test for RF harness assemblies.',
    content: 'Test current: 10mA\nAccept: <0.1Ω per meter\nPin-to-pin verification required for all 37 pins.\n\nOpen circuit or high resistance → reject and tag for rework.',
  },
  {
    id: 'WI-010', title: 'Material Lot Traceability & Genealogy', category: 'AS9100D', documentId: 'QP-TRACE-002', revision: 'C2',
    summary: 'Procedure for maintaining back-to-birth traceability of flight components.',
    content: 'Required per AS9100D Clause 8.5.2.\nEach lot must have: Heat code, MTR, CoC, WO reference.\nParent-child links maintained in genealogy DAG.\nFull trace in <3 seconds per serial number.',
  },
]

const categoryIcons: Record<string, React.FC<{ className?: string }>> = {
  AS9100D: AlertTriangle,
  'Work Instruction': FileText,
  'Quality Procedure': BookText,
  Safety: CheckCircle,
  Calibration: AlertTriangle,
}

const ProceduresPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Procedure | null>(null)
  const [category, setCategory] = useState<string | null>(null)

  const filtered = procedures.filter((p) => {
    if (category && p.category !== category) return false
    if (!search) return true
    const q = search.toLowerCase()
    return p.title.toLowerCase().includes(q) || p.documentId.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)
  })

  return (
    <div className="space-y-6 max-w-5xl mx-auto" data-tour="copilot-chat">
      <div>
        <h1 className="text-xl font-bold text-text-main flex items-center gap-2">
          <BookText className="w-6 h-6 text-blue-400" />
          Procedures & Knowledge Base
        </h1>
        <p className="text-xs text-text-muted mt-1">
          Offline searchable repository — AS9100D clauses, work instructions, quality procedures, safety protocols
        </p>
      </div>

      <PainPointBanner
        pain="Work instructions, quality procedures, and AS9100D clauses scattered across PDFs, shared drives, and email attachments. Operators waste 15+ minutes per shift searching for correct procedure version. No offline access on the cleanroom floor."
        solution="Unified, offline-searchable knowledge base with 10 core procedures across AS9100D, Work Instructions, Quality Procedures, Safety, and Calibration. Full-text search, category filtering, and document viewer. Bundled locally — zero network required."
        impact="15min search → instant access"
      />

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search procedures by title, document ID, or keywords..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900/50 border border-border-subtle rounded-xl text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-border-accent transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {['All', 'AS9100D', 'Work Instruction', 'Quality Procedure', 'Safety', 'Calibration'].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c === 'All' ? null : c)}
            className={`px-3 py-1 rounded-full text-[10px] font-medium border transition-all ${
              (c === 'All' && !category) || category === c
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                : 'bg-slate-800/50 border-border-subtle text-text-muted hover:border-slate-600'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-muted mb-2">{filtered.length} procedures found</p>
          <AnimatePresence>
            {filtered.map((proc) => {
              const Icon = categoryIcons[proc.category] ?? FileText
              return (
                <motion.button
                  key={proc.id}
                  layout
                  onClick={() => setSelected(proc)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selected?.id === proc.id
                      ? 'bg-blue-500/10 border-border-accent'
                      : 'card-gradient hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text-main truncate">{proc.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono text-blue-400">{proc.documentId}</span>
                        <span className="text-[10px] text-text-muted">Rev {proc.revision}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-text-muted">{proc.category}</span>
                      </div>
                      <p className="text-xs text-text-muted mt-1 line-clamp-2">{proc.summary}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0 mt-1" />
                  </div>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>

        <div>
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-gradient p-5 rounded-xl space-y-4 sticky top-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-text-main">{selected.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono text-blue-400">{selected.documentId}</span>
                    <span className="text-[10px] text-text-muted">Rev {selected.revision}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-text-muted">{selected.category}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-border-subtle pt-4">
                <p className="text-xs text-text-main font-medium mb-2">Document Content</p>
                <div className="bg-slate-900/50 border border-border-subtle rounded-lg p-4">
                  {selected.content.split('\n').map((line, i) => {
                    if (line.startsWith('**')) {
                      return <p key={i} className="text-xs font-semibold text-blue-400 mt-2 mb-1">{line.replace(/\*\*/g, '')}</p>
                    }
                    if (line.startsWith('- ')) {
                      return <p key={i} className="text-xs text-text-muted ml-3">• {line.slice(2)}</p>
                    }
                    if (line.match(/^\d+\./)) {
                      return <p key={i} className="text-xs text-text-muted ml-3">{line}</p>
                    }
                    return line ? <p key={i} className="text-xs text-text-muted">{line}</p> : <div key={i} className="h-2" />
                  })}
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-[10px] text-text-muted font-mono">Last synced: All documents bundled locally — no network required</span>
              </div>
            </motion.div>
          ) : (
            <div className="card-gradient p-8 rounded-xl text-center space-y-3">
              <BookText className="w-12 h-12 text-text-muted mx-auto" />
              <p className="text-sm text-text-muted">Select a procedure to view its full content</p>
              <p className="text-xs text-text-muted/60">All documents are bundled offline per ITAR/EAR data security requirements</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProceduresPage
