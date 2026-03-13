import { motion } from 'framer-motion'
import { Card } from '../components/Card'
import { SectionHeading } from '../components/SectionHeading'
import { Section } from './Section'

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title="Building polished products with engineering rigor."
        subtitle="I care about the details—performance, accessibility, and clean architecture that scales with teams."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="p-6 lg:col-span-7">
          <div className="space-y-4 text-left text-sm text-muted sm:text-base">
            <p>
              I’m a frontend engineer with <span className="text-[rgb(var(--fg))] font-medium">5+ years</span>{' '}
              of experience building modern web apps with React, TypeScript, and
              the broader JavaScript ecosystem. I’ve shipped scalable
              user-facing features across industries like e-commerce, blockchain,
              and gaming.
            </p>
            <p>
              I specialize in building design systems, component libraries, and
              high-performance UI workflows. I’m especially focused on{' '}
              <span className="text-[rgb(var(--fg))] font-medium">Core Web Vitals</span>, runtime efficiency, and
              maintainable code patterns that help teams move fast without
              breaking quality.
            </p>
            <p>
              I’ve worked closely with designers and backend engineers to
              deliver features end-to-end, from prototypes to production, with
              solid testing and CI/CD practices.
            </p>
          </div>
        </Card>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20% 0px -10% 0px' }}
            transition={{ duration: 0.5 }}
            className="grid gap-4"
          >
            <Card className="p-6">
              <p className="text-left text-sm font-medium tracking-tight">
                Experience with
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'React',
                  'Next.js',
                  'Redux',
                  'TypeScript',
                  'REST APIs',
                  'AWS',
                  'Docker',
                  'CI/CD',
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-subtle bg-[rgba(var(--fg),0.03)] px-3 py-1 text-sm text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <p className="text-left text-sm font-medium tracking-tight">
                What you can expect
              </p>
              <ul className="mt-4 space-y-2 text-left text-sm text-muted">
                <li>• Production-ready UI craft and strong component hygiene</li>
                <li>• Thoughtful trade-offs and clear technical communication</li>
                <li>• Ownership mindset with measurable performance wins</li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

