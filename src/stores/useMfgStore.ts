import { create } from 'zustand'
import type { WorkOrder, WorkStep } from '@/types'

interface MfgState {
  workOrders: WorkOrder[]
  selectedWO: WorkOrder | null
  setWorkOrders: (orders: WorkOrder[]) => void
  selectWO: (wo: WorkOrder | null) => void
  updateStep: (woId: string, stepNumber: number, updates: Partial<WorkStep>) => void
  setStepStatus: (woId: string, stepNumber: number, status: WorkStep['status']) => void
}

export const useMfgStore = create<MfgState>()((set) => ({
  workOrders: [],
  selectedWO: null,
  setWorkOrders: (orders) => set({ workOrders: orders }),
  selectWO: (wo) => set({ selectedWO: wo }),
  updateStep: (woId, stepNumber, updates) =>
    set((s) => ({
      workOrders: s.workOrders.map((wo) =>
        wo.id === woId
          ? { ...wo, steps: wo.steps.map((st) => (st.stepNumber === stepNumber ? { ...st, ...updates } : st)) }
          : wo,
      ),
      selectedWO:
        s.selectedWO?.id === woId
          ? {
              ...s.selectedWO,
              steps: s.selectedWO.steps.map((st) =>
                st.stepNumber === stepNumber ? { ...st, ...updates } : st,
              ),
            }
          : s.selectedWO,
    })),
  setStepStatus: (woId, stepNumber, status) =>
    set((s) => ({
      workOrders: s.workOrders.map((wo) =>
        wo.id === woId
          ? { ...wo, steps: wo.steps.map((st) => (st.stepNumber === stepNumber ? { ...st, status } : st)) }
          : wo,
      ),
      selectedWO:
        s.selectedWO?.id === woId
          ? {
              ...s.selectedWO,
              steps: s.selectedWO.steps.map((st) =>
                st.stepNumber === stepNumber ? { ...st, status } : st,
              ),
            }
          : s.selectedWO,
    })),
}))
