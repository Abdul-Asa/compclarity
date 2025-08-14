"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { ForgotPasswordSchema, LoginFormSchema, SignUpFormSchema } from "@/lib/validation/types";

export async function login(formData: LoginFormSchema) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  // Simulate a waiting time of 5 seconds
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  revalidatePath("/", "layout");
  if (error) {
    console.error(error.code, error.message);
    return {
      error: true,
      message: error.message,
    };
  } else
    return {
      error: false,
      message: "Login successful",
    };
}

export async function signup(formData: SignUpFormSchema) {
  const supabase = await createClient();

  const signUpData = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        first_name: formData.firstName,
        last_name: formData.lastName,
      },
    },
  };

  const { error } = await supabase.auth.signUp(signUpData);

  revalidatePath("/", "layout");
  if (error) {
    console.error(error.code, error.message);
    return {
      error: true,
      message: error.message,
    };
  } else
    return {
      error: false,
      message: "Sign up successful. Please check your email (including spam) to verify your account.",
    };
}

export async function forgotPassword(formData: ForgotPasswordSchema) {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
    redirectTo:
      process.env.NODE_ENV === "production"
        ? "https://compclarity.com/password-reset"
        : "http://localhost:3000/password-reset",
  });

  revalidatePath("/", "layout");
  if (error) {
    console.error(error);
    return {
      error: true,
      message: error.message,
    };
  } else
    return {
      error: false,
      message: "Password reset email sent. Please check your email (including spam).",
    };
}
