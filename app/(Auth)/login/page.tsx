import { redirect } from "next/navigation";
import { AuthForm } from "./AuthForm";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CompClarity - Login",
  description:
    "Sign in or register for an account to start using our job application tracker",
};

interface pageProps {
  searchParams: {
    type: "login" | "register" | "forgot-password";
  };
}

const page = async ({ searchParams }: pageProps) => {
  const supabase = createClient();

  let authType = searchParams.type;
  // Default to login if no type is provided
  if (!["login", "register", "forgot-password"].includes(authType)) {
    authType = "login";
  }
  const { data, error } = await supabase.auth.getUser();
  if (!error && data.user) {
    redirect("/account");
  }

  return (
    <div className="my-8 flex flex-col items-center">
      <div className="flex flex-col gap-2 py-4 text-center">
        <h1 className="text-xl md:text-3xl">Ready to find your dream job?</h1>
        <p className="font-open text-sm md:text-lg">
          Apply effortlessly and track your progress
        </p>
      </div>
      <AuthForm type={authType} />
    </div>
  );
};
export default page;
