import { useNavigate, useLocation } from 'react-router-dom'

const items = [
  { id: 'home', path: '/home', icon: 'moped', label: 'DRIVE' },
  { id: 'network', path: '/home', icon: 'hub', label: 'NETWORK' },
  { id: 'payment', path: '/payment', icon: 'account_balance_wallet', label: 'CREDITS' },
  { id: 'profile', path: '/profile', icon: 'settings_input_component', label: 'SYSTEM' },
]

function NavButton({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className="relative flex flex-col items-center justify-center px-6 py-2">
      {active && (
        <div
          className="absolute -top-1 w-12 h-12 rounded-full blur-xl pointer-events-none"
          style={{ background: 'rgba(208,188,255,0.15)', boxShadow: '0 0 20px rgba(208,188,255,0.4)' }}
        />
      )}
      <span
        className={`material-symbols-outlined text-3xl ${active ? 'text-primary' : 'text-on-surface-variant'}`}
        style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
      >
        {icon}
      </span>
      <span className={`text-[10px] font-bold mt-2 tracking-widest ${active ? 'text-primary' : 'text-on-surface-variant'}`}>
        {label}
      </span>
    </button>
  )
}

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav
      className="fixed bottom-0 w-full z-50 flex justify-around items-center h-24 px-4"
      style={{
        background: 'var(--glass-bg-nav)',
        backdropFilter: 'blur(24px)',
        borderTop: '1px solid var(--glass-border-subtle)',
        boxShadow: 'var(--nav-shadow)',
      }}
    >
      {items.map(item => (
        <NavButton
          key={item.id}
          icon={item.icon}
          label={item.label}
          active={pathname === item.path && item.id !== 'network'}
          onClick={() => navigate(item.path)}
        />
      ))}
    </nav>
  )
}
