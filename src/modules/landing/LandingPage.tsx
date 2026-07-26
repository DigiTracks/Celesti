import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Shield, AlertTriangle, CheckCircle, BarChart3, Globe, Package, BookText, Factory, ClipboardCheck, Truck, Network, Search } from 'lucide-react'
import KPICard from '@/components/common/KPICard'
import Logo from '@/components/common/Logo'
import { facilities } from '@/json/facilities'
import { programs } from '@/json/programs'
import { parts_catalog } from '@/json/parts_catalog'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const activePrograms = programs.filter((p) => p.status === 'active')
  const totalBudget = activePrograms.reduce((s, p) => s + p.budget, 0)
  const totalEmployees = facilities.reduce((s, f) => s + f.employeeCount, 0)

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-10" data-tour="hero-stats">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 pt-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-medium mb-2">
          <Shield className="w-3.5 h-3.5" />
          Digi Tracks — AS9100D & ITAR Compliant Demo
        </div>
        <div className="flex items-center justify-center gap-4 mb-4">
          <Logo variant="full" className="h-12" animated />
        </div>
        <p className="text-base text-text-muted max-w-3xl mx-auto leading-relaxed">
          Real-time manufacturing visibility across 3 centers of excellence — 450+ active work orders, 
          1,200 controlled parts, AS9100D quality enforcement, and full back-to-birth supply chain traceability.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-text-muted">
          <span>Global search across all data — click <span className="text-blue-400">🔍</span> in header</span>
        </div>
      </motion.div>

      {/* PROBLEM DEFINITION - Expanded with impact data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-gradient p-6 rounded-2xl border-l-4 border-red-fail"
      >
        <h2 className="text-base font-bold text-text-main flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-red-fail" />
          The Challenge — 6 Critical Pain Points
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { icon: Globe, pain: 'Fragmented Operational Visibility', detail: '3 facilities operate independently — no single-pane-of-glass for executives. Reports take 2-3 days to compile manually.', impact: '+48hr decision latency', severity: 'critical' },
            { icon: ClipboardCheck, pain: 'Paper-Based AS9100D Compliance', detail: 'NCRs logged on paper travelers. Average 72-hour response time to non-conformances. MRB reviews backlogged by 2 weeks.', impact: '72hr response lag', severity: 'critical' },
            { icon: Truck, pain: 'Slow Supply Chain Traceability', detail: 'Averaging 8 days to trace a flight fastener back to its Mill Test Report. Manual cross-reference of 3 separate systems required.', impact: '8 day trace time', severity: 'major' },
            { icon: Network, pain: 'PLM/MES Configuration Drift', detail: 'Engineering BOM and Manufacturing BOM diverge at 12% per program. 1 in 8 assemblies uses wrong revision part.', impact: '12% discrepancy', severity: 'major' },
            { icon: Factory, pain: 'No Real-Time Cleanroom Monitoring', detail: 'ISO-8 particle counts logged manually twice per shift. Environmental excursions detected hours after occurrence.', impact: 'Hours to detect', severity: 'major' },
            { icon: Shield, pain: 'ITAR/EAR Data Exposure Risk', detail: 'Cloud-based tools not approved for defense data. Spreadsheets emailed across facilities violate data handling policies.', impact: 'Compliance risk', severity: 'critical' },
          ].map((item) => (
            <div key={item.pain} className="bg-slate-900/50 border border-red-500/10 rounded-xl p-4 space-y-1">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-red-fail" />
                  <h3 className="text-sm font-semibold text-text-main">{item.pain}</h3>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  item.severity === 'critical' ? 'bg-red-500/10 text-red-fail' : 'bg-amber-500/10 text-amber-ops'
                }`}>{item.severity.toUpperCase()}</span>
              </div>
              <p className="text-xs text-text-muted pl-6">{item.detail}</p>
              <div className="flex items-center gap-2 pl-6 pt-1">
                <AlertTriangle className="w-3 h-3 text-amber-ops" />
                <span className="text-[10px] font-mono text-amber-ops">{item.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* SOLUTION - mapped to each pain point */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-gradient p-6 rounded-2xl border-l-4 border-emerald-pass"
      >
        <h2 className="text-base font-bold text-text-main flex items-center gap-2 mb-3">
          <CheckCircle className="w-5 h-5 text-emerald-pass" />
          The Celesti Solution — Pain Point Resolution Map
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Globe, title: 'Unified Operations Dashboard', resolves: 'Fragmented Visibility', desc: 'Real-time OEE, FPY, throughput across all 3 facilities. Executive drill-down from program to work order in 3 clicks. No manual reporting.', route: '/executive' },
            { icon: ClipboardCheck, title: 'Automated AS9100D Workflow', resolves: 'Paper Compliance', desc: 'NCR auto-created on torque failure (Clause 8.7). MRB disposition workflow. CAPA tracking with 90-day closure. Full audit trail.', route: '/quality' },
            { icon: Truck, title: '3-Second Traceability', resolves: 'Slow Traceability', desc: 'Back-to-birth genealogy linking every serial to MTR, heat lot, AS9163 CoC. Full trace in &lt;3 seconds. Supplier AML with audit scores.', route: '/supply-chain' },
            { icon: Network, title: 'Digital Thread Reconciliation', resolves: 'BOM Drift', desc: 'EbOM-to-MbOM side-by-side diff with real-time detection. ECO change propagation. Zero configuration drift between engineering and shop floor.', route: '/digital-thread' },
            { icon: Factory, title: 'Live Cleanroom Telemetry', resolves: 'No Monitoring', desc: 'Real-time ISO-8 particle, temp, humidity via Web Worker. Automatic alert on excursion. 3-second update interval. Historical trend view.', route: '/shop-floor' },
            { icon: Shield, title: '100% Offline & ITAR Safe', resolves: 'Data Exposure', desc: 'Zero external network calls. All data bundled in static build. Full functionality without internet. Data never leaves the browser. GitHub Pages deployed.', route: '/architecture' },
          ].map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.route)}
              className="bg-slate-900/50 border border-border-subtle rounded-xl p-4 space-y-2 text-left hover:border-emerald-500/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <item.icon className="w-5 h-5 text-emerald-pass" />
                <span className="text-[9px] text-text-muted font-mono opacity-0 group-hover:opacity-100 transition-opacity">Go →</span>
              </div>
              <h3 className="text-sm font-semibold text-text-main">{item.title}</h3>
              <p className="text-[10px] text-amber-ops font-mono">Resolves: {item.resolves}</p>
              <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* GLOBAL SEARCH PROMO */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5 text-center space-y-3"
      >
        <Search className="w-6 h-6 text-blue-400 mx-auto" />
        <p className="text-sm text-text-main font-medium">Global Search — Indexed Across All Modules</p>
        <p className="text-xs text-text-muted max-w-xl mx-auto">
          Click the <span className="text-blue-400">🔍</span> icon in the header or press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-[10px]">Ctrl+K</kbd> to instantly search 
          1,200 parts, 450 work orders, 75 NCRs, 90 suppliers, 10 procedures, 3 facilities, and 20 programs — entirely local, no network.
        </p>
      </motion.div>

      {/* KEY METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard title="Active Programs" value={activePrograms.length} status="pass" trend={{ value: 12, isPositive: true }} onClick={() => navigate('/executive')} />
        <KPICard title="Budget Deployed" value={`$${(totalBudget / 1e6).toFixed(0)}M`} status="pass" />
        <KPICard title="Total Workforce" value={totalEmployees.toLocaleString()} status="pass" />
        <KPICard title="Facilities" value={facilities.length} unit="sites" status="pass" />
        <KPICard title="Parts Catalog" value={parts_catalog.length.toLocaleString()} unit="PNs" status="pass" onClick={() => navigate('/inventory')} />
        <KPICard title="Avg First Pass Yield" value={facilities.reduce((s, f) => s + f.fpy, 0) / facilities.length} unit="%" status={facilities.every(f => f.fpy > 93) ? 'pass' : 'warning'} trend={{ value: 2.3, isPositive: true }} />
        <KPICard title="Overall OEE" value={facilities.reduce((s, f) => s + f.oee, 0) / facilities.length} unit="%" status="pass" trend={{ value: 4.1, isPositive: true }} />
        <KPICard title="Open NCRs" value="12" unit="active" status="warning" onClick={() => navigate('/quality')} />
      </div>

      {/* FACILITY SNAPSHOT */}
      <div>
        <h2 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
          <Factory className="w-4 h-4 text-blue-400" />
          Facility Operational Snapshot
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {facilities.map((fac, i) => (
            <motion.div
              key={fac.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-gradient p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-text-main">{fac.name.split(' ').slice(0, 2).join(' ')}</h3>
                  <p className="text-xs text-text-muted">{fac.location.split(',')[0]}</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-mono ${fac.status === 'operational' ? 'bg-emerald-500/10 text-emerald-pass' : 'bg-amber-500/10 text-amber-ops'}`}>
                  {fac.type.split(' ')[0]}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div><p className="text-lg font-bold font-mono text-text-main">{fac.oee}%</p><p className="text-[10px] text-text-muted">OEE</p></div>
                <div><p className="text-lg font-bold font-mono text-text-main">{fac.fpy}%</p><p className="text-[10px] text-text-muted">FPY</p></div>
                <div><p className="text-lg font-bold font-mono text-text-main">{fac.activeOrders}</p><p className="text-[10px] text-text-muted">Active WOs</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* QUICK NAV */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {[
          { to: '/executive', label: 'Executive Dashboard', icon: Globe },
          { to: '/shop-floor', label: 'Shop Floor Terminal', icon: Factory },
          { to: '/inventory', label: 'Parts Inventory', icon: Package },
          { to: '/quality', label: 'Quality Center', icon: ClipboardCheck },
          { to: '/procedures', label: 'Procedures & KB', icon: BookText },
          { to: '/analytics', label: 'SPC Analytics', icon: BarChart3 },
        ].map((item) => (
          <motion.button
            key={item.to}
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate(item.to)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-xl text-xs font-medium text-blue-400 hover:bg-blue-500/20 transition-all"
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
            <ArrowRight className="w-3 h-3" />
          </motion.button>
        ))}
      </div>

      {/* FOOTER */}
      <div className="border-t border-border-subtle pt-6 text-center space-y-2">
        <Logo variant="full" className="h-6 mx-auto opacity-60" animated />
        <p className="text-[10px] text-text-muted/60">
          Celesti by Digi Tracks · AS9100D Rev D · ITAR/EAR Compliant · 100% Offline Static Demo
        </p>
      </div>
    </div>
  )
}

export default LandingPage
