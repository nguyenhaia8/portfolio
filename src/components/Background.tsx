import { motion } from 'framer-motion'

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[rgb(var(--bg))]" />
      <motion.div
        className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(var(--primary),0.22), transparent 60%)',
        }}
        animate={{ x: [0, 24, 0], y: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-28 top-[20%] h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 40% 50%, rgba(var(--primary-2),0.18), transparent 58%)',
        }}
        animate={{ x: [0, -26, 0], y: [0, 22, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(120,120,130,0.7)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(var(--fg),0.04)]" />
    </div>
  )
}

