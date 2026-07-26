import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, Shield, WifiOff, CheckCircle, Globe, Factory, ClipboardCheck,
  Truck, AlertTriangle, Zap, Network,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Logo from '@/components/common/Logo'

const painPoints = [
  { icon: Globe, pain: 'Fragmented Visibility', fix: 'Unified single-pane-of-glass across 3 facilities', module: '/executive' },
  { icon: ClipboardCheck, pain: 'Paper AS9100D Compliance', fix: 'Digital NCR creation, MRB workflow, CAPA tracking', module: '/quality' },
  { icon: Truck, pain: '8-Day Supply Chain Traces', fix: '3-second back-to-birth genealogy with CoC verification', module: '/genealogy' },
  { icon: Network, pain: 'PLM/MES Configuration Drift', fix: 'Real-time EbOM-to-MbOM reconciliation', module: '/digital-thread' },
  { icon: Factory, pain: 'No Real-Time Cleanroom Data', fix: '3-second telemetry via client-side Web Worker', module: '/shop-floor' },
  { icon: Shield, pain: 'ITAR/EAR Data Exposure', fix: '100% offline static bundle — data never leaves browser', module: '/architecture' },
]

const capabilities = [
  { icon: WifiOff, title: 'Offline-First Architecture', desc: 'Zero server dependencies. All data bundled at build time. Full functionality without internet — cleanroom floor, air-gapped facilities, field deployment.' },
  { icon: Shield, title: 'ITAR & AS9100D Compliant', desc: 'Static SPA with no external network calls. Role-based access controls, audit trails, digital signatures, and full AS9100D clause enforcement.' },
  { icon: Zap, title: 'Real-Time Simulation Engine', desc: 'Client-side Web Worker streams telemetry every 3 seconds. No backend needed — realistic gauge animations, torque feeds, particle counts.' },
  { icon: Globe, title: 'Multi-Facility Visibility', desc: 'Executive dashboard spanning Hyderabad, Bengaluru, Thiruvananthapuram. Drill from program OEE down to individual work order steps.' },
]

const DigiTracksPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-10">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-medium">
          <Shield className="w-3.5 h-3.5" />
          Digi Tracks — From Pain Points to Production Excellence
        </div>
        <Logo variant="full" className="h-12 justify-center" animated />
        <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
          We transform fragmented, paper-based, air-gapped manufacturing operations into 
          <span className="text-text-main font-semibold"> perfectly working offline digital platforms</span> 
          for the world's most highly regulated environments — space, defense, and aerospace.
        </p>
      </motion.div>

      {/* The Transformation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="card-gradient p-6 md:p-8 rounded-2xl border-l-4 border-blue-500"
      >
        <h2 className="text-base font-bold text-text-main flex items-center gap-2 mb-6">
          <Zap className="w-5 h-5 text-blue-400" />
          What We Do — Pain Point to Perfect Operation
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {painPoints.map((item) => (
            <button
              key={item.pain}
              onClick={() => navigate(item.module)}
              className="flex items-start gap-3 bg-slate-900/50 border border-border-subtle rounded-xl p-4 text-left hover:border-blue-500/30 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-red-fail" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-text-main">{item.pain}</span>
                  <ArrowRight className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-pass flex-shrink-0" />
                  <span className="text-xs text-text-muted">{item.fix}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Core Capabilities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="space-y-4"
      >
        <h2 className="text-base font-bold text-text-main flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-pass" />
          Core Platform Capabilities
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {capabilities.map((cap) => (
            <div key={cap.title} className="bg-slate-900/50 border border-border-subtle rounded-xl p-5 space-y-2">
              <cap.icon className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-semibold text-text-main">{cap.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Operating Environment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="bg-slate-900/30 border border-border-subtle rounded-2xl p-6"
      >
        <h2 className="text-sm font-bold text-text-main mb-4">Built for Highly Regulated Environments</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Cleanroom ISO-8', desc: 'Class 100,000 particle control' },
            { label: 'ITAR/EAR Compliant', desc: 'Zero data exfiltration risk' },
            { label: 'AS9100D Rev D', desc: 'Full clause enforcement' },
            { label: 'Air-Gapped Ready', desc: 'No network required' },
            { label: 'Offline Static SPA', desc: 'GitHub Pages deployed' },
            { label: 'RBAC 6 Personas', desc: 'Role-based access control' },
            { label: 'Digital Signatures', desc: 'Canvas-based sign-off pad' },
            { label: 'Full Traceability', desc: 'Back-to-birth genealogy' },
          ].map((item) => (
            <div key={item.label} className="text-center p-3 bg-slate-900/50 rounded-xl space-y-1">
              <p className="text-xs font-semibold text-text-main">{item.label}</p>
              <p className="text-[10px] text-text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        {[
          { to: '/executive', label: 'Executive Dashboard' },
          { to: '/shop-floor', label: 'Shop Floor Terminal' },
          { to: '/quality', label: 'Quality Center' },
          { to: '/procedures', label: 'Procedures & KB' },
        ].map((item) => (
          <button
            key={item.to}
            onClick={() => navigate(item.to)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-xl text-xs font-medium text-blue-400 hover:bg-blue-500/20 transition-all"
          >
            {item.label}
            <ArrowRight className="w-3 h-3" />
          </button>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="border-t border-border-subtle pt-6 text-center space-y-2">
        <Logo variant="full" className="h-6 mx-auto opacity-60" />
        <p className="text-[10px] text-text-muted/60">Digi Tracks · AS9100D · ITAR · 100% Offline Static Demo · Data Never Leaves</p>
      </div>
    </div>
  )
}

export default DigiTracksPage
