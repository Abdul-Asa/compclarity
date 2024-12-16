import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex relative min-h-screen w-full bg-background flex-col items-center justify-between font-space text-foreground">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
