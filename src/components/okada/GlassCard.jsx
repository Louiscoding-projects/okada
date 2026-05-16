import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function GlassCard({ children, className, neon, animate = true, ...props }) {
  const Comp = animate ? motion.div : 'div';
  const animProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
    whileHover: { y: -2, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' },
  } : {};

  return (
    <Comp
      className={cn(
        'glass rounded-2xl p-5 transition-all duration-300',
        neon && 'neon-border',
        className
      )}
      {...animProps}
      {...props}
    >
      {children}
    </Comp>
  );
}
