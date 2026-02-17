import { motion } from 'framer-motion'

type Props = {
  src: string
  alt: string
  className?: string
}

export default function SectionImageBlock({ src, alt, className = '' }: Props) {
  return (
    <motion.section
      className={`py-12 px-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-[var(--color-border)] relative h-56 md:h-72"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.section>
  )
}
