import ScrollReveal from '../components/ScrollReveal'
import SectionWithImage from '../components/SectionWithImage'
import SectionImageBlock from '../components/SectionImageBlock'
import { sectionImages, sectionBreakImages } from '../data/sectionImages'

export default function About() {
  return (
    <>
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionWithImage
            imageSrc={sectionImages.about}
            imageAlt="About us — premium yet affordable web development"
            imageLeft={false}
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Premium yet affordable
            </h1>
            <p className="text-lg text-[var(--color-muted)] max-w-lg">
              We combine agency-level quality with freelance flexibility and clear pricing.
            </p>
          </SectionWithImage>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <ScrollReveal>
            <h2 className="font-display font-bold text-2xl text-white mb-4">Our positioning</h2>
            <p className="text-[var(--color-muted)] leading-relaxed">
              <strong className="text-white">Unique value:</strong> Fast, conversion-focused websites and web apps — no bloat, no lock-in. We use modern stacks (React, TypeScript, Tailwind, Node) and deliver clean, maintainable code with clear documentation.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <h2 className="font-display font-bold text-2xl text-white mb-4">Who we serve</h2>
            <p className="text-[var(--color-muted)] leading-relaxed">
              Startups, creators, small businesses, and enterprises who want a reliable technical partner. We work with founders, marketing teams, and agencies — one-off projects or ongoing retainer and subscription models.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <h2 className="font-display font-bold text-2xl text-white mb-4">How we stand out</h2>
            <p className="text-[var(--color-muted)] leading-relaxed">
              Transparent pricing, milestone-based payments, and a focus on performance and SEO from day one. We offer optional maintenance, hosting, and support plans so your site keeps running smoothly after launch.
            </p>
          </ScrollReveal>
        </div>
      </section>
      <SectionImageBlock src={sectionBreakImages.aboutAfter} alt="Our team and approach" />
    </>
  )
}
