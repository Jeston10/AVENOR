import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import type { PricingTierRow, PricingAddonRow } from '../types/database'

export type PricingTierItem = {
  name: string
  price: string
  desc: string
  features: string[]
  cta: string
  highlighted: boolean
}

export type PricingAddonItem = {
  name: string
  price: string
}

const FALLBACK_TIERS: PricingTierItem[] = [
  { name: 'Basic', price: '$250', desc: 'Landing pages, simple sites, personal branding', features: ['Up to 5 pages', 'Responsive design', 'Contact form', 'SEO basics', '1 round of revisions'], cta: 'Get quote', highlighted: false },
  { name: 'Professional', price: '$750', desc: 'Business sites, small e‑commerce, blogs', features: ['Up to 15 pages', 'CMS integration', 'Analytics', '3 rounds of revisions', '1 month support'], cta: 'Get quote', highlighted: true },
  { name: 'Premium', price: '$1,500', desc: 'SaaS, custom web apps, advanced e‑commerce', features: ['Custom scope', 'Auth & dashboards', 'API integrations', 'Ongoing support options', 'Dedicated contact'], cta: 'Get quote', highlighted: false },
]

const FALLBACK_ADDONS: PricingAddonItem[] = [
  { name: 'SEO audit & setup', price: '$300 – $800' },
  { name: 'Copywriting', price: 'From $500' },
  { name: 'Analytics & tracking', price: '$200 – $500' },
  { name: 'Maintenance (monthly)', price: 'From $150/mo' },
  { name: 'Hosting & support', price: 'From $50/mo' },
]

function mapTierRow(row: PricingTierRow): PricingTierItem {
  return {
    name: row.name,
    price: row.price,
    desc: row.description ?? '',
    features: Array.isArray(row.features) ? row.features : [],
    cta: row.cta_text,
    highlighted: row.highlighted,
  }
}

function mapAddonRow(row: PricingAddonRow): PricingAddonItem {
  return { name: row.name, price: row.price }
}

export function usePricing() {
  const [tiers, setTiers] = useState<PricingTierItem[]>(FALLBACK_TIERS)
  const [addOns, setAddOns] = useState<PricingAddonItem[]>(FALLBACK_ADDONS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const [tiersRes, addonsRes] = await Promise.all([
        supabase
          .from('pricing_tiers')
          .select('id, name, price, description, features, cta_text, highlighted, sort_order')
          .order('sort_order', { ascending: true }),
        supabase
          .from('pricing_addons')
          .select('id, name, price, sort_order')
          .order('sort_order', { ascending: true }),
      ])
      if (cancelled) return
      if (!tiersRes.error && tiersRes.data?.length) {
        setTiers((tiersRes.data as PricingTierRow[]).map(mapTierRow))
      }
      if (!addonsRes.error && addonsRes.data?.length) {
        setAddOns((addonsRes.data as PricingAddonRow[]).map(mapAddonRow))
      }
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [])

  return { tiers, addOns, loading }
}
