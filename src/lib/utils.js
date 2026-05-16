import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount) {
  return `GHS ${Number(amount).toFixed(2)}`
}

export function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-GH', { hour: '2-digit', minute: '2-digit' })
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GH', { weekday: 'short', month: 'short', day: 'numeric' })
}

export function formatPhone(phone) {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('233')) return `+${digits}`
  if (digits.startsWith('0')) return `+233${digits.slice(1)}`
  return `+233${digits}`
}
