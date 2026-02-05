import DocsContent from "@/features/docs/components/DocsContent";
import ThemeToggle from "@/features/shared/components/ThemeToggle";

export default function DocsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="flex justify-end px-6 py-4">
        <ThemeToggle />
      </div>
      <DocsContent />
    </div>
  );
}
