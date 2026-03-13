import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { Container } from '../components/Container'

const links = [
  { label: 'Email', href: 'mailto:thanhhai.felix.nguyen@gmail.com', icon: <FiMail /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thanhhai-nguyen/', icon: <FiLinkedin /> },
  { label: 'GitHub', href: 'https://github.com/nguyenhaia8/', icon: <FiGithub /> },
]

export function Footer() {
  return (
    <footer className="border-t border-subtle py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Hai Nguyen. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                className="focus-ring inline-flex items-center gap-2 rounded-xl border border-subtle bg-[rgba(var(--fg-rgb),0.03)] px-3 py-2 text-sm text-muted transition hover:bg-[rgba(var(--fg-rgb),0.06)] hover:text-[var(--fg)]"
              >
                {l.icon}
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}

