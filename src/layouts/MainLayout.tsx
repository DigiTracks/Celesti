import React from 'react'
import { Menu } from 'lucide-react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import TourOverlay from '@/modules/tour/TourOverlay'
import GlobalSearch from '@/components/common/GlobalSearch'
import DataSandbox from '@/components/common/DataSandbox'
import { useAppStore } from '@/stores/useAppStore'

const MobileNavToggle: React.FC = () => {
  const { setSidebarOpen } = useAppStore()
  return (
    <button
      onClick={() => setSidebarOpen(true)}
      className="md:hidden fixed top-3 left-3 z-[9996] p-2 rounded-lg bg-bg-surface border border-border-subtle text-text-muted hover:text-text-main"
    >
      <Menu className="w-4 h-4" />
    </button>
  )
}

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-bg-base overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-3 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>
      <MobileNavToggle />
      <TourOverlay />
      <GlobalSearch />
      <DataSandbox />
    </div>
  )
}

export default MainLayout
