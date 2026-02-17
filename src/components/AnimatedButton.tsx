import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

type BaseProps = {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

type ButtonAsButton = BaseProps & {
  to?: undefined
  type?: 'button' | 'submit'
  onClick?: () => void
}

type ButtonAsLink = BaseProps & {
  to: string
  type?: undefined
  onClick?: undefined
}

type Props = ButtonAsButton | ButtonAsLink

const variants = {
  primary: 'px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold glow inline-block',
  secondary: 'px-6 py-3 rounded-full glass border border-[var(--color-border)] text-white font-semibold inline-block',
  ghost: 'px-6 py-3 rounded-full text-white font-semibold inline-block',
}

const hoverScale = 1.02
const tapScale = 0.98

const MotionLink = motion(Link)

export default function AnimatedButton(props: Props) {
  const { children, className = '', variant = 'primary' } = props
  const baseClass = variants[variant]

  const motionProps = {
    whileHover: {
      scale: hoverScale,
      ...(variant === 'primary' && { boxShadow: '0 0 50px rgba(59, 130, 246, 0.5)' }),
      ...(variant === 'secondary' && {
        backgroundColor: 'var(--color-primary)',
        borderColor: 'var(--color-primary)',
        boxShadow: '0 0 40px var(--color-primary-glow)',
      }),
    },
    whileTap: { scale: tapScale },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  }

  if (props.to != null) {
    return (
      <MotionLink
        to={props.to}
        className={`${baseClass} ${className}`}
        {...motionProps}
      >
        {children}
      </MotionLink>
    )
  }

  return (
    <motion.button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      className={`${baseClass} ${className}`}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
