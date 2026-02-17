import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
}

export default function StaggerList({
  children,
  className = '',
  staggerDelay = 0.08,
  initialDelay = 0,
}: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  )
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
