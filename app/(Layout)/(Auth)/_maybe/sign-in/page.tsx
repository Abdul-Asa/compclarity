import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { userAgent } from "next/server";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PasswordSignIn } from "@/components/auth/password-sign-in";
import { redirect } from "next/navigation";
import { GoogleSignIn } from "@/components/auth/google-signin";
import { AppleSignIn } from "@/components/auth/apple-signin";
import { LinkedInSignIn } from "@/components/auth/linkedin-signin";
import { getUser } from "@/lib/actions/server-actions";
import { InfoIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to apply for jobs and track your progress",
};

const signInOptions = {
  google: {
    name: "Google",
    component: <GoogleSignIn />,
  },
  apple: {
    name: "Apple",
    component: <AppleSignIn />,
  },
  linkedin: {
    name: "LinkedIn",
    component: <LinkedInSignIn />,
  },
  otp: {
    name: "Email",
    component: <PasswordSignIn />,
  },
};

export default async function Page() {
  const user = await getUser();
  if (user) {
    return redirect("/account");
  }

  const cookieStore = cookies();
  const preferred = cookieStore.get("preferredSignInProvider")?.value ?? "otp";
  const { device } = userAgent({ headers: headers() });
  const isAppleDevice = device?.vendor === "Apple";

  let preferredSignInOption;
  let otherSignInOptions;

  switch (preferred) {
    // case "google":
    //   preferredSignInOption = signInOptions.google.component;
    //   otherSignInOptions = (
    //     <>
    //       {isAppleDevice && signInOptions.apple.component}
    //       {signInOptions.linkedin.component}
    //       {signInOptions.otp.component}
    //     </>
    //   );
    //   break;

    // case "apple":
    //   preferredSignInOption = signInOptions.apple.component;
    //   otherSignInOptions = (
    //     <>
    //       {signInOptions.google.component}
    //       {signInOptions.linkedin.component}
    //       {signInOptions.otp.component}
    //     </>
    //   );
    //   break;

    // case "linkedin":
    //   preferredSignInOption = signInOptions.linkedin.component;
    //   otherSignInOptions = (
    //     <>
    //       {signInOptions.google.component}
    //       {isAppleDevice && signInOptions.apple.component}
    //       {signInOptions.otp.component}
    //     </>
    //   );
    //   break;

    default:
      preferredSignInOption = signInOptions.otp.component;
      otherSignInOptions = (
        <>
          {signInOptions.google.component}
          {isAppleDevice && signInOptions.apple.component}
          {signInOptions.linkedin.component}
        </>
      );
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
          {preferredSignInOption}

          {/* <Accordion type="single" collapsible className="border-t-[1px] pt-2 mt-6 border-border">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="flex justify-center space-x-2 text-sm">
                <span>More options</span>
              </AccordionTrigger>
              <AccordionContent className="mt-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <InfoIcon className="w-4 h-4" /> Coming Soon
                  </div>
                  {otherSignInOptions}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion> */}
          <p className="mt-4 text-center ">
            Don't have an account?{" "}
            <Link href="/auth/sign-up" className="underline text-primary">
              Sign up
            </Link>
          </p>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Forgot your password?{" "}
          <Link href="/auth/reset-password" className="underline">
            Reset password
          </Link>
          {/* By clicking continue, you acknowledge that you have read and agree to CompClarity's{" "}
          <Link href="/privacy" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          . */}
        </p>
      </div>
    </div>
  );
}
