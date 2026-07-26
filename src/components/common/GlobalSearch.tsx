import React, { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Package, Factory, ClipboardCheck, Truck, BookText, Globe, Network, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { parts_catalog } from '@/json/parts_catalog'
import { workOrders } from '@/json/work_orders'
import { ncrs } from '@/json/quality_ncrs'
import { suppliers } from '@/json/suppliers'
import { facilities } from '@/json/facilities'
import { programs } from '@/json/programs'

interface SearchResult {
  id: string
  label: string
  description: string
  category: string
  route: string
  icon: React.FC<{ className?: string }>
}

const allProcedures = [
  { id: 'WI-001', title: 'RF Module Torque Application — Primary Fasteners', category: 'Work Instruction', docId: 'WI-SAT-205-07' },
  { id: 'WI-002', title: 'Cleanroom ISO-8 Particle Count Monitoring', category: 'Safety', docId: 'WI-CLN-003' },
  { id: 'WI-003', title: 'AS9100D Non-Conformance Report Creation', category: 'AS9100D', docId: 'QP-8.7-001' },
  { id: 'WI-004', title: 'Supplier CoC Verification & Acceptance', category: 'Quality Procedure', docId: 'QP-SUP-007' },
  { id: 'WI-005', title: 'CMM Dimensional Inspection — Bracket ST-0045', category: 'Work Instruction', docId: 'WI-CMM-022' },
  { id: 'WI-006', title: 'CAPA Initiation & Closure Workflow', category: 'Quality Procedure', docId: 'QP-CAPA-001' },
  { id: 'WI-007', title: 'Thermal Vacuum Chamber Operation', category: 'Work Instruction', docId: 'WI-TVAC-001' },
  { id: 'WI-008', title: 'Calibration Interval Management', category: 'Calibration', docId: 'QP-CAL-003' },
  { id: 'WI-009', title: 'Harness Assembly & Continuity Test', category: 'Work Instruction', docId: 'WI-HR-015' },
  { id: 'WI-010', title: 'Material Lot Traceability & Genealogy', category: 'AS9100D', docId: 'QP-TRACE-002' },
]

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = []

  parts_catalog.slice(0, 300).forEach((p) => {
    results.push({
      id: `part-${p.id}`, label: p.partNumber, description: `${p.name} · ${p.category} · Rev ${p.rev}`,
      category: 'Part', route: '/inventory', icon: Package,
    })
  })

  workOrders.slice(0, 200).forEach((wo) => {
    results.push({
      id: `wo-${wo.id}`, label: wo.woNumber, description: `${wo.assignedOperator} · ${wo.status} · Qty ${wo.quantityCompleted}/${wo.quantity}`,
      category: 'Work Order', route: '/shop-floor', icon: Factory,
    })
  })

  ncrs.forEach((ncr) => {
    results.push({
      id: `ncr-${ncr.id}`, label: ncr.ncrNumber, description: `${ncr.severity.toUpperCase()} · ${ncr.clause.split(' —')[0]}`,
      category: 'NCR', route: '/quality', icon: ClipboardCheck,
    })
  })

  suppliers.forEach((s) => {
    results.push({
      id: `sup-${s.id}`, label: s.name, description: `Tier ${s.tier} · AML: ${s.amlStatus} · Score: ${s.auditScore}`,
      category: 'Supplier', route: '/supply-chain', icon: Truck,
    })
  })

  allProcedures.forEach((p) => {
    results.push({
      id: `proc-${p.id}`, label: p.title, description: `${p.docId} · ${p.category}`,
      category: 'Procedure', route: '/procedures', icon: BookText,
    })
  })

  facilities.forEach((f) => {
    results.push({
      id: `fac-${f.id}`, label: f.name, description: `${f.location} · OEE: ${f.oee}% · FPY: ${f.fpy}%`,
      category: 'Facility', route: '/executive', icon: Globe,
    })
  })

  programs.forEach((p) => {
    results.push({
      id: `prg-${p.id}`, label: p.name, description: `${p.customer} · $${(p.budget / 1e6).toFixed(0)}M · ${p.progress}%`,
      category: 'Program', route: '/executive', icon: Network,
    })
  })

  return results
}

const searchIndex = buildIndex()

const GlobalSearch: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIdx(0)
    }
  }, [open])

  const filtered = query
    ? searchIndex.filter((r) => {
        const q = query.toLowerCase()
        return r.label.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
      }).slice(0, 20)
    : searchIndex.slice(0, 8)

  const handleSelect = useCallback((result: SearchResult) => {
    setOpen(false)
    navigate(result.route)
  }, [navigate])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx((i) => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && filtered[selectedIdx]) { handleSelect(filtered[selectedIdx]!) }
  }

  const grouped = filtered.reduce<Record<string, SearchResult[]>>((acc, r) => {
    if (!acc[r.category]) acc[r.category] = []
    acc[r.category]!.push(r)
    return acc
  }, {})

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-[100]"
        title="Search across all data (Ctrl+K)"
      >
        <Search className="w-4 h-4 text-white" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[9998]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[9999] bg-bg-surface border border-border-subtle rounded-2xl shadow-glass overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle">
                <Search className="w-4 h-4 text-text-muted flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelectedIdx(0) }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search parts, work orders, NCRs, suppliers, procedures..."
                  className="flex-1 bg-transparent text-sm text-text-main placeholder-text-muted focus:outline-none"
                />
                <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 font-mono text-text-muted">ESC</kbd>
              </div>

              <div className="max-h-[400px] overflow-y-auto p-2">
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider px-3 py-2">
                      {category} · {items.length}
                    </p>
                    {items.map((result) => {
                      const globalIdx = filtered.indexOf(result)
                      const Icon = result.icon
                      return (
                        <button
                          key={result.id}
                          onClick={() => handleSelect(result)}
                          onMouseEnter={() => setSelectedIdx(globalIdx)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                            selectedIdx === globalIdx ? 'bg-blue-500/10 border border-blue-500/30' : 'border border-transparent hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-3.5 h-3.5 text-blue-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-text-main truncate">{result.label}</p>
                            <p className="text-[10px] text-text-muted truncate">{result.description}</p>
                          </div>
                          <ArrowRight className="w-3 h-3 text-text-muted flex-shrink-0" />
                        </button>
                      )
                    })}
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="p-8 text-center text-sm text-text-muted">
                    No results found for "<span className="font-mono text-blue-400">{query}</span>"
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 px-4 py-2 border-t border-border-subtle text-[10px] text-text-muted">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>⌘K Toggle</span>
                <span className="ml-auto font-mono">{searchIndex.length} indexed records</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default GlobalSearch
