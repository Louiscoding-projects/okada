import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Mic, Home as HomeIcon, Briefcase, Shield, Star, Clock, ChevronUp, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/okada/GlassCard';
import GradientButton from '@/components/okada/GradientButton';
import HexagonAvatar from '@/components/okada/HexagonAvatar';
import BottomNav from '@/components/okada/BottomNav';
import { getOnlineRiders } from '@/supabase/db/riders';
import { createTrip } from '@/supabase/db/trips';
import { useAuth } from '@/hooks/useAuth';

export default function PassengerHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [destination, setDestination] = useState('');
  const [nearbyDrivers, setNearbyDrivers] = useState([]);

  useEffect(() => {
    getOnlineRiders().then(({ data }) => {
      if (data) setNearbyDrivers(data);
    });
  }, []);

  const requestRide = async () => {
    if (!destination || !user) return;
    await createTrip({
      passenger_id: user.id,
      pickup_address: 'Current Location',
      dropoff_address: destination,
      status: 'requested',
    });
    navigate('/ride-tracking');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Map placeholder */}
      <div className="absolute inset-0">
        <div className="w-full h-full kente-bg relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
          <svg className="w-full h-full opacity-10" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary"/>
              </pattern>
            </defs>
            <rect width="400" height="600" fill="url(#grid)" />
            <path d="M 50 0 L 200 300 L 350 600" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.3" />
            <path d="M 0 200 L 400 250" stroke="hsl(var(--secondary))" strokeWidth="2" fill="none" opacity="0.3" />
            <path d="M 100 0 L 300 600" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" opacity="0.2" />
          </svg>

          {[
            { x: '30%', y: '25%' },
            { x: '60%', y: '40%' },
            { x: '45%', y: '55%' },
            { x: '75%', y: '30%' },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 * i, type: 'spring' }}
              className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2"
              style={{ left: pos.x, top: pos.y }}
            >
              <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center pulse-glow">
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-accent glow-accent flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-6 right-6 z-30 w-12 h-12 rounded-full glass neon-border flex items-center justify-center"
      >
        <Shield size={20} className="text-primary" />
      </motion.button>

      <motion.div
        initial={{ y: '60%' }}
        animate={{ y: sheetExpanded ? '5%' : '45%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-40 max-w-lg mx-auto"
        style={{ height: '95vh' }}
      >
        <div className="h-full glass-strong rounded-t-3xl p-5 flex flex-col overflow-hidden">
          <button onClick={() => setSheetExpanded(!sheetExpanded)} className="flex justify-center mb-4 w-full py-2 min-h-[48px]">
            <motion.div animate={{ rotate: sheetExpanded ? 180 : 0 }}>
              <ChevronUp size={20} className="text-muted-foreground" />
            </motion.div>
          </button>

          <GlassCard neon className="mb-4 !p-3" animate={false}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <Search size={18} className="text-primary-foreground" />
              </div>
              <input
                type="text"
                placeholder="Where to?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="flex-1 bg-transparent font-heading text-lg placeholder:text-muted-foreground focus:outline-none"
              />
              <button className="w-10 h-10 rounded-xl glass flex items-center justify-center flex-shrink-0 min-w-[48px] min-h-[48px]">
                <Mic size={18} className="text-secondary" />
              </button>
            </div>
          </GlassCard>

          <div className="flex gap-2 mb-4">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass neon-border text-sm font-body min-h-[44px]">
              <HomeIcon size={14} className="text-primary" />
              Home
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass neon-border text-sm font-body min-h-[44px]">
              <Briefcase size={14} className="text-secondary" />
              Work
            </button>
          </div>

          {destination && (
            <GradientButton onClick={requestRide} className="w-full mb-4 flex items-center justify-center gap-2" size="lg">
              <MapPin size={18} />
              Request Okada
            </GradientButton>
          )}

          <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
            Nearby Riders
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 pb-20">
            {nearbyDrivers.map((driver, i) => (
              <motion.div
                key={driver.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="!p-3 flex items-center gap-3" animate={false}>
                  <HexagonAvatar src={driver.avatar_url} alt={driver.full_name} size={48} />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-sm truncate">{driver.full_name}</p>
                    <p className="text-xs text-muted-foreground font-body">{driver.vehicle_type}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 justify-end">
                      <Star size={12} className="fill-primary text-primary" />
                      <span className="text-sm font-heading font-semibold">{driver.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={10} />
                      {driver.eta || '3 min'}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
