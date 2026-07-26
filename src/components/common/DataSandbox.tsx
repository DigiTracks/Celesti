import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Beaker, X, Send, CheckCircle, AlertTriangle, Activity, Plus } from 'lucide-react'

type Scenario = 'ncr' | 'workorder' | 'inventory'

const DataSandbox: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [scenario, setScenario] = useState<Scenario>('ncr')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ part: 'ST-0045', operator: 'J. Chen', severity: 'Major', qty: '10', location: 'Cleanroom A' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setOpen(false) }, 2000)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-16 right-4 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-[100]"
        title="Demo Sandbox — Try the flow"
      >
        <Beaker className="w-4 h-4 text-white" />
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
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="fixed bottom-24 right-4 w-80 max-w-[calc(100vw-2rem)] bg-bg-surface border border-border-subtle rounded-2xl shadow-glass z-[9999] overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <Beaker className="w-4 h-4 text-emerald-pass" />
                  <span className="text-sm font-semibold text-text-main">Demo Sandbox</span>
                </div>
                <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-slate-800 text-text-muted">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {submitted ? (
                <div className="p-6 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-pass mx-auto" />
                  <p className="text-sm font-semibold text-text-main">Simulation Submitted!</p>
                  <p className="text-xs text-text-muted">Data propagated across relevant modules. Navigate to see the effect.</p>
                </div>
              ) : (
                <>
                  <div className="flex border-b border-border-subtle">
                    {([
                      { id: 'ncr' as Scenario, label: 'NCR', icon: AlertTriangle },
                      { id: 'workorder' as Scenario, label: 'WO', icon: Activity },
                      { id: 'inventory' as Scenario, label: 'Part', icon: Plus },
                    ]).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { setScenario(s.id); setForm({ ...form }) }}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-all ${
                          scenario === s.id ? 'text-blue-400 border-b-2 border-blue-500 bg-blue-500/5' : 'text-text-muted hover:text-text-main'
                        }`}
                      >
                        <s.icon className="w-3.5 h-3.5" />
                        {s.label}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="p-4 space-y-3">
                    {scenario === 'ncr' && (
                      <>
                        <p className="text-[10px] text-text-muted font-mono">Create a Non-Conformance Report to see the AS9100D workflow.</p>
                        <InputField label="Part Number" value={form.part} onChange={(v) => setForm({ ...form, part: v })} />
                        <InputField label="Operator" value={form.operator} onChange={(v) => setForm({ ...form, operator: v })} />
                        <SelectField label="Severity" value={form.severity} options={['Minor', 'Major', 'Critical']} onChange={(v) => setForm({ ...form, severity: v })} />
                      </>
                    )}
                    {scenario === 'workorder' && (
                      <>
                        <p className="text-[10px] text-text-muted font-mono">Create a Work Order to see shop floor routing.</p>
                        <InputField label="Part Number" value={form.part} onChange={(v) => setForm({ ...form, part: v })} />
                        <InputField label="Quantity" value={form.qty} onChange={(v) => setForm({ ...form, qty: v })} />
                        <SelectField label="Location" value={form.location} options={['Cleanroom A', 'AIT Bay 2', 'Test Lab 3']} onChange={(v) => setForm({ ...form, location: v })} />
                      </>
                    )}
                    {scenario === 'inventory' && (
                      <>
                        <p className="text-[10px] text-text-muted font-mono">Add a part to see inventory tracking.</p>
                        <InputField label="Part Number" value={form.part} onChange={(v) => setForm({ ...form, part: v })} />
                        <InputField label="Quantity" value={form.qty} onChange={(v) => setForm({ ...form, qty: v })} />
                        <SelectField label="Location" value={form.location} options={['Stores A', 'Stores B', 'WIP']} onChange={(v) => setForm({ ...form, location: v })} />
                      </>
                    )}
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 hover:opacity-90 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Simulate & Propagate
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const InputField: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <div>
    <label className="text-[10px] text-text-muted font-medium mb-1 block">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 bg-slate-900/50 border border-border-subtle rounded-lg text-xs text-text-main focus:outline-none focus:border-border-accent"
    />
  </div>
)

const SelectField: React.FC<{ label: string; value: string; options: string[]; onChange: (v: string) => void }> = ({ label, value, options, onChange }) => (
  <div>
    <label className="text-[10px] text-text-muted font-medium mb-1 block">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 bg-slate-900/50 border border-border-subtle rounded-lg text-xs text-text-main focus:outline-none focus:border-border-accent"
    >
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  </div>
)

export default DataSandbox
