import { motion } from 'motion/react';
import { CreditCard, MoreHorizontal, ArrowLeft, ArrowUpRight, TrendingUp } from 'lucide-react';

export default function Wallet({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background p-container-margin pt-16">
      <header className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-md p-4 flex items-center gap-4">
        <ArrowLeft onClick={onBack} className="text-primary cursor-pointer" />
        <h2 className="font-display text-lg font-bold uppercase tracking-widest">My Wallet</h2>
      </header>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="space-y-8 mt-4"
      >
        {/* Balance Card */}
        <div className="holographic-shimmer rounded-[32px] p-8 bg-primary text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60 mb-2">Available Balance</p>
          <h3 className="text-4xl font-display font-bold">GHS 842.50</h3>
          <div className="mt-8 flex justify-between items-end">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <TrendingUp className="w-3 h-3" />
              Elite Rewards
            </div>
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <section className="space-y-4">
          <h4 className="font-display font-bold uppercase tracking-widest text-[10px] text-primary">Mobile Money Providers</h4>
          
          {[
            { name: 'MTN Mobile Money', icon: 'M', color: 'bg-yellow-400', number: '054 **** 882', active: true },
            { name: 'Telecel Cash', icon: 'T', color: 'bg-red-600', number: '020 **** 415' },
            { name: 'AT Money', icon: 'A', color: 'bg-blue-600', number: '026 **** 991' }
          ].map((item, i) => (
            <div key={i} className={`glass-panel p-4 rounded-3xl flex items-center justify-between border-2 transition-all ${item.active ? 'border-primary shadow-lg scale-[1.02]' : 'border-black/5 hover:bg-black/5'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white text-xl font-bold`}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-sm tracking-tight">{item.name}</p>
                  <p className="text-[10px] text-black/40">{item.number}</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.active ? 'bg-primary border-primary' : 'border-black/10'}`}>
                {item.active && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </div>
          ))}
        </section>

        <button className="w-full py-5 bg-black text-white rounded-[24px] font-bold shadow-xl active:scale-[0.98] transition-all">
          Link New Provider
        </button>
      </motion.div>
    </div>
  );
}
