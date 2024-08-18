export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <main className="container mx-auto my-1 flex h-full w-full flex-col justify-between">
        {children}
      </main>
    </div>
  );
}
