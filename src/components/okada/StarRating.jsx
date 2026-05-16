import { useState } from 'react'

export default function StarRating({ value = 0, max = 5, interactive = false, onRate, size = 24 }) {
  const [hovered, setHovered] = useState(0)
  const display = hovered || value

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < display
        return (
          <button
            key={i}
            disabled={!interactive}
            onClick={() => interactive && onRate?.(i + 1)}
            onMouseEnter={() => interactive && setHovered(i + 1)}
            onMouseLeave={() => interactive && setHovered(0)}
            className="transition-transform hover:scale-110 disabled:cursor-default"
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: size,
                color: filled ? '#ffc107' : 'var(--color-outline)',
                fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              star
            </span>
          </button>
        )
      })}
    </div>
  )
}
