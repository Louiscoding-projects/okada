import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import BottomNav from '../components/okada/BottomNav'
import PulsingToggle from '../components/okada/PulsingToggle'
import { useAuth } from '../context/AuthContext'

const recentTrips = [
  { from: 'Osu', to: 'Accra Mall', fare: 28.5, time: 'Today 9:30am', rating: 5 },
  { from: 'Kotoka Airport', to: 'Cantonments', fare: 45.0, time: 'Yesterday 2pm', rating: 5 },
  { from: 'Tema', to: 'Labadi', fare: 62.0, time: 'Mon 6pm', rating: 4 },
]

export default function RiderDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [online, setOnline] = useState(false)
  const [activeRequest, setActiveRequest] = useState(null)

  return (
    <div className="min-h-screen bg-background text-on-surface pb-28">
      {/* Header */}
      <header
        className="fixed top-0 w-full z-40 px-5 py-4 flex items-center justify-between border-b border-theme-subtle"
        style={{ background: 'var(--glass-bg-header)', backdropFilter: 'blur(16px)' }}
      >
        <h2 className="font-display font-bold text-lg uppercase tracking-[0.2em] text-on-surface">RIDER HQ</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-on-surface-variant font-bold uppercase">{online ? 'ONLINE' : 'OFFLINE'}</span>
          <PulsingToggle active={online} onToggle={() => setOnline(o => !o)} />
        </div>
      </header>

      <div className="pt-20 px-4 space-y-5">
        {/* Status banner */}
        <motion.div
          animate={{ borderColor: online ? 'rgba(0,243,255,0.4)' : 'rgba(255,255,255,0.08)' }}
          className="p-4 rounded-2xl flex items-center gap-4"
          style={{
            background: online ? 'rgba(0,243,255,0.06)' : 'var(--glass-bg-card)',
            border: '1px solid',
          }}
        >
          <div className="relative w-3 h-3 flex-shrink-0">
            {online && <span className="absolute inset-0 bg-neon-cyan rounded-full animate-ping opacity-75" />}
            <span className="relative block w-3 h-3 rounded-full" style={{ background: online ? '#00f3ff' : 'var(--color-outline)' }} />
          </div>
          <div>
            <p className="font-display font-bold text-on-surface">{online ? 'ACCEPTING RIDES' : 'YOU\'RE OFFLINE'}</p>
            <p className="text-xs text-on-surface-variant">{online ? 'Passengers can find you now' : 'Toggle to start earning'}</p>
          </div>
        </motion.div>

        {/* Today's earnings */}
        <div
          className="relative rounded-3xl p-6 overflow-hidden"
          style={{
            background: 'var(--balance-card-bg)',
            border: '1px solid rgba(208,188,255,0.2)',
          }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <p className="text-[10px] font-bold tracking-[0.3em] text-primary/70 mb-1 uppercase">Today's Earnings</p>
          <h3 className="font-display text-4xl font-bold text-on-surface mb-4">GHS 135.50</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'TRIPS', value: '4' },
              { label: 'HOURS', value: '3.5' },
              { label: 'RATING', value: '4.97' },
            ].map(({ label, value }) => (
              <div key={label} className="p-2 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <p className="font-display font-bold text-on-surface">{value}</p>
                <p className="text-[9px] text-on-surface-variant uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Incoming request (demo) */}
        {online && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-3xl relative overflow-hidden"
            style={{
              background: 'rgba(208,188,255,0.08)',
              border: '1px solid rgba(208,188,255,0.3)',
              boxShadow: '0 0 20px rgba(208,188,255,0.1)',
            }}
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">New Request</p>
              <div className="flex items-center gap-1 text-neon-cyan">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span className="text-xs font-bold">0.8 km away</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary">my_location</span>
              <div>
                <p className="font-bold text-on-surface text-sm">Osu Oxford Street</p>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-neon-magenta text-sm">arrow_downward</span>
                  <p className="text-xs text-on-surface-variant">Accra Mall · 4.2 km · GHS 28.50</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/tracking/incoming')}
                className="flex-1 h-12 rounded-xl font-display font-bold text-sm"
                style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
              >
                ACCEPT
              </button>
              <button
                className="flex-1 h-12 rounded-xl font-display font-bold text-sm"
                style={{ background: 'var(--glass-bg-card)', border: '1px solid var(--glass-border)', color: 'var(--color-on-surface-variant)' }}
              >
                DECLINE
              </button>
            </div>
          </motion.div>
        )}

        {/* Recent trips */}
        <section>
          <h4 className="font-display font-bold uppercase tracking-[0.2em] text-[10px] text-neon-cyan mb-3">Recent Trips</h4>
          <div className="space-y-2">
            {recentTrips.map((trip, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl flex items-center gap-3"
                style={{ background: 'var(--glass-bg-card)', border: '1px solid var(--glass-border-subtle)', backdropFilter: 'blur(12px)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,243,255,0.1)', color: '#00f3ff' }}
                >
                  <span className="material-symbols-outlined text-sm">navigation</span>
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-bold text-sm text-on-surface truncate">{trip.from} → {trip.to}</p>
                  <p className="text-[10px] text-on-surface-variant">{trip.time}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-sm text-neon-cyan">GHS {trip.fare.toFixed(2)}</p>
                  <div className="flex items-center gap-0.5 justify-end">
                    {Array.from({ length: trip.rating }).map((_, j) => (
                      <span key={j} className="material-symbols-outlined text-[12px]" style={{ color: '#ffc107', fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  )
}
