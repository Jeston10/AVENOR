import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import type { ServiceRow } from '../types/database'

/** Shape used by Services page (and Home preview) */
export type ServiceItem = {
  id: string
  title: string
  features: string[]
  ideal: string
  tier: string
  short_description?: string | null
  image_url?: string | null
}

const FALLBACK_SERVICES: ServiceItem[] = [
  { id: 'websites', title: 'Portfolio & Business Websites', features: ['Responsive design', 'CMS optional', 'Contact forms', 'SEO basics'], ideal: 'Freelancers, creatives, small businesses', tier: 'Basic – Premium' },
  { id: 'ecommerce', title: 'E‑commerce & Stores', features: ['Checkout & payments', 'Inventory', 'Shipping', 'Admin dashboard'], ideal: 'Brands, retailers, D2C', tier: 'Professional – Enterprise' },
  { id: 'saas', title: 'SaaS & Web Apps', features: ['Auth & roles', 'Dashboards', 'API integration', 'Real-time features'], ideal: 'Startups, product companies', tier: 'Premium – Enterprise' },
  { id: 'landing', title: 'Landing Pages', features: ['High-conversion layout', 'Forms & CTAs', 'A/B ready', 'Fast load'], ideal: 'Campaigns, launches, lead gen', tier: 'Basic – Professional' },
  { id: 'enterprise', title: 'Custom Enterprise Solutions', features: ['Custom workflows', 'Integrations', 'Security & compliance', 'Scalability'], ideal: 'Large orgs, regulated industries', tier: 'Enterprise' },
]

function mapRowToItem(row: ServiceRow): ServiceItem {
  return {
    id: row.slug,
    title: row.title,
    features: Array.isArray(row.features) ? row.features : [],
    ideal: row.ideal ?? '',
    tier: row.tier ?? '',
    short_description: row.short_description,
    image_url: row.image_url,
  }
}

export function useServices() {
  const [services, setServices] = useState<ServiceItem[]>(FALLBACK_SERVICES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const { data, error } = await supabase
        .from('services')
        .select('id, slug, title, short_description, features, ideal, tier, image_url, sort_order')
        .order('sort_order', { ascending: true })
      if (cancelled) return
      if (error || !data || data.length === 0) {
        setServices(FALLBACK_SERVICES)
      } else {
        setServices((data as ServiceRow[]).map(mapRowToItem))
      }
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [])

  return { services, loading }
}
