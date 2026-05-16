import { supabase } from '../client'

export const getRiderProfile = (riderId) =>
  supabase.from('riders').select('*, profile:profiles(*)').eq('id', riderId).single()

export const updateRiderStatus = (riderId, isOnline) =>
  supabase
    .from('riders')
    .update({ is_online: isOnline, last_seen: new Date().toISOString() })
    .eq('id', riderId)
    .select()
    .single()

export const updateRiderRating = (riderId, rating) =>
  supabase.from('riders').update({ rating }).eq('id', riderId).select().single()

export const getOnlineRiders = () =>
  supabase
    .from('riders')
    .select('*, profile:profiles(*)')
    .eq('is_online', true)
    .order('last_seen', { ascending: false })

export const getNearbyRiders = (lat, lng, radius = 5) =>
  supabase.rpc('nearby_riders', { lat, lng, radius_km: radius })

export const getRiderByUserId = (userId) =>
  supabase.from('riders').select('*').eq('user_id', userId).single()

export const updateRiderLocation = (id, lat, lng) =>
  supabase.from('riders').update({ lat, lng, last_seen: new Date().toISOString() }).eq('id', id)
