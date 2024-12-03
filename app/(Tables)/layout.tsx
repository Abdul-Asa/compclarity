export default async function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return <main className="container mx-auto pb-20 pt-10">{children}</main>;
}
