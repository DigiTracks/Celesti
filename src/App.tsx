import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import SplashScreen from './components/common/SplashScreen'
import PasswordGate from './components/common/PasswordGate'
import LoadingSkeleton from './components/common/LoadingSkeleton'

const Landing = lazy(() => import('./modules/landing/LandingPage'))
const Executive = lazy(() => import('./modules/executive/ExecutiveDashboard'))
const DigitalThread = lazy(() => import('./modules/digitalThread/DigitalThreadPage'))
const ShopFloor = lazy(() => import('./modules/shopFloor/ShopFloorPage'))
const Quality = lazy(() => import('./modules/quality/QualityPage'))
const SupplyChain = lazy(() => import('./modules/supplyChain/SupplyChainPage'))
const Analytics = lazy(() => import('./modules/analytics/AnalyticsPage'))
const Architecture = lazy(() => import('./modules/architecture/ArchitecturePage'))
const Inventory = lazy(() => import('./modules/inventory/InventoryPage'))
const Procedures = lazy(() => import('./modules/procedures/ProceduresPage'))
const Genealogy = lazy(() => import('./modules/genealogy/GenealogyPage'))
const DigiTracks = lazy(() => import('./modules/digiTracks/DigiTracksPage'))

const App: React.FC = () => {
  const [phase, setPhase] = useState<'password' | 'splash' | 'app'>('password')
  const navigate = useNavigate()

  useEffect(() => {
    if (phase === 'app') {
      navigate('/', { replace: true })
    }
  }, [phase, navigate])

  if (phase === 'password') {
    return <PasswordGate onUnlock={() => setPhase('splash')} />
  }

  if (phase === 'splash') {
    return <SplashScreen onFinish={() => setPhase('app')} />
  }

  return (
    <MainLayout>
      <Suspense fallback={<LoadingSkeleton />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/executive" element={<Executive />} />
          <Route path="/digital-thread" element={<DigitalThread />} />
          <Route path="/shop-floor" element={<ShopFloor />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/supply-chain" element={<SupplyChain />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/procedures" element={<Procedures />} />
          <Route path="/genealogy" element={<Genealogy />} />
          <Route path="/digi-tracks" element={<DigiTracks />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </MainLayout>
  )
}

export default App
