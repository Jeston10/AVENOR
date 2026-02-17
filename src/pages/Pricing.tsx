import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import SectionWithImage from '../components/SectionWithImage'
import AnimatedButton from '../components/AnimatedButton'
import SectionDivider from '../components/SectionDivider'
import { sectionImages } from '../data/sectionImages'
import { usePricing } from '../lib/pricing'

export default function Pricing() {
  const { tiers, addOns, loading } = usePricing()

  return (
    <>
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionWithImage
            imageSrc={sectionImages.pricing}
            imageAlt="Transparent pricing and packages"
            imageLeft={true}
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Transparent pricing
            </h1>
            <p className="text-lg text-[var(--color-muted)] max-w-lg">
              Tier-based packages. Custom enterprise quotes. Payment via milestones.
            </p>
          </SectionWithImage>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-[var(--color-muted)] py-12">Loading pricing…</div>
          ) : (
          tiers.map((tier, i) => (
            <ScrollReveal key={tier.name} delay={i * 0.1}>
              <motion.div
                className={`rounded-2xl p-8 h-full flex flex-col ${
                  tier.highlighted
                    ? 'glass border-2 border-[var(--color-primary)] glow'
                    : 'glass border border-[var(--color-border)]'
                }`}
                whileHover={{
                  y: -4,
                  borderColor: 'rgba(59, 130, 246, 0.6)',
                  borderWidth: 2,
                  boxShadow: '0 0 40px rgba(59, 130, 246, 0.35)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {tier.highlighted && (
                  <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">Popular</span>
                )}
                <h2 className="font-display font-bold text-2xl text-white mt-2">{tier.name}</h2>
                <p className="mt-1 text-2xl font-semibold text-[var(--color-accent)]">{tier.price}</p>
                <p className="mt-2 text-[var(--color-muted)] text-sm">{tier.desc}</p>
                <ul className="mt-6 space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm text-[var(--color-text)] flex items-center gap-2">
                      <span className="text-[var(--color-primary)]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex justify-center">
                  <AnimatedButton
                    to="/contact"
                    variant={tier.highlighted ? 'primary' : 'secondary'}
                    className="w-full md:w-auto text-center py-3 px-6"
                  >
                    {tier.cta}
                  </AnimatedButton>
                </div>
              </motion.div>
            </ScrollReveal>
          ))
          )}
        </div>
      </section>

      <div className="py-8 px-6"><SectionDivider /></div>

      <section className="pt-12 pb-24 px-6">
        <ScrollReveal className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-white text-center mb-8">
            Add-on services
          </h2>
          <div className="rounded-2xl glass border border-[var(--color-border)] divide-y divide-[var(--color-border)] overflow-hidden">
            {(loading ? [] : addOns).map((addon) => (
              <div key={addon.name} className="flex items-center justify-between px-6 py-4">
                <span className="text-[var(--color-text)]">{addon.name}</span>
                <span className="text-[var(--color-accent)] font-medium">{addon.price}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[var(--color-muted)] text-sm">
            Enterprise projects are quoted individually. Typically 30–50% upfront, then milestones.
          </p>
        </ScrollReveal>
      </section>
    </>
  )
}
