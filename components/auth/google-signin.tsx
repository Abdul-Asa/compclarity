"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaGoogle } from "react-icons/fa";

export function GoogleSignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    // Auth logic will go here
    setIsLoading(false);
  };

  return (
    <Button onClick={handleSignIn} variant="outline" disabled>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <FaGoogle className="h-5 w-5 mr-2" />
          Continue with Google
        </>
      )}
    </Button>
  );
}
