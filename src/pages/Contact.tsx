import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import SectionWithImage from '../components/SectionWithImage'
import { sectionImages } from '../data/sectionImages'
import { supabase } from '../lib/supabase'
import { useToast } from '../context/ToastContext'
import TermsAndConditionsModal from '../components/TermsAndConditionsModal'

const PROJECT_OPTIONS = [
  { value: '', label: 'Select...' },
  { value: 'website', label: 'Website / Business site' },
  { value: 'ecommerce', label: 'E‑commerce' },
  { value: 'saas', label: 'SaaS / Web app' },
  { value: 'landing', label: 'Landing page(s)' },
  { value: 'other', label: 'Other' },
]

// Limits match DB constraints; used for validation and to prevent oversized payloads
const MAX_NAME = 500
const MAX_EMAIL = 320
const MAX_MESSAGE = 10000
const MAX_PROJECT_TYPE = 100

const ALLOWED_PROJECT_VALUES = new Set(PROJECT_OPTIONS.map((o) => o.value).filter(Boolean))

/** Strip control chars and normalize whitespace for safe storage; max length enforced by caller */
function sanitizeText(s: string, maxLen: number): string {
  const trimmed = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim()
  return trimmed.slice(0, maxLen)
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= MAX_EMAIL
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [projectType, setProjectType] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [termsModalOpen, setTermsModalOpen] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const addToast = useToast()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const form = e.currentTarget
    const rawName = (form.elements.namedItem('name') as HTMLInputElement).value
    const rawEmail = (form.elements.namedItem('email') as HTMLInputElement).value
    const rawMessage = (form.elements.namedItem('message') as HTMLTextAreaElement).value

    const name = sanitizeText(rawName, MAX_NAME)
    const email = sanitizeText(rawEmail, MAX_EMAIL)
    const message = sanitizeText(rawMessage, MAX_MESSAGE)
    const project = projectType && ALLOWED_PROJECT_VALUES.has(projectType)
      ? projectType.slice(0, MAX_PROJECT_TYPE)
      : null

    if (!name) {
      const msg = 'Please enter your name or company.'
      setError(msg)
      addToast(msg, 'error')
      setSubmitting(false)
      return
    }
    if (!isValidEmail(email)) {
      const msg = 'Please enter a valid email address.'
      setError(msg)
      addToast(msg, 'error')
      setSubmitting(false)
      return
    }
    if (!message) {
      const msg = 'Please enter a message.'
      setError(msg)
      addToast(msg, 'error')
      setSubmitting(false)
      return
    }

    const { error: submitError } = await supabase.from('contact_submissions').insert({
      name,
      email,
      project_type: project,
      message,
    })
    setSubmitting(false)
    if (submitError) {
      const msg = submitError.message || 'Something went wrong. Please try again.'
      setError(msg)
      addToast(msg, 'error')
      return
    }
    setSent(true)
  }

  return (
    <>
      <TermsAndConditionsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        onAgree={() => setAgreedToTerms(true)}
      />
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionWithImage
            imageSrc={sectionImages.contact}
            imageAlt="Get in touch — start your project"
            imageLeft={true}
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Get a Quote
            </h1>
            <p className="text-lg text-[var(--color-muted)] max-w-lg mb-8">
              Tell us about your project. We’ll reply within 48 hours with a clear scope and quote.
            </p>
          </SectionWithImage>
        </div>
      </section>

      <section className="pb-24 px-6">
        <ScrollReveal className="max-w-xl mx-auto">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl glass border border-[var(--color-primary)]/30 p-8 text-center"
            >
              <p className="text-[var(--color-accent)] font-semibold">Thanks for your message.</p>
              <p className="mt-2 text-[var(--color-muted)] text-sm">
                We’ll get back to you within 48 hours with next steps.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="rounded-2xl glass border border-[var(--color-border)] p-8 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-2">Name / Company</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={MAX_NAME}
                  autoComplete="name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border)] text-white placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)]"
                  placeholder="Your name or company"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-2">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={MAX_EMAIL}
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border)] text-white placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)]"
                  placeholder="you@example.com"
                />
              </div>
              <div ref={dropdownRef} className="relative">
                <label htmlFor="project" className="block text-sm font-medium text-[var(--color-text)] mb-2">Project type</label>
                <input type="hidden" name="project" value={projectType} />
                <button
                  type="button"
                  id="project"
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border)] text-left text-white focus:outline-none focus:border-[var(--color-primary)] flex items-center justify-between"
                >
                  <span className={projectType ? '' : 'text-[var(--color-muted)]'}>
                    {PROJECT_OPTIONS.find((o) => o.value === projectType)?.label ?? 'Select...'}
                  </span>
                  <span className="text-[var(--color-muted)]" aria-hidden>{dropdownOpen ? '▲' : '▼'}</span>
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-10 mt-1 w-full min-w-[200px] max-w-[calc(100vw-3rem)] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-xl overflow-hidden"
                    >
                      {PROJECT_OPTIONS.map((opt) => (
                        <li key={opt.value || 'empty'}>
                          <button
                            type="button"
                            className="w-full px-4 py-3 text-left text-[var(--color-text)] hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                            onClick={() => {
                              setProjectType(opt.value)
                              setDropdownOpen(false)
                            }}
                          >
                            {opt.label}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text)] mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  maxLength={MAX_MESSAGE}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border)] text-white placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)] resize-none"
                  placeholder="Goals, timeline, budget (if you have one in mind)..."
                />
              </div>
              {error && (
                <p className="text-sm text-red-400" role="alert">{error}</p>
              )}
              <p className="text-sm text-[var(--color-muted)] flex flex-wrap items-center justify-center gap-x-1">
                I have read all the{' '}
                <button
                  type="button"
                  onClick={() => setTermsModalOpen(true)}
                  className="text-[var(--color-accent)] hover:text-[var(--color-primary)] underline focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded"
                >
                  terms and agreement
                </button>
                {' '}and I agree to them.
                {agreedToTerms && (
                  <span className="text-[var(--color-primary)]" aria-hidden>✓</span>
                )}
              </p>
              <button
                type="submit"
                disabled={submitting || !agreedToTerms}
                className="w-full py-4 rounded-full bg-[var(--color-primary)] text-white font-semibold hover:opacity-90 transition-opacity glow disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending…' : 'Send'}
              </button>
            </motion.form>
          )}
        </ScrollReveal>
      </section>
    </>
  )
}
