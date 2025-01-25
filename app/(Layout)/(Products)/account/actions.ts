"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { UpdateUserSchema } from "@/lib/validation/types";
import { redirect } from "next/navigation";

export async function updateUser(formData: UpdateUserSchema) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data?.user) {
    return {
      error: true,
      message: "User not found",
    };
  }

  const { error } = await supabase.auth.updateUser({
    data: {
      first_name: formData.firstName,
      last_name: formData.lastName,
    },
  });

  revalidatePath("/account", "layout");
  if (error) {
    console.error(error.code, error.message);
    return {
      error: true,
      message: error.message,
    };
  } else
    return {
      error: false,
      message: "Update successful",
    };
}

export async function deleteUser(userId: string) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
  //Currently, Supabase does not have a delete user method without logging in as admin
}