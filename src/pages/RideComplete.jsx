import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import StarRating from '../components/okada/StarRating'
import GradientButton from '../components/okada/GradientButton'

const TIPS = [0, 2, 5, 10]

export default function RideComplete() {
  const navigate = useNavigate()
  const { tripId } = useParams()
  const [rating, setRating] = useState(0)
  const [tip, setTip] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleDone = () => {
    setSubmitted(true)
    setTimeout(() => navigate('/home', { replace: true }), 1500)
  }

  return (
    <div className="min-h-screen bg-background text-on-surface pb-10">
      {/* Header */}
      <header
        className="fixed top-0 w-full z-40 px-5 py-4 flex items-center gap-4 border-b border-theme-subtle"
        style={{ background: 'var(--glass-bg-header)', backdropFilter: 'blur(16px)' }}
      >
        <h2 className="font-display font-bold text-lg uppercase tracking-[0.2em] text-on-surface">RIDE COMPLETE</h2>
        <div
          className="ml-auto px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.1em] text-neon-cyan"
          style={{ background: 'rgba(0,243,255,0.08)', border: '1px solid rgba(0,243,255,0.25)' }}
        >
          DELIVERED
        </div>
      </header>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pt-20 px-4 space-y-4"
      >
        {/* Success icon */}
        <div className="flex flex-col items-center py-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
            style={{
              background: 'rgba(0,243,255,0.1)',
              border: '2px solid rgba(0,243,255,0.4)',
              boxShadow: '0 0 30px rgba(0,243,255,0.2)',
            }}
          >
            <span className="material-symbols-outlined text-neon-cyan text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              where_to_vote
            </span>
          </motion.div>
          <h3 className="font-display text-2xl font-bold text-on-surface">ARRIVED SAFELY</h3>
          <p className="text-sm text-on-surface-variant mt-1">Ride #{tripId?.slice(0, 8) || 'DEMO-0001'}</p>
        </div>

        {/* Trip summary */}
        <div
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'DISTANCE', value: '4.2 km', icon: 'route' },
              { label: 'TIME', value: '18 min', icon: 'schedule' },
              { label: 'FARE', value: 'GHS 28.50', icon: 'payments' },
            ].map(({ label, value, icon }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-primary">{icon}</span>
                <p className="font-display font-bold text-on-surface">{value}</p>
                <p className="text-[9px] text-on-surface-variant uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-theme-subtle flex justify-between items-center">
            <span className="text-sm text-on-surface-variant">Osu → Accra Mall</span>
            <span className="text-xs font-bold text-neon-cyan">Paid via MoMo</span>
          </div>
        </div>

        {/* Rate rider */}
        <div
          className="rounded-3xl p-5 space-y-4"
          style={{ background: 'var(--glass-bg-card)', border: '1px solid var(--glass-border-subtle)' }}
        >
          <p className="text-[10px] font-bold tracking-[0.2em] text-neon-cyan uppercase">Rate Your Rider</p>
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(208,188,255,0.1)', border: '1px solid rgba(208,188,255,0.3)' }}
            >
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            </div>
            <div>
              <p className="font-display font-bold text-on-surface">KWAME ASANTE</p>
              <p className="text-xs text-on-surface-variant">Honda CG 125 · GR-4829</p>
            </div>
          </div>
          <StarRating value={rating} interactive onRate={setRating} size={32} />
          {rating > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-on-surface-variant"
            >
              {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][rating]}
            </motion.p>
          )}
        </div>

        {/* Tip */}
        <div
          className="rounded-3xl p-5 space-y-3"
          style={{ background: 'var(--glass-bg-card)', border: '1px solid var(--glass-border-subtle)' }}
        >
          <p className="text-[10px] font-bold tracking-[0.2em] text-neon-cyan uppercase">Add Tip</p>
          <div className="flex gap-2">
            {TIPS.map(amount => (
              <button
                key={amount}
                onClick={() => setTip(amount)}
                className="flex-1 py-3 rounded-xl font-display font-bold text-sm transition-all"
                style={{
                  background: tip === amount ? 'rgba(208,188,255,0.15)' : 'var(--glass-bg)',
                  border: tip === amount ? '1px solid rgba(208,188,255,0.4)' : '1px solid var(--glass-border)',
                  color: tip === amount ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                }}
              >
                {amount === 0 ? 'None' : `GHS ${amount}`}
              </button>
            ))}
          </div>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center py-4 gap-2">
            <span className="material-symbols-outlined text-neon-cyan text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <p className="font-display font-bold text-on-surface">Thanks! Heading home...</p>
          </div>
        ) : (
          <GradientButton onClick={handleDone} disabled={rating === 0}>
            {rating === 0 ? 'RATE TO CONTINUE' : 'DONE'}
          </GradientButton>
        )}
      </motion.div>
    </div>
  )
}
