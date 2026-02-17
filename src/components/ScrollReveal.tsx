import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Variant = 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  variant?: Variant
}

const variants = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
} satisfies Record<Variant, { initial: { opacity: number; y?: number; x?: number; scale?: number }; visible: { opacity: number; y?: number; x?: number; scale?: number } }>

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  variant = 'fadeUp',
}: Props) {
  const v = variants[variant]
  return (
    <motion.div
      initial={v.initial}
      whileInView={v.visible}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
