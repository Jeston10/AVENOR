import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TestimonialsCarousel from '../components/TestimonialsCarousel'
import ScrollReveal from '../components/ScrollReveal'
import HeroGradient from '../components/HeroGradient'
import SectionWithImage from '../components/SectionWithImage'
import AnimatedButton from '../components/AnimatedButton'
import StaggerList, { StaggerItem } from '../components/StaggerList'
import SectionImageBlock from '../components/SectionImageBlock'
import SectionDivider from '../components/SectionDivider'
import { sectionImages, sectionBreakImages } from '../data/sectionImages'
import { useServices } from '../lib/services'

const DEFAULT_SERVICES_PREVIEW = [
  { title: 'Websites & Web Apps', desc: 'Fast, responsive sites that convert.', to: '/services#websites', icon: '◆' },
  { title: 'E‑commerce & SaaS', desc: 'Stores and platforms that scale.', to: '/services#ecommerce', icon: '◆' },
  { title: 'Brand & Landing Pages', desc: 'Memorable first impressions.', to: '/services#landing', icon: '◆' },
]

const processSteps = [
  { step: '01', title: 'Discovery', desc: 'We align on goals, audience, and scope.' },
  { step: '02', title: 'Design', desc: 'UI/UX and structure tailored to your brand.' },
  { step: '03', title: 'Build', desc: 'Clean code, performance, and SEO built in.' },
  { step: '04', title: 'Launch & Grow', desc: 'Deploy, maintain, and iterate with you.' },
]

const HERO_TITLE = 'Websites that convert.'
const HERO_TITLE_PREFIX_LEN = 'Websites that '.length // "convert." is the styled suffix

export default function Home() {
  const [visibleLength, setVisibleLength] = useState(0)
  const { services } = useServices()
  const servicesPreview = services.length >= 3
    ? services.slice(0, 3).map((s) => ({
        title: s.title,
        desc: s.short_description ?? '',
        to: `/services#${s.id}`,
        icon: '◆' as const,
      }))
    : DEFAULT_SERVICES_PREVIEW

  useEffect(() => {
    if (visibleLength < HERO_TITLE.length) {
      const t = setTimeout(() => setVisibleLength((n) => n + 1), 90)
      return () => clearTimeout(t)
    }
    const hold = setTimeout(() => setVisibleLength(0), 2200)
    return () => clearTimeout(hold)
  }, [visibleLength])

  const prefix = HERO_TITLE.slice(0, Math.min(visibleLength, HERO_TITLE_PREFIX_LEN))
  const suffix = visibleLength > HERO_TITLE_PREFIX_LEN
    ? HERO_TITLE.slice(HERO_TITLE_PREFIX_LEN, visibleLength)
    : ''

  return (
    <>
      {/* Hero — image | content */}
      <section className="relative min-h-[85vh] flex items-center px-6 py-20">
        <HeroGradient />
        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            className="relative min-h-[320px] md:min-h-[480px] rounded-2xl overflow-hidden order-2 md:order-1"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <motion.img
              src={sectionImages.home}
              alt="Web development and digital products"
              className="absolute inset-0 w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/50 to-transparent pointer-events-none" />
          </motion.div>
          <div className="relative text-center md:text-left order-1 md:order-2">
            <motion.p
              className="text-[var(--color-accent)] font-medium text-sm uppercase tracking-widest mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Premium Web Development
            </motion.p>
            <motion.h1
              className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {prefix}
              {suffix && (
                <>
                  <br />
                  <span className="text-glow text-[var(--color-primary)]">{suffix}</span>
                </>
              )}
              {visibleLength > 0 && visibleLength < HERO_TITLE.length && (
                <span className="inline-block w-0.5 h-[0.9em] align-middle bg-[var(--color-primary)] ml-0.5 animate-pulse" aria-hidden />
              )}
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-[var(--color-muted)] max-w-xl md:mx-0 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              For startups, creators, and enterprises. We build fast, beautiful, and conversion-focused digital experiences.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AnimatedButton to="/contact" variant="primary" className="px-8 py-4 text-lg">
                Start your Project
              </AnimatedButton>
              <AnimatedButton to="/portfolio" variant="secondary" className="px-8 py-4 text-lg">
                View work
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services preview — image | content */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <SectionWithImage
            imageSrc={sectionImages.services}
            imageAlt="Services we offer — websites, apps, and platforms"
            imageLeft={false}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
              What we build
            </h2>
            <p className="text-[var(--color-muted)] mb-8 max-w-lg">
              From landing pages to full platforms — we deliver the right solution for your stage and budget.
            </p>
            <Link to="/services" className="inline-flex items-center text-[var(--color-accent)] font-semibold hover:underline">
              See all services →
            </Link>
          </SectionWithImage>
          <StaggerList className="mt-20 grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {servicesPreview.map((item) => (
              <StaggerItem key={item.title}>
                <motion.div
                  className="group/card p-8 rounded-2xl glass border border-[var(--color-border)] h-full"
                  whileHover={{
                    y: -6,
                    borderColor: 'rgba(59, 130, 246, 0.35)',
                    boxShadow: '0 20px 40px -12px rgba(0,0,0,0.3)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                <span className="text-2xl text-[var(--color-muted)] transition-colors duration-200 group-hover/card:text-[var(--color-primary)]">{item.icon}</span>
                <h3 className="mt-4 font-display font-semibold text-xl text-white">{item.title}</h3>
                <p className="mt-2 text-[var(--color-muted)]">{item.desc}</p>
                <motion.span whileHover={{ x: 4 }}>
                  <Link to={item.to} className="mt-4 inline-flex items-center text-[var(--color-accent)] font-medium text-sm">
                    Learn more →
                  </Link>
                </motion.span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      <div className="py-8 px-6"><SectionDivider /></div>

      {/* Metrics section — dashboard image + stat cards (50+, 98%, 24/7, 48h) */}
      <section className="py-24 px-6" aria-label="Key metrics" id="metrics">
        <div className="max-w-5xl mx-auto space-y-12">
          <ScrollReveal className="rounded-2xl overflow-hidden border border-[var(--color-border)]">
            <motion.div
              className="relative w-full h-56 md:h-72 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <motion.img
                src={sectionBreakImages.metricsDashboard}
                alt="Performance metrics and analytics"
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          </ScrollReveal>
          <ScrollReveal className="max-w-5xl mx-auto text-center" variant="fadeIn">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-white">
              Results
            </h2>
            <p className="text-lg text-[var(--color-muted)] max-w-xl mx-auto leading-relaxed">
              Real outcomes. Your path to success.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '50+', label: 'Projects delivered' },
              { value: '98%', label: 'Client satisfaction' },
              { value: '24/7', label: 'Support available' },
              { value: '48h', label: 'Quote turnaround' },
            ].map((stat) => (
              <ScrollReveal key={stat.label} variant="fadeUp">
                <motion.div
                  className="text-center rounded-2xl glass border border-[var(--color-border)] px-6 pt-8 pb-10 h-full flex flex-col items-center min-h-[160px]"
                  whileHover={{
                    scale: 1.02,
                    borderColor: 'rgba(59, 130, 246, 0.25)',
                    boxShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.25)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <span className="font-display font-bold text-4xl md:text-5xl text-white tabular-nums">
                    {stat.value}
                  </span>
                  <span className="mt-4 block text-[var(--color-muted)] text-sm font-medium leading-snug max-w-[11rem]">
                    {stat.label}
                  </span>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="py-8 px-6"><SectionDivider /></div>

      <SectionImageBlock src={sectionBreakImages.homeAfterProcess} alt="How we work — collaboration" className="pb-4" />

      {/* Process */}
      <section className="pt-12 pb-24 px-6">
        <ScrollReveal className="max-w-5xl mx-auto text-center mb-16" variant="fadeIn">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            How we work
          </h2>
          <p className="text-[var(--color-muted)] max-w-xl mx-auto">
            A clear process from idea to launch — no surprises, just results.
          </p>
        </ScrollReveal>
        <StaggerList className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.1}>
          {processSteps.map((item) => (
            <StaggerItem key={item.step}>
              <motion.div
                className="text-center p-6 rounded-2xl glass h-full"
                whileHover={{
                  y: -4,
                  boxShadow: '0 16px 32px -12px rgba(59, 130, 246, 0.15)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="text-[var(--color-primary)] font-mono text-sm">{item.step}</span>
                <h3 className="mt-2 font-display font-semibold text-lg text-white">{item.title}</h3>
                <p className="mt-2 text-[var(--color-muted)] text-sm">{item.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerList>
      </section>
      <div className="py-8 px-6"><SectionDivider /></div>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <ScrollReveal className="max-w-4xl mx-auto text-center mb-12" variant="scaleIn">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            What clients say
          </h2>
          <p className="text-[var(--color-muted)]">
            Trusted by startups and brands worldwide.
          </p>
        </ScrollReveal>
        <TestimonialsCarousel />
      </section>
      <div className="py-8 px-6"><SectionDivider /></div>

      {/* CTA */}
      <section className="pt-16 pb-32 px-6 relative">
        <HeroGradient />
        <ScrollReveal className="relative max-w-3xl mx-auto text-center" variant="fadeUp">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6">
            Ready to build something great?
          </h2>
          <p className="text-[var(--color-muted)] text-lg mb-10">
            Tell us about your project. We’ll reply within 48 hours with a clear scope and quote.
          </p>
          <AnimatedButton to="/contact" variant="primary" className="px-10 py-4 text-lg">
            Get a free Quote
          </AnimatedButton>
        </ScrollReveal>
      </section>
    </>
  )
}
