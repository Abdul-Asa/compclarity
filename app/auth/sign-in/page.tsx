import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { userAgent } from "next/server";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { OTPSignIn } from "@/components/auth/otp-signin";
import { redirect } from "next/navigation";
import { GoogleSignIn } from "@/components/auth/google-signin";
import { AppleSignIn } from "@/components/auth/apple-signin";
import { LinkedInSignIn } from "@/components/auth/linkedin-signin";
import { getUser } from "@/lib/supabase/queries";
import { InfoIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "CompClarity - Login",
  description: "Sign in or register for an account to apply for jobs and track your progress",
};

export const revalidate = 30;

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
    component: <OTPSignIn />,
  },
};

export default async function Page() {
  const user = await getUser();
  // const supabase = await createClient();
  // const {
  //   data: { user: directUser },
  // } = await supabase.auth.getUser();
  // console.log(user);
  // console.log(directUser);
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
    <div className="relative z-20 mx-auto flex w-full max-w-lg h-full flex-col py-12 px-8">
      <div className="flex w-full flex-col relative">
        <h1 className="font-medium pb-4 text-xl md:text-3xl">
          Ready to find your <span className="inline-block text-primary transition hover:-translate-y-3">dream</span>{" "}
          job?
        </h1>

        <p className="font-medium pb-1 text-sm md:text-lg text-muted-foreground">
          Apply effortlessly and track your progress
        </p>

        <div className="pointer-events-auto mt-6 flex flex-col mb-6">
          {preferredSignInOption}

          <Accordion type="single" collapsible className="border-t-[1px] pt-2 mt-6 border-border">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="justify-center space-x-2 flex text-sm">
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
          </Accordion>
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
