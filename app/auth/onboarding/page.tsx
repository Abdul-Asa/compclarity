import { OnboardingForm } from "@/components/forms/OnboardingForm";
import { getUser } from "@/lib/actions/server-actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Onboarding() {
  const user = await getUser();

  //if no user, redirect to sign-in
  if (!user) {
    redirect("/auth/sign-in");
  }

  //if user has completed signup, redirect to account
  if (user.onboarding_completed) {
    redirect("/account");
  }

  return (
    <div className="p-6 container w-full">
      <OnboardingForm />
    </div>
  );
}
