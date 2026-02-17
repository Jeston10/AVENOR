import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import SectionWithImage from '../components/SectionWithImage'
import { sectionImages } from '../data/sectionImages'

const faqs = [
  { q: 'How long does a typical project take?', a: 'Landing pages: 1–2 weeks. Business sites: 3–6 weeks. E‑commerce or SaaS: 6–12+ weeks depending on scope.' },
  { q: 'Do you offer ongoing support?', a: 'Yes. We offer monthly maintenance, hosting, and support plans so your site stays secure and up to date.' },
  { q: 'What’s the payment structure?', a: 'We typically use milestones: a portion upfront, then payments at key deliverables (design sign-off, launch). Enterprise projects can be customized.' },
  { q: 'Do you work with agencies?', a: 'Yes. We collaborate with agencies on white-label or co-delivery — design from you, build from us.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <>
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionWithImage
            imageSrc={sectionImages.faq}
            imageAlt="Frequently asked questions"
            imageLeft={true}
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              FAQs
            </h1>
            <p className="text-lg text-[var(--color-muted)] max-w-lg">
              Common questions about working with us.
            </p>
          </SectionWithImage>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((item, i) => (
            <ScrollReveal key={item.q} delay={i * 0.05}>
              <div
                className="rounded-2xl glass border border-[var(--color-border)] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-white font-medium"
                >
                  {item.q}
                  <span className="text-[var(--color-primary)]">{open === i ? '−' : '+'}</span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-4 text-[var(--color-muted)] text-sm">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  )
}
