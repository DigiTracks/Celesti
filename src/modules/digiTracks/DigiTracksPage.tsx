import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Shield,
  WifiOff,
  CheckCircle,
  Globe,
  Factory,
  ClipboardCheck,
  Truck,
  Zap,
  Network,
  XCircle,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const transformations = [
  {
    icon: Globe,
    label: 'Visibility',
    before:
      '3 disconnected facilities. Reports take 2-3 days to compile manually. No single view of operations.',
    after:
      'Real-time OEE, FPY, throughput across Hyderabad, Bengaluru, Thiruvananthapuram. Drill from program to work order in 3 clicks.',
    metric: '48hr latency → real-time',
    route: '/executive',
  },
  {
    icon: ClipboardCheck,
    label: 'Quality Compliance',
    before: 'NCRs logged on paper travelers. 72-hour average response. MRB backlogged by 2 weeks.',
    after:
      'Torque failure auto-raises AS9100D NCR. MRB disposition workflow with digital signatures. CAPA 90-day enforcement.',
    metric: '72hr → instant',
    route: '/quality',
  },
  {
    icon: Truck,
    label: 'Traceability',
    before:
      '8 days to trace a fastener to its Mill Test Report. Manual cross-reference of 3 separate systems.',
    after:
      'Back-to-birth genealogy in under 3 seconds. AS9163 CoC verified. Heat lot, MTR, serial linked automatically.',
    metric: '8 days → 3 seconds',
    route: '/genealogy',
  },
  {
    icon: Network,
    label: 'Digital Thread',
    before:
      'EbOM/MbOM diverge at 12% per program. 1 in 8 assemblies uses wrong revision part. ECOs take weeks.',
    after:
      'Side-by-side EbOM/MbOM diff with real-time detection. ECO change propagated instantly. Zero config drift.',
    metric: '12% drift → 0%',
    route: '/digital-thread',
  },
  {
    icon: Factory,
    label: 'Cleanroom Ops',
    before:
      'Particle counts logged manually twice per shift. Excursions detected hours later. Torque tools not integrated.',
    after:
      '3-second telemetry via Web Worker. Smart torque tools stream to e-Traveler. Out-of-spec auto-locks WO.',
    metric: 'Hours → 3 seconds',
    route: '/shop-floor',
  },
  {
    icon: Shield,
    label: 'Data Security',
    before:
      'Cloud tools not approved for ITAR data. Spreadsheets emailed across facilities violate EAR handling policies.',
    after:
      '100% offline static SPA. Zero external network calls. Data never leaves the browser. GitHub Pages deployed.',
    metric: 'Compliance risk → ITAR safe',
    route: '/architecture',
  },
]

const DigiTracksPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-5 pt-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-medium">
          <Zap className="w-3.5 h-3.5" />
          Digi Tracks — Offline Manufacturing Platform for Regulated Environments
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Replace Fragmented Operations
          <br />
          <span className="text-blue-400">With One Unified Offline Platform</span>
        </h1>
        <p className="text-base text-text-muted max-w-3xl mx-auto leading-relaxed">
          Designed for space, defense, and aerospace — where paper-based processes, disconnected
          systems, and ITAR compliance are replaced by a single, 100% offline, AS9100D-compliant
          static platform.
        </p>
      </motion.div>

      {/* The Transformation Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="space-y-3"
      >
        {transformations.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            onClick={() => navigate(item.route)}
            className="w-full text-left bg-slate-900/30 border border-border-subtle rounded-xl hover:border-emerald-500/30 transition-all group overflow-hidden"
          >
            <div className="grid md:grid-cols-[1fr_auto_1fr_auto] items-stretch">
              {/* Before */}
              <div className="p-4 md:p-5 bg-red-500/[0.03] border-r border-border-subtle">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-4 h-4 text-red-fail" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-red-fail/70">
                        Before
                      </span>
                    </div>
                    <p className="text-sm font-medium text-text-main">{item.label}</p>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{item.before}</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center px-3 bg-slate-900/50">
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="w-5 h-5 text-emerald-pass" />
                </motion.div>
              </div>

              {/* After */}
              <div className="p-4 md:p-5 bg-emerald-500/[0.03]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-pass" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-pass/70">
                        After
                      </span>
                    </div>
                    <p className="text-sm font-medium text-text-main">{item.label}</p>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{item.after}</p>
                  </div>
                </div>
              </div>

              {/* Metric */}
              <div className="hidden md:flex flex-col items-center justify-center px-4 bg-slate-900/50 border-l border-border-subtle min-w-[130px]">
                <span className="text-[9px] font-mono uppercase tracking-wider text-text-muted/60 mb-1">
                  Impact
                </span>
                <span className="text-xs font-bold text-emerald-pass font-mono text-center leading-tight">
                  {item.metric}
                </span>
              </div>
            </div>

            {/* Mobile metric row */}
            <div className="md:hidden flex items-center justify-between px-4 pb-3 pt-0">
              <span className="text-[9px] font-mono uppercase tracking-wider text-text-muted/60">
                Impact
              </span>
              <span className="text-xs font-bold text-emerald-pass font-mono">{item.metric}</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Why Celesti */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="card-gradient p-6 rounded-2xl border-l-4 border-blue-500"
      >
        <h2 className="text-base font-bold text-text-main flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-blue-400" />
          Why Celesti for Regulated Environments
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              icon: WifiOff,
              title: '100% Offline',
              desc: 'Zero server dependencies. Entire platform in your browser. No network required — deploy to air-gapped cleanrooms.',
            },
            {
              icon: Shield,
              title: 'ITAR/EAR Compliant',
              desc: 'No external calls. Data never leaves the browser. RBAC, audit trails, digital signatures. Built for defense compliance.',
            },
            {
              icon: Zap,
              title: 'Simulated Real-Time',
              desc: 'Web Worker telemetry engine streams particle counts, torque values, gauge data every 3 seconds. Feels like a live system.',
            },
            {
              icon: Globe,
              title: 'Multi-Facility by Design',
              desc: '3 facilities, 450+ WOs, 1,200 part numbers, 90+ suppliers — all locally indexed and cross-searchable in milliseconds.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 bg-slate-900/50 border border-border-subtle rounded-xl p-4"
            >
              <item.icon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-text-main">{item.title}</h3>
                <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="border-t border-border-subtle pt-6 text-center space-y-2">
        <p className="text-base font-bold text-white tracking-tight">
          Celesti<span className="text-blue-400">.</span>
        </p>
        <p className="text-[10px] text-text-muted/60">
          Digi Tracks · AS9100D Rev D · ITAR/EAR Compliant · 100% Offline Static Demo
        </p>
      </div>
    </div>
  )
}

export default DigiTracksPage
