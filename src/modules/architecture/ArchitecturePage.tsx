import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Network, Server, Database, Globe, Cpu, ChevronDown, ChevronRight } from 'lucide-react'
import { architectureNodes, type ArchNode } from '@/json/architecture_nodes'
import PainPointBanner from '@/components/common/PainPointBanner'

const typeIcons: Record<string, React.FC<{ className?: string }>> = {
  system: Globe,
  subsystem: Server,
  integration: Cpu,
  dataflow: Database,
}

const layerColors: Record<string, string> = {
  presentation: 'border-blue-500/30 bg-blue-500/5',
  application: 'border-emerald-500/30 bg-emerald-500/5',
  data: 'border-purple-500/30 bg-purple-500/5',
  infrastructure: 'border-amber-500/30 bg-amber-500/5',
}

const layerLabels: Record<string, string> = {
  presentation: 'Presentation Layer',
  application: 'Application Layer',
  data: 'Data Layer',
  infrastructure: 'Infrastructure Layer',
}

const ArchitecturePage: React.FC = () => {
  const [expanded, setExpanded] = useState<string[]>(architectureNodes.filter(n => !n.parentId).map(n => n.id))
  const [selected, setSelected] = useState<ArchNode | null>(null)

  const toggleNode = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const rootNodes = architectureNodes.filter((n) => !n.parentId)
  const getChildren = (parentId: string) => architectureNodes.filter((n) => n.parentId === parentId)

  const renderNode = (node: ArchNode, depth = 0) => {
    const children = getChildren(node.id)
    const isExpanded = expanded.includes(node.id)
    const Icon = typeIcons[node.type] ?? Network

    return (
      <div key={node.id}>
        <motion.div
          layout
          onClick={() => { setSelected(node); if (children.length > 0) toggleNode(node.id) }}
          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer border transition-all text-xs ${layerColors[node.layer] ?? 'border-border-subtle'} ${
            selected?.id === node.id ? 'ring-1 ring-border-accent' : ''
          }`}
          style={{ marginLeft: `${depth * 20}px` }}
        >
          {children.length > 0 ? (
            isExpanded ? <ChevronDown className="w-3 h-3 text-text-muted flex-shrink-0" /> : <ChevronRight className="w-3 h-3 text-text-muted flex-shrink-0" />
          ) : (
            <div className="w-3 flex-shrink-0" />
          )}
          <Icon className="w-4 h-4 text-text-muted flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-text-main truncate">{node.label}</p>
            <p className="text-[10px] text-text-muted truncate">{node.type} · {node.status}</p>
          </div>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
            node.status === 'active' ? 'bg-emerald-500/10 text-emerald-pass' :
            node.status === 'degraded' ? 'bg-amber-500/10 text-amber-ops' :
            'bg-red-500/10 text-red-fail'
          }`}>
            {node.status}
          </span>
        </motion.div>
        {isExpanded && children.map((child) => renderNode(child, depth + 1))}
      </div>
    )
  }

  return (
    <div className="space-y-6" data-tour="arch-canvas">
      <div>
        <h1 className="text-xl font-bold text-text-main">Enterprise Architecture Explorer</h1>
        <p className="text-xs text-text-muted mt-1">Celesti Platform Architecture — System Integration Topology</p>
      </div>

      <PainPointBanner
        pain="IT and engineering teams lack a single view of how PLM, MES, QMS, and ERP systems interconnect. Integration points are undocumented — system failures take days to diagnose. No understanding of data flow layers."
        solution="Interactive architecture topology with 25 connected nodes across 4 layers (Presentation, Application, Data, Infrastructure). Click any subsystem to view description, status, and parent/child relationships. Full platform map in one screen."
        impact="Days to diagnose → instant topology view"
      />

      <div className="grid grid-cols-4 gap-2">
        {Object.entries(layerLabels).map(([key, label]) => (
          <div key={key} className={`px-3 py-2 rounded-lg border text-center text-[10px] font-medium ${layerColors[key]}`}>
            {label}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-gradient p-4 space-y-1">
          <h2 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
            <Network className="w-4 h-4 text-blue-400" />
            System Topology
          </h2>
          {rootNodes.map((node) => renderNode(node))}
        </div>

        <div className="space-y-3">
          {selected ? (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-gradient p-4 space-y-3"
            >
              <h2 className="text-sm font-semibold text-text-main">{selected.label}</h2>
              <p className="text-xs text-text-muted leading-relaxed">{selected.description}</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-text-muted mb-1">Type</p>
                  <p className="font-mono text-text-main capitalize">{selected.type}</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-text-muted mb-1">Layer</p>
                  <p className="font-mono text-text-main">{layerLabels[selected.layer]}</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-text-muted mb-1">Status</p>
                  <p className={`font-mono ${selected.status === 'active' ? 'text-emerald-pass' : selected.status === 'degraded' ? 'text-amber-ops' : 'text-red-fail'}`}>
                    {selected.status.toUpperCase()}
                  </p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-text-muted mb-1">Node ID</p>
                  <p className="font-mono text-xs text-text-muted">{selected.id}</p>
                </div>
              </div>
              {selected.parentId && (
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 text-xs">
                  <p className="text-blue-400 font-medium mb-1">Parent System</p>
                  <p className="text-text-muted font-mono">{architectureNodes.find(n => n.id === selected.parentId)?.label}</p>
                </div>
              )}
              {(() => {
                const children = getChildren(selected.id)
                return children.length > 0 ? (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-text-muted">Subsystems ({children.length})</p>
                    {children.map((c) => (
                      <button key={c.id} onClick={() => setSelected(c)} className="w-full text-left px-3 py-1.5 bg-slate-800/50 rounded-lg text-xs text-text-muted hover:text-text-main transition-colors font-mono">
                        {c.label}
                      </button>
                    ))}
                  </div>
                ) : null
              })()}
            </motion.div>
          ) : (
            <div className="card-gradient p-8 text-center space-y-3">
              <Network className="w-10 h-10 text-text-muted mx-auto" />
              <p className="text-sm text-text-muted">Select a system node to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArchitecturePage
