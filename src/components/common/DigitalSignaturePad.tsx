import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Pen, RotateCcw, Check } from 'lucide-react'

interface DigitalSignaturePadProps {
  onSign?: (dataUrl: string) => void
  label?: string
}

const DigitalSignaturePad: React.FC<DigitalSignaturePadProps> = ({ onSign, label = 'Sign here' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    if ('touches' in e) {
      return { x: e.touches[0]!.clientX - rect.left, y: e.touches[0]!.clientY - rect.top }
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    setIsDrawing(true)
    setHasDrawn(true)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!isDrawing) return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const pos = getPos(e)
    ctx.lineWidth = 2
    ctx.strokeStyle = '#3B82F6'
    ctx.lineCap = 'round'
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }

  const stopDraw = () => { setIsDrawing(false) }

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  const confirm = () => {
    const dataUrl = canvasRef.current?.toDataURL()
    if (dataUrl) onSign?.(dataUrl)
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-text-muted font-medium flex items-center gap-1.5">
        <Pen className="w-3 h-3" />
        {label}
      </p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border border-border-subtle rounded-xl overflow-hidden bg-slate-900/50"
      >
        <canvas
          ref={canvasRef}
          width={320}
          height={100}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
          className="w-full touch-none cursor-crosshair"
        />
      </motion.div>
      <div className="flex items-center gap-2">
        <button onClick={clear} className="flex items-center gap-1 px-2 py-1 rounded-lg border border-border-subtle text-[10px] text-text-muted hover:text-text-main transition-all">
          <RotateCcw className="w-3 h-3" />
          Clear
        </button>
        {hasDrawn && (
          <button onClick={confirm} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-[10px] text-blue-400 hover:bg-blue-500/20 transition-all">
            <Check className="w-3 h-3" />
            Sign & Confirm
          </button>
        )}
      </div>
    </div>
  )
}

export default DigitalSignaturePad
