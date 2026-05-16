import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function GradientButton({ children, className, variant = 'primary', size = 'default', ...props }) {
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-primary-foreground',
    accent: 'bg-gradient-to-r from-accent to-secondary text-accent-foreground',
    glass: 'glass neon-border text-foreground',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    default: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'rounded-xl font-heading font-semibold transition-all duration-300 min-h-[48px] min-w-[48px]',
        'shadow-lg hover:shadow-xl active:shadow-md',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
