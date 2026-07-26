import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Persona } from '@/types'

export interface PersonaWithAccess extends Persona {
  accessibleRoutes: string[]
  label: string
}

export const MOCK_PERSONAS: PersonaWithAccess[] = [
  {
    id: 'PERS-01', name: 'Chief Executive Officer', role: 'CEO', clearanceLevel: 'ITAR_FULL', avatarUrl: 'ceo',
    label: 'Chief Executive Officer',
    accessibleRoutes: ['/', '/executive', '/analytics', '/architecture', '/genealogy', '/digi-tracks'],
  },
  {
    id: 'PERS-02', name: 'Lead Manufacturing Engineer', role: 'MFG_ENGINEER', clearanceLevel: 'ITAR_FULL', avatarUrl: 'mfg',
    label: 'Mfg Engineer',
    accessibleRoutes: ['/', '/digital-thread', '/shop-floor', '/inventory', '/analytics', '/procedures', '/genealogy', '/digi-tracks'],
  },
  {
    id: 'PERS-03', name: 'Quality Inspector', role: 'QUALITY_INSPECTOR', clearanceLevel: 'ITAR_FULL', stampCode: 'STAMP-QC-9902', avatarUrl: 'qa',
    label: 'Quality Inspector',
    accessibleRoutes: ['/', '/shop-floor', '/quality', '/inventory', '/supply-chain', '/procedures', '/genealogy', '/digi-tracks'],
  },
  {
    id: 'PERS-04', name: 'Cleanroom Technician', role: 'TECHNICIAN', clearanceLevel: 'LEVEL_2', avatarUrl: 'tech',
    label: 'Cleanroom Tech',
    accessibleRoutes: ['/', '/shop-floor', '/inventory', '/procedures', '/genealogy', '/digi-tracks'],
  },
  {
    id: 'PERS-05', name: 'Sub-Tier Supplier', role: 'SUPPLIER', clearanceLevel: 'LEVEL_1', avatarUrl: 'vendor',
    label: 'Vendor (Supplier)',
    accessibleRoutes: ['/', '/supply-chain', '/inventory', '/genealogy', '/digi-tracks'],
  },
  {
    id: 'PERS-06', name: 'Customer Auditor', role: 'AUDITOR', clearanceLevel: 'ITAR_FULL', avatarUrl: 'auditor',
    label: 'Customer Auditor',
    accessibleRoutes: ['/', '/executive', '/shop-floor', '/quality', '/digital-thread', '/supply-chain', '/analytics', '/architecture', '/inventory', '/procedures', '/genealogy', '/digi-tracks'],
  },
]

interface AppState {
  activePersona: PersonaWithAccess
  theme: 'dark'
  sidebarOpen: boolean
  setPersona: (persona: PersonaWithAccess) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activePersona: MOCK_PERSONAS[0]!,
      theme: 'dark',
      sidebarOpen: true,
      setPersona: (persona) => set({ activePersona: persona }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    { name: 'celesti-app' },
  ),
)
