"use server";
import { cache } from "react";
import { createClient } from "../supabase/server";
import { addYears } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { actionClient } from "./safe-action";
import { CombinedCVData } from "@/components/cv-builder/types";

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

export const getCVData = cache(async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("cvs").select("*").eq("user_id", userId);

  if (error || !data){
    return null
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

const createCVSchema = z.object({
  combinedCVData: z.object({
    sections: z.any(),
    settings: z.any(),
  }),
});

export const createCV = actionClient.schema(createCVSchema).action(
  async ({ parsedInput: { combinedCVData } }) => {
    const supabase = await createClient();
    
    const user = await getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("cvs")
      .insert({
        user_id: user.id,
        cv_data: combinedCVData,
        last_updated: new Date().toISOString(),
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new Error("Failed to create CV");
    }

    return data;
  }
);

