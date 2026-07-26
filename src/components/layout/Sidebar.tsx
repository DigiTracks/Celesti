import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Globe,
  Factory,
  ClipboardCheck,
  Truck,
  BarChart3,
  Network,
  Package,
  BookText,
  ChevronLeft,
  X,
} from 'lucide-react'
import { useAppStore } from '@/stores/useAppStore'
import Logo from '@/components/common/Logo'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Executive Vision', end: true },
  { to: '/executive', icon: Globe, label: 'Mission Control' },
  { to: '/shop-floor', icon: Factory, label: 'Shop Floor' },
  { to: '/quality', icon: ClipboardCheck, label: 'Quality Center' },
  { to: '/inventory', icon: Package, label: 'Inventory' },
  { to: '/digital-thread', icon: Network, label: 'Digital Thread' },
  { to: '/supply-chain', icon: Truck, label: 'Supply Chain' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/architecture', icon: Network, label: 'Architecture' },
  { to: '/procedures', icon: BookText, label: 'Procedures & KB' },
]

interface SidebarInnerProps {
  sidebarOpen: boolean
  onNavClick?: () => void
  showClose?: boolean
}

const SidebarInner: React.FC<SidebarInnerProps> = ({ sidebarOpen, onNavClick, showClose }) => {
  const { toggleSidebar, setSidebarOpen, activePersona } = useAppStore()
  const filteredNav = navItems.filter((item) => activePersona.accessibleRoutes.includes(item.to))
  const navToShow = filteredNav.length > 0 ? filteredNav : navItems

  return (
    <div className="h-full bg-bg-surface border-r border-border-subtle flex flex-col overflow-hidden">
      <div className="h-14 flex items-center border-b border-border-subtle px-4 flex-shrink-0">
        {sidebarOpen ? (
          <Logo variant="full" className="h-7" animated />
        ) : (
          <Logo variant="icon" className="mx-auto" animated />
        )}
        <button
          onClick={showClose ? () => setSidebarOpen(false) : toggleSidebar}
          className={`p-1 rounded-lg hover:bg-slate-800 transition-colors text-text-muted hover:text-text-main ${sidebarOpen ? 'ml-auto' : 'absolute right-1'}`}
        >
          {showClose ? <X className="w-4 h-4" /> : <ChevronLeft className={`w-4 h-4 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />}
        </button>
      </div>

      <nav className="flex-1 py-3 space-y-0.5 overflow-y-auto">
        {navToShow.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-all text-sm ${
                isActive
                  ? 'bg-blue-500/10 text-blue-400 border-l-2 border-blue-500'
                  : 'text-text-muted hover:text-text-main hover:bg-slate-800/30'
              }`
            }
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="truncate"
              >
                {item.label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border-subtle flex-shrink-0">
        {sidebarOpen ? (
          <div className="text-center">
            <p className="text-[10px] text-text-muted font-mono">Celesti v2.0</p>
            <p className="text-[8px] text-text-muted/60 font-mono tracking-wider uppercase">AS9100D · ITAR · Offline</p>
          </div>
        ) : (
          <p className="text-[10px] text-text-muted text-center font-mono">C</p>
        )}
      </div>
    </div>
  )
}

const Sidebar: React.FC = () => {
  const { sidebarOpen, activePersona } = useAppStore()
  const location = useLocation()
  const navigate = useNavigate()
  const currentBlocked = !activePersona.accessibleRoutes.includes(location.pathname) && location.pathname !== '/'

  React.useEffect(() => {
    if (currentBlocked) {
      const fallback = activePersona.accessibleRoutes[1] || '/'
      navigate(fallback, { replace: true })
    }
  }, [currentBlocked, activePersona.accessibleRoutes, navigate])

  return (
    <>
      <aside className="hidden md:block relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={sidebarOpen ? 'expanded' : 'collapsed'}
            animate={{ width: sidebarOpen ? 240 : 64 }}
            className="h-screen"
          >
            <SidebarInner sidebarOpen={sidebarOpen} />
          </motion.div>
        </AnimatePresence>
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed inset-0 z-[9997] md:hidden"
          >
            <button className="absolute inset-0 bg-black/60" aria-label="Close sidebar" onClick={() => useAppStore.getState().setSidebarOpen(false)} />
            <motion.div className="relative w-72 h-full">
              <SidebarInner sidebarOpen={true} onNavClick={() => useAppStore.getState().setSidebarOpen(false)} showClose />
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
