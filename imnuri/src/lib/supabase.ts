import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not set. Admin panel will not work.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
)

// Types
export type ApplicationStatus = 'new' | 'contacted' | 'enrolled' | 'rejected'

export type Application = {
  id: string
  name: string
  phone: string
  course: string
  preferred_time: string
  message?: string
  status: ApplicationStatus
  notes?: string
  created_at: string
}

export type Teacher = {
  id: string
  name: string
  subject: string
  experience: string
  score: string
  rating: number
  students: number
  cert: string
  bio: string
  gradient: string
  image_url: string
  display_order: number
  active: boolean
}

export type Testimonial = {
  id: string
  name: string
  result: string
  university: string
  is_grant: boolean
  year: string
  text: string
  gradient: string
  image_url: string
  active: boolean
}

export type GalleryItem = {
  id: string
  label: string
  category: string
  emoji: string
  image_url: string
  color: string
  display_order: number
}

export type SiteSettings = {
  phone: string
  phone2?: string
  email: string
  address: string
  working_hours: string
  telegram: string
  whatsapp: string
  instagram: string
  youtube: string
  map_embed: string
}
