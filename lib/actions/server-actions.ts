"use server";
import { cache } from "react";
import { createClient } from "../supabase/server";
import { addYears } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { actionClient } from "./safe-action";

export const getUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  if (!userId) {
    return null;
  }

  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();

  if (error || !data) {
    return null;
  }

  return data;
});

const otpSignInSchema = z.object({
  email: z.string().email(),
  token: z.string().min(1, { message: "Token cannot be empty" }),
});

export const verifyOTP = actionClient.schema(otpSignInSchema).action(async ({ parsedInput: { email, token } }) => {
  console.log("verifyOTP");
  console.log(email, token);
  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  cookies().set("preferred_signin_provider", "email", {
    expires: addYears(new Date(), 1),
  });

  if (error) {
    redirect(`/auth/error?message=${error.message}`);
  }

  // const user = await getUser();
  // if (!user || !user.onboarding_completed) {
  //   redirect(`/auth/onboarding`);
  // } else {
  //   redirect("/account");
  // }
  redirect("/");
});

