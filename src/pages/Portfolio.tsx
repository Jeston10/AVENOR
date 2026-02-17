import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import SectionWithImage from '../components/SectionWithImage'
import { sectionImages, portfolioProjectImages } from '../data/sectionImages'

const projects = [
  { title: 'SaaS Dashboard', category: 'Web App', desc: 'Analytics & user management platform.', tech: 'React, Node, PostgreSQL', image: portfolioProjectImages[0] },
  { title: 'E‑commerce Store', category: 'E‑commerce', desc: 'Full store with checkout and inventory.', tech: 'Next.js, Stripe', image: portfolioProjectImages[1] },
  { title: 'Health Portal', category: 'Healthcare', desc: 'Appointments and patient records.', tech: 'React, API', image: portfolioProjectImages[2] },
  { title: 'Landing Suite', category: 'Landing', desc: 'High-conversion campaign pages.', tech: 'React, Tailwind', image: portfolioProjectImages[3] },
  { title: 'Agency Site', category: 'Business', desc: 'Portfolio and lead capture.', tech: 'React, CMS', image: portfolioProjectImages[4] },
  { title: 'Learning Platform', category: 'E‑learning', desc: 'Courses and progress tracking.', tech: 'React, Auth', image: portfolioProjectImages[5] },
]

export default function Portfolio() {
  return (
    <>
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionWithImage
            imageSrc={sectionImages.portfolio}
            imageAlt="Portfolio — selected projects and launches"
            imageLeft={false}
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Selected work
            </h1>
            <p className="text-lg text-[var(--color-muted)] max-w-lg">
              A sample of recent projects across industries and project sizes.
            </p>
          </SectionWithImage>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.08}>
              <motion.article
                className="group rounded-2xl glass border border-[var(--color-border)] overflow-hidden h-full flex flex-col"
                whileHover={{ y: -4, borderColor: 'rgba(59, 130, 246, 0.3)' }}
              >
                <div className="relative h-48 overflow-hidden bg-[var(--color-bg-elevated)]">
                  <img
                    src={project.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs font-medium text-[var(--color-primary)] uppercase tracking-wider">{project.category}</span>
                  <h2 className="mt-2 font-display font-semibold text-xl text-white">{project.title}</h2>
                  <p className="mt-2 text-[var(--color-muted)] text-sm flex-1">{project.desc}</p>
                  <p className="mt-4 text-xs text-[var(--color-muted)]">{project.tech}</p>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  )
}
