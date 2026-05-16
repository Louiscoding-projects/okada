import { supabase } from '../client'

export const createTrip = (tripData) =>
  supabase.from('trips').insert(tripData).select().single()

export const getTrip = (tripId) =>
  supabase.from('trips').select('*, rider:riders(*), passenger:profiles(*)').eq('id', tripId).single()

export const getPassengerTrips = (passengerId) =>
  supabase
    .from('trips')
    .select('*')
    .eq('passenger_id', passengerId)
    .order('created_at', { ascending: false })

export const getRiderTrips = (riderId) =>
  supabase
    .from('trips')
    .select('*')
    .eq('rider_id', riderId)
    .order('created_at', { ascending: false })

export const updateTripStatus = (tripId, status) =>
  supabase.from('trips').update({ status }).eq('id', tripId).select().single()

export const getAvailableTrips = () =>
  supabase
    .from('trips')
    .select('*, passenger:profiles(*)')
    .eq('status', 'matching')
    .order('created_at', { ascending: true })

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
