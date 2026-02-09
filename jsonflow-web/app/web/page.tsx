import Workspace from "@/features/workspace/components/Workspace";

export default function WebPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Workspace />
    </div>
  );
}
