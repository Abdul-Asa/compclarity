import { createClient } from "../supabase/client";

// Fetch function
export const fetchUserProfile = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");

  const { data, error } = await supabase.from("users").select("*").eq("id", user.id).single();

  if (error) throw error;
  if (!data) throw new Error("Profile not found");

  return data;
};


