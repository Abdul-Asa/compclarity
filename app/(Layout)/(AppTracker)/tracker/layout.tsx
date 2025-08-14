export default async function TrackerLayout({ children }: { children: React.ReactNode }) {
  return <div className="container flex flex-col w-full h-full p-4">{children}</div>;
}
