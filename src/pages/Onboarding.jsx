import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'

const slides = [
  {
    title: ['Ride the', 'Future'],
    subtitle: 'Premium motorcycle hailing at light speed. Experience the pulse of Accra like never before.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCZHbSpkhb_QI5Ua4pTHwtqJNQcMR3G72awSW3oYNLqkYk7BLNS_4SbuXphO_fxtCqgsxX3wwq_Ped7Bs3ItCxnu5-U5TvIlz2aN4agjPgGx2303fN3j4MmJYvDYlJeAcNxi0iDTrQrRmaHfTFuO2ySFUpJ9hvxmThYEPf3TE1bqD-j2ZUNlh237iRbF1n9SZ-L2fkyswr0D7VoZCtI6ASXw98YH2Y9CH-ZOR6ZDvAhafDIuoi5wdDxGr0qywEsjJu5kRZVc4zBusj',
    icon: 'moped',
    accent: '#00f3ff',
  },
  {
    title: ['Book in', 'Seconds'],
    subtitle: 'Find a nearby rider and book instantly with one tap. Real-time tracking at your fingertips.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800',
    icon: 'schedule',
    accent: '#d0bcff',
  },
  {
    title: ['Arrive', 'Safely'],
    subtitle: 'Every ride is insured and monitored end-to-end. Your safety is our top priority.',
    image: 'https://images.unsplash.com/photo-1476994230281-58d8e3a2d6a4?auto=format&fit=crop&q=80&w=800',
    icon: 'verified_user',
    accent: '#ff00ff',
  },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (next) => {
    setDir(next > index ? 1 : -1)
    setIndex(next)
  }

  const advance = () => {
    if (index < slides.length - 1) {
      go(index + 1)
    } else {
      localStorage.setItem('onboardingComplete', '1')
      navigate('/login')
    }
  }

  const skip = () => {
    localStorage.setItem('onboardingComplete', '1')
    navigate('/login')
  }

  const slide = slides[index]

  return (
    <div className="min-h-screen bg-background overflow-hidden relative flex flex-col items-center justify-between px-5 py-8">
      {/* Ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ backgroundColor: slide.accent + '18' }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl"
        />
      </div>

      <div
        className="fixed top-0 left-0 w-full z-20 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${slide.accent}80, transparent)` }}
      />

      {/* Header */}
      <header className="relative z-10 w-full flex justify-between items-center">
        <span className="font-display text-2xl font-bold text-primary tracking-[0.2em] uppercase">OKADA</span>
        <button
          className="text-[10px] font-bold tracking-widest text-on-surface-variant hover:text-primary transition-colors uppercase px-3 py-1.5 rounded-full"
          style={{ border: '1px solid var(--glass-border)', background: 'var(--glass-bg-card)' }}
          onClick={skip}
        >
          SKIP
        </button>
      </header>

      {/* Hero image */}
      <div className="relative z-10 w-full max-w-md aspect-square flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className="relative z-10 w-full h-full p-6"
          >
            <div
              className="absolute inset-6 rounded-2xl blur-2xl opacity-20"
              style={{ backgroundColor: slide.accent }}
            />
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover rounded-2xl border border-white/10 relative z-10"
              style={{ boxShadow: `0 0 40px ${slide.accent}33` }}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Glass card */}
      <div
        className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          backdropFilter: 'blur(20px)',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: `linear-gradient(to right, transparent, ${slide.accent}66, transparent)` }}
        />

        <div className="p-6 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${index}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
            >
              <h1 className="font-display text-[32px] leading-tight font-bold text-on-surface mb-2">
                {slide.title[0]}{' '}
                <span style={{ color: slide.accent }}>{slide.title[1]}</span>
              </h1>
              <p className="text-base text-on-surface-variant leading-relaxed">{slide.subtitle}</p>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex gap-2 mt-1">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? '2rem' : '0.375rem',
                  backgroundColor: i === index ? slide.accent : '#49454f',
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between mt-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={advance}
              className="px-8 py-4 rounded-xl font-display font-bold text-xs tracking-widest uppercase flex items-center gap-2 group transition-all"
              style={{
                backgroundColor: slide.accent,
                color: '#0a0a0c',
                boxShadow: `0 0 20px ${slide.accent}55`,
              }}
            >
              {index === slides.length - 1 ? 'GET STARTED' : 'NEXT'}
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </motion.button>

            <div
              className="w-12 h-12 flex items-center justify-center rounded-xl"
              style={{ border: `1px solid ${slide.accent}44`, background: `${slide.accent}11` }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: slide.accent, fontVariationSettings: "'FILL' 1" }}
              >
                {slide.icon}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-2" />
    </div>
  )
}
