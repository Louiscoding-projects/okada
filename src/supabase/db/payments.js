import { supabase } from '../client'

export const createPayment = (paymentData) =>
  supabase.from('payments').insert(paymentData).select().single()

export const getPayment = (paymentId) =>
  supabase.from('payments').select('*').eq('id', paymentId).single()

export const getTripPayment = (tripId) =>
  supabase.from('payments').select('*').eq('trip_id', tripId).single()

export const updatePaymentStatus = (paymentId, status) =>
  supabase.from('payments').update({ status }).eq('id', paymentId).select().single()
