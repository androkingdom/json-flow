"use client";

import { FiExternalLink, FiBookOpen, FiPackage, FiGithub } from "react-icons/fi";
import type { IconType } from "react-icons";

interface QuickLink {
  id: string;
  icon: IconType;
  label: string;
  href: string;
}

const quickLinks: QuickLink[] = [
  {
    id: "live",
    icon: FiExternalLink,
    label: "Live Demo",
    href: "https://json-flow-client.vercel.app",
  },
  {
    id: "hosted-docs",
    icon: FiBookOpen,
    label: "Hosted Docs",
    href: "https://json-flow-client.vercel.app/docs",
  },
  {
    id: "npm",
    icon: FiPackage,
    label: "NPM Package",
    href: "https://www.npmjs.com/package/@andro.dev/jsonflow-engine",
  },
  {
    id: "github",
    icon: FiGithub,
    label: "GitHub",
    href: "https://github.com/androkingdom/json-flow",
  },
];

export function QuickLinks() {
  return (
    <section
      className="border-t px-6 py-16 md:px-12"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {quickLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <a
                key={`${link.id}-${index}`}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors hover:opacity-80"
                style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
              >
                <IconComponent className="h-4 w-4" />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
