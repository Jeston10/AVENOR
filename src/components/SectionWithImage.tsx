import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  imageSrc: string
  imageAlt: string
  children: ReactNode
  imageLeft?: boolean
  className?: string
}

export default function SectionWithImage({
  imageSrc,
  imageAlt,
  children,
  imageLeft = true,
  className = '',
}: Props) {
  const imageCol = (
    <motion.div
      className="relative min-h-[280px] md:min-h-[400px] rounded-2xl overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <motion.img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.35 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/60 to-transparent pointer-events-none" />
    </motion.div>
  )

  const contentCol = <div className="flex flex-col justify-center">{children}</div>

  return (
    <motion.section
      className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      {imageLeft ? (
        <>
          {imageCol}
          {contentCol}
        </>
      ) : (
        <>
          {contentCol}
          {imageCol}
        </>
      )}
    </motion.section>
  )
}
