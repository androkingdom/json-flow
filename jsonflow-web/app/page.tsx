import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Workspace from "@/components/Workspace";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Header />
      <Workspace />
      <Footer />
    </div>
  );
}
