import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, X, Navigation, Star, Clock, Bike } from 'lucide-react';
import GlassCard from '@/components/okada/GlassCard';
import GradientButton from '@/components/okada/GradientButton';
import HexagonAvatar from '@/components/okada/HexagonAvatar';
import BottomNav from '@/components/okada/BottomNav';

export default function RideTracking() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(180);
  const [ridePhase, setRidePhase] = useState('arriving');

  useEffect(() => {
    if (ridePhase !== 'arriving') return;
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          setRidePhase('in_progress');
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [ridePhase]);

  useEffect(() => {
    if (ridePhase === 'in_progress') {
      const t = setTimeout(() => {
        navigate('/ride-complete', { replace: true });
      }, 8000);
      return () => clearTimeout(t);
    }
  }, [ridePhase, navigate]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const progress = ridePhase === 'arriving' ? (180 - countdown) / 180 : 1;

  const driver = {
    name: 'Kofi Mensah',
    model: 'Honda ACE 125',
    plate: 'GR-1234-21',
    rating: 4.9,
    trips: 2847,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 kente-bg">
        <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="route-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))' }} />
            </linearGradient>
            <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="400" height="600" fill="url(#grid2)" />
          <motion.path
            d="M 100 450 C 150 400 180 350 200 280 C 220 210 260 180 300 150"
            stroke="url(#route-grad)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="10 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress }}
            transition={{ duration: 1 }}
          />
          <circle cx="100" cy="450" r="8" fill="hsl(var(--primary))" opacity="0.6" />
          <circle cx="100" cy="450" r="4" fill="hsl(var(--primary))" />
          <circle cx="300" cy="150" r="8" fill="hsl(var(--accent))" opacity="0.6" />
          <circle cx="300" cy="150" r="4" fill="hsl(var(--accent))" />
        </svg>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/10"
        />
      </div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 p-4 pt-6"
      >
        <GlassCard neon className="!p-3 flex items-center gap-3" animate={false}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
            {ridePhase === 'arriving' ? (
              <Clock size={18} className="text-primary-foreground" />
            ) : (
              <Bike size={18} className="text-primary-foreground" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-heading font-bold text-sm">
              {ridePhase === 'arriving' ? 'Rider is on the way' : 'Ride in progress'}
            </p>
            <p className="text-xs text-muted-foreground font-body">
              {ridePhase === 'arriving' ? `Arriving in ${minutes}:${seconds.toString().padStart(2, '0')}` : 'Enjoy your ride'}
            </p>
          </div>
        </GlassCard>
      </motion.div>

      <div className="fixed bottom-20 left-0 right-0 z-40 px-4 max-w-lg mx-auto">
        <GlassCard neon>
          <div className="flex items-center gap-4 mb-4">
            <HexagonAvatar src={driver.avatar} alt={driver.name} size={60} glow />
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-bold text-lg truncate">{driver.name}</h3>
              <p className="text-sm text-muted-foreground font-body">{driver.model}</p>
              <p className="text-xs text-muted-foreground font-body">{driver.plate}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="flex items-center gap-1 justify-end mb-1">
                <Star size={14} className="fill-primary text-primary" />
                <span className="font-heading font-bold">{driver.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">{driver.trips} trips</p>
            </div>
          </div>

          {ridePhase === 'arriving' && (
            <div className="flex justify-center mb-4">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="hsl(var(--muted))" strokeWidth="4" fill="none" />
                  <motion.circle
                    cx="50" cy="50" r="42"
                    stroke="url(#ring-grad)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={2 * Math.PI * 42 * (1 - progress)}
                  />
                  <defs>
                    <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%">
                      <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                      <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))' }} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading font-bold text-sm">{minutes}:{seconds.toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <GradientButton variant="glass" className="flex items-center justify-center gap-2 text-sm">
              <X size={16} className="text-accent" />
              Cancel
            </GradientButton>
            <GradientButton variant="glass" className="flex items-center justify-center gap-2 text-sm">
              <Phone size={16} className="text-primary" />
              Call
            </GradientButton>
          </div>
        </GlassCard>
      </div>

      <BottomNav />
    </div>
  );
}
