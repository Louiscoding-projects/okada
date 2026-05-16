import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import BottomNav from '../components/okada/BottomNav'

const transactions = [
  { label: 'Ride to Kotoka Airport', amount: '-GHS 45.00', time: 'Today · 9:30am', icon: 'navigation', debit: true },
  { label: 'MTN Mobile Money Top-up', amount: '+GHS 200.00', time: 'Yesterday', icon: 'add_circle', debit: false },
  { label: 'Ride to Accra Mall', amount: '-GHS 28.50', time: 'Mon · 3:15pm', icon: 'navigation', debit: true },
  { label: 'Ride to Labadi Beach', amount: '-GHS 35.00', time: 'Sun · 6:00pm', icon: 'navigation', debit: true },
]

const quickActions = [
  { label: 'Top Up', icon: 'add_circle', color: '#00f3ff', bg: 'rgba(0,243,255,0.1)', border: 'rgba(0,243,255,0.25)' },
  { label: 'Send', icon: 'send', color: '#d0bcff', bg: 'rgba(208,188,255,0.1)', border: 'rgba(208,188,255,0.25)' },
  { label: 'Withdraw', icon: 'arrow_outward', color: '#ff00ff', bg: 'rgba(255,0,255,0.1)', border: 'rgba(255,0,255,0.25)' },
]

const providers = [
  { name: 'MTN Mobile Money', icon: 'M', color: 'bg-yellow-400 text-black', number: '054 **** 882', active: true },
  { name: 'Telecel Cash', icon: 'T', color: 'bg-red-500 text-white', number: '020 **** 415' },
  { name: 'AT Money', icon: 'A', color: 'bg-blue-600 text-white', number: '026 **** 991' },
]

export default function Payment() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background text-on-surface pb-28">
      {/* Header */}
      <header
        className="fixed top-0 left-0 w-full z-40 px-5 py-4 flex items-center gap-4 border-b border-theme-subtle"
        style={{ background: 'var(--glass-bg-header)', backdropFilter: 'blur(16px)' }}
      >
        <h2 className="font-display font-bold text-lg uppercase tracking-[0.2em] text-on-surface">CREDITS</h2>
        <div
          className="ml-auto px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.1em] text-neon-cyan"
          style={{ background: 'rgba(0,243,255,0.08)', border: '1px solid rgba(0,243,255,0.25)' }}
        >
          ACTIVE
        </div>
      </header>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="pt-20 px-4 space-y-5">
        {/* Balance card */}
        <div
          className="relative rounded-3xl p-7 overflow-hidden"
          style={{
            background: 'var(--balance-card-bg)',
            border: '1px solid rgba(208,188,255,0.2)',
            boxShadow: '0 0 40px rgba(208,188,255,0.08)',
          }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" style={{ background: 'rgba(0,243,255,0.08)' }} />
          <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" style={{ background: 'rgba(255,0,255,0.08)' }} />

          <p className="text-[10px] font-bold tracking-[0.3em] text-primary/70 mb-1.5 uppercase">Available Credits</p>
          <h3 className="font-display text-5xl font-bold mb-6 tracking-tight text-on-surface">GHS 842.50</h3>
          <div className="flex justify-between items-end">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-neon-cyan"
              style={{ background: 'rgba(0,243,255,0.1)', border: '1px solid rgba(0,243,255,0.2)' }}
            >
              <span className="material-symbols-outlined text-sm">trending_up</span>
              Elite Rewards
            </div>
            <p className="text-[10px] font-mono text-on-surface-variant/60 tracking-widest">•••• 4829</p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map(({ label, icon, color, bg, border }) => (
            <button
              key={label}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all active:scale-95"
              style={{ background: 'var(--glass-bg-card)', border: '1px solid var(--glass-border-subtle)', backdropFilter: 'blur(12px)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: bg, border: `1px solid ${border}` }}>
                <span className="material-symbols-outlined" style={{ color }}>{icon}</span>
              </div>
              <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">{label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Money */}
        <section>
          <h4 className="font-display font-bold uppercase tracking-[0.2em] text-[10px] text-neon-cyan mb-3">Mobile Money</h4>
          <div className="space-y-2">
            {providers.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl flex items-center justify-between transition-all"
                style={{
                  backdropFilter: 'blur(12px)',
                  background: item.active ? 'var(--active-item-bg)' : 'var(--glass-bg-card)',
                  border: item.active ? '1px solid var(--active-item-border)' : '1px solid var(--glass-border-subtle)',
                  boxShadow: item.active ? '0 0 15px rgba(208,188,255,0.08)' : 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 ${item.color} rounded-xl flex items-center justify-center font-bold text-lg`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-on-surface">{item.name}</p>
                    <p className="text-[10px] text-on-surface-variant">{item.number}</p>
                  </div>
                </div>
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: item.active ? 'var(--color-primary)' : 'transparent',
                    borderColor: item.active ? 'var(--color-primary)' : 'var(--glass-border)',
                  }}
                >
                  {item.active && <div className="w-2 h-2 bg-on-primary rounded-full" />}
                </div>
              </div>
            ))}
          </div>
          <button
            className="w-full mt-3 py-4 rounded-2xl font-bold text-sm text-on-surface active:scale-[0.98] transition-all"
            style={{ background: 'var(--glass-bg-card)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(12px)' }}
          >
            + Link New Provider
          </button>
        </section>

        {/* Transactions */}
        <section className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-display font-bold uppercase tracking-[0.2em] text-[10px] text-neon-cyan">Recent Activity</h4>
            <button className="text-[10px] text-primary font-bold uppercase tracking-wider">See All</button>
          </div>
          <div className="space-y-2">
            {transactions.map((tx, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: 'var(--glass-bg-card)', border: '1px solid var(--glass-border-subtle)', backdropFilter: 'blur(12px)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: tx.debit ? 'rgba(242,184,181,0.15)' : 'rgba(0,243,255,0.12)',
                    color: tx.debit ? '#f2b8b5' : '#00f3ff',
                  }}
                >
                  <span className="material-symbols-outlined text-sm">{tx.icon}</span>
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-bold text-sm text-on-surface truncate">{tx.label}</p>
                  <p className="text-[10px] text-on-surface-variant">{tx.time}</p>
                </div>
                <p className="font-bold text-sm flex-shrink-0" style={{ color: tx.debit ? '#f2b8b5' : '#00f3ff' }}>
                  {tx.amount}
                </p>
              </div>
            ))}
          </div>
        </section>
      </motion.div>

      <BottomNav />
    </div>
  )
}
