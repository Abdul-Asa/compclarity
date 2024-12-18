import { OnboardingForm } from "@/components/forms/OnboardingForm";
import { getUser } from "@/lib/supabase/queries";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Onboarding() {
  const user = await getUser();
  const signinFlow = cookies().get("signin_flow");

  if (!user || !signinFlow) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex items-center justify-center h-screen container w-full">
      <OnboardingForm />
    </div>
  );
}
