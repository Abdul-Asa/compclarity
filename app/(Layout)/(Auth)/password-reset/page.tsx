import { redirect } from "next/navigation";
import { PasswordResetForm } from "./PasswordResetForm";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";

interface pageProps {}

const page = async ({}: pageProps) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (!error && data?.user) {
    redirect("/account");
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <Card>
        <PasswordResetForm />
      </Card>
    </div>
  );
};
export default page;
