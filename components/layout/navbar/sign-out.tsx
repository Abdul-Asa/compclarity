"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/hooks/useToast";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { invalidateUser } from "@/lib/hooks/useUser";

export const SignOutButton = () => {
  const supabase = createClient();
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  async function signOut() {
    await supabase.auth.signOut();
    invalidateUser(queryClient);
    toast({
      title: "Logged Out",
    });
    router.refresh();
    router.push("/");
  }

  return (
    <Button variant="destructive" onClick={signOut} size={"sm"} className="w-full rounded-[5px]">
      Sign Out
    </Button>
  );
};
