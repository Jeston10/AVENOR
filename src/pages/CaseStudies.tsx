import ScrollReveal from '../components/ScrollReveal'
import SectionWithImage from '../components/SectionWithImage'
import { sectionImages, caseStudyImages } from '../data/sectionImages'

const studies = [
  { title: 'SaaS dashboard redesign', client: 'DataFlow', result: '40% faster load, higher engagement', link: '#', image: caseStudyImages[0] },
  { title: 'E‑commerce launch', client: 'Bloom & Co', result: 'Full store + inventory in 8 weeks', link: '#', image: caseStudyImages[1] },
  { title: 'Landing page suite', client: 'ScaleUp', result: '2x conversion on campaign pages', link: '#', image: caseStudyImages[2] },
]

export default function CaseStudies() {
  return (
    <>
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionWithImage
            imageSrc={sectionImages.caseStudies}
            imageAlt="Case studies — results and outcomes"
            imageLeft={false}
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Case studies
            </h1>
            <p className="text-lg text-[var(--color-muted)] max-w-lg">
              Deep dives into how we solved real problems for clients.
            </p>
          </SectionWithImage>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {studies.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <SectionWithImage
                imageSrc={s.image}
                imageAlt={s.title}
                imageLeft={i % 2 === 0}
              >
                <div className="block group">
                  <h2 className="font-display font-bold text-2xl text-white">{s.title}</h2>
                  <p className="mt-2 text-[var(--color-muted)]">{s.client} — {s.result}</p>
                </div>
              </SectionWithImage>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  )
}
