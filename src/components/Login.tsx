import { motion } from 'motion/react';
import { Fingerprint, Smartphone } from 'lucide-react';

export default function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-inverse-surface flex items-center justify-center p-container-margin relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
      
      <div className="max-w-md w-full glass-panel p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full z-0" />
        
        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary-fixed-dim/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Smartphone className="text-primary-fixed-dim" />
            </div>
            <h2 className="font-display text-3xl font-bold text-white">Welcome back</h2>
            <p className="text-white/50">Enter your phone number to continue</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-white/40 border-r border-white/10 pr-3">
                +233
              </div>
              <input 
                type="tel" 
                placeholder="24 000 0000"
                className="w-full bg-white/5 border border-white/10 h-14 rounded-2xl pl-20 pr-4 text-white font-display focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim outline-none transition-all"
              />
            </div>

            <button 
              onClick={onLogin}
              className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-lg hover:shadow-[0_0_20px_rgba(79,55,138,0.5)] transition-all active:scale-95"
            >
              Continue
            </button>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 w-full">
              <div className="h-[1px] flex-grow bg-white/10" />
              <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Or use</span>
              <div className="h-[1px] flex-grow bg-white/10" />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                <Fingerprint className="text-primary-fixed-dim w-8 h-8" />
              </div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Biometric Login</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
