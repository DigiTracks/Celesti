import React from 'react'
import { Play, Wifi, WifiOff, BookText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PersonaSwitcher from './PersonaSwitcher'
import SearchInput from '@/components/common/SearchInput'
import { useTourStore } from '@/stores/useTourStore'
import { EXECUTIVE_TOUR_STEPS } from '@/modules/tour/tourSteps'

const Header: React.FC = () => {
  const { isActive, startTour, endTour } = useTourStore()
  const navigate = useNavigate()
  const [offline] = React.useState(!navigator.onLine)

  React.useEffect(() => {
    const handler = () => window.location.reload()
    window.addEventListener('online', handler)
    window.addEventListener('offline', handler)
    return () => {
      window.removeEventListener('online', handler)
      window.removeEventListener('offline', handler)
    }
  }, [])

  return (
    <header className="h-14 bg-bg-surface/95 backdrop-blur-sm border-b border-border-subtle flex items-center justify-between px-4 flex-shrink-0 gap-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-[10px] text-text-muted">
          {offline ? (
            <WifiOff className="w-3 h-3 text-amber-ops" />
          ) : (
            <Wifi className="w-3 h-3 text-emerald-pass" />
          )}
          <span className="font-mono hidden sm:inline text-[10px]">
            {offline ? 'EDGE CACHE' : 'LIVE'}
          </span>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-2">
        <SearchInput />
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => navigate('/procedures')}
          className="hidden sm:flex items-center gap-1 px-2 py-1 bg-slate-800/50 border border-border-subtle rounded-lg text-[10px] text-text-muted hover:text-text-main hover:border-border-accent transition-all"
        >
          <BookText className="w-3 h-3" />
          <span className="hidden md:inline">Procedures</span>
        </button>

        {!isActive ? (
          <button
            onClick={() => startTour(EXECUTIVE_TOUR_STEPS)}
            className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg text-[10px] font-medium text-blue-400 hover:bg-blue-500/20 transition-all"
          >
            <Play className="w-3 h-3" />
            <span className="hidden md:inline">Tour</span>
          </button>
        ) : (
          <button
            onClick={endTour}
            className="flex items-center gap-1 px-2 py-1 bg-red-500/10 border border-red-500/30 rounded-lg text-[10px] font-medium text-red-400 hover:bg-red-500/20 transition-all"
          >
            End
          </button>
        )}
        <PersonaSwitcher />
      </div>
    </header>
  )
}

export default Header
