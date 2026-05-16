import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Bike, Smartphone, MapPin, ChevronRight } from 'lucide-react';
import GradientButton from '@/components/okada/GradientButton';

const slides = [
  {
    icon: Bike,
    title: 'Fast & Safe Rides',
    subtitle: 'Get picked up in minutes by trusted Okada riders across Ghana.',
    color: 'from-primary to-secondary',
  },
  {
    icon: Smartphone,
    title: 'Mobile Money Ready',
    subtitle: 'Pay seamlessly with MTN MoMo, Telecel Cash, or AirtelTigo Money.',
    color: 'from-secondary to-accent',
  },
  {
    icon: MapPin,
    title: 'Live GPS Tracking',
    subtitle: 'Track your ride in real-time with our advanced mapping technology.',
    color: 'from-primary to-accent',
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current === slides.length - 1) {
      localStorage.setItem('okada-onboarded', 'true');
      navigate('/login', { replace: true });
    } else {
      setCurrent(c => c + 1);
    }
  };

  const skip = () => {
    localStorage.setItem('okada-onboarded', 'true');
    navigate('/login', { replace: true });
  };

  const slide = slides[current];

  return (
    <div className="min-h-screen flex flex-col bg-background kente-bg relative overflow-hidden">
      <div className="flex justify-end p-6">
        <button onClick={skip} className="text-muted-foreground font-body text-sm hover:text-foreground transition-colors">
          Skip
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${slide.color} flex items-center justify-center mb-10 glow-primary`}>
              <div className="w-32 h-32 rounded-full glass flex items-center justify-center">
                <slide.icon size={56} className="text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              {slide.title}
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed">
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-2.5 mt-12 mb-8">
          {slides.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === current ? 32 : 10,
                backgroundColor: i === current ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
              }}
              className="h-2.5 rounded-full glass cursor-pointer"
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        <GradientButton onClick={next} className="w-full max-w-xs flex items-center justify-center gap-2" size="lg">
          {current === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight size={20} />
        </GradientButton>
      </div>
    </div>
  );
}
