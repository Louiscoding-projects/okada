import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import GradientButton from '../components/okada/GradientButton'
import { updatePassword } from '../supabase/auth'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = async () => {
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    setError('')
    const { error: err } = await updatePassword(password)
    setLoading(false)
    if (err) {
      setError(err.message)
    } else {
      setDone(true)
      setTimeout(() => navigate('/home', { replace: true }), 2000)
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
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto"
              style={{ background: 'rgba(208,188,255,0.1)', border: '1px solid rgba(208,188,255,0.25)' }}
            >
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px', fontVariationSettings: "'FILL' 1" }}>
                lock_reset
              </span>
            </div>
            <h1 className="font-display text-xl font-bold text-on-surface tracking-[0.15em] uppercase">NEW ACCESS KEY</h1>
            <p className="text-xs text-on-surface-variant">Set your new password</p>
          </div>

          {done ? (
            <div className="text-center py-6 space-y-3">
              <span className="material-symbols-outlined text-neon-cyan text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <p className="font-display font-bold text-on-surface">Access Restored</p>
              <p className="text-xs text-on-surface-variant">Redirecting...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { id: 'password', value: password, setter: setPassword, placeholder: 'New password' },
                { id: 'confirm', value: confirm, setter: setConfirm, placeholder: 'Confirm password' },
              ].map(({ id, value, setter, placeholder }) => (
                <div key={id} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan to-primary rounded-2xl opacity-0 group-focus-within:opacity-20 blur transition duration-500" />
                  <div
                    className="relative flex items-center rounded-2xl"
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--glass-border)' }}
                  >
                    <span className="material-symbols-outlined text-on-surface-variant/60 ml-4 text-[20px]">lock</span>
                    <input
                      type="password"
                      placeholder={placeholder}
                      value={value}
                      onChange={e => setter(e.target.value)}
                      className="w-full h-12 px-3 bg-transparent text-on-surface outline-none placeholder:text-on-surface-variant/40 font-display"
                    />
                  </div>
                </div>
              ))}
              {error && <p className="text-xs text-error">{error}</p>}
              <GradientButton onClick={handleSubmit} loading={loading} disabled={!password || !confirm}>
                RESET PASSWORD
              </GradientButton>
            </div>
          )}
        </div>
      </div>
    </AuthLayout>
  )
}
