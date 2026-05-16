export default function GlassCard({ children, className = '', style = {}, topAccent = true }) {
  return (
    <div
      className={`rounded-3xl relative overflow-hidden ${className}`}
      style={{
        backdropFilter: 'blur(20px)',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        ...style,
      }}
    >
      {topAccent && (
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />
      )}
      {children}
    </div>
  )
}
