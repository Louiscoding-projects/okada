import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import GradientButton from '../components/okada/GradientButton'
import { sendPasswordReset } from '../supabase/auth'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!email) return
    setLoading(true)
    setError('')
    const { error: err } = await sendPasswordReset(email)
    setLoading(false)
    if (err) {
      setError(err.message)
    } else {
      setSent(true)
    }
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

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--glass-bg-card)', border: '1px solid var(--glass-border)' }}
            >
              <span className="material-symbols-outlined text-primary">arrow_back</span>
            </button>
            <div>
              <h1 className="font-display text-xl font-bold text-on-surface tracking-[0.15em] uppercase">RESET ACCESS</h1>
              <p className="text-xs text-on-surface-variant mt-0.5">We'll send a recovery link</p>
            </div>
          </div>

          {sent ? (
            <div className="text-center py-8 space-y-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                style={{ background: 'rgba(0,243,255,0.1)', border: '1px solid rgba(0,243,255,0.3)' }}
              >
                <span className="material-symbols-outlined text-neon-cyan" style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1" }}>
                  mark_email_read
                </span>
              </div>
              <p className="font-display font-bold text-on-surface">Link Transmitted</p>
              <p className="text-sm text-on-surface-variant">Check your inbox at <span className="text-primary">{email}</span></p>
              <button onClick={() => navigate('/login')} className="text-xs text-primary font-bold hover:underline">
                Back to login
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan to-primary rounded-2xl opacity-0 group-focus-within:opacity-20 blur transition duration-500" />
                <div
                  className="relative flex items-center rounded-2xl"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--glass-border)' }}
                >
                  <span className="material-symbols-outlined text-on-surface-variant/60 ml-4 text-[20px]">email</span>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full h-12 px-3 bg-transparent text-on-surface outline-none placeholder:text-on-surface-variant/40 font-display"
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  />
                </div>
              </div>
              {error && <p className="text-xs text-error">{error}</p>}
              <GradientButton onClick={handleSubmit} loading={loading} disabled={!email}>
                SEND RESET LINK
              </GradientButton>
            </div>
          )}
        </div>
      </div>
    </AuthLayout>
  )
}
