"use client";

import { FiCheckCircle, FiRefreshCw, FiGrid, FiZap, FiBox } from "react-icons/fi";
import type { IconType } from "react-icons";

interface Feature {
  id: string;
  icon: IconType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: "validation",
    icon: FiCheckCircle,
    title: "Schema Validation",
    description: "Zod-powered validation ensures your JSON matches the expected structure before rendering.",
  },
  {
    id: "semantic",
    icon: FiRefreshCw,
    title: "Semantic Checks",
    description: "Detect unreachable nodes, invalid edge references, and cyclic dependencies automatically.",
  },
  {
    id: "adapter",
    icon: FiBox,
    title: "Adapter Pattern",
    description: "Renderer-agnostic engine output. Swap Cytoscape for any renderer without changing your data.",
  },
  {
    id: "shapes",
    icon: FiGrid,
    title: "Node Shapes",
    description: "Customize node appearances with built-in shapes: ellipse, rectangle, diamond, hexagon, and more.",
  },
  {
    id: "preview",
    icon: FiZap,
    title: "Real-time Preview",
    description: "Monaco-powered editor with instant visual feedback. See changes as you type.",
  },
];

export function FeaturesSection() {
  return (
    <section className="border-t px-6 py-20 md:px-12 md:py-28" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for Developers</h2>
          <p className="mt-4 text-lg" style={{ color: "var(--text-secondary)" }}>
            Everything you need to visualize structured data
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={`${feature.id}-${index}`}
                className="group rounded-2xl border p-6 transition-all hover:-translate-y-1"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--bg-secondary)",
                }}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "var(--bg-tertiary)" }}
                >
                  <IconComponent className="h-6 w-6" style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
