import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Activity } from 'lucide-react'
import KPICard from '@/components/common/KPICard'
import PainPointBanner from '@/components/common/PainPointBanner'
import { facilities } from '@/json/facilities'
import { workOrders } from '@/json/work_orders'

const AnalyticsPage: React.FC = () => {
  const avgFPY = facilities.reduce((s, f) => s + f.fpy, 0) / facilities.length
  const avgOEE = facilities.reduce((s, f) => s + f.oee, 0) / facilities.length
  const failedWO = workOrders.filter((wo) => wo.status === 'failed').length
  const onTime = workOrders.filter((wo) => wo.status === 'completed').length
  const onTimePct = workOrders.length > 0 ? Math.round((onTime / workOrders.length) * 100) : 0

  const fpyData = [
    { facility: 'Hyderabad', fpy: 94.1, oee: 87.3, orders: 187 },
    { facility: 'Bengaluru', fpy: 96.5, oee: 91.8, orders: 143 },
    { facility: 'Thiruvananthapuram', fpy: 92.3, oee: 79.6, orders: 120 },
  ]

  return (
    <div className="space-y-6" data-tour="spc-chart">
      <div>
        <h1 className="text-xl font-bold text-text-main">Analytics & SPC</h1>
        <p className="text-xs text-text-muted mt-1">Statistical Process Control — Yield, OEE, Defect Trend Analysis</p>
      </div>

      <PainPointBanner
        pain="SPC charts calculated in Excel weeks after production. Process drift detected only after out-of-spec product is built. Cpk/Ppk values unknown until quarterly quality reviews. No correlation between OEE and FPY trends."
        solution="Real-time SPC dashboards with Cpk/Ppk analysis, control limits (UCL/LCL), and monthly yield trends across all facilities. Automatic alerting on process drift beyond ±3σ. Correlate OEE, FPY, and defect rates in one view."
        impact="Weeks-late analysis → real-time SPC"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard title="Avg First Pass Yield" value={avgFPY.toFixed(1)} unit="%" status={avgFPY > 93 ? 'pass' : 'warning'} trend={{ value: 2.3, isPositive: true }} />
        <KPICard title="Avg Overall OEE" value={avgOEE.toFixed(1)} unit="%" status={avgOEE > 85 ? 'pass' : 'warning'} trend={{ value: 4.1, isPositive: true }} />
        <KPICard title="Failed Work Orders" value={failedWO} status="fail" />
        <KPICard title="On-Time Delivery" value={onTimePct} unit="%" status={onTimePct > 85 ? 'pass' : 'warning'} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-gradient p-4 space-y-4">
          <h2 className="text-sm font-semibold text-text-main flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            Facility Performance Comparison
          </h2>
          <div className="space-y-3">
            {fpyData.map((d) => (
              <div key={d.facility} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-main font-medium">{d.facility}</span>
                  <span className="font-mono text-text-muted">{d.fpy}% FPY · {d.oee}% OEE</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-pass" style={{ width: `${d.fpy}%` }} />
                  <div className="h-full bg-blue-400" style={{ width: `${Math.max(0, d.oee - d.fpy)}%` }} />
                </div>
                <div className="flex items-center gap-3 text-[10px] text-text-muted">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-pass" /> FPY</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400" /> OEE</span>
                  <span className="ml-auto font-mono">{d.orders} active WOs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-gradient p-4 space-y-4">
          <h2 className="text-sm font-semibold text-text-main flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-clean" />
            SPC Control Limits — RF Sweep S11 Parameter
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Upper Control Limit (UCL)', value: -8.0, color: 'text-red-fail' },
              { label: 'Upper Spec Limit (USL)', value: -10.0, color: 'text-amber-ops' },
              { label: 'Process Mean (x̄)', value: -13.2, color: 'text-blue-400' },
              { label: 'Lower Spec Limit (LSL)', value: -18.0, color: 'text-amber-ops' },
              { label: 'Lower Control Limit (LCL)', value: -20.0, color: 'text-red-fail' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between px-3 py-2 bg-slate-800/50 rounded-lg">
                <span className="text-xs text-text-muted">{item.label}</span>
                <span className={`font-mono text-sm font-bold ${item.color}`}>{item.value} dB</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between px-3 py-2 bg-emerald-500/10 rounded-lg">
            <span className="text-xs text-text-main font-medium">Process Capability</span>
            <span className="font-mono text-sm text-emerald-pass">Cpk = 1.42</span>
          </div>
        </div>
      </div>

      <div className="card-gradient p-4 space-y-3">
        <h2 className="text-sm font-semibold text-text-main flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-pass" />
          Monthly Yield Trend — All Facilities (Last 6 Months)
        </h2>
        <div className="grid grid-cols-6 gap-2">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, _i) => {
            const yieldVal = 90 + Math.random() * 8
            return (
              <div key={month} className="text-center space-y-2">
                <div className="h-24 flex items-end justify-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${yieldVal}%` }}
                    className={`w-6 rounded-t-md ${yieldVal > 95 ? 'bg-emerald-pass' : yieldVal > 90 ? 'bg-blue-400' : 'bg-amber-ops'}`}
                    style={{ height: `${yieldVal * 0.7}%` }}
                  />
                </div>
                <p className="text-[10px] text-text-muted">{month}</p>
                <p className="text-[10px] font-mono text-text-main">{yieldVal.toFixed(1)}%</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
