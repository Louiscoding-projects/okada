import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import BottomNav from '../components/okada/BottomNav'
import { useAuth } from '../context/AuthContext'
import { signOut } from '../supabase/auth'

const mapPins = [
  { top: '40%', left: '25%', delay: 0, label: '2 MIN', icon: 'electric_moped', color: '#00f3ff' },
  { top: '55%', right: '20%', delay: 1, label: '5 MIN', icon: 'moped', color: '#ff00ff' },
]

const drawerLinks = [
  { icon: 'timeline', label: 'Travel Logs' },
  { icon: 'token', label: 'Promo Tokens' },
  { icon: 'shield', label: 'Security Protocol' },
]

const recentNodes = ['Accra Mall', 'Osu Night Market', 'Kotoka Airport']

export default function PassengerHome() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="h-screen bg-background text-on-surface overflow-hidden flex flex-col">
      {/* Header */}
      <header
        className="fixed top-0 w-full z-50 flex justify-between items-center px-5 py-4 border-b border-theme-subtle"
        style={{ background: 'var(--glass-bg-header)', backdropFilter: 'blur(16px)' }}
      >
        <div className="flex items-center gap-4">
          <button
            className="hover:bg-on-surface/10 p-2 rounded-full transition-colors"
            onClick={() => setDrawerOpen(true)}
          >
            <span className="material-symbols-outlined text-primary">menu</span>
          </button>
          <h1 className="font-display text-xl font-bold tracking-[0.2em] text-on-surface uppercase italic">OKADA</h1>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.1em] text-neon-cyan animate-pulse"
            style={{ background: 'rgba(0,243,255,0.08)', border: '1px solid rgba(0,243,255,0.25)' }}
          >
            CYBER-SYSTEM ACTIVE
          </div>
          <button
            className="w-10 h-10 rounded-full p-0.5 overflow-hidden"
            style={{ border: '1px solid rgba(208,188,255,0.5)', boxShadow: '0 0 10px rgba(208,188,255,0.4)' }}
            onClick={() => navigate('/profile')}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-neon-magenta/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            </div>
          </button>
        </div>
      </header>

      {/* Map */}
      <main className="flex-grow relative mt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ-tuNPvXxX1g-VhOe2y0BLxUQlj7iQITNJpeTb9eas4tKf_wLhthp2qlrPmxAe53XAxmcBAJjMqcqMzfTlO1lp4j_XvJ3nqRGnStVq52tGKgz5ZSio_0PWP0kwp29OVc_lkThLDs54lVhJpoDk9NlIqaC8uJl0rVTskqvYBm7ZvlfYHzOF5gcztX47I-SEEYxEnfrDlLVfj6g5YavIcRsSSI-fOo2v4xLb15MW15P1ybL60zh6Rxr51fd-jBdNHZBMTCoS1ZylRvf"
            alt="Neo Accra"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background/90" />
        </div>

        {/* Location badge */}
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2 z-10 px-6 py-2 rounded-full flex items-center gap-3"
          style={{
            backdropFilter: 'blur(20px)',
            background: 'var(--glass-bg-subtle)',
            border: '1px solid rgba(0,243,255,0.2)',
            boxShadow: '0 0 15px rgba(0,243,255,0.25)',
          }}
        >
          <div className="relative w-3 h-3">
            <span className="absolute inset-0 bg-neon-cyan rounded-full animate-ping opacity-75" />
            <span className="relative block w-3 h-3 bg-neon-cyan rounded-full" />
          </div>
          <span className="font-display font-bold text-neon-cyan text-sm tracking-wider uppercase">
            NEO-ACCRA SECTOR 4
          </span>
        </div>

        {/* Floating moped markers */}
        {mapPins.map((pin, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: pin.delay }}
            className="absolute z-10"
            style={{ top: pin.top, left: pin.left, right: pin.right }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full blur-xl" style={{ backgroundColor: pin.color + '33' }} />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  backdropFilter: 'blur(20px)',
                  background: 'var(--glass-bg-subtle)',
                  border: `1px solid ${pin.color}`,
                  boxShadow: `0 0 15px ${pin.color}55`,
                }}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ color: pin.color }}>{pin.icon}</span>
              </div>
              <div
                className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[9px] font-bold text-on-surface whitespace-nowrap"
                style={{ backdropFilter: 'blur(12px)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
              >
                {pin.label}
              </div>
            </div>
          </motion.div>
        ))}

        {/* SOS button */}
        <button
          className="absolute bottom-[440px] right-5 z-30 w-12 h-12 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
          style={{
            backdropFilter: 'blur(20px)',
            background: 'var(--glass-bg-subtle)',
            border: '1px solid rgba(242,184,181,0.4)',
            boxShadow: '0 0 20px rgba(186,26,26,0.3)',
          }}
        >
          <span className="material-symbols-outlined text-error text-[24px]">shield_with_heart</span>
        </button>

        {/* Bottom sheet */}
        <section className="absolute bottom-0 left-0 w-full z-40 px-4 pb-28">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 30 }}
            className="rounded-3xl p-5 shadow-2xl space-y-4 relative overflow-hidden"
            style={{
              backdropFilter: 'blur(20px)',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border-dim)',
            }}
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="w-12 h-1 bg-on-surface/20 rounded-full mx-auto -mt-1 mb-2" />

            {/* Search */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan via-primary to-neon-magenta rounded-2xl opacity-20 blur group-focus-within:opacity-40 transition duration-500" />
              <div
                className="relative flex items-center rounded-2xl p-1"
                style={{ background: 'var(--search-bg)', border: '1px solid var(--glass-border)' }}
              >
                <div className="pl-4 text-primary">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  type="text"
                  placeholder="Where to, Rider?"
                  className="w-full bg-transparent border-0 focus:ring-0 text-on-surface placeholder:text-on-surface-variant/60 font-display font-bold h-14 px-3 outline-none"
                  onFocus={() => navigate('/tracking/demo')}
                  readOnly
                />
                <button
                  className="mr-1 w-12 h-12 rounded-xl flex items-center justify-center text-primary hover:text-on-surface transition-colors"
                  style={{ background: 'var(--glass-bg-card)' }}
                >
                  <span className="material-symbols-outlined">mic</span>
                </button>
              </div>
            </div>

            {/* Quick destinations */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Home Base', sub: 'Airport Residential', color: '#00f3ff', icon: 'home', bg: 'rgba(0,243,255,0.12)' },
                { label: 'Work Zone', sub: 'Tech Hub East', color: '#ff00ff', icon: 'bolt', bg: 'rgba(255,0,255,0.12)' },
              ].map((dest) => (
                <button
                  key={dest.label}
                  className="p-4 rounded-2xl flex flex-col items-start gap-3 hover:bg-on-surface/5 transition-all group text-left"
                  style={{
                    background: 'var(--glass-bg-card)',
                    border: '1px solid var(--glass-border-subtle)',
                    borderLeft: `2px solid ${dest.color}`,
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: dest.bg }}>
                    <span className="material-symbols-outlined" style={{ color: dest.color }}>{dest.icon}</span>
                  </div>
                  <div>
                    <div className="font-display font-bold text-on-surface">{dest.label}</div>
                    <div className="text-xs text-on-surface-variant truncate">{dest.sub}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Recent nodes */}
            <div className="pt-2 border-t border-theme-subtle">
              <div className="flex items-center justify-between text-on-surface-variant mb-3">
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase">Frequent Nodes</span>
                <span className="material-symbols-outlined text-sm">history</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
                {recentNodes.map((place, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl"
                    style={{ background: 'var(--glass-bg-card)', border: '1px solid var(--glass-border-subtle)' }}
                  >
                    <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                    <span className="text-sm text-on-surface whitespace-nowrap">{place}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <BottomNav />

      {/* Drawer overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => setDrawerOpen(false)} />
      )}

      {/* Side drawer */}
      <div
        className="fixed left-0 top-0 h-full w-80 z-[70] transition-transform duration-500 ease-in-out"
        style={{
          transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
          background: 'var(--glass-bg-drawer)',
          backdropFilter: 'blur(32px)',
          borderRight: '1px solid var(--glass-border-subtle)',
        }}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-end mb-5">
            <button className="text-on-surface hover:bg-on-surface/10 p-2 rounded-full transition-colors" onClick={() => setDrawerOpen(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-neon-magenta/30 flex items-center justify-center" style={{ border: '2px solid var(--glass-border)' }}>
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            </div>
            <div className="text-center">
              <h2 className="font-display text-xl font-bold text-on-surface uppercase">{user?.user_metadata?.full_name || 'PILOT'}</h2>
              <div className="flex items-center justify-center gap-1 mt-1">
                <span className="material-symbols-outlined text-neon-cyan text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>grade</span>
                <p className="text-sm text-neon-cyan font-bold">ELITE PILOT</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-grow">
            {drawerLinks.map(({ icon, label }) => (
              <button
                key={label}
                className="flex items-center gap-5 p-4 text-on-surface-variant hover:bg-on-surface/5 rounded-2xl transition-all text-left"
                style={{ border: '1px solid transparent' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--glass-border-subtle)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
              >
                <span className="material-symbols-outlined">{icon}</span>
                <span className="text-on-surface font-body">{label}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto pt-5 border-t border-theme-subtle space-y-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-2xl text-error transition-all"
              style={{ background: 'rgba(242,184,181,0.06)', border: '1px solid rgba(242,184,181,0.15)' }}
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span className="text-sm font-bold">Disconnect</span>
            </button>
            <p className="text-[10px] font-bold tracking-[0.3em] text-on-surface-variant/50 uppercase text-center">
              NEO-OKADA OS v2.4
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
