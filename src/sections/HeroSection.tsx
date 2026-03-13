import { motion } from "framer-motion";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Section } from "./Section";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HeroSection() {
  return (
    <Section id="home" className="pt-10 sm:pt-14">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="inline-flex flex-wrap items-center gap-2"
          >
            <Badge className="border-none bg-[var(--primary)] text-white shadow-sm text-[14px]">
              Available for US-based roles
            </Badge>
            <Badge className="bg-[rgba(var(--bg-rgb),0.85)] text-[var(--fg)] text-[14px]">
              React · Next.js · TypeScript
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.05,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Hai Nguyen
            <span className="block text-muted">Software Engineer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="mt-5 max-w-xl text-pretty text-base text-muted sm:text-lg"
          >
            Software Engineer with 5+ years of experience building scalable and
            high-performance web applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button onClick={() => scrollToId("projects")}>
              View Projects <FiArrowRight className="text-base" />
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              Download Resume <FiDownload className="text-base" />
            </Button>
            <Button variant="ghost" onClick={() => scrollToId("contact")}>
              Contact Me <FiMail className="text-base" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
              Open to interviews
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-[var(--border)] sm:inline" />
            <span>
              Focus: performance, UX polish, maintainable architecture
            </span>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="relative overflow-hidden rounded-3xl border border-subtle bg-[var(--card)] p-6 shadow-[var(--shadow)]"
          >
            <div className="absolute inset-0 opacity-80 [background:radial-gradient(circle_at_20%_20%,rgba(var(--primary-rgb),0.22),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(var(--primary-2-rgb),0.18),transparent_55%)]" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium tracking-tight text-muted">
                  Highlight reel
                </p>
                <span className="rounded-full border border-subtle bg-[rgba(var(--fg-rgb),0.03)] px-3 py-1 text-xs text-muted">
                  2020–2025
                </span>
              </div>
              <ul className="mt-5 grid gap-3 text-sm text-muted">
                <li className="rounded-2xl border border-subtle bg-[rgba(var(--fg-rgb),0.03)] p-4">
                  Built scalable React platforms across e-commerce, blockchain,
                  and gaming.
                </li>
                <li className="rounded-2xl border border-subtle bg-[rgba(var(--fg-rgb),0.03)] p-4">
                  Shipped performance improvements aligned with Core Web Vitals.
                </li>
                <li className="rounded-2xl border border-subtle bg-[rgba(var(--fg-rgb),0.03)] p-4">
                  Strong UX craft: micro-interactions, accessibility, responsive
                  systems.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
