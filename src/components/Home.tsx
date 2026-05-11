import React from 'react';
import { Menu, Home as HomeIcon, Compass, Wallet as WalletIcon, User, Search, Mic, MapPin, Navigation, Star, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="fixed top-0 w-full z-40 bg-white/70 backdrop-blur-xl border-b border-black/5 flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-3">
          <Menu className="text-primary w-6 h-6" />
          <h1 className="font-display text-xl font-bold tracking-widest text-primary uppercase">OKADA</h1>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden cursor-pointer" onClick={() => onNavigate('profile')}>
          <img 
            src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=400" 
            alt="Profile" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      {/* Map Content */}
      <main className="flex-1 relative pt-16">
        <div className="absolute inset-0 bg-[#f0f4ff]">
          <img 
            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover opacity-60 grayscale brightness-110"
            alt="Accra Map"
            referrerPolicy="no-referrer"
          />
          
          {/* Mock Bike Pins */}
          <div className="absolute top-[30%] left-[20%] w-6 h-6 bg-primary rounded-full border-2 border-white flex items-center justify-center animate-bounce shadow-lg">
             <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <div className="absolute top-[50%] right-[30%] w-6 h-6 bg-primary rounded-full border-2 border-white flex items-center justify-center shadow-lg">
             <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>

        {/* Search Panel */}
        <div className="absolute bottom-0 w-full z-30 px-4 pb-28">
           <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-panel p-6 rounded-[32px] shadow-2xl relative overflow-hidden bg-white/80"
           >
              <div className="flex items-center gap-3 bg-black/5 rounded-2xl p-4 mb-6 border border-black/5">
                <Search className="text-primary w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  className="bg-transparent border-none flex-grow outline-none font-display font-bold text-lg placeholder:text-black/30"
                />
                <Mic className="text-primary w-5 h-5" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-start p-4 bg-secondary-container/20 rounded-[24px] border border-primary/5 hover:bg-secondary-container/40 transition-all">
                  <div className="p-2 bg-primary/10 rounded-lg mb-2">
                    <HomeIcon className="text-primary w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm block">Home</span>
                  <span className="text-[10px] text-black/40">Airport Residential</span>
                </button>
                <button className="flex flex-col items-start p-4 bg-tertiary-container/10 rounded-[24px] border border-primary/5 hover:bg-tertiary-container/30 transition-all">
                  <div className="p-2 bg-tertiary-container/20 rounded-lg mb-2">
                    <Navigation className="text-tertiary w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm block">Work</span>
                  <span className="text-[10px] text-black/40">Independence Sq.</span>
                </button>
              </div>
           </motion.div>
        </div>

        <button className="absolute bottom-32 right-4 w-12 h-12 bg-error rounded-full shadow-lg flex items-center justify-center text-white active:scale-95 transition-transform">
          <ShieldAlert className="w-6 h-6" />
        </button>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full z-40 bg-white/80 backdrop-blur-xl border-t border-black/5 h-20 flex justify-around items-center px-4 pb-safe">
        <NavButton active icon={<div className="w-6 h-6 flex items-center justify-center"><Navigation className="w-5 h-5" /></div>} label="Ride" />
        <NavButton icon={<Compass className="w-5 h-5" />} label="Explore" />
        <NavButton onClick={() => onNavigate('wallet')} icon={<WalletIcon className="w-5 h-5" />} label="Wallet" />
        <NavButton onClick={() => onNavigate('profile')} icon={<User className="w-5 h-5" />} label="Account" />
      </nav>
    </div>
  );
}

function NavButton({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 transition-all ${active ? 'text-primary scale-110' : 'text-black/30'}`}>
      {icon}
      <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}
