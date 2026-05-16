import { supabase } from '../client'

export const createTrip = (data) =>
  supabase.from('trips').insert(data).select().single()

export const getTripById = (id) =>
  supabase.from('trips').select('*, rider:riders(*), passenger:profiles(*)').eq('id', id).single()

export const getUserTrips = (userId) =>
  supabase
    .from('trips')
    .select('*')
    .eq('passenger_id', userId)
    .order('created_at', { ascending: false })

export const getActiveTrip = (userId) =>
  supabase
    .from('trips')
    .select('*, rider:riders(*)')
    .eq('passenger_id', userId)
    .in('status', ['matching', 'accepted', 'en_route', 'arrived'])
    .single()

export const updateTrip = (id, data) =>
  supabase.from('trips').update(data).eq('id', id).select().single()

export const rateTrip = (id, rating, tip = 0) =>
  supabase.from('trips').update({ passenger_rating: rating, tip }).eq('id', id)
