import React from 'react'
import { Package, Search } from 'lucide-react'
import KPICard from '@/components/common/KPICard'
import EnterpriseDataTable from '@/components/common/EnterpriseDataTable'
import PainPointBanner from '@/components/common/PainPointBanner'
import { parts_catalog } from '@/json/parts_catalog'
import type { Part } from '@/types'

const partColumns = [
  { key: 'partNumber', header: 'Part Number', sortable: true, render: (r: Part) => <span className="font-mono text-xs text-blue-400">{r.partNumber}</span> },
  { key: 'name', header: 'Name', sortable: true, render: (r: Part) => <span className="text-xs text-text-main font-medium truncate max-w-[160px] block">{r.name}</span> },
  { key: 'category', header: 'Category', sortable: true, render: (r: Part) => {
    const colors: Record<string, string> = { 'RF Component': 'text-cyan-clean', Structural: 'text-amber-ops', IC: 'text-purple-400', Fastener: 'text-text-muted', Harness: 'text-emerald-pass', Optical: 'text-blue-400' }
    return <span className={`text-[10px] font-mono ${colors[r.category] ?? ''}`}>{r.category}</span>
  }},
  { key: 'material', header: 'Material', sortable: true, render: (r: Part) => <span className="text-[10px] text-text-muted font-mono">{r.material}</span> },
  { key: 'rev', header: 'Rev', sortable: true, render: (r: Part) => <span className="text-xs font-mono text-text-muted">{r.rev}</span> },
  { key: 'lifecycle', header: 'Lifecycle', sortable: true, render: (r: Part) => {
    const colors: Record<string, string> = { prototype: 'text-amber-ops bg-amber-500/10', qualified: 'text-blue-400 bg-blue-500/10', production: 'text-emerald-pass bg-emerald-500/10', obsolete: 'text-red-fail bg-red-500/10' }
    return <span className={`text-[10px] px-2 py-0.5 rounded-full ${colors[r.lifecycle] ?? ''}`}>{r.lifecycle}</span>
  }},
  { key: 'unitCost', header: 'Unit Cost', sortable: true, render: (r: Part) => <span className="font-mono text-xs text-text-muted">${r.unitCost.toFixed(2)}</span> },
  { key: 'leadTimeDays', header: 'Lead Time', sortable: true, render: (r: Part) => <span className="font-mono text-xs text-text-muted">{r.leadTimeDays}d</span> },
]

const categoryCounts = parts_catalog.reduce<Record<string, number>>((acc, p) => {
  acc[p.category] = (acc[p.category] ?? 0) + 1
  return acc
}, {})

const lifecycleCounts = parts_catalog.reduce<Record<string, number>>((acc, p) => {
  acc[p.lifecycle] = (acc[p.lifecycle] ?? 0) + 1
  return acc
}, {})

const avgCost = Math.round(parts_catalog.reduce((s, p) => s + p.unitCost, 0) / parts_catalog.length * 100) / 100

const InventoryPage: React.FC = () => {
  return (
    <div className="space-y-6" data-tour="inventory-stats">
      <div>
        <h1 className="text-xl font-bold text-text-main flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-400" />
          Inventory & Parts Catalog
        </h1>
        <p className="text-xs text-text-muted mt-1">
          Complete parts catalog — 1,200 active part numbers across 6 categories
        </p>
      </div>

      <PainPointBanner
        pain="Part data scattered across PLM, ERP spreadsheets, and paper bins. No single view of 1,200+ part numbers across lifecycle stages. Engineers waste hours searching for correct revision and supplier info."
        solution="Unified parts catalog with full-text search across part number, name, material, and supplier. Lifecycle tracking (prototype → qualified → production → obsolete). Category filtering with instant counts."
        impact="Hours of search → instant lookup"
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KPICard title="Total Parts" value={parts_catalog.length} status="pass" />
        <KPICard title="Avg Unit Cost" value={`$${avgCost}`} status="neutral" />
        <KPICard title="Production PNs" value={lifecycleCounts.production ?? 0} status="pass" />
        <KPICard title="Qualified PNs" value={lifecycleCounts.qualified ?? 0} status="pass" />
        <KPICard title="Prototype PNs" value={lifecycleCounts.prototype ?? 0} status="warning" />
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {Object.entries(categoryCounts).map(([cat, count]) => {
          const colors: Record<string, string> = { 'RF Component': 'border-cyan-clean/30 bg-cyan-500/5', Structural: 'border-amber-ops/30 bg-amber-500/5', IC: 'border-purple-400/30 bg-purple-500/5', Fastener: 'border-slate-600/30 bg-slate-800/50', Harness: 'border-emerald-pass/30 bg-emerald-500/5', Optical: 'border-blue-400/30 bg-blue-500/5' }
          return (
            <div key={cat} className={`px-3 py-2 rounded-lg border text-center ${colors[cat] ?? 'border-border-subtle bg-slate-900/30'}`}>
              <p className="text-lg font-bold font-mono text-text-main">{count}</p>
              <p className="text-[10px] text-text-muted truncate">{cat}</p>
            </div>
          )
        })}
      </div>

      <div className="card-gradient p-4 space-y-3">
        <h2 className="text-sm font-semibold text-text-main flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-400" />
          Parts Catalog Browser
        </h2>
        <EnterpriseDataTable
          data={parts_catalog}
          columns={partColumns}
          pageSize={15}
          searchKeys={['partNumber', 'name', 'material']}
        />
      </div>
    </div>
  )
}

export default InventoryPage
