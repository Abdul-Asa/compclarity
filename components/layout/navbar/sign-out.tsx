"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/hooks/useToast";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { invalidateUser } from "@/lib/hooks/useUser";
import { signOutAction } from "./actions";

export const SignOutButton = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();

  async function signOut() {
    await supabase.auth.signOut();
    invalidateUser(queryClient);
    await signOutAction();
  }

  return (
    <Button variant="destructive" onClick={signOut} size={"sm"} className="w-full rounded-[5px]">
      Sign Out
    </Button>
  );
};
