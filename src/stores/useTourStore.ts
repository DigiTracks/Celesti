import { create } from 'zustand'
import type { TourStep } from '@/types'

interface TourState {
  isActive: boolean
  currentStep: number
  steps: TourStep[]
  startTour: (steps: TourStep[]) => void
  nextStep: () => void
  prevStep: () => void
  endTour: () => void
  goToStep: (index: number) => void
}

export const useTourStore = create<TourState>()((set, get) => ({
  isActive: false,
  currentStep: 0,
  steps: [],
  startTour: (steps) => set({ isActive: true, currentStep: 0, steps }),
  nextStep: () => {
    const { currentStep, steps } = get()
    if (currentStep < steps.length - 1) {
      set({ currentStep: currentStep + 1 })
    } else {
      set({ isActive: false, currentStep: 0, steps: [] })
    }
  },
  prevStep: () => {
    const { currentStep } = get()
    if (currentStep > 0) set({ currentStep: currentStep - 1 })
  },
  endTour: () => set({ isActive: false, currentStep: 0, steps: [] }),
  goToStep: (index) => set({ currentStep: index }),
}))
