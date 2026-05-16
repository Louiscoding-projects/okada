import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="space-y-6"
      >
        <div
          className="w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto"
          style={{
            backdropFilter: 'blur(20px)',
            background: 'var(--glass-bg)',
            border: '1px solid rgba(255,0,255,0.3)',
            boxShadow: '0 0 40px rgba(255,0,255,0.15)',
          }}
        >
          <span className="material-symbols-outlined text-neon-magenta" style={{ fontSize: '48px', fontVariationSettings: "'FILL' 1" }}>
            error
          </span>
        </div>

        <div>
          <h1 className="font-display text-6xl font-bold text-neon-magenta mb-2">404</h1>
          <p className="font-display text-xl font-bold text-on-surface uppercase tracking-[0.2em]">SIGNAL LOST</p>
          <p className="text-sm text-on-surface-variant mt-2">This sector does not exist in the network</p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/home')}
            className="w-full h-14 rounded-2xl font-display font-bold text-base"
            style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
          >
            RETURN TO BASE
          </motion.button>
          <button
            onClick={() => navigate(-1)}
            className="w-full h-12 rounded-2xl font-display font-bold text-sm text-on-surface-variant"
            style={{ background: 'var(--glass-bg-card)', border: '1px solid var(--glass-border)' }}
          >
            GO BACK
          </button>
        </div>
      </motion.div>
    </div>
  )
}
