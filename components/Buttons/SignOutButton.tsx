"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "../hooks/useToast";

interface SignOutButtonProps {}

export const SignOutButton = ({}: SignOutButtonProps) => {
  const supabase = createClient();
  const router = useRouter();
  async function signOut() {
    await supabase.auth.signOut().then(() => {
      toast({
        title: "Logged Out",
      });
    });
    router.refresh();
  }
  return (
    <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 shadow" onClick={signOut}>
      Sign Out
    </button>
  );
};
