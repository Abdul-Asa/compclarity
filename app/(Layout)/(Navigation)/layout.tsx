export default async function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="container mx-auto pb-20 pt-10">{children}</main>;
}
