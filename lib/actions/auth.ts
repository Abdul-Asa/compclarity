"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { addYears } from "date-fns";
import { actionClient } from "./safe-action";
import { otpSignInSchema } from "../validation/schema";
import { redirect } from "next/navigation";
import { getUser } from "../supabase/queries";
import { z } from "zod";


const schema = z.object({
  email: z.string().email(),
  token: z.string().min(1, { message: "Token cannot be empty" }),
});

export const verifyOTP = actionClient
  .schema(schema)
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
    console.log("user");
    if (!user || user.signup_flow) {
      redirect("/account");
    }

    cookies().set("signin_flow", "true");
    redirect(`/auth/sign-in`);
  
  });
