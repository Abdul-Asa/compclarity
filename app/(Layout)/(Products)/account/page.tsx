import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import AccountForm from "./AccountForm";
import { PasswordResetForm } from "@/app/(Layout)/(Auth)/password-reset/PasswordReset";

export const metadata: Metadata = {
  title: "CompClarity - Account",
  description:
    "CompClarity's mission is dedicated to demystifying compensation packages across Europe, by ensuring that you have all the information required to understand your worth and make informed decisions.",
};

export default async function page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const user = {
    email: data.user.email || "",
    first_name: data.user.user_metadata?.first_name,
    last_name: data.user.user_metadata?.last_name,
  };

  return (
    <div className="flex flex-col max-w-5xl gap-10">
      <div className="grid grid-cols-2 gap-10">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader className="p-6">
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your profile details.</CardDescription>
          </CardHeader>
          <CardContent>
            <AccountForm userData={user} />
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1">
          <PasswordResetForm />
        </Card>
      </div>
    </div>
  );
}
