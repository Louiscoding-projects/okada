import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Bell, Globe, Moon, Sun, LogOut, ChevronRight, Shield, CreditCard, CircleHelp, FileText } from 'lucide-react';
import GlassCard from '@/components/okada/GlassCard';
import HexagonAvatar from '@/components/okada/HexagonAvatar';
import BottomNav from '@/components/okada/BottomNav';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { getProfile, updateProfile } from '@/supabase/db/profile';

const menuItems = [
  { icon: CreditCard, label: 'Payment Methods', path: '/payment' },
  { icon: Shield, label: 'Safety', path: null },
  { icon: FileText, label: 'Ride History', path: null },
  { icon: CircleHelp, label: 'Help & Support', path: null },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    if (user?.id) {
      getProfile(user.id).then(setProfile);
    }
  }, [user]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark((prev) => !prev);
  };

  const handleNotifToggle = (val) => {
    setNotifications(val);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  const displayUser = profile || user || {};

  return (
    <div className="min-h-screen bg-background kente-bg pb-24">
      <div className="max-w-lg mx-auto px-5 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 rounded-full border border-primary/30"
            />
            <HexagonAvatar
              src={displayUser.avatar_url || 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop'}
              alt="User"
              size={96}
              glow
            />
          </div>
          <h2 className="text-2xl font-heading font-bold">{displayUser.full_name || 'Loading...'}</h2>
          <p className="text-muted-foreground font-body text-sm">{displayUser.phone || ''}</p>
        </motion.div>
        <GlassCard neon className="mb-4 !p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
              >
                {isDark ? <Moon size={18} className="text-primary-foreground" /> : <Sun size={18} className="text-primary-foreground" />}
              </motion.div>
              <div>
                <p className="font-heading font-semibold text-sm">Dark Mode</p>
                <p className="text-xs text-muted-foreground font-body">{isDark ? 'Interstellar' : 'Pearl White'}</p>
              </div>
            </div>
            <Switch checked={isDark} onCheckedChange={toggleTheme} />
          </div>
        </GlassCard>
        <GlassCard className="mb-4 !p-4" animate={false}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                <Bell size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-sm">Notifications</p>
                <p className="text-xs text-muted-foreground font-body">{notifications ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={handleNotifToggle} />
          </div>
        </GlassCard>
        <GlassCard className="mb-4 !p-4" animate={false}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                <Globe size={18} className="text-secondary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-sm">Language</p>
                <p className="text-xs text-muted-foreground font-body">English</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </div>
        </GlassCard>
        <div className="space-y-2 mb-8">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => item.path && navigate(item.path)}
              className="w-full text-left"
            >
              <GlassCard className="!p-4 flex items-center justify-between" animate={false}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                    <item.icon size={18} className="text-muted-foreground" />
                  </div>
                  <span className="font-heading font-medium text-sm">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </GlassCard>
            </motion.button>
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSignOut}
          className="w-full py-4 rounded-xl bg-accent/10 text-accent font-heading font-semibold flex items-center justify-center gap-2 min-h-[48px]"
        >
          <LogOut size={18} />
          Sign Out
        </motion.button>
      </div>
      <BottomNav />
    </div>
  );
}
