import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedButton from './AnimatedButton'
import ScrollProgress from './ScrollProgress'
import SectionDivider from './SectionDivider'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/faq', label: 'FAQ' },
]

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()

  return (
    <>
      <ScrollProgress />
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 glass"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/" className="font-display font-bold text-xl tracking-tight text-white block">
              Avenor
            </Link>
          </motion.div>
          <nav className="hidden md:flex items-center gap-8">
            {nav.map(({ to, label }) => (
              <motion.div
                key={to}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  to={to}
                  className={`relative text-sm font-medium transition-colors ${
                    location.pathname === to ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)] hover:text-white'
                  }`}
                >
                  {label}
                  {location.pathname === to && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-primary)] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
          <AnimatedButton to="/contact" variant="primary" className="px-5 py-2.5 text-sm">
            Get a Quote
          </AnimatedButton>
        </div>
      </motion.header>

      <main className="pt-20 min-h-screen">
        {children}
      </main>

      <div className="px-6"><SectionDivider /></div>

      <footer className="bg-[var(--color-bg-elevated)]">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <span className="font-display font-bold text-2xl text-white">Avenor</span>
            <p className="mt-4 text-[var(--color-muted)] max-w-[18rem] w-full break-words leading-relaxed">
              Premium web development for startups and enterprises. We build fast, beautiful, conversion-focused digital experiences.
            </p>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold text-white mb-4">Pages</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {nav.map(({ to, label }) => (
                <motion.div key={to} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                  <Link to={to} className="text-[var(--color-muted)] hover:text-white transition-colors block">
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <div className="flex flex-col gap-3">
              <motion.a
                href="https://www.linkedin.com/company/avenordevs/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg"
                  alt="LinkedIn"
                  className="h-5 w-5 invert-[0.85]"
                  loading="lazy"
                />
                <span>LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/_just_shut_da_fuk_up_/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg"
                  alt="Instagram"
                  className="h-5 w-5 invert-[0.85]"
                  loading="lazy"
                />
                <span>Instagram</span>
              </motion.a>
              <motion.a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg"
                  alt="Discord"
                  className="h-5 w-5 invert-[0.85]"
                  loading="lazy"
                />
                <span>Discord</span>
              </motion.a>
              <motion.a
                href="mailto:avenordevs@gmail.com"
                className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/minutemailer.svg"
                  alt="Email"
                  className="h-5 w-5 invert-[0.85]"
                  loading="lazy"
                />
                <span>avenordevs@gmail.com</span>
              </motion.a>
            </div>
          </div>
        </div>
        <div className="py-6">
          <SectionDivider />
          <p className="pt-6 text-center text-[var(--color-muted)] text-sm">
            © {new Date().getFullYear()} Avenor. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
