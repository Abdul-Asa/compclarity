import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex relative min-h-screen w-full bg-background flex-col items-center justify-between font-space text-foreground bg-neutral">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
