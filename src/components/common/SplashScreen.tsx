import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => { setShow(false); setTimeout(onFinish, 500) }, 1800)
    return () => clearTimeout(t)
  }, [onFinish])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-bg-base flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Logo variant="full" className="h-12" animated />
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
            className="h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-[10px] text-text-muted font-mono tracking-widest uppercase"
          >
            Digi Tracks · AS9100D · ITAR · Offline Demo
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SplashScreen
