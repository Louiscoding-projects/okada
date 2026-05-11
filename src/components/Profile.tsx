import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Bell, Shield, Key, HelpCircle, FileText, LogOut, Camera, Moon } from 'lucide-react';

export default function Profile({ onBack, onLogout }: { onBack: () => void, onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-background p-container-margin pt-16">
      <header className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-md p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ArrowLeft onClick={onBack} className="text-primary cursor-pointer" />
          <h2 className="font-display text-lg font-bold uppercase tracking-widest">Account</h2>
        </div>
        <div className="p-2 bg-primary/10 rounded-full">
            <Moon className="w-4 h-4 text-primary" />
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8 mt-4"
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full p-1 border-2 border-primary bg-gradient-to-tr from-primary to-secondary-container">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
                <img 
                  src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=400" 
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-background">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold">Kofi Mensah</h3>
          <p className="text-sm text-black/40">Elite Rider • 4.98 ★ • Accra</p>
        </div>

        <section className="space-y-2">
          <h4 className="font-display font-bold uppercase tracking-widest text-[10px] text-primary ml-4 mb-2">App Settings</h4>
          <SettingsItem icon={<Bell className="w-5 h-5" />} label="Push Notifications" description="Real-time ride updates" active />
          <SettingsItem icon={<Shield className="w-5 h-5" />} label="Location Services" description="High accuracy tracking" active />
          <SettingsItem icon={<Key className="w-5 h-5" />} label="Biometric Login" description="Face ID / Fingerprint" />
        </section>

        <section className="space-y-2">
          <h4 className="font-display font-bold uppercase tracking-widest text-[10px] text-primary ml-4 mb-2">Support & Legal</h4>
          <SettingsLink icon={<HelpCircle className="w-5 h-5" />} label="Help Center" />
          <SettingsLink icon={<FileText className="w-5 h-5" />} label="Terms of Service" />
        </section>

        <button 
          onClick={onLogout}
          className="w-full py-5 bg-error text-white rounded-[24px] font-bold shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </motion.div>
    </div>
  );
}

function SettingsItem({ icon, label, description, active = false }: { icon: React.ReactNode, label: string, description: string, active?: boolean }) {
  return (
    <div className="glass-panel p-4 rounded-[24px] flex items-center justify-between border border-black/5">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-black/5 rounded-2xl">
          {icon}
        </div>
        <div>
          <p className="font-bold text-sm">{label}</p>
          <p className="text-[10px] text-black/40">{description}</p>
        </div>
      </div>
      <div className={`w-12 h-6 rounded-full p-1 transition-colors relative cursor-pointer ${active ? 'bg-primary' : 'bg-black/10'}`}>
        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${active ? 'translate-x-6' : 'translate-x-0'}`} />
      </div>
    </div>
  );
}

function SettingsLink({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="w-full glass-panel p-4 rounded-[24px] flex items-center justify-between border border-black/5 hover:bg-black/5 transition-all">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-black/5 rounded-2xl">
          {icon}
        </div>
        <p className="font-bold text-sm">{label}</p>
      </div>
    </button>
  );
}
