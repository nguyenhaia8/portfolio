import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { SectionHeading } from '../components/SectionHeading'
import { Section } from './Section'

type FormState = {
  name: string
  email: string
  message: string
}

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  })

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s build something great."
        subtitle="Reach out for roles, collaborations, or just to connect."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="p-6 lg:col-span-5">
          <p className="text-left text-sm font-medium tracking-tight">
            Contact details
          </p>
          <div className="mt-4 grid gap-3 text-left text-sm">
            <a
              className="focus-ring inline-flex items-center gap-3 rounded-xl border border-subtle bg-[rgba(var(--fg-rgb),0.03)] p-3 text-muted transition hover:bg-[rgba(var(--fg-rgb),0.06)] hover:text-[var(--custom)]"
              href="mailto:thanhhai.felix.nguyen@gmail.com"
            >
              <FiMail /> thanhhai.felix.nguyen@gmail.com
            </a>
            <a
              className="focus-ring inline-flex items-center gap-3 rounded-xl border border-subtle bg-[rgba(var(--fg-rgb),0.03)] p-3 text-muted transition hover:bg-[rgba(var(--fg-rgb),0.06)] hover:text-[var(--custom)]"
              href="https://www.linkedin.com/in/thanhhai-nguyen/"
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin /> LinkedIn
            </a>
            <a
              className="focus-ring inline-flex items-center gap-3 rounded-xl border border-subtle bg-[rgba(var(--fg-rgb),0.03)] p-3 text-muted transition hover:bg-[rgba(var(--fg-rgb),0.06)] hover:text-[var(--custom)]"
              href="https://github.com/nguyenhaia8/"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub /> GitHub
            </a>
          </div>

          <p className="mt-5 text-left text-sm text-muted">
            Prefer email? I usually respond within 24–48 hours.
          </p>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px -10% 0px' }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-7"
        >
          <Card className="p-6">
            <p className="text-left text-sm font-medium tracking-tight">
              Send a message
            </p>
            <form
              className="mt-4 grid gap-3"
              onSubmit={(e) => {
                e.preventDefault()
                setStatus('sent')
                setTimeout(() => setStatus('idle'), 2500)
                setForm({ name: '', email: '', message: '' })
              }}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1 text-left text-sm">
                  <span className="text-muted">Name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="focus-ring h-11 rounded-xl border border-subtle bg-[var(--card)] px-3 text-sm"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-1 text-left text-sm">
                  <span className="text-muted">Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="focus-ring h-11 rounded-xl border border-subtle bg-[var(--card)] px-3 text-sm"
                    placeholder="you@company.com"
                  />
                </label>
              </div>
              <label className="grid gap-1 text-left text-sm">
                <span className="text-muted">Message</span>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="focus-ring min-h-[140px] resize-none rounded-xl border border-subtle bg-[var(--card)] p-3 text-sm"
                  placeholder="Tell me about the role or project..."
                />
              </label>

              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-sm text-muted">
                  {status === 'sent' ? (
                    <span className="text-[var(--fg)]">Message ready to send (demo).</span>
                  ) : (
                    'This form is a lightweight demo—wire it to your backend when ready.'
                  )}
                </p>
                <Button type="submit">
                  Send <FiSend />
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </Section>
  )
}

