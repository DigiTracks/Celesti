import { create } from 'zustand'

export interface BomNode {
  id: string
  level: number
  partNumber: string
  name: string
  rev: string
  qty: number
  type: 'ebom' | 'mbom'
  ecnNumber?: string
  hasDiff: boolean
}

interface ThreadState {
  ebom: BomNode[]
  mbom: BomNode[]
  selectedNode: BomNode | null
  setEbom: (nodes: BomNode[]) => void
  setMbom: (nodes: BomNode[]) => void
  selectNode: (node: BomNode | null) => void
}

export const useThreadStore = create<ThreadState>()((set) => ({
  ebom: [],
  mbom: [],
  selectedNode: null,
  setEbom: (nodes) => set({ ebom: nodes }),
  setMbom: (nodes) => set({ mbom: nodes }),
  selectNode: (node) => set({ selectedNode: node }),
}))
