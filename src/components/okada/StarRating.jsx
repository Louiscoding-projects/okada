import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StarRating({ rating, setRating, size = 32, interactive = true }) {
  return (
    <div className="flex gap-1.5 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          disabled={!interactive}
          whileHover={interactive ? { scale: 1.2 } : {}}
          whileTap={interactive ? { scale: 0.9 } : {}}
          onClick={() => interactive && setRating?.(star)}
          className="focus:outline-none"
        >
          <Star
            size={size}
            className={cn(
              'transition-all duration-200',
              star <= rating
                ? 'fill-primary text-primary drop-shadow-[0_0_6px_hsl(var(--primary))]'
                : 'text-muted-foreground/30'
            )}
          />
        </motion.button>
      ))}
    </div>
  );
}
