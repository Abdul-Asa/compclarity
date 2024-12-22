import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PasswordResetForm } from "@/app/(Layout)/_old/password-reset/PasswordResetForm";
import AccountForm from "./AccountForm";
import { SignOutButton } from "@/components/layout/navbar/sign-out";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getUser } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "CompClarity - Account",
  description:
    "CompClarity's mission is dedicated to demystifying compensation packages across Europe, by ensuring that you have all the information required to understand your worth and make informed decisions.",
};

export default async function page() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  if (!user.signup_flow) {
    redirect("/auth/onboarding");
  }

  const userInfo = {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
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
            <AccountForm userData={userInfo} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
