import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'

const STATUS_STEPS = [
  { id: 'matching', label: 'FINDING RIDER', icon: 'radar', color: '#00f3ff' },
  { id: 'accepted', label: 'RIDER FOUND', icon: 'check_circle', color: '#d0bcff' },
  { id: 'en_route', label: 'RIDER EN ROUTE', icon: 'navigation', color: '#d0bcff' },
  { id: 'arrived', label: 'RIDER ARRIVED', icon: 'where_to_vote', color: '#00f3ff' },
]

const DEMO_RIDER = {
  name: 'KWAME ASANTE',
  rating: 4.97,
  trips: 1204,
  bike: 'Honda CG 125 · GR-4829',
  eta: 3,
}

export default function RideTracking() {
  const navigate = useNavigate()
  const { tripId } = useParams()
  const [statusIndex, setStatusIndex] = useState(0)
  const [eta, setEta] = useState(DEMO_RIDER.eta)

  // Demo: auto-advance status
  useEffect(() => {
    if (statusIndex >= STATUS_STEPS.length - 1) return
    const timer = setTimeout(() => setStatusIndex(i => i + 1), 4000)
    return () => clearTimeout(timer)
  }, [statusIndex])

  // Demo: countdown ETA
  useEffect(() => {
    if (eta <= 0) return
    const timer = setInterval(() => setEta(e => Math.max(0, e - 1)), 60000)
    return () => clearInterval(timer)
  }, [])

  const status = STATUS_STEPS[statusIndex]
  const isArrived = statusIndex === STATUS_STEPS.length - 1

  return (
    <div className="h-screen bg-background text-on-surface overflow-hidden flex flex-col">
      {/* Header */}
      <header
        className="fixed top-0 w-full z-50 px-5 py-4 flex items-center gap-4 border-b border-theme-subtle"
        style={{ background: 'var(--glass-bg-header)', backdropFilter: 'blur(16px)' }}
      >
        <button
          onClick={() => navigate('/home')}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'var(--glass-bg-card)', border: '1px solid var(--glass-border)' }}
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <div>
          <h2 className="font-display font-bold text-lg uppercase tracking-[0.2em] text-on-surface">TRACKING</h2>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Trip #{tripId?.slice(0, 8) || 'DEMO-0001'}</p>
        </div>
        <div
          className="ml-auto px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.1em]"
          style={{ background: `${status.color}15`, border: `1px solid ${status.color}40`, color: status.color }}
        >
          {status.label}
        </div>
      </header>

      {/* Map area */}
      <div className="flex-grow relative mt-16">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ-tuNPvXxX1g-VhOe2y0BLxUQlj7iQITNJpeTb9eas4tKf_wLhthp2qlrPmxAe53XAxmcBAJjMqcqMzfTlO1lp4j_XvJ3nqRGnStVq52tGKgz5ZSio_0PWP0kwp29OVc_lkThLDs54lVhJpoDk9NlIqaC8uJl0rVTskqvYBm7ZvlfYHzOF5gcztX47I-SEEYxEnfrDlLVfj6g5YavIcRsSSI-fOo2v4xLb15MW15P1ybL60zh6Rxr51fd-jBdNHZBMTCoS1ZylRvf"
          alt="Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />

        {/* Animated rider pin */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="relative">
            <div className="absolute -inset-5 rounded-full blur-2xl" style={{ background: `${status.color}33` }} />
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                backdropFilter: 'blur(20px)',
                background: 'var(--glass-bg-subtle)',
                border: `2px solid ${status.color}`,
                boxShadow: `0 0 20px ${status.color}66`,
              }}
            >
              <span className="material-symbols-outlined text-[28px]" style={{ color: status.color, fontVariationSettings: "'FILL' 1" }}>
                moped
              </span>
            </div>
          </div>
        </motion.div>

        {/* ETA bubble */}
        {!isArrived && (
          <div
            className="absolute top-8 left-1/2 -translate-x-1/2 z-10 px-6 py-2 rounded-full flex items-center gap-2"
            style={{
              backdropFilter: 'blur(20px)',
              background: 'var(--glass-bg-subtle)',
              border: '1px solid rgba(208,188,255,0.3)',
            }}
          >
            <span className="material-symbols-outlined text-primary text-sm">schedule</span>
            <span className="font-display font-bold text-primary text-sm">{eta} MIN AWAY</span>
          </div>
        )}
      </div>

      {/* Bottom sheet */}
      <div
        className="relative z-40 rounded-t-3xl p-5 pb-8 space-y-4"
        style={{
          backdropFilter: 'blur(24px)',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border-dim)',
          borderBottom: 'none',
        }}
      >
        <div className="w-12 h-1 bg-on-surface/20 rounded-full mx-auto" />

        {/* Status progress */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {STATUS_STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 flex-shrink-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500"
                style={{
                  background: i <= statusIndex ? `${s.color}20` : 'var(--glass-bg-card)',
                  border: `1px solid ${i <= statusIndex ? s.color : 'var(--glass-border)'}`,
                }}
              >
                <span className="material-symbols-outlined text-[14px]" style={{ color: i <= statusIndex ? s.color : 'var(--color-outline)', fontVariationSettings: "'FILL' 1" }}>
                  {i < statusIndex ? 'check' : s.icon}
                </span>
              </div>
              {i < STATUS_STEPS.length - 1 && (
                <div className="w-8 h-px" style={{ background: i < statusIndex ? '#d0bcff' : 'var(--glass-border)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Rider card */}
        <div
          className="p-4 rounded-2xl flex items-center gap-4"
          style={{ background: 'var(--glass-bg-card)', border: '1px solid var(--glass-border-subtle)' }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(208,188,255,0.1)', border: '1px solid rgba(208,188,255,0.3)' }}
          >
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          </div>
          <div className="flex-grow min-w-0">
            <p className="font-display font-bold text-on-surface">{DEMO_RIDER.name}</p>
            <p className="text-xs text-on-surface-variant truncate">{DEMO_RIDER.bike}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[14px]" style={{ color: '#ffc107', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="text-xs font-bold text-neon-cyan">{DEMO_RIDER.rating}</span>
              <span className="text-[10px] text-on-surface-variant">· {DEMO_RIDER.trips} trips</span>
            </div>
          </div>
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(0,243,255,0.1)', border: '1px solid rgba(0,243,255,0.3)' }}
          >
            <span className="material-symbols-outlined text-neon-cyan">call</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {isArrived ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/complete/demo')}
              className="flex-1 h-14 rounded-2xl font-display font-bold text-base relative overflow-hidden"
              style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
            >
              START RIDE
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/home')}
              className="flex-1 h-14 rounded-2xl font-display font-bold text-sm"
              style={{
                background: 'rgba(242,184,181,0.08)',
                color: '#f2b8b5',
                border: '1px solid rgba(242,184,181,0.25)',
              }}
            >
              CANCEL RIDE
            </motion.button>
          )}
          <button
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: 'rgba(242,184,181,0.08)',
              border: '1px solid rgba(242,184,181,0.25)',
              color: '#f2b8b5',
            }}
          >
            <span className="material-symbols-outlined">shield_with_heart</span>
          </button>
        </div>
      </div>
    </div>
  )
}
