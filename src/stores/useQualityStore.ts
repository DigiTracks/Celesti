import { create } from 'zustand'
import type { NCR, CAPA } from '@/types'

interface QualityState {
  ncrs: NCR[]
  capas: CAPA[]
  selectedNCR: NCR | null
  setNCRs: (ncrs: NCR[]) => void
  setCAPAs: (capas: CAPA[]) => void
  selectNCR: (ncr: NCR | null) => void
  addNCR: (ncr: NCR) => void
  updateNCR: (id: string, updates: Partial<NCR>) => void
}

export const useQualityStore = create<QualityState>()((set) => ({
  ncrs: [],
  capas: [],
  selectedNCR: null,
  setNCRs: (ncrs) => set({ ncrs }),
  setCAPAs: (capas) => set({ capas }),
  selectNCR: (ncr) => set({ selectedNCR: ncr }),
  addNCR: (ncr) => set((s) => ({ ncrs: [ncr, ...s.ncrs] })),
  updateNCR: (id, updates) =>
    set((s) => ({
      ncrs: s.ncrs.map((n) => (n.id === id ? { ...n, ...updates } : n)),
      selectedNCR: s.selectedNCR?.id === id ? { ...s.selectedNCR, ...updates } : s.selectedNCR,
    })),
}))
