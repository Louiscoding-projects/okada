const CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

export default function HexagonAvatar({ src, alt = 'Avatar', size = 80, glowColor = '#00f3ff' }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 opacity-50"
        style={{
          clipPath: CLIP,
          background: `linear-gradient(135deg, ${glowColor}, #ff00ff)`,
          filter: `blur(${Math.round(size * 0.12)}px)`,
          transform: 'scale(1.15)',
        }}
      />
      <div className="relative w-full h-full" style={{ clipPath: CLIP }}>
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${glowColor}33, #ff00ff33)` }}
          >
            <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: size * 0.45 }}>
              person
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
