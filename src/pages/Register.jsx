import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import AuthLayout from '../components/AuthLayout'
import GradientButton from '../components/okada/GradientButton'
import { signUpWithEmail } from '../supabase/auth'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'passenger' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) return
    setLoading(true)
    setError('')
    const { error: err } = await signUpWithEmail(form.email, form.password, {
      full_name: form.name,
      role: form.role,
    })
    setLoading(false)
    if (err) {
      setError(err.message)
    } else {
      navigate('/login', { replace: true })
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
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-magenta/40 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-magenta/5 blur-[60px] rounded-full pointer-events-none" />

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
              <h1 className="font-display text-xl font-bold text-on-surface tracking-[0.15em] uppercase">CREATE ACCOUNT</h1>
              <p className="text-xs text-on-surface-variant mt-0.5">Join the Neo-Accra network</p>
            </div>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'passenger', icon: 'person', label: 'PASSENGER' },
              { id: 'rider', icon: 'moped', label: 'RIDER' },
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setForm(f => ({ ...f, role: r.id }))}
                className="p-4 rounded-2xl flex flex-col items-center gap-2 transition-all"
                style={{
                  background: form.role === r.id ? 'rgba(208,188,255,0.1)' : 'var(--glass-bg-card)',
                  border: form.role === r.id ? '1px solid rgba(208,188,255,0.4)' : '1px solid var(--glass-border-subtle)',
                  boxShadow: form.role === r.id ? '0 0 15px rgba(208,188,255,0.15)' : 'none',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: form.role === r.id ? 'var(--color-primary)' : 'var(--color-outline)', fontVariationSettings: "'FILL' 1" }}
                >
                  {r.icon}
                </span>
                <span className={`text-[10px] font-bold tracking-widest ${form.role === r.id ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {r.label}
                </span>
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="space-y-3">
            {[
              { key: 'name', placeholder: 'Full name', icon: 'person', type: 'text' },
              { key: 'email', placeholder: 'Email address', icon: 'email', type: 'email' },
              { key: 'password', placeholder: 'Password', icon: 'lock', type: 'password' },
            ].map(({ key, placeholder, icon, type }) => (
              <div key={key} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan to-primary rounded-2xl opacity-0 group-focus-within:opacity-20 blur transition duration-500" />
                <div
                  className="relative flex items-center rounded-2xl"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--glass-border)' }}
                >
                  <span className="material-symbols-outlined text-on-surface-variant/60 ml-4 text-[20px]">{icon}</span>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={set(key)}
                    className="w-full h-12 px-3 bg-transparent text-on-surface outline-none placeholder:text-on-surface-variant/40 font-display"
                  />
                </div>
              </div>
            ))}
          </div>

          {error && <p className="text-xs text-error">{error}</p>}

          <GradientButton onClick={handleSubmit} loading={loading} disabled={!form.name || !form.email || !form.password}>
            CREATE ACCOUNT
          </GradientButton>

          <p className="text-center text-xs text-on-surface-variant">
            Already connected?{' '}
            <button onClick={() => navigate('/login')} className="text-primary font-bold hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
