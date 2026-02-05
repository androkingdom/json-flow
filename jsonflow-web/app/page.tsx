import Footer from "@/features/shared/components/Footer";
import Header from "@/features/shared/components/Header";
import Workspace from "@/features/workspace/components/Workspace";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Header />
      <Workspace />
      <Footer />
    </div>
  );
}
