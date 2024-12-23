import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AccountForm from "../../../../components/forms/AccountForm";
import type { Metadata } from "next";
import { getUser } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings",
};

export default async function Account() {
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
