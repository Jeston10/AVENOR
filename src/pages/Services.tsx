import ScrollReveal from '../components/ScrollReveal'
import SectionWithImage from '../components/SectionWithImage'
import SectionImageBlock from '../components/SectionImageBlock'
import SectionDivider from '../components/SectionDivider'
import { sectionImages, serviceTypeImages, sectionBreakImages } from '../data/sectionImages'
import { useServices } from '../lib/services'

const industries = [
  'Tech startups', 'Healthcare', 'Real estate', 'Finance', 'Education',
  'Fitness & wellness', 'Restaurants', 'Agencies', 'Influencers', 'Coaches & consultants',
  'SaaS founders', 'E-learning', 'Personal brands',
]

export default function Services() {
  const { services: websiteTypes, loading } = useServices()

  return (
    <>
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <SectionWithImage
            imageSrc={sectionImages.services}
            imageAlt="Web development services — websites, e-commerce, SaaS"
            imageLeft={false}
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              What we build
            </h1>
            <p className="text-lg text-[var(--color-muted)] max-w-lg">
              From one-page sites to full platforms — we deliver the right solution for your stage and budget.
            </p>
          </SectionWithImage>
        </div>
      </section>

      <section className="pb-12 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {loading ? (
            <div className="text-center text-[var(--color-muted)] py-12">Loading services…</div>
          ) : (
          websiteTypes.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.05}>
              <SectionWithImage
                imageSrc={serviceTypeImages[item.id] ?? sectionImages.services}
                imageAlt={item.title}
                imageLeft={i % 2 === 0}
              >
                <article id={item.id} className="scroll-mt-24">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <h2 className="font-display font-bold text-2xl text-white">{item.title}</h2>
                    <span className="px-4 py-2 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-accent)] text-sm font-medium">
                      {item.tier}
                    </span>
                  </div>
                  <p className="mt-2 text-[var(--color-muted)]">Ideal for: {item.ideal}</p>
                  <ul className="mt-6 flex flex-wrap gap-3">
                    {item.features.map((f) => (
                      <li key={f} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-[var(--color-text)]">
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </SectionWithImage>
            </ScrollReveal>
          ))
          )}
        </div>
      </section>

      <div className="py-8 px-6"><SectionDivider /></div>

      <SectionImageBlock
        src={sectionBreakImages.servicesAfterIndustries}
        alt="Industries we serve — tech and collaboration"
        className="pb-4"
      />

      <section className="pt-12 pb-24 px-6">
        <ScrollReveal className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-display font-bold text-3xl text-white mb-4">
            Industries we serve
          </h2>
          <p className="text-[var(--color-muted)]">
            Experience across tech, healthcare, finance, education, and more.
          </p>
        </ScrollReveal>
        <ScrollReveal className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind) => (
              <span
                key={ind}
                className="px-4 py-2 rounded-full glass border border-[var(--color-border)] text-sm text-[var(--color-text)]"
              >
                {ind}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
