import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, TrendingUp, Navigation, Clock, User, X, Check, Bike } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import GlassCard from '@/components/okada/GlassCard';
import GradientButton from '@/components/okada/GradientButton';
import PulsingToggle from '@/components/okada/PulsingToggle';
import HexagonAvatar from '@/components/okada/HexagonAvatar';
import { useAuth } from '@/hooks/useAuth';
import { getRiderProfile, updateRiderStatus } from '@/supabase/db/riders';
import { getAvailableTrips, updateTripStatus } from '@/supabase/db/trips';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs font-heading neon-border">
      <p>{label}: <span className="font-bold">GH₵ {payload[0].value}</span></p>
    </div>
  );
};

const weeklyData = [
  { day: 'Mon', amount: 45 },
  { day: 'Tue', amount: 62 },
  { day: 'Wed', amount: 38 },
  { day: 'Thu', amount: 71 },
  { day: 'Fri', amount: 89 },
  { day: 'Sat', amount: 95 },
  { day: 'Sun', amount: 54 },
];

export default function RiderDashboard() {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [requestCountdown, setRequestCountdown] = useState(30);
  const [riderProfile, setRiderProfile] = useState(null);
  const [incomingRequest, setIncomingRequest] = useState(null);
  const [availableTrips, setAvailableTrips] = useState([]);

  useEffect(() => {
    if (!user) return;
    getRiderProfile(user.id).then(({ data }) => {
      if (data) setRiderProfile(data);
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    updateRiderStatus(user.id, isOnline);
    if (isOnline) {
      getAvailableTrips().then(({ data }) => {
        if (data && data.length > 0) {
          setIncomingRequest(data[0]);
          setShowRequest(true);
        }
      });
    } else {
      setShowRequest(false);
    }
  }, [isOnline, user]);

  useEffect(() => {
    if (!showRequest) { setRequestCountdown(30); return; }
    const t = setInterval(() => {
      setRequestCountdown(c => {
        if (c <= 1) { setShowRequest(false); return 30; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [showRequest]);

  const handleAccept = async () => {
    if (incomingRequest && user) {
      await updateTripStatus(incomingRequest.id, 'accepted');
    }
    setShowRequest(false);
  };

  const handleDecline = () => {
    setShowRequest(false);
  };

  return (
    <div className="min-h-screen bg-background kente-bg">
      <div className="max-w-lg mx-auto px-5 pt-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl font-heading font-bold gradient-text">Rider Hub</h1>
            <p className="text-muted-foreground font-body text-sm">
              Welcome back, {riderProfile?.full_name?.split(' ')[0] || 'Rider'}
            </p>
          </div>
          <HexagonAvatar
            src={riderProfile?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'}
            alt="Rider"
            size={48}
          />
        </motion.div>

        <div className="flex justify-center mb-8">
          <PulsingToggle
            active={isOnline}
            onToggle={() => setIsOnline(!isOnline)}
          />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Earnings', value: 'GH₵ 0', icon: DollarSign, color: 'text-primary' },
            { label: 'Trips', value: riderProfile?.total_rides ?? '0', icon: Bike, color: 'text-secondary' },
            { label: 'Rating', value: riderProfile?.rating ?? '—', icon: Clock, color: 'text-accent' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="text-center !p-3" animate={false}>
                <stat.icon size={18} className={`mx-auto mb-1 ${stat.color}`} />
                <p className="font-heading font-bold text-lg">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground font-body">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <GlassCard neon className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold">Weekly Earnings</h3>
            <div className="flex items-center gap-1 text-primary text-sm">
              <TrendingUp size={14} />
              <span className="font-heading font-semibold">+12%</span>
            </div>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar dataKey="amount" fill="url(#bar-gradient)" radius={[6, 6, 0, 0]} maxBarSize={32} />
                <defs>
                  <linearGradient id="bar-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="mb-6" animate={false}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Available Balance</p>
              <p className="text-2xl font-heading font-bold gradient-text">GH₵ 0.00</p>
            </div>
            <GradientButton size="sm" className="text-sm">
              Cash Out
            </GradientButton>
          </div>
        </GlassCard>

        {isOnline && !showRequest && (
          <GradientButton variant="accent" className="w-full flex items-center justify-center gap-2 mb-4" size="lg">
            <Navigation size={18} />
            Navigate to Pickup
          </GradientButton>
        )}
      </div>

      <AnimatePresence>
        {showRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-end justify-center p-4"
          >
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-lg"
            >
              <GlassCard neon className="relative">
                <div className="flex justify-center mb-4">
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" stroke="hsl(var(--muted))" strokeWidth="4" fill="none" />
                      <circle
                        cx="50" cy="50" r="42"
                        stroke="hsl(var(--primary))"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 42}`}
                        strokeDashoffset={2 * Math.PI * 42 * (1 - requestCountdown / 30)}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading font-bold">{requestCountdown}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="font-heading font-bold text-lg">New Ride Request</h3>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <HexagonAvatar
                    src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop"
                    alt="Passenger"
                    size={48}
                  />
                  <div>
                    <p className="font-heading font-semibold">Passenger</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User size={10} />
                      New request
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="font-heading font-bold text-lg gradient-text">
                      GH₵ {incomingRequest?.fare || '—'}
                    </p>
                  </div>
                </div>

                <GlassCard animate={false} className="!p-3 mb-4 text-sm">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <p className="font-body">{incomingRequest?.pickup_address || '—'}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    <p className="font-body">{incomingRequest?.dropoff_address || '—'}</p>
                  </div>
                </GlassCard>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDecline}
                    className="py-3 rounded-xl glass border border-accent/30 text-accent font-heading font-semibold flex items-center justify-center gap-2 min-h-[48px]"
                  >
                    <X size={18} />
                    Decline
                  </motion.button>
                  <GradientButton onClick={handleAccept} className="flex items-center justify-center gap-2">
                    <Check size={18} />
                    Accept
                  </GradientButton>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
