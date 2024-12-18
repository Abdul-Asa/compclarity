import { DeleteAlert } from "./DeleteAlert";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PasswordResetForm } from "@/app/(Layout)/(Auth)/password-reset/PasswordResetForm";
import AccountForm from "./AccountForm";
import { SignOutButton } from "@/components/Buttons/SignOutButton";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "CompClarity - Account",
  description:
    "CompClarity's mission is dedicated to demystifying compensation packages across Europe, by ensuring that you have all the information required to understand your worth and make informed decisions.",
};

export default async function page() {
  const supabase = await createClient();

  if (cookies().get("signin_flow")) {
    redirect("/auth/onboarding");
  }

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/sign-in");
  }

  const user = {
    email: data.user.email || "",
    first_name: data.user.user_metadata?.first_name,
    last_name: data.user.user_metadata?.last_name,
  };

  return (
    <div className="flex max-w-5xl flex-col gap-10">
      <div className="grid grid-cols-2 gap-10">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
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
      <div className="pb-40 sm:pb-0">
        <Card>
          <CardHeader>
            <CardTitle>Sign Out</CardTitle>
          </CardHeader>
          <CardContent>
            <SignOutButton />
            {/* <DeleteAlert userId={data.user.id} /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
