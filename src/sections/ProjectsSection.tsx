import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { SectionHeading } from '../components/SectionHeading'
import { cn } from '../lib/cn'
import { Section } from './Section'

type Project = {
  title: string
  description: string
  tech: string[]
  features: string[]
  github: string
  demo: string
}

const projects: Project[] = [
  {
    title: 'Sneaker E-commerce Platform',
    description:
      'A high-conversion storefront with fast navigation, responsive catalog browsing, and a checkout flow designed for performance.',
    tech: ['React', 'TypeScript', 'Node.js', 'Stripe'],
    features: [
      'Product catalog',
      'Shopping cart',
      'Checkout',
      'Authentication',
      'Responsive UI',
    ],
    github: 'https://github.com/hai-nguyen/sneaker-commerce',
    demo: 'https://demo.example.com/sneaker-commerce',
  },
  {
    title: 'Blockchain Payment Dashboard',
    description:
      'An analytics dashboard for crypto payments with wallet integrations, secure auth, and interactive data visualizations.',
    tech: ['React', 'Redux', 'Web3'],
    features: [
      'Wallet integration',
      'Transaction history',
      'Data visualization',
      'Secure authentication',
    ],
    github: 'https://github.com/hai-nguyen/web3-payments-dashboard',
    demo: 'https://demo.example.com/web3-dashboard',
  },
  {
    title: 'Real-time Chat Application',
    description:
      'A real-time messaging experience featuring presence, notifications, and optimistic UI updates for a snappy feel.',
    tech: ['React', 'WebSocket'],
    features: [
      'Live messaging',
      'User presence',
      'Notifications',
      'Optimistic UI updates',
    ],
    github: 'https://github.com/hai-nguyen/realtime-chat',
    demo: 'https://demo.example.com/realtime-chat',
  },
  {
    title: 'Design System Starter',
    description:
      'A reusable component library with accessible primitives, consistent tokens, and documentation-ready examples.',
    tech: ['React', 'TypeScript', 'Storybook'],
    features: ['Accessible components', 'Token-driven theming', 'Composable patterns'],
    github: 'https://github.com/hai-nguyen/design-system-starter',
    demo: 'https://demo.example.com/design-system',
  },
]

function ScreenshotPlaceholder({ title }: { title: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-subtle bg-[rgba(var(--fg-rgb),0.03)]">
      <div className="aspect-[16/10] w-full" />
      <div className="absolute inset-0 opacity-80 [background:radial-gradient(circle_at_20%_25%,rgba(var(--primary-rgb),0.18),transparent_55%),radial-gradient(circle_at_80%_35%,rgba(var(--primary-2-rgb),0.16),transparent_55%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-xs font-medium tracking-wide text-muted">
          Screenshot placeholder · {title}
        </p>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work"
        subtitle="Realistic examples that reflect the kind of products I build: fast, reliable, and polished."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((p, idx) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20% 0px -10% 0px' }}
            transition={{ duration: 0.45, delay: idx * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <Card className="group h-full overflow-hidden p-5">
              <div className="grid gap-5">
                <ScreenshotPlaceholder title={p.title} />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold tracking-tight">
                      {p.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">{p.description}</p>
                  </div>
                  <div
                    className={cn(
                      'hidden h-10 w-10 items-center justify-center rounded-2xl border border-subtle',
                      'bg-[rgba(var(--fg-rgb),0.03)] text-[var(--custom)] transition',
                      'group-hover:bg-[rgba(var(--fg-rgb),0.06)] sm:flex',
                    )}
                  >
                    <FiExternalLink />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>

                <ul className="grid gap-1 text-sm text-muted sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className="inline-flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(var(--primary-rgb),0.9)]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <a href={p.github} target="_blank" rel="noreferrer" className="flex-1">
                    <Button variant="secondary" className="w-full">
                      <FiGithub /> GitHub
                    </Button>
                  </a>
                  <a href={p.demo} target="_blank" rel="noreferrer" className="flex-1">
                    <Button className="w-full">
                      <FiExternalLink /> Live demo
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

