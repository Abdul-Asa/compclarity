import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/server-actions";
import { PasswordSignUp } from "@/components/auth/password-sign-up";

export const metadata: Metadata = {
  title: "Login",
  description: "Register for an account to apply for jobs and track your progress",
};

export default async function Page() {
  const user = await getUser();
  if (user) {
    return redirect("/account");
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-4rem)] max-w-lg px-8 mx-auto">
      <div className="flex flex-col w-full ">
        <h1 className="pb-4 text-xl font-medium md:text-3xl">
          Ready to find your <span className="inline-block transition text-primary hover:-translate-y-3">dream</span>{" "}
          job?
        </h1>

        <p className="pb-1 text-sm font-medium md:text-lg text-muted-foreground">
          Apply effortlessly and track your progress
        </p>

        <div className="flex flex-col mt-6 mb-6 pointer-events-auto">
          <PasswordSignUp />

          <p className="mt-4 text-center ">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="underline text-primary">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-xs text-muted-foreground">
          By clicking continue, you acknowledge that you have read and agree to CompClarity's{" "}
          <Link href="/privacy" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
