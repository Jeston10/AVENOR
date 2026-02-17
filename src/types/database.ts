/** Supabase table row types */

export type ContactSubmissionRow = {
  id: string
  name: string
  email: string
  project_type: string | null
  message: string
  created_at: string
}

export type ServiceRow = {
  id: string
  slug: string
  title: string
  short_description: string | null
  features: string[]
  ideal: string | null
  tier: string | null
  image_url: string | null
  sort_order: number
  created_at: string
}

export type PricingTierRow = {
  id: string
  name: string
  price: string
  description: string | null
  features: string[]
  cta_text: string
  highlighted: boolean
  sort_order: number
  created_at: string
}

export type PricingAddonRow = {
  id: string
  name: string
  price: string
  sort_order: number
  created_at: string
}
