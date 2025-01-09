import type { Metadata } from "next";
import { ProfileProgress } from "@/components/layout/account/profile-progress";
import { getUser } from "@/lib/actions/profile";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/forms/profile-form";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings",
};

export default async function Account() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/signin");
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* <ProfileProgress initialData={user} /> */}
      <div className="col-span-2 rounded-sm ">{/* <ProfileForm {...user} /> */}</div>
    </div>
  );
}
