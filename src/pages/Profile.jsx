import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import BottomNav from '../components/okada/BottomNav'
import PulsingToggle from '../components/okada/PulsingToggle'
import { useAuth } from '../context/AuthContext'
import { signOut } from '../supabase/auth'

const stats = [
  { label: 'TRIPS', value: '128', icon: 'moped' },
  { label: 'DISTANCE', value: '312km', icon: 'route' },
  { label: 'SAVED', value: 'GHS 1.2k', icon: 'savings' },
]

const settingsConfig = [
  { key: 'notifications', icon: 'notifications', label: 'Push Notifications', desc: 'Real-time ride updates' },
  { key: 'location', icon: 'my_location', label: 'Location Services', desc: 'High accuracy tracking' },
  { key: 'biometric', icon: 'fingerprint', label: 'Biometric Login', desc: 'Face ID / Fingerprint' },
]

const supportLinks = [
  { icon: 'help', label: 'Help Center' },
  { icon: 'description', label: 'Terms of Service' },
]

export default function Profile() {
  const navigate = useNavigate()
  const { user, theme, toggleTheme } = useAuth()
  const [toggles, setToggles] = useState({ notifications: true, location: true, biometric: false })
  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }))
  const isDark = theme === 'dark'

  const handleLogout = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-background text-on-surface pb-28">
      {/* Header */}
      <header
        className="fixed top-0 left-0 w-full z-40 px-5 py-4 flex items-center justify-between border-b border-theme-subtle"
        style={{ background: 'var(--glass-bg-header)', backdropFilter: 'blur(16px)' }}
      >
        <h2 className="font-display font-bold text-lg uppercase tracking-[0.2em] text-on-surface">SYSTEM</h2>
        <div
          className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.1em] text-neon-cyan"
          style={{ background: 'rgba(0,243,255,0.08)', border: '1px solid rgba(0,243,255,0.25)' }}
        >
          NEO-OKADA OS v2.4
        </div>
      </header>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-20 px-4 space-y-5">
        {/* Avatar section */}
        <div className="flex flex-col items-center py-4">
          <div className="relative mb-4">
            <div className="absolute -inset-3 bg-gradient-to-tr from-neon-cyan to-neon-magenta rounded-full blur-md opacity-50 pointer-events-none" />
            <div
              className="relative w-28 h-28 rounded-full p-0.5"
              style={{ background: 'linear-gradient(135deg, #00f3ff, #ff00ff)' }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-background flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              </div>
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,243,255,0.12)', border: '1px solid rgba(0,243,255,0.4)', backdropFilter: 'blur(12px)' }}
            >
              <span className="material-symbols-outlined text-neon-cyan text-sm">photo_camera</span>
            </button>
          </div>
          <h3 className="font-display text-2xl font-bold text-on-surface uppercase">
            {user?.user_metadata?.full_name || user?.email?.split('@')[0]?.toUpperCase() || 'PILOT'}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-neon-cyan text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>grade</span>
            <p className="text-sm text-neon-cyan font-bold">ELITE PILOT · 4.98 · NEO-ACCRA</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map(({ label, value, icon }) => (
            <div
              key={label}
              className="flex flex-col items-center p-4 rounded-2xl"
              style={{ background: 'var(--glass-bg-card)', border: '1px solid var(--glass-border-subtle)', backdropFilter: 'blur(12px)' }}
            >
              <span className="material-symbols-outlined text-primary text-2xl mb-2">{icon}</span>
              <p className="font-display font-bold text-xl text-on-surface">{value}</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.1em] mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* System settings */}
        <section>
          <h4 className="font-display font-bold uppercase tracking-[0.2em] text-[10px] text-neon-cyan mb-3">System Settings</h4>
          <div className="space-y-2">
            {settingsConfig.map(({ key, icon, label, desc }) => {
              const active = toggles[key]
              return (
                <div
                  key={key}
                  className="p-4 rounded-2xl flex items-center justify-between"
                  style={{
                    backdropFilter: 'blur(12px)',
                    background: 'var(--glass-bg-card)',
                    border: active ? '1px solid rgba(208,188,255,0.2)' : '1px solid var(--glass-border-subtle)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-xl"
                      style={{
                        background: active ? 'rgba(208,188,255,0.15)' : 'var(--glass-bg-card)',
                        color: active ? 'var(--color-primary)' : 'var(--color-outline)',
                      }}
                    >
                      <span className="material-symbols-outlined">{icon}</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-on-surface">{label}</p>
                      <p className="text-[10px] text-on-surface-variant">{desc}</p>
                    </div>
                  </div>
                  <PulsingToggle active={active} onToggle={() => toggle(key)} />
                </div>
              )
            })}

            {/* Theme toggle */}
            <div
              className="p-4 rounded-2xl flex items-center justify-between"
              style={{
                backdropFilter: 'blur(12px)',
                background: 'var(--glass-bg-card)',
                border: isDark ? '1px solid rgba(208,188,255,0.2)' : '1px solid var(--glass-border-subtle)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-2.5 rounded-xl"
                  style={{
                    background: isDark ? 'rgba(208,188,255,0.15)' : 'var(--glass-bg-card)',
                    color: isDark ? 'var(--color-primary)' : 'var(--color-outline)',
                  }}
                >
                  <span className="material-symbols-outlined">{isDark ? 'dark_mode' : 'light_mode'}</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface">{isDark ? 'Dark Mode' : 'Light Mode'}</p>
                  <p className="text-[10px] text-on-surface-variant">Toggle display theme</p>
                </div>
              </div>
              <PulsingToggle active={isDark} onToggle={toggleTheme} />
            </div>
          </div>
        </section>

        {/* Support */}
        <section>
          <h4 className="font-display font-bold uppercase tracking-[0.2em] text-[10px] text-neon-cyan mb-3">Support &amp; Protocol</h4>
          <div className="space-y-2">
            {supportLinks.map(({ icon, label }) => (
              <button
                key={label}
                className="w-full p-4 rounded-2xl flex items-center justify-between transition-all active:scale-[0.98]"
                style={{ backdropFilter: 'blur(12px)', background: 'var(--glass-bg-card)', border: '1px solid var(--glass-border-subtle)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl" style={{ background: 'var(--glass-bg-card)', color: 'var(--color-outline)' }}>
                    <span className="material-symbols-outlined">{icon}</span>
                  </div>
                  <p className="font-bold text-sm text-on-surface">{label}</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-sm">chevron_right</span>
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={handleLogout}
          className="w-full py-4 font-bold text-error rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"
          style={{
            background: 'rgba(242,184,181,0.08)',
            border: '1px solid rgba(242,184,181,0.25)',
            boxShadow: '0 0 15px rgba(186,26,26,0.1)',
          }}
        >
          <span className="material-symbols-outlined">logout</span>
          Disconnect
        </button>
      </motion.div>

      <BottomNav />
    </div>
  )
}
