export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="container flex flex-col justify-between w-full h-full mx-auto my-1">{children}</main>;
}
