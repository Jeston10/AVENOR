import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display font-bold text-6xl md:text-7xl text-white mb-2">404</h1>
        <p className="text-[var(--color-muted)] text-lg mb-8">
          Page not found. The link may be broken or the page has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-semibold px-8 py-3 hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </motion.div>
    </section>
  )
}
