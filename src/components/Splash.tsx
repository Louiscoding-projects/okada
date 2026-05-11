import { motion } from 'motion/react';

export default function Splash({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-inverse-surface flex flex-col items-center justify-center z-50 overflow-hidden"
      onAnimationComplete={() => {
        setTimeout(onComplete, 2000);
      }}
    >
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 glass-panel rounded-[40px] flex items-center justify-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 holographic-shimmer opacity-20" />
          <svg className="w-20 h-20 text-primary-fixed-dim" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
          </svg>
        </div>
        <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full z-[-1] animate-pulse" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-display text-4xl font-bold tracking-[0.3em] text-primary-fixed-dim uppercase mb-2">
          OKADA
        </h1>
        <p className="font-display text-[10px] tracking-[0.5em] text-white/40 uppercase">
          Street-Smart Mobility
        </p>
      </motion.div>

      <div className="absolute bottom-12 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary-fixed-dim to-transparent"
        />
      </div>
    </motion.div>
  );
}
