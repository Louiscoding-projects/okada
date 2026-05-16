import { motion } from 'motion/react'

const variants = {
  primary: {
    background: 'var(--color-primary)',
    color: 'var(--color-on-primary)',
    hoverShadow: '0 0 25px rgba(208,188,255,0.5)',
  },
  cyan: {
    background: '#00f3ff',
    color: '#0a0a0c',
    hoverShadow: '0 0 25px rgba(0,243,255,0.5)',
  },
  danger: {
    background: 'rgba(242,184,181,0.08)',
    color: '#f2b8b5',
    hoverShadow: '0 0 20px rgba(186,26,26,0.3)',
    border: '1px solid rgba(242,184,181,0.25)',
  },
  ghost: {
    background: 'var(--glass-bg-card)',
    color: 'var(--color-on-surface)',
    hoverShadow: 'none',
    border: '1px solid var(--glass-border)',
  },
}

export default function GradientButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  type = 'button',
  loading = false,
}) {
  const v = variants[variant] || variants.primary

  return (
    <motion.button
      type={type}
      whileTap={disabled ? {} : { scale: 0.97 }}
      whileHover={disabled ? {} : { boxShadow: v.hoverShadow }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full h-14 rounded-2xl font-display font-bold text-base relative overflow-hidden group transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{ background: v.background, color: v.color, border: v.border || 'none' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  )
}
