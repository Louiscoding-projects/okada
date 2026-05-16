import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import AuthLayout from '../components/AuthLayout'
import GradientButton from '../components/okada/GradientButton'
import { signInWithPhone, verifyOtp } from '../supabase/auth'
import { formatPhone } from '../lib/utils'

export default function PhoneLogin() {
  const navigate = useNavigate()
  const [step, setStep] = useState('phone') // 'phone' | 'otp'
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendOtp = async () => {
    if (phone.length < 9) return
    setLoading(true)
    setError('')
    const { error: err } = await signInWithPhone(formatPhone(phone))
    setLoading(false)
    if (err) {
      setError(err.message)
    } else {
      setStep('otp')
    }
  }

  const handleVerify = async () => {
    if (otp.length < 6) return
    setLoading(true)
    setError('')
    const { error: err } = await verifyOtp(formatPhone(phone), otp)
    setLoading(false)
    if (err) {
      setError(err.message)
    } else {
      navigate('/home', { replace: true })
    }
  }

  return (
    <AuthLayout>
      <div
        className="w-full p-8 rounded-[40px] shadow-2xl relative overflow-hidden"
        style={{
          backdropFilter: 'blur(20px)',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Back + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => step === 'otp' ? setStep('phone') : navigate('/login')}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--glass-bg-card)', border: '1px solid var(--glass-border)' }}
            >
              <span className="material-symbols-outlined text-primary">arrow_back</span>
            </button>
            <div>
              <h1 className="font-display text-xl font-bold text-on-surface tracking-[0.15em] uppercase">
                {step === 'phone' ? 'PHONE LOGIN' : 'VERIFY OTP'}
              </h1>
              <p className="text-xs text-on-surface-variant mt-0.5">
                {step === 'phone' ? 'Enter your Ghana number' : `Code sent to +233 ${phone}`}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 'phone' ? (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan to-primary rounded-2xl opacity-0 group-focus-within:opacity-30 blur transition duration-500" />
                  <div className="relative flex">
                    <div
                      className="flex items-center justify-center px-4 font-bold text-sm text-on-surface-variant rounded-l-2xl border-r-0"
                      style={{ background: 'var(--input-bg)', border: '1px solid var(--glass-border)', borderRight: 'none' }}
                    >
                      +233
                    </div>
                    <input
                      type="tel"
                      placeholder="24 000 0000"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                      maxLength={10}
                      className="w-full h-14 rounded-r-2xl pl-4 pr-4 text-on-surface font-display outline-none transition-all placeholder:text-on-surface-variant/40"
                      style={{ background: 'var(--input-bg)', border: '1px solid var(--glass-border)' }}
                      onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                    />
                  </div>
                </div>
                {error && <p className="text-xs text-error">{error}</p>}
                <GradientButton onClick={handleSendOtp} loading={loading} disabled={phone.length < 9}>
                  SEND CODE
                </GradientButton>
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan to-primary rounded-2xl opacity-0 group-focus-within:opacity-30 blur transition duration-500" />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="000000"
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                    maxLength={6}
                    className="relative w-full h-14 rounded-2xl pl-6 pr-4 text-on-surface font-display text-2xl tracking-[0.5em] outline-none transition-all placeholder:text-on-surface-variant/40"
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--glass-border)' }}
                    onKeyDown={e => e.key === 'Enter' && handleVerify()}
                  />
                </div>
                {error && <p className="text-xs text-error">{error}</p>}
                <GradientButton onClick={handleVerify} loading={loading} disabled={otp.length < 6}>
                  VERIFY &amp; JACK IN
                </GradientButton>
                <button
                  onClick={handleSendOtp}
                  className="w-full text-xs text-on-surface-variant hover:text-primary transition-colors"
                >
                  Resend code
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AuthLayout>
  )
}
