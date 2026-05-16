import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, MapPin, Clock, Route } from 'lucide-react';
import GlassCard from '@/components/okada/GlassCard';
import GradientButton from '@/components/okada/GradientButton';
import StarRating from '@/components/okada/StarRating';
import HexagonAvatar from '@/components/okada/HexagonAvatar';
import { getTrip } from '@/supabase/db/trips';
import { createPayment } from '@/supabase/db/payments';

const tipOptions = [0, 2, 5, 10];

export default function RideComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const tripId = location.state?.tripId;
  const [rating, setRating] = useState(0);
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    if (tripId) {
      getTrip(tripId).then(setTrip);
    }
  }, [tripId]);

  const handleDone = async () => {
    const tipAmount = customTip ? parseFloat(customTip) : tip;
    if (tipAmount > 0 && tripId) {
      await createPayment({ trip_id: tripId, amount: tipAmount, method: 'cash', status: 'completed' });
    }
    navigate('/home', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background kente-bg flex flex-col">
      <div className="flex-1 max-w-lg mx-auto px-5 pt-8 pb-8 w-full flex flex-col">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative mb-4">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 w-20 h-20 rounded-full bg-primary"
            />
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary relative z-10">
              <CheckCircle2 size={36} className="text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-heading font-bold mb-1">Ride Complete!</h1>
          <p className="text-muted-foreground font-body text-sm">Thanks for riding with Okada</p>
        </motion.div>

        <GlassCard neon className="mb-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
            <HexagonAvatar
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
              alt="Driver"
              size={48}
            />
            <div>
              <p className="font-heading font-semibold">Your Driver</p>
              <p className="text-xs text-muted-foreground font-body">Okada Rider</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Pickup</p>
                <p className="text-sm font-body">{trip?.pickup_address || '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-accent flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Drop-off</p>
                <p className="text-sm font-body">{trip?.dropoff_address || '—'}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
            <span className="font-heading font-semibold text-muted-foreground">Total</span>
            <span className="text-2xl font-heading font-bold gradient-text">
              GH₵ {trip?.fare?.toFixed(2) || '—'}
            </span>
          </div>
        </GlassCard>

        <GlassCard className="mb-6 text-center">
          <p className="font-heading font-semibold mb-3">Rate your ride</p>
          <div className="flex justify-center">
            <StarRating rating={rating} setRating={setRating} size={36} />
          </div>
        </GlassCard>

        <GlassCard className="mb-6">
          <p className="font-heading font-semibold mb-3">Add a tip</p>
          <div className="flex gap-2 flex-wrap">
            {tipOptions.map((amount) => (
              <motion.button
                key={amount}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setTip(amount); setCustomTip(''); }}
                className={`px-4 py-2 rounded-xl font-heading text-sm min-h-[44px] transition-all ${
                  tip === amount && !customTip
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground glow-primary'
                    : 'glass neon-border'
                }`}
              >
                {amount === 0 ? 'No Tip' : `GH₵ ${amount}`}
              </motion.button>
            ))}
            <input
              type="number"
              placeholder="Custom"
              value={customTip}
              onChange={(e) => { setCustomTip(e.target.value); setTip(-1); }}
              className="px-4 py-2 rounded-xl glass neon-border font-heading text-sm w-24 bg-transparent focus:outline-none min-h-[44px]"
            />
          </div>
        </GlassCard>

        <div className="mt-auto">
          <GradientButton onClick={handleDone} className="w-full" size="lg">
            Done
          </GradientButton>
        </div>
      </div>
    </div>
  );
}
