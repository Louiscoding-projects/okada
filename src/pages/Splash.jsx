import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Bike } from 'lucide-react';

export default function Splash() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => {
      const onboarded = localStorage.getItem('okada-onboarded');
      navigate(onboarded ? '/home' : '/onboarding', { replace: true });
    }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background kente-bg overflow-hidden relative">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.5, 2], opacity: [0, 0.3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        className="absolute w-48 h-48 rounded-full border-2 border-primary"
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.3, 1.8], opacity: [0, 0.2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
        className="absolute w-48 h-48 rounded-full border-2 border-secondary"
      />
      <div className="flex flex-col items-center z-10">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative mb-8"
        >
          <svg width="140" height="140" viewBox="0 0 140 140">
            <defs>
              <linearGradient id="hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))' }} />
              </linearGradient>
            </defs>
            <polygon
              points="70,5 130,35 130,105 70,135 10,105 10,35"
              fill="none"
              stroke="url(#hex-grad)"
              strokeWidth="3"
              className="drop-shadow-[0_0_20px_hsl(var(--primary))]"
            />
          </svg>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Bike size={48} className="text-primary drop-shadow-[0_0_15px_hsl(var(--primary))]" />
          </motion.div>
        </motion.div>
        <AnimatePresence>
          {phase >= 1 && (
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-heading font-bold tracking-wider gradient-text"
            >
              OKADA
            </motion.h1>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {phase >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-muted-foreground font-body text-sm mt-2 tracking-widest uppercase"
            >
              Ride the Future
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
