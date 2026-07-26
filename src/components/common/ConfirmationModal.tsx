import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle, X } from 'lucide-react'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'info'
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen, onClose, onConfirm, title, message,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'danger',
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[9998]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm z-[9999] bg-bg-surface border border-border-subtle rounded-2xl shadow-glass p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className={`p-2 rounded-xl ${variant === 'danger' ? 'bg-red-500/10' : 'bg-blue-500/10'}`}>
                {variant === 'danger' ? <AlertTriangle className="w-5 h-5 text-red-fail" /> : <CheckCircle className="w-5 h-5 text-blue-400" />}
              </div>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-text-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="text-base font-semibold text-text-main">{title}</h3>
              <p className="text-sm text-text-muted mt-1">{message}</p>
            </div>
            <div className="flex items-center gap-2 justify-end pt-2">
              <button onClick={onClose} className="px-4 py-2 rounded-lg border border-border-subtle text-xs text-text-muted hover:text-text-main hover:border-border-accent transition-all">
                {cancelLabel}
              </button>
              <button onClick={() => { onConfirm(); onClose() }} className={`px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all ${variant === 'danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ConfirmationModal
