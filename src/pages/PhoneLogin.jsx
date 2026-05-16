import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, Fingerprint, ChevronRight } from 'lucide-react';
import GlassCard from '@/components/okada/GlassCard';
import GradientButton from '@/components/okada/GradientButton';
import { Input } from '@/components/ui/input';
import { signInWithPhone, verifyOTP } from '@/supabase/auth';

export default function PhoneLogin() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('+233 ');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    if (phone.replace(/\s/g, '').length < 10) return;
    setLoading(true);
    setError('');
    try {
      await signInWithPhone(phone);
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (otp.length < 6) return;
    setLoading(true);
    setError('');
    try {
      await verifyOTP(phone, otp);
      navigate('/home', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background kente-bg">
      <div className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-heading font-bold gradient-text mb-2">
            Welcome
          </h1>
          <p className="text-muted-foreground font-body">
            {step === 'phone' ? 'Enter your phone number to continue' : 'Enter the OTP sent to your phone'}
          </p>
        </motion.div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <GlassCard neon className="mb-6">
            <label className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-2 block">
              Phone Number
            </label>
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-primary flex-shrink-0" />
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+233 XX XXX XXXX"
                className="flex-1 bg-transparent border-0 text-lg font-heading focus-visible:ring-0 px-0"
              />
              <button className="p-2 rounded-lg hover:bg-muted transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center">
                <Fingerprint size={24} className="text-secondary" />
              </button>
            </div>
          </GlassCard>
        ) : (
          <GlassCard neon className="mb-6">
            <label className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-2 block">
              OTP Code
            </label>
            <Input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="bg-transparent border-0 text-lg font-heading focus-visible:ring-0 px-0"
              maxLength={6}
            />
          </GlassCard>
        )}

        <GradientButton
          onClick={step === 'phone' ? handleContinue : handleVerify}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 mb-8"
          size="lg"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
            />
          ) : (
            <>
              {step === 'phone' ? 'Continue' : 'Verify OTP'}
              <ChevronRight size={20} />
            </>
          )}
        </GradientButton>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-body uppercase">or continue with</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <GradientButton variant="glass" className="flex items-center justify-center gap-2 text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </GradientButton>
          <GradientButton variant="glass" className="flex items-center justify-center gap-2 text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Apple
          </GradientButton>
        </div>
      </div>
    </div>
  );
}
