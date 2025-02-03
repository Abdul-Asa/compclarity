"use server";
import { cache } from "react";
import { createClient } from "../supabase/server";
// import { addYears } from "date-fns";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { actionClient } from "./safe-action";
import { revalidatePath } from "next/cache";
import { CVData } from "@/components/cv-builder/types";

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

export const getCVs = cache(async () => {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    console.log("User not authenticated");
    return null;
  }
  const { data, error } = await supabase.from("cvs").select("*").eq("user_id", user.id);

  if (error || !data) {
    return null;
  }
  return data;
});

export const getCV = cache(async (cvId: string) => {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    console.log("User not authenticated");
    return null;
  }
  const { data, error } = await supabase.from("cvs").select("*").eq("id", cvId).eq("user_id", user.id).single();

  if (error || !data) {
    console.log(cvId, error);
    return null;
  }

  return {
    ...data,
    cv_data: data.cv_data as unknown as CVData,
  };
});

const createCVSchema = z.object({
  combinedCVData: z.object({
    sections: z.any(),
    settings: z.any(),
  }),
});

export const createCV = actionClient.schema(createCVSchema).action(async ({ parsedInput: { combinedCVData } }) => {
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
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to create CV");
  }

  revalidatePath("/");
  redirect(`/cv-generate/${data.id}`);
});

const updateCVSchema = z.object({
  cvId: z.string(),
  combinedCVData: z.object({
    sections: z.any(),
    settings: z.any(),
  }),
});

export const updateCV = actionClient
  .schema(updateCVSchema)
  .action(async ({ parsedInput: { cvId, combinedCVData } }) => {
    const supabase = await createClient();

    const user = await getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    const { data, error } = await supabase
      .from("cvs")
      .update({
        cv_data: combinedCVData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", cvId)
      .select();

    if (error) {
      console.error(error);
      throw new Error("Failed to update CV");
    }

    revalidatePath("/");
    return data;
  });

const deleteCVSchema = z.object({
  cvId: z.string(),
});

export const deleteCV = actionClient.schema(deleteCVSchema).action(async ({ parsedInput: { cvId } }) => {
  const supabase = await createClient();

  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("cvs").delete().eq("id", cvId).eq("user_id", user.id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete CV");
  }

  revalidatePath("/");
  return { success: true };
});

export const updateUserSubscription = async (userId: string, customerId: string | null, isSubscribed: boolean) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("users")
    .update({
      stripe_customer_id: customerId,
      is_subscribed: isSubscribed,
    })
    .eq("id", userId);

  if (error) {
    console.error(error);
    throw new Error("Failed to update user subscription");
  }
};

const tailorCVSchema = z.object({
  cv_id: z.string(),
  job_name: z.string(),
  company_name: z.string(),
});

export const tailorCV = actionClient
  .schema(tailorCVSchema)
  .action(async ({ parsedInput: { cv_id, job_name, company_name } }) => {
    const supabase = await createClient();
    const user = await getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    const { data: cv, error: cvError } = await supabase
      .from("cvs")
      .select("*")
      .eq("id", cv_id)
      .eq("user_id", user.id)
      .single();

    if (cvError || !cv) {
      throw new Error("CV not found");
    }
    const cvData = cv.cv_data as unknown as CVData;
    if (!cvData) {
      throw new Error("CV data not found");
    }
    const response = await fetch(
      `https://compclarity.azurewebsites.net/api/custom_cv?code=r562vGcndnHAaO1oWYiqnJP5s95wJPaxBIC82u0P2jykAzFuuvkIQw%3D%3D`,
      {
        method: "POST",
        body: JSON.stringify({
          sections: cvData.sections,
          settings: cvData.settings,
          job: job_name,
          company: company_name,
        }),
      }
    );

    if (!response.ok) {
      console.error(response);
      throw new Error("Failed to tailor CV");
    }

    const tailoredCVData = await response.json();
    console.log(tailoredCVData);
    await createCV({
      combinedCVData: {
        sections: tailoredCVData.sections,
        settings: { ...cvData.settings, name: `${job_name} - ${company_name} CV` },
      },
    });
  });

// const signUpSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   firstName: z.string().min(1, { message: "First name cannot be empty" }),
//   lastName: z.string().min(1, { message: "Last name cannot be empty" }),
// });

// export const signUp = actionClient.schema(signUpSchema).action(async ({ parsedInput: { email, password, firstName, lastName } }) => {
//   const supabase = await createClient();
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: { first_name: firstName, last_name: lastName },
//     },
//   });

//   if (error || !data) {
//     console.error(error);
//     throw new Error("Failed to sign up");
//   }

//   return data;
// });

// const passwordSignInSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8, "Password must be at least 8 characters"),
// });

// export const passwordSignIn = actionClient.schema(passwordSignInSchema).action(async ({ parsedInput: { email, password } }) => {
//   const supabase = await createClient();
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });
// });

// const otpSignInSchema = z.object({
//   email: z.string().email(),
//   token: z.string().min(1, { message: "Token cannot be empty" }),
// });

// export const verifyOTP = actionClient.schema(otpSignInSchema).action(async ({ parsedInput: { email, token } }) => {
//   console.log("verifyOTP");
//   console.log(email, token);
//   const supabase = await createClient();
//   const { error } = await supabase.auth.verifyOtp({
//     email,
//     token,
//     type: "email",
//   });

//   cookies().set("preferred_signin_provider", "email", {
//     expires: addYears(new Date(), 1),
//   });

//   if (error) {
//     redirect(`/auth/error?message=${error.message}`);
//   }

//   // const user = await getUser();
//   // if (!user || !user.onboarding_completed) {
//   //   redirect(`/auth/onboarding`);
//   // } else {
//   //   redirect("/account");
//   // }
//   redirect("/");
// });
