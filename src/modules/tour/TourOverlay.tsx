import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTourStore } from '@/stores/useTourStore'

const TourOverlay: React.FC = () => {
  const { isActive, currentStep, steps, nextStep, prevStep, endTour, goToStep } = useTourStore()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isActive && steps[currentStep]) {
      navigate(steps[currentStep]!.targetRoute)
    }
  }, [isActive, currentStep, steps, navigate])

  if (!isActive || steps.length === 0) return null

  const step = steps[currentStep]!

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-tour flex items-end justify-center pb-8 pointer-events-auto"
      >
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-bg-surface border border-border-subtle rounded-2xl shadow-glass p-5 max-w-lg w-full mx-4 pointer-events-auto"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                Executive Tour · Step {currentStep + 1}/{steps.length}
              </span>
            </div>
            <button onClick={endTour} className="p-1 rounded-lg hover:bg-slate-800 transition-colors">
              <X className="w-4 h-4 text-text-muted" />
            </button>
          </div>

          <h3 className="text-base font-semibold text-text-main mb-2">{step.title}</h3>
          <p className="text-sm text-text-muted leading-relaxed mb-4">{step.content}</p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToStep(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentStep ? 'bg-blue-400 w-4' : 'bg-slate-700 hover:bg-slate-600'}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border-subtle text-xs text-text-muted hover:text-text-main hover:border-border-accent transition-all"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              )}
              <button
                onClick={nextStep}
                className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-xs font-medium text-blue-400 hover:bg-blue-500/20 transition-all"
              >
                {currentStep < steps.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="w-3.5 h-3.5" />
                  </>
                ) : (
                  'Finish Tour'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TourOverlay
