import { supabase } from '../client'

export const getProfile = (userId) =>
  supabase.from('profiles').select('*').eq('id', userId).single()

export const updateProfile = (userId, data) =>
  supabase.from('profiles').update(data).eq('id', userId).select().single()

export const setUserRole = (userId, role) =>
  supabase.from('profiles').update({ role }).eq('id', userId).select().single()

export const upsertProfile = (userId, data) =>
  supabase.from('profiles').upsert({ id: userId, ...data }).select().single()

export const uploadAvatar = async (userId, file) => {
  const ext = file.name.split('.').pop()
  const path = `avatars/${userId}.${ext}`
  const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
  if (error) return { error }
  const { data } = supabase.storage.from('avatars').getPublicUrl(path)
  return { data: { publicUrl: data.publicUrl } }
}
