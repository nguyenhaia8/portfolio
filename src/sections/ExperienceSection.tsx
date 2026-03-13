import { motion } from 'framer-motion'
import { Badge } from '../components/Badge'
import { Card } from '../components/Card'
import { SectionHeading } from '../components/SectionHeading'
import { Section } from './Section'

export function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Shipping at scale"
        subtitle="A snapshot of recent impact in high-traffic products and cross-functional teams."
      />

      <div className="grid gap-5">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px -10% 0px' }}
          transition={{ duration: 0.45 }}
        >
          <Card className="p-6">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-base font-semibold tracking-tight">
                  Frontend Engineer — VNG Corporation
                </p>
                <p className="mt-1 text-sm text-muted">2020–2025</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>React</Badge>
                <Badge>TypeScript</Badge>
                <Badge>Performance</Badge>
                <Badge>Design systems</Badge>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-sm font-medium tracking-tight">
                  Responsibilities
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  <li>
                    • Built scalable frontend features for gaming and e-commerce
                    platforms, collaborating closely with product, design, and
                    backend teams.
                  </li>
                  <li>
                    • Improved checkout performance and reduced page load time
                    through profiling, code-splitting, and rendering
                    optimizations.
                  </li>
                  <li>
                    • Optimized UI for high traffic systems with careful state
                    management, caching, and resilient error handling.
                  </li>
                  <li>
                    • Established reusable component patterns and accessibility
                    guardrails to speed up development while improving quality.
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-subtle bg-[rgba(var(--fg),0.03)] p-5">
                  <p className="text-sm font-medium tracking-tight">
                    Highlights
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-muted">
                    <li>• Faster critical flows with measurable performance wins</li>
                    <li>• Strong handoff and collaboration with design systems</li>
                    <li>• Ownership mindset from scope to delivery</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  )
}

