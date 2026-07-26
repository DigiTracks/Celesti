import React, { useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { parts_catalog } from '@/json/parts_catalog'
import { workOrders } from '@/json/work_orders'
import { ncrs } from '@/json/quality_ncrs'
import { suppliers } from '@/json/suppliers'

type SearchTarget = {
  label: string
  route: string
  type: string
}

function searchAll(q: string): SearchTarget[] {
  const query = q.toLowerCase()
  const results: SearchTarget[] = []

  parts_catalog.slice(0, 20).forEach((p) => {
    if (p.partNumber.toLowerCase().includes(query) || p.name.toLowerCase().includes(query)) {
      results.push({ label: `${p.partNumber} — ${p.name}`, route: '/inventory', type: 'Part' })
    }
  })
  workOrders.slice(0, 20).forEach((wo) => {
    if (wo.woNumber.toLowerCase().includes(query) || wo.assignedOperator.toLowerCase().includes(query)) {
      results.push({ label: `${wo.woNumber} — ${wo.assignedOperator}`, route: '/shop-floor', type: 'WO' })
    }
  })
  ncrs.forEach((ncr) => {
    if (ncr.ncrNumber.toLowerCase().includes(query)) {
      results.push({ label: `${ncr.ncrNumber} — ${ncr.severity}`, route: '/quality', type: 'NCR' })
    }
  })
  suppliers.forEach((s) => {
    if (s.name.toLowerCase().includes(query)) {
      results.push({ label: s.name, route: '/supply-chain', type: 'Supplier' })
    }
  })

  return results.slice(0, 8)
}

const SearchInput: React.FC = () => {
  const [value, setValue] = useState('')
  const [results, setResults] = useState<SearchTarget[]>([])
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()

  const handleChange = (v: string) => {
    setValue(v)
    if (v.trim().length >= 2) {
      setResults(searchAll(v))
    } else {
      setResults([])
    }
  }

  const handleSelect = (r: SearchTarget) => {
    setValue('')
    setResults([])
    setFocused(false)
    navigate(r.route)
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 border border-border-subtle rounded-lg text-xs text-text-muted focus-within:border-border-accent transition-all">
        <Search className="w-3.5 h-3.5 flex-shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search parts, WOs, NCRs, suppliers..."
          className="flex-1 bg-transparent text-xs text-text-main placeholder-text-muted focus:outline-none"
        />
      </div>
      {focused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-bg-surface border border-border-subtle rounded-xl shadow-glass z-50 overflow-hidden">
          {results.map((r, i) => (
            <button
              key={i}
              onMouseDown={() => handleSelect(r)}
              className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-800/50 transition-colors"
            >
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-text-muted font-mono">{r.type}</span>
              <span className="text-xs text-text-main truncate flex-1">{r.label}</span>
              <ArrowRight className="w-3 h-3 text-text-muted flex-shrink-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchInput
