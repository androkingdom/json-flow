import {
  HeroSection,
  VideoDemo,
  FeaturesSection,
  QuickLinks,
} from "@/features/landing/components";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <HeroSection />
      <VideoDemo />
      <FeaturesSection />
      <QuickLinks />
    </div>
  );
}
