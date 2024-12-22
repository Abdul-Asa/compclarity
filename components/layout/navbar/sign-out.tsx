"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/hooks/useToast";
import { Button } from "@/components/ui/button";

export const SignOutButton = () => {
  const supabase = createClient();
  const router = useRouter();
  const { toast } = useToast();

  async function signOut() {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
    });
    router.refresh();
  }
  return (
    <Button variant="destructive" onClick={signOut} size={"sm"} className="w-full rounded-[5px]">
      Sign Out
    </Button>
  );
};
