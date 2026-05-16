import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Navigation, Wallet, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/tracking', icon: Navigation, label: 'Rides' },
  { path: '/payment', icon: Wallet, label: 'Pay' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/50 safe-area-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center gap-0.5 min-w-[48px] min-h-[48px] justify-center"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-2 w-8 h-1 rounded-full bg-gradient-to-r from-primary to-secondary"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                size={22}
                className={cn(
                  'transition-all duration-300',
                  isActive
                    ? 'text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]'
                    : 'text-muted-foreground'
                )}
              />
              <span className={cn(
                'text-[10px] font-body transition-colors',
                isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
