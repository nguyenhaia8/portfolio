import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { SectionHeading } from "../components/SectionHeading";

import { Section } from "./Section";
import vnggamesshop from "../assets/image/vnggamesshop.png";
import vnggamesclub from "../assets/image/vnggamesclub.png";

type Project = {
  title: string;
  description: string;
  github?: string;
  demo?: string;
  image: string;
};

const projects: Project[] = [
  {
    title: "VNGGames Shop",
    description:
      "A large-scale gaming storefront used by millions of users, designed to deliver fast product discovery and a seamless checkout experience. Focused on performance optimization, responsive UI, and reducing checkout friction to improve conversion rates.",
    image: vnggamesshop,
    demo: "https://shop.vnggames.com/vn",
  },
  {
    title: "VNGGames Club",
    description:
      "A loyalty and rewards platform for the VNGGames ecosystem that allows gamers to track membership levels, redeem rewards, and access exclusive promotions.",
    image: vnggamesclub,
    demo: "https://club.vnggames.com/",
  },
];

function ScreenshotPlaceholder({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-subtle bg-[rgba(var(--fg-rgb),0.03)]">
      <div className="aspect-[16/10] w-full" />
      <div className="absolute inset-0 opacity-80 [background:radial-gradient(circle_at_20%_25%,rgba(var(--primary-rgb),0.18),transparent_55%),radial-gradient(circle_at_80%_35%,rgba(var(--primary-2-rgb),0.16),transparent_55%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
    </div>
  );
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
            viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            transition={{ duration: 0.45, delay: idx * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <Card className="group h-full overflow-hidden p-5">
              <div className="flex flex-col h-full justify-between">
                <div className="grid gap-5">
                  <ScreenshotPlaceholder title={p.title} image={p.image} />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold tracking-tight">
                        {p.title}
                      </p>
                      <p className="mt-1 text-sm text-muted">{p.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row mt-4">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1"
                    >
                      <Button variant="secondary" className="w-full">
                        <FiGithub /> GitHub
                      </Button>
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full">
                        <FiExternalLink /> Visit
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
