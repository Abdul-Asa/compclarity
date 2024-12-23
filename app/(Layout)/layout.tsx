import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex relative min-h-screen w-full flex-col font-space text-foreground bg-neutral">
      <Navbar />
      <div className="flex-1 size-full flex ">{children}</div>
      <Footer />
    </div>
  );
}
