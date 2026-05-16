import { supabase } from '../client'

export const getNearbyRiders = (lat, lng, radius = 5) =>
  supabase.rpc('nearby_riders', { lat, lng, radius_km: radius })

export const getRiderById = (id) =>
  supabase.from('riders').select('*, profile:profiles(*)').eq('id', id).single()

export const getRiderByUserId = (userId) =>
  supabase.from('riders').select('*').eq('user_id', userId).single()

export const updateRiderStatus = (id, status) =>
  supabase.from('riders').update({ status, last_seen: new Date().toISOString() }).eq('id', id)

export const updateRiderLocation = (id, lat, lng) =>
  supabase.from('riders').update({ lat, lng, last_seen: new Date().toISOString() }).eq('id', id)
