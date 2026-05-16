import { supabase } from './client'

export const signInWithPhone = (phone) =>
  supabase.auth.signInWithOtp({ phone })

export const verifyOtp = (phone, token) =>
  supabase.auth.verifyOtp({ phone, token, type: 'sms' })

export const signInWithGoogle = () =>
  supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/home` },
  })

export const signUpWithEmail = (email, password, metadata = {}) =>
  supabase.auth.signUp({ email, password, options: { data: metadata } })

export const signInWithEmail = (email, password) =>
  supabase.auth.signInWithPassword({ email, password })

export const sendPasswordReset = (email) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

export const updatePassword = (newPassword) =>
  supabase.auth.updateUser({ password: newPassword })

export const signOut = () => supabase.auth.signOut()

export const getSession = () => supabase.auth.getSession()
