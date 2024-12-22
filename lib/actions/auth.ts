"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { addYears } from "date-fns";
import { actionClient } from "./safe-action";
import { redirect } from "next/navigation";
import { getUser } from "../supabase/queries";
import { z } from "zod";

export const otpSignInSchema = z.object({
  email: z.string().email(),
  token: z.string().min(1, { message: "Token cannot be empty" }),
});

export const verifyOTP = actionClient
  .schema(otpSignInSchema)
  .action(async ({ parsedInput: { email, token } }) => {
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

    const user = await getUser();

    if (!user || !user.signup_flow) {
      redirect(`/auth/onboarding`);
    } else {
      redirect("/account");
    }

  
  });
