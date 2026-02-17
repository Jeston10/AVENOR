import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TAC_CONTENT = `1. Introduction

Welcome to Avenor. These Terms and Conditions govern all website development, design, consulting, and related digital services provided by Avenor ("Company", "We", "Us", or "Our") to clients ("Client", "You", or "Your").

By engaging Avenor's services, you agree to be bound by these Terms and Conditions.

2. Scope of Services

Avenor provides professional digital services including but not limited to:

• Business website development
• E-commerce development
• SaaS platform development
• Web application development
• AI-integrated solutions
• UI/UX design
• Website optimization
• Maintenance and support services

The specific scope of work will be defined in a written proposal, quotation, or service agreement prior to project commencement.

3. Pricing & Payments
3.1 Pricing Structure

All pricing is based on project scope, complexity, and feature requirements.

Clients are advised to refer to the Pricing Page on our website for standard package rates.

For customized solutions or enterprise-level requirements, pricing will be provided upon consultation.

For all pricing inquiries, clients may contact: avenordevs@gmail.com

3.2 Payment Terms

Unless otherwise agreed in writing:

• 40% non-refundable deposit required before project initiation
• 30% due upon design approval
• 30% due before final delivery and deployment

Work will not commence until the initial deposit is received.

Failure to complete final payment may result in suspension of project files, access credentials, or deployment rights.

4. Revisions Policy

Avenor provides a structured revision window after initial design and development delivery.

• A maximum of five (5) revisions per website contract window is allowed after a website order is made.
• Revisions must be requested within the defined review period communicated during the project timeline.
• Revisions apply only to the originally agreed scope of work.
• Major structural changes, new features, or scope alterations will be treated as additional work and may incur extra charges.

Unused revisions do not carry forward to future phases or projects.

5. Project Timelines

Project timelines are estimated based on: scope complexity, client responsiveness, content availability, approval turnaround times.

Delays in providing required materials, feedback, or approvals may extend the project timeline.

Avenor is not responsible for delays caused by third-party services or hosting providers.

6. Client Responsibilities

The Client agrees to: provide accurate project requirements; supply necessary content (text, images, branding assets); review deliverables promptly; make payments on time; ensure legal rights to any materials provided.

Avenor is not responsible for copyright issues related to client-supplied content.

7. Intellectual Property
7.1 Ownership

Upon full payment: The Client will own the final website deliverables. Avenor retains the right to showcase the project in its portfolio and marketing materials unless otherwise agreed.

7.2 Pre-Existing Materials

Any proprietary frameworks, internal tools, or reusable components developed by Avenor remain the intellectual property of Avenor.

8. Third-Party Services

Projects may include integration with third-party services such as hosting providers, payment gateways, CMS platforms, analytics tools, APIs.

Avenor is not liable for service interruptions, security breaches, or policy changes made by third-party providers.

9. Maintenance & Support

Maintenance services are separate from development services unless included in the agreed package.

Ongoing support may be offered under: monthly maintenance plans, annual service contracts, retainer agreements.

Failure to renew maintenance plans may result in discontinued support.

10. Limitation of Liability

Avenor shall not be liable for: indirect or consequential damages; business loss or revenue loss; data loss due to external breaches; security issues caused by third-party hosting or plugins.

Total liability shall not exceed the total project fee paid by the Client.

11. Termination

Either party may terminate the project with written notice.

If termination occurs: the deposit remains non-refundable; work completed up to the termination date will be billed; deliverables will be provided only upon cleared payment.

12. Confidentiality

Avenor agrees to keep all client information confidential and will not disclose sensitive business data without consent, except where required by law.

13. Governing Law

These Terms shall be governed in accordance with the applicable laws of the jurisdiction in which Avenor operates.

14. Amendments

Avenor reserves the right to modify these Terms at any time. Updated versions will be posted on the official website.

15. Contact Information

For pricing inquiries, custom quotes, or legal concerns: Email: avenordevs@gmail.com — Company Name: Avenor`

type Props = {
  isOpen: boolean
  onClose: () => void
  onAgree: () => void
}

export default function TermsAndConditionsModal({ isOpen, onClose, onAgree }: Props) {
  const [hasReachedBottom, setHasReachedBottom] = useState(false)
  const [checked, setChecked] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    const atBottom = scrollHeight - scrollTop - clientHeight < 24
    setHasReachedBottom((prev) => (atBottom ? true : prev))
  }, [])

  const handleClose = () => {
    setHasReachedBottom(false)
    setChecked(false)
    onClose()
  }

  const handleAgreeAndClose = () => {
    if (checked) {
      onAgree()
      handleClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-title"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl glass border border-[var(--color-border)] shadow-2xl overflow-hidden"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]/98 backdrop-blur-sm px-6 py-4">
              <h2 id="terms-title" className="font-display font-bold text-xl text-white">
                Terms and Agreement
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg p-2 text-[var(--color-muted)] hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                aria-label="Close"
              >
                <span className="text-lg leading-none">×</span>
              </button>
            </div>

            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="max-h-[55vh] overflow-y-auto overflow-x-hidden scrollbar-hide px-6 py-5 text-[var(--color-text)] text-sm leading-relaxed scroll-smooth"
            >
              {TAC_CONTENT.split(/\n\n+/).map((block, i) => {
                const trimmed = block.trim()
                const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean)
                const mainHeading = /^\d+\.\s+[A-Z]/
                const subHeading = /^\d+\.\d+\s+[A-Z]/

                if (lines.length >= 2 && mainHeading.test(lines[0]) && subHeading.test(lines[1])) {
                  return (
                    <div key={i} className="mt-6 first:mt-0">
                      <p className="font-display font-semibold text-white mb-1">{lines[0]}</p>
                      <p className="font-display font-semibold text-[var(--color-accent)] mb-2">{lines[1]}</p>
                    </div>
                  )
                }
                if (lines.length === 1 && subHeading.test(lines[0])) {
                  return (
                    <p key={i} className="font-display font-semibold text-[var(--color-accent)] mt-4 mb-2">
                      {lines[0]}
                    </p>
                  )
                }
                if (lines.length === 1 && mainHeading.test(lines[0])) {
                  return (
                    <p key={i} className="font-display font-semibold text-white mt-6 mb-2 first:mt-0">
                      {lines[0]}
                    </p>
                  )
                }
                return (
                  <p key={i} className="mb-3 text-[var(--color-muted)]">
                    {trimmed}
                  </p>
                )
              })}
            </div>

            <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-6 py-4 text-center">
              <label className="flex items-center justify-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={!hasReachedBottom}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="peer sr-only"
                  aria-hidden
                />
                <span
                  className={`
                    relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200
                    ${checked
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                      : 'border-[var(--color-border)] bg-white/5'
                    }
                    ${hasReachedBottom
                      ? 'group-hover:border-[var(--color-accent)]/60'
                      : 'opacity-60 cursor-not-allowed'
                    }
                  `}
                >
                  {checked && (
                    <svg className="h-3 w-3 text-white" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 5l3.5 3.5L11 1" />
                    </svg>
                  )}
                </span>
                <span
                  className={
                    hasReachedBottom
                      ? 'text-[var(--color-text)]'
                      : 'text-[var(--color-muted)]'
                  }
                >
                  I have read all the terms and agreement and I agree to them.
                </span>
              </label>
              <div className="mt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl text-[var(--color-muted)] hover:bg-white/10 hover:text-white transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleAgreeAndClose}
                  disabled={!checked}
                  className="px-5 py-2 rounded-xl bg-[var(--color-primary)] text-white font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  I Agree
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
