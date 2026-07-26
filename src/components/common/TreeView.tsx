import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Folder, File } from 'lucide-react'

export interface TreeNode {
  id: string
  label: string
  icon?: React.ReactNode
  children?: TreeNode[]
  data?: Record<string, unknown>
}

interface TreeViewProps {
  nodes: TreeNode[]
  depth?: number
  onSelect?: (node: TreeNode) => void
}

const TreeNodeItem: React.FC<{ node: TreeNode; depth: number; onSelect?: (node: TreeNode) => void }> = ({ node, depth, onSelect }) => {
  const [expanded, setExpanded] = useState(depth < 1)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div>
      <button
        onClick={() => { if (hasChildren) setExpanded(!expanded); onSelect?.(node) }}
        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-800/50 transition-all text-left"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {hasChildren ? (
          <ChevronRight className={`w-3.5 h-3.5 text-text-muted transition-transform ${expanded ? 'rotate-90' : ''}`} />
        ) : (
          <span className="w-3.5" />
        )}
        {node.icon || (hasChildren ? <Folder className="w-3.5 h-3.5 text-blue-400" /> : <File className="w-3.5 h-3.5 text-text-muted" />)}
        <span className="text-xs text-text-main truncate">{node.label}</span>
      </button>
      <AnimatePresence>
        {hasChildren && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {node.children!.map((child) => (
              <TreeNodeItem key={child.id} node={child} depth={depth + 1} onSelect={onSelect} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const TreeView: React.FC<TreeViewProps> = ({ nodes, depth = 0, onSelect }) => {
  return (
    <div className="space-y-0.5">
      {nodes.map((node) => (
        <TreeNodeItem key={node.id} node={node} depth={depth} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default TreeView
