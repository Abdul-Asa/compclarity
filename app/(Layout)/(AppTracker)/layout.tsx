import { createClient } from "@/lib/supabase/server";
import TrackerPage from "./TrackerPage";

export default async function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return <TrackerPage />;
  }

  return (
    <div className="my-1 flex w-full flex-col items-center justify-center">
      <main className="mx-auto my-5 flex max-w-[98vw] items-center justify-center">
        {children}
      </main>
    </div>
  );
}
