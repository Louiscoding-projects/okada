import { motion } from 'motion/react'

export default function LoadingSpinner({ size = 40, color = 'var(--color-primary)', label = '' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `2px solid transparent`,
          borderTopColor: color,
          borderRightColor: color,
        }}
      />
      {label && (
        <span className="text-[10px] font-bold tracking-[0.3em] text-on-surface-variant uppercase animate-pulse">
          {label}
        </span>
      )}
    </div>
  )
}
