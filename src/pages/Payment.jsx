import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, Plus, Banknote, CheckCircle2 } from 'lucide-react';
import GlassCard from '@/components/okada/GlassCard';
import GradientButton from '@/components/okada/GradientButton';
import BottomNav from '@/components/okada/BottomNav';
import { useAuth } from '@/hooks/useAuth';

const PAYMENT_METHODS = [
  { id: 'mtn-momo', type: 'mobile_money', label: 'MTN MoMo', number: '**** 1234', icon: '📱', gradient: 'from-yellow-400 to-yellow-600' },
  { id: 'telecel-cash', type: 'mobile_money', label: 'Telecel Cash', number: '**** 5678', icon: '📱', gradient: 'from-red-400 to-red-600' },
  { id: 'airteltigo', type: 'mobile_money', label: 'AirtelTigo Money', number: '**** 9012', icon: '📱', gradient: 'from-blue-400 to-blue-600' },
  { id: 'cash', type: 'cash', label: 'Cash', number: 'Pay rider directly', icon: '💵', gradient: 'from-green-400 to-green-600' },
];

export default function Payment() {
  const { user } = useAuth();
  const [selected, setSelected] = useState('mtn-momo');

  const mobileMethods = PAYMENT_METHODS.filter((m) => m.type === 'mobile_money');
  const cashMethod = PAYMENT_METHODS.find((m) => m.type === 'cash');

  return (
    <div className="min-h-screen bg-background kente-bg pb-24">
      <div className="max-w-lg mx-auto px-5 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold gradient-text">Payment</h1>
          <p className="text-muted-foreground font-body mt-1">Choose your payment method</p>
        </motion.div>

        <GlassCard neon className="mb-6 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Wallet size={18} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Wallet Balance</p>
                <p className="text-2xl font-heading font-bold">GH₵ 0.00</p>
              </div>
            </div>
            <GradientButton size="sm" className="text-xs flex items-center gap-1.5">
              <Plus size={14} />
              Add Money
            </GradientButton>
          </div>
        </GlassCard>

        <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
          Mobile Money
        </h3>
        <div className="space-y-3 mb-6">
          {mobileMethods.map((method, i) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <button onClick={() => setSelected(method.id)} className="w-full text-left">
                <GlassCard
                  animate={false}
                  neon={selected === method.id}
                  className={`!p-4 flex items-center gap-4 transition-all ${selected === method.id ? 'glow-primary' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center text-xl flex-shrink-0`}>
                    {method.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold">{method.label}</p>
                    <p className="text-sm text-muted-foreground font-body">{method.number}</p>
                  </div>
                  {selected === method.id && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex-shrink-0">
                      <CheckCircle2 size={24} className="text-primary" />
                    </motion.div>
                  )}
                </GlassCard>
              </button>
            </motion.div>
          ))}
        </div>

        <button onClick={() => setSelected(cashMethod.id)} className="w-full text-left mb-6">
          <GlassCard
            animate={false}
            neon={selected === cashMethod.id}
            className={`!p-4 flex items-center gap-4 ${selected === cashMethod.id ? 'glow-primary' : ''}`}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
              <Banknote size={22} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-heading font-semibold">Cash</p>
              <p className="text-sm text-muted-foreground font-body">Pay rider directly</p>
            </div>
            {selected === cashMethod.id && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <CheckCircle2 size={24} className="text-primary" />
              </motion.div>
            )}
          </GlassCard>
        </button>

        <GradientButton className="w-full flex items-center justify-center gap-2" size="lg">
          <CheckCircle2 size={18} />
          Confirm Payment Method
        </GradientButton>
      </div>

      <BottomNav />
    </div>
  );
}
