import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import AuthLayout from '../components/AuthLayout'
import GoogleIcon from '../components/GoogleIcon'
import { signInWithGoogle } from '../supabase/auth'

export default function Login() {
  const navigate = useNavigate()

  const handleGoogle = async () => {
    await signInWithGoogle()
  }

  return (
    <AuthLayout>
      <div
        className="w-full p-8 rounded-[40px] shadow-2xl relative overflow-hidden"
        style={{
          backdropFilter: 'blur(20px)',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-magenta/30 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{
                background: 'rgba(208,188,255,0.1)',
                border: '1px solid rgba(208,188,255,0.25)',
                boxShadow: '0 0 25px rgba(208,188,255,0.15)',
              }}
            >
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>
                moped
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold text-on-surface tracking-[0.15em] uppercase">OKADA</h1>
            <p className="text-sm text-on-surface-variant">Jack in to the Neo-Accra network</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {/* Phone login */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/login/phone')}
              className="w-full h-14 rounded-2xl font-display font-bold text-base relative overflow-hidden group transition-all flex items-center justify-center gap-3"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                boxShadow: '0 0 0 rgba(208,188,255,0)',
              }}
              whileHover={{ boxShadow: '0 0 25px rgba(208,188,255,0.5)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="material-symbols-outlined text-[20px]">smartphone</span>
              JACK IN WITH PHONE
            </motion.button>

            {/* Google login */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleGoogle}
              className="w-full h-14 rounded-2xl font-display font-bold text-sm relative overflow-hidden group transition-all flex items-center justify-center gap-3"
              style={{
                background: 'var(--glass-bg-card)',
                border: '1px solid var(--glass-border)',
                color: 'var(--color-on-surface)',
              }}
              whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <GoogleIcon size={20} />
              CONTINUE WITH GOOGLE
            </motion.button>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 w-full">
              <div className="h-px flex-grow" style={{ background: 'var(--glass-border)' }} />
              <span className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em]">Or use</span>
              <div className="h-px flex-grow" style={{ background: 'var(--glass-border)' }} />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center transition-all"
                style={{
                  border: '1px solid rgba(0,243,255,0.3)',
                  background: 'rgba(0,243,255,0.08)',
                  boxShadow: '0 0 15px rgba(0,243,255,0.1)',
                }}
              >
                <span className="material-symbols-outlined text-neon-cyan" style={{ fontSize: '32px' }}>
                  fingerprint
                </span>
              </div>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
                Biometric Login
              </span>
            </motion.button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-xs text-on-surface-variant">
              New to OKADA?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-primary font-bold hover:underline"
              >
                Create account
              </button>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
