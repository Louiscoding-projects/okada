import { motion } from 'motion/react';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

export default function Onboarding({ onNext }: { onNext: () => void }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-container-margin pt-20 pb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full aspect-square max-w-sm mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary-container/20 rounded-full blur-3xl animate-pulse" />
        <div className="relative z-10 w-full h-full rounded-[48px] overflow-hidden glass-panel shadow-2xl p-4">
          <img 
            src="https://images.unsplash.com/photo-1558981403-c5f919128ef1?auto=format&fit=crop&q=80&w=800" 
            alt="Futuristic Ride"
            className="w-full h-full object-cover rounded-[36px]"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      <div className="w-full max-w-md space-y-6 z-10">
        <div className="space-y-2">
          <h2 className="font-display text-5xl font-bold text-on-background leading-[0.9]">
            Ride the <br/>
            <span className="text-primary">Future</span>
          </h2>
          <p className="text-on-surface-variant text-lg pr-12">
            Experience the next generation of urban mobility in Accra.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-4 rounded-3xl bg-secondary-container/30">
            <Zap className="text-primary mb-2 w-5 h-5" />
            <p className="font-display font-bold text-sm">15m Avg</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Speed</p>
          </div>
          <div className="glass-panel p-4 rounded-3xl">
            <Shield className="text-primary mb-2 w-5 h-5" />
            <p className="font-display font-bold text-sm">High Security</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Safety</p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full h-16 bg-primary text-white rounded-[24px] flex items-center justify-between px-8 text-lg font-bold group shadow-xl hover:shadow-primary/20 transition-all"
        >
          <span>Get Started</span>
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </div>
  );
}
