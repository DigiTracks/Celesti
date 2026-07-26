import React from 'react'

const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => (
  <div className="animate-pulse space-y-3 p-4 bg-bg-surface/50 border border-border-subtle rounded-xl">
    <div className="h-5 bg-slate-800 rounded w-1/3" />
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="h-10 bg-slate-800/60 rounded w-full" />
    ))}
  </div>
)

export default LoadingSkeleton
