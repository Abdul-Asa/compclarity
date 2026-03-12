import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import AccountForm from "./AccountForm";
import { PasswordResetForm } from "@/app/(Layout)/(Auth)/password-reset/PasswordReset";
import { SubscriptionManager } from "./SubscriptionManager";
import { getUser } from "@/lib/actions/server-actions";
import { SignOutButton } from "@/components/layout/navbar/sign-out";

export const metadata: Metadata = {
  title: "CompClarity - Account",
  description:
    "CompClarity's mission is dedicated to demystifying compensation packages across Europe, by ensuring that you have all the information required to understand your worth and make informed decisions.",
};

export default async function page() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

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
          <CardHeader className="p-6">
            <CardTitle>Password</CardTitle>
            <CardDescription>Update your password.</CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordResetForm />
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader className="p-6">
            <CardTitle>Subscription</CardTitle>
            <CardDescription>All CompClarity features are free to use.</CardDescription>
          </CardHeader>
          <CardContent>
            <SubscriptionManager />
          </CardContent>
        </Card>
        <div className="col-span-2 lg:hidden">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
