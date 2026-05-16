import { motion } from 'motion/react'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ y: '-2px' }}
          animate={{ y: '100vh' }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear', repeatDelay: 2 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
