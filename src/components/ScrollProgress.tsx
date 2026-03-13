import { motion, useSpring } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()
  const scaleX = useSpring(progress, { stiffness: 220, damping: 30, mass: 0.3 })

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px]">
      <motion.div
        style={{ scaleX }}
        className="h-full origin-left bg-gradient-to-r from-[var(--primary)] via-[var(--primary-2)] to-[var(--primary)]"
      />
    </div>
  )
}

