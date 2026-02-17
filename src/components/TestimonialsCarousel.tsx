import { useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'Avenor delivered our SaaS dashboard on time and above expectations. Clean code, great communication.',
    name: 'Sarah Chen',
    role: 'Founder, DataFlow',
  },
  {
    quote: 'Finally a dev who gets both design and performance. Our conversion rate went up 40% after the redesign.',
    name: 'Marcus Webb',
    role: 'Marketing Director, ScaleUp',
  },
  {
    quote: 'Professional from day one. They built our e-commerce site and integrated our inventory system seamlessly.',
    name: 'Elena Rodriguez',
    role: 'Owner, Bloom & Co',
  },
]

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => emblaApi.scrollNext(), 5000)
    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="flex-[0_0_100%] min-w-0 p-8 rounded-2xl glass border border-[var(--color-border)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-lg text-[var(--color-text)] italic">"{t.quote}"</p>
              <p className="mt-4 font-semibold text-white">{t.name}</p>
              <p className="text-sm text-[var(--color-muted)]">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <motion.button
          type="button"
          onClick={scrollPrev}
          className="w-12 h-12 rounded-full glass border border-[var(--color-border)] flex items-center justify-center text-white"
          whileHover={{
            scale: 1.08,
            borderColor: 'rgba(59, 130, 246, 0.5)',
            boxShadow: '0 0 24px rgba(59, 130, 246, 0.25)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          aria-label="Previous"
        >
          ←
        </motion.button>
        <motion.button
          type="button"
          onClick={scrollNext}
          className="w-12 h-12 rounded-full glass border border-[var(--color-border)] flex items-center justify-center text-white"
          whileHover={{
            scale: 1.08,
            borderColor: 'rgba(59, 130, 246, 0.5)',
            boxShadow: '0 0 24px rgba(59, 130, 246, 0.25)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          aria-label="Next"
        >
          →
        </motion.button>
      </div>
    </div>
  )
}
