import { motion } from 'motion/react'

export default function PulsingToggle({ active, onToggle, disabled = false }) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className="w-12 h-6 rounded-full p-0.5 transition-all flex-shrink-0 disabled:opacity-50"
      style={{
        background: active ? 'var(--color-primary)' : 'var(--glass-border)',
        boxShadow: active ? '0 0 10px rgba(208,188,255,0.4)' : 'none',
      }}
    >
      <motion.div
        animate={{ x: active ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-5 h-5 bg-white rounded-full shadow-md"
      />
    </button>
  )
}
