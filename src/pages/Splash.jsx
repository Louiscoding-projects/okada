import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useAuth } from '../context/AuthContext'

export default function Splash() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (loading) return
    const timer = setTimeout(() => {
      if (user) {
        navigate('/home', { replace: true })
      } else if (localStorage.getItem('onboardingComplete')) {
        navigate('/login', { replace: true })
      } else {
        navigate('/onboarding', { replace: true })
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [user, loading, navigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-magenta/5 rounded-full blur-3xl pointer-events-none" />

      {/* Scanning line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ y: '-2px' }}
          animate={{ y: '100vh' }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 1.2 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent"
        />
      </div>

      {/* Logo box */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative mb-8"
      >
        <div className="absolute -inset-6 bg-primary/10 blur-2xl rounded-full animate-pulse pointer-events-none" />
        <div
          className="w-32 h-32 rounded-[40px] flex items-center justify-center relative overflow-hidden"
          style={{
            backdropFilter: 'blur(20px)',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border-dim)',
            boxShadow: '0 0 40px rgba(208,188,255,0.2)',
          }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontSize: '56px', fontVariationSettings: "'FILL' 1" }}
          >
            moped
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-display text-4xl font-bold tracking-[0.3em] text-primary uppercase mb-2">
          OKADA
        </h1>
        <p className="font-display text-[10px] tracking-[0.5em] text-on-surface-variant uppercase">
          NEO-ACCRA MOBILITY OS
        </p>
      </motion.div>

      {/* Boot bar */}
      <div className="absolute bottom-14 w-48 h-px bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="h-full w-1/2 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
        />
      </div>
      <div className="absolute bottom-8">
        <span className="text-[8px] font-bold tracking-[0.4em] text-on-surface-variant/40 uppercase">
          INITIALIZING SYSTEM...
        </span>
      </div>
    </motion.div>
  )
}
