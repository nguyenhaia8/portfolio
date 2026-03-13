import { motion } from 'framer-motion'
import type { PropsWithChildren, ReactNode } from 'react'
import { FiCloud, FiTarget } from 'react-icons/fi'
import {
  SiCss,
  SiDocker,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiWebpack,
} from 'react-icons/si'
import { Card } from '../components/Card'
import { SectionHeading } from '../components/SectionHeading'
import { Section } from './Section'

function SkillCard({ title, icon }: { title: string; icon: ReactNode }) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.18 }}>
      <Card className="h-full p-4">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-subtle bg-[rgba(var(--fg),0.03)]">
            <span className="text-[rgb(var(--fg))]">{icon}</span>
          </div>
          <div>
            <p className="text-sm font-medium tracking-tight">{title}</p>
            <p className="text-xs text-muted">Production experience</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function Category({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold tracking-tight">{title}</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </div>
  )
}

export function SkillsSection() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="Tools I use to ship reliable, fast UI."
        subtitle="A balanced stack: modern frontend frameworks, test/tooling, and the fundamentals that make systems scale."
      />

      <div className="grid gap-10">
        <Category title="Frontend">
          <SkillCard title="React" icon={<SiReact />} />
          <SkillCard title="Next.js" icon={<SiNextdotjs />} />
          <SkillCard title="TypeScript" icon={<SiTypescript />} />
          <SkillCard title="JavaScript" icon={<SiJavascript />} />
          <SkillCard title="HTML5" icon={<SiHtml5 />} />
          <SkillCard title="CSS3" icon={<SiCss />} />
          <SkillCard title="TailwindCSS" icon={<SiTailwindcss />} />
        </Category>

        <Category title="Tools">
          <SkillCard title="Git" icon={<SiGit />} />
          <SkillCard title="Docker" icon={<SiDocker />} />
          <SkillCard title="AWS" icon={<FiCloud />} />
          <SkillCard title="Vite" icon={<SiVite />} />
          <SkillCard title="Webpack" icon={<SiWebpack />} />
          <SkillCard title="Jest" icon={<SiJest />} />
          <SkillCard title="Playwright" icon={<FiTarget />} />
        </Category>

        <div className="grid gap-3">
          <p className="text-sm font-semibold tracking-tight">Concepts</p>
          <div className="grid gap-3 lg:grid-cols-2">
            {[
              {
                title: 'Performance optimization',
                desc: 'Profiling, bundle strategy, rendering efficiency, and caching patterns.',
              },
              {
                title: 'Core Web Vitals',
                desc: 'LCP/INP/CLS-oriented engineering and real-user monitoring mindset.',
              },
              {
                title: 'System design basics',
                desc: 'Component boundaries, API contracts, state management, and scaling trade-offs.',
              },
              {
                title: 'Responsive design',
                desc: 'Mobile-first layouts, fluid typography, and resilient UI patterns.',
              },
              {
                title: 'Accessibility (WCAG)',
                desc: 'Keyboard navigation, focus management, semantics, and contrast discipline.',
              },
            ].map((c) => (
              <motion.div
                key={c.title}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.18 }}
              >
                <Card className="p-5">
                  <p className="text-sm font-medium tracking-tight">{c.title}</p>
                  <p className="mt-1 text-sm text-muted">{c.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

