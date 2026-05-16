import { supabase } from './client'

export const signUpWithEmail = (email, password, fullName) =>
  supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })

export const signInWithEmail = (email, password) =>
  supabase.auth.signInWithPassword({ email, password })

export const signInWithGoogle = () =>
  supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/home` },
  })

export const signInWithPhone = (phone) =>
  supabase.auth.signInWithOtp({ phone })

export const verifyOTP = (phone, token) =>
  supabase.auth.verifyOtp({ phone, token, type: 'sms' })

export const signOut = () => supabase.auth.signOut()

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const resetPassword = (email) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

export const updatePassword = (newPassword) =>
  supabase.auth.updateUser({ password: newPassword })

export const getSession = () => supabase.auth.getSession()
