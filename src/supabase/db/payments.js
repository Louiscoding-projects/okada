import { supabase } from '../client'

export const getWalletBalance = (userId) =>
  supabase.from('wallets').select('balance').eq('user_id', userId).single()

export const getTransactions = (userId, limit = 20) =>
  supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

export const createTransaction = (data) =>
  supabase.from('transactions').insert(data).select().single()

export const topUpWallet = (userId, amount, provider) =>
  supabase.rpc('top_up_wallet', { user_id: userId, amount, provider })
