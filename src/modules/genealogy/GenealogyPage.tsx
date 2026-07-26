import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Loader2, FileText, Shield, ArrowRight } from 'lucide-react'
import GenealogyNode from '@/components/common/GenealogyNode'
import PainPointBanner from '@/components/common/PainPointBanner'
import { genealogy } from '@/json/genealogy'
import { parts_catalog } from '@/json/parts_catalog'
import { suppliers } from '@/json/suppliers'

type ChainNodeO = {
  nodeId: string
  partName: string
  serialOrLot: string
  supplierName: string
  cocStatus: 'VERIFIED' | 'PENDING' | 'FLAGGED'
}
const EXAMPLE_CHAIN: ChainNodeO[] = [
  {
    nodeId: 'LOT-8832',
    partName: 'Al 7075-T6 Plate',
    serialOrLot: 'LOT-HF-8832',
    supplierName: 'AeroAlloys Precision Components',
    cocStatus: 'VERIFIED',
  },
  {
    nodeId: 'HEAT-441',
    partName: 'Heat Treat Batch #441',
    serialOrLot: 'HT-B441',
    supplierName: 'AeroAlloys Precision Components',
    cocStatus: 'VERIFIED',
  },
  {
    nodeId: 'MTR-001',
    partName: 'Mill Test Report',
    serialOrLot: 'MTR-2025-AER-001',
    supplierName: 'Primary Mill',
    cocStatus: 'VERIFIED',
  },
  {
    nodeId: 'PART-ST0045',
    partName: 'Bracket ST-0045',
    serialOrLot: 'SER-44932-AA',
    supplierName: 'Structura Aerospace',
    cocStatus: 'VERIFIED',
  },
  {
    nodeId: 'ASM-RF07',
    partName: 'RF Module Assembly',
    serialOrLot: 'RFA-7712-03',
    supplierName: 'RF Microwave Components Ltd',
    cocStatus: 'PENDING',
  },
  {
    nodeId: 'UNIT-SAT',
    partName: 'SAT-205 Communication Satellite',
    serialOrLot: 'SAT-205-UNIT-01',
    supplierName: 'Digi Tracks Integration',
    cocStatus: 'VERIFIED',
  },
]

const partMap = new Map(parts_catalog.map((p) => [p.id, p.name]))
const supplierMap = new Map(suppliers.map((s) => [s.id, s.name]))

const GenealogyPage: React.FC = () => {
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [chain, setChain] = useState<ChainNodeO[]>(EXAMPLE_CHAIN)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearching(true)
    setTimeout(() => {
      setSearching(false)
      if (query.trim()) {
        const q = query.toLowerCase()
        const found = genealogy.filter(
          (g) =>
            g.serialNumber.toLowerCase().includes(q) ||
            g.lotNumber.toLowerCase().includes(q) ||
            g.heatCode.toLowerCase().includes(q),
        )
        if (found.length > 0) {
          setChain(
            found.slice(0, 6).map((g) => ({
              nodeId: g.id,
              partName: partMap.get(g.partId) ?? g.partId,
              serialOrLot: `${g.serialNumber} / Lot ${g.lotNumber}`,
              supplierName: supplierMap.get(g.supplierId) ?? g.supplierId,
              cocStatus: g.cocStatus,
            })),
          )
        }
      } else {
        setChain(EXAMPLE_CHAIN)
      }
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <PainPointBanner
          pain="Averaging 8 days to trace a flight fastener back to its Mill Test Report. Manual cross-reference of 3 separate systems required."
          solution="Back-to-birth genealogy linking every serial to MTR, heat lot, AS9163 CoC. Full trace in under 3 seconds."
          impact="8 day trace time → 3 seconds"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-blue-400" />
          <h1 className="text-xl font-bold text-text-main">Material Traceability & Genealogy</h1>
        </div>

        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-900/50 border border-border-subtle rounded-lg focus-within:border-border-accent transition-all">
            <Search className="w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by serial number, heat lot, part number, or MTR ID..."
              className="flex-1 bg-transparent text-sm text-text-main placeholder-text-muted focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs font-medium text-blue-400 hover:bg-blue-500/20 transition-all flex items-center gap-1.5"
          >
            {searching ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
            Trace
          </button>
        </form>

        {searching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 py-4"
          >
            <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
            <span className="text-xs text-text-muted font-mono">
              Tracing lineage across supply chain nodes...
            </span>
          </motion.div>
        )}

        {!searching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-text-muted font-mono">{chain.length} nodes in trace</p>
              <span className="text-[10px] text-emerald-pass font-mono">
                Trace completed in 0.8s
              </span>
            </div>
            <div
              className="bg-slate-900/30 border border-border-subtle rounded-xl p-4 space-y-0"
              data-tour="genealogy-graph"
            >
              {chain.map((node, i) => (
                <GenealogyNode
                  key={node.nodeId}
                  {...node}
                  depth={i}
                  isLast={i === chain.length - 1}
                />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="border border-border-subtle rounded-xl p-4 bg-slate-900/30"
      >
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-amber-ops" />
          <span className="text-xs font-semibold text-text-main">Attached Documents</span>
        </div>
        <div className="space-y-2">
          {genealogy
            .filter((g) => g.cocStatus === 'VERIFIED')
            .slice(0, 4)
            .map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between px-3 py-2 bg-slate-900/50 rounded-lg"
              >
                <div>
                  <p className="text-xs text-text-main">{partMap.get(doc.partId) ?? doc.partId}</p>
                  <p className="text-[10px] text-text-muted font-mono">{doc.serialNumber}</p>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-mono bg-emerald-500/10 text-emerald-pass">
                  VERIFIED
                </span>
              </div>
            ))}
        </div>
      </motion.div>
    </div>
  )
}

export default GenealogyPage
