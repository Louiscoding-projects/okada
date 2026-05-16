import React from 'react';
import { motion } from 'motion/react';
import { Bike } from 'lucide-react';

export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="relative"
      >
        <div className="w-16 h-16 rounded-full border-2 border-transparent border-t-primary border-r-secondary glow-primary" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Bike className="w-6 h-6 text-primary" />
        </div>
      </motion.div>
      <p className="text-sm text-muted-foreground font-body">{text}</p>
    </div>
  );
}
