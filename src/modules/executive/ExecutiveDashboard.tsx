import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, HardDrive, Activity } from 'lucide-react'
import KPICard from '@/components/common/KPICard'
import EnterpriseDataTable from '@/components/common/EnterpriseDataTable'
import PainPointBanner from '@/components/common/PainPointBanner'
import { facilities } from '@/json/facilities'
import { programs } from '@/json/programs'
import { workOrders } from '@/json/work_orders'
import type { Program } from '@/types'

const programColumns = [
  { key: 'name', header: 'Program', sortable: true, render: (r: Program) => <span className="font-medium text-text-main">{r.name}</span> },
  { key: 'customer', header: 'Customer', sortable: true, render: (r: Program) => <span className="text-text-muted text-xs font-mono">{r.customer}</span> },
  { key: 'type', header: 'Type', sortable: true, render: (r: Program) => <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-text-muted">{r.type}</span> },
  { key: 'budget', header: 'Budget', sortable: true, render: (r: Program) => <span className="font-mono text-xs text-text-muted">${(r.budget / 1e6).toFixed(0)}M</span> },
  { key: 'progress', header: 'Progress', sortable: true, render: (r: Program) => (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${r.progress > 75 ? 'bg-emerald-pass' : r.progress > 40 ? 'bg-blue-400' : 'bg-amber-ops'}`} style={{ width: `${r.progress}%` }} />
      </div>
      <span className="font-mono text-xs text-text-muted">{r.progress}%</span>
    </div>
  )},
  { key: 'status', header: 'Status', sortable: true, render: (r: Program) => {
    const colors: Record<string,string> = { active: 'text-emerald-pass bg-emerald-500/10', completed: 'text-blue-400 bg-blue-500/10', 'on-hold': 'text-amber-ops bg-amber-500/10' }
    return <span className={`text-[10px] px-2 py-0.5 rounded-full ${colors[r.status] ?? ''}`}>{r.status.toUpperCase().replace('-',' ')}</span>
  }},
]

const ExecutiveDashboard: React.FC = () => {
  const activeWOs = workOrders.filter((wo) => wo.status === 'in_progress')
  const onHoldWOs = workOrders.filter((wo) => wo.status === 'on_hold')
  const totalOpenValue = programs.filter(p => p.status === 'active').reduce((s, p) => s + p.budget, 0)

  return (
    <div className="space-y-6" data-tour="facility-grid">
      <div>
        <h1 className="text-xl font-bold text-text-main">Executive Mission Control</h1>
        <p className="text-xs text-text-muted mt-1">Real-time operational overview across all centers of excellence</p>
      </div>

      <PainPointBanner
        pain="Executives wait 2-3 days for manually compiled OEE/FPY reports from 3 disconnected facilities. No ability to drill down from program-level budget to shop-floor work order in real time."
        solution="Celesti provides a single-pane-of-glass across Hyderabad, Bengaluru, and Thiruvananthapuram with live OEE, FPY, throughput, and program budgets. Drill from program to work order in 3 clicks — no manual reporting."
        impact="48hr decision latency → real-time"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard title="Active WOs on Floor" value={activeWOs.length} status="pass" trend={{ value: 8, isPositive: true }} />
        <KPICard title="On Hold / Blocked" value={onHoldWOs.length} status="warning" />
        <KPICard title="Open Program Value" value={`$${(totalOpenValue / 1e9).toFixed(1)}B`} status="pass" />
        <KPICard title="Active Suppliers" value={30} unit="qualified" status="pass" />
      </div>

      <div className="grid md:grid-cols-3 gap-4" data-tour="facility-grid">
        {facilities.map((fac, i) => (
          <motion.div
            key={fac.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-gradient p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-sm font-semibold text-text-main">{fac.name.split(' ').slice(0, 2).join(' ')}</p>
                  <p className="text-[10px] text-text-muted">{fac.type}</p>
                </div>
              </div>
              <HardDrive className="w-5 h-5 text-text-muted" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-slate-800/50 rounded-lg p-2"><p className="font-bold text-emerald-pass font-mono">{fac.oee}%</p><p className="text-text-muted text-[10px]">OEE</p></div>
              <div className="bg-slate-800/50 rounded-lg p-2"><p className="font-bold text-blue-400 font-mono">{fac.fpy}%</p><p className="text-text-muted text-[10px]">FPY</p></div>
              <div className="bg-slate-800/50 rounded-lg p-2"><p className="font-bold text-text-main font-mono">{fac.activeOrders}</p><p className="text-text-muted text-[10px]">Orders</p></div>
              <div className="bg-slate-800/50 rounded-lg p-2"><p className="font-bold text-text-main font-mono">{fac.employeeCount}</p><p className="text-text-muted text-[10px]">Staff</p></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <h2 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400" />
          Active Programs Overview
        </h2>
        <EnterpriseDataTable
          data={programs.filter(p => p.status !== 'completed')}
          columns={programColumns}
          pageSize={8}
          searchKeys={['name', 'customer']}
        />
      </div>
    </div>
  )
}

export default ExecutiveDashboard
