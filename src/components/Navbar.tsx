import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { FiGithub, FiLinkedin, FiMail, FiMenu, FiX } from 'react-icons/fi'
import { cn } from '../lib/cn'
import { Container } from './Container'
import { IconButton } from './IconButton'
import { ThemeToggle } from './ThemeToggle'

type NavItem = { id: string; label: string }

const nav: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const socials = useMemo(
    () => [
      { label: 'Email', href: 'mailto:hai.nguyen@example.com', icon: <FiMail /> },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hai-nguyen', icon: <FiLinkedin /> },
      { label: 'GitHub', href: 'https://github.com/hai-nguyen', icon: <FiGithub /> },
    ],
    [],
  )

  return (
    <header className="sticky top-0 z-50 border-b border-subtle bg-[rgba(var(--bg),0.72)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(var(--bg),0.58)]">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => scrollToId('home')}
            className="focus-ring group inline-flex items-center gap-2 rounded-xl px-2 py-1"
          >
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-xl border border-subtle bg-[rgb(var(--card))]">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--primary-2))]" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">
              Hai Nguyen
            </span>
            <span className="hidden text-sm text-slate-200 sm:inline">
              · Frontend Engineer
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="focus-ring rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-subtle bg-[rgb(var(--card))] text-[rgb(var(--card-fg))] transition hover:bg-[rgba(var(--fg),0.06)]"
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <ThemeToggle />
            <div className="md:hidden">
              <IconButton
                label={open ? 'Close menu' : 'Open menu'}
                icon={open ? <FiX /> : <FiMenu />}
                onClick={() => setOpen((v) => !v)}
              />
            </div>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden"
          >
            <Container>
              <div className="pb-4">
                <div className="grid gap-1 rounded-2xl border border-subtle bg-[rgb(var(--card))] p-2">
                  {nav.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollToId(item.id)
                        setOpen(false)
                      }}
                      className={cn(
                        'focus-ring rounded-xl px-3 py-2 text-left text-sm transition',
                        'text-[rgb(var(--card-fg))] hover:bg-[rgba(var(--fg),0.06)]',
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="my-1 h-px bg-[rgb(var(--border))]" />
                  <div className="flex flex-wrap gap-2 px-1 pb-1">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target={s.href.startsWith('http') ? '_blank' : undefined}
                        rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="focus-ring inline-flex items-center gap-2 rounded-xl border border-subtle px-3 py-2 text-sm text-muted transition hover:bg-[rgba(var(--fg),0.06)] hover:text-[rgb(var(--fg))]"
                      >
                        {s.icon}
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

