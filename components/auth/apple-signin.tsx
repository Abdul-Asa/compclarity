"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FaApple } from "react-icons/fa";

export function AppleSignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    // Auth logic will go here
    setIsLoading(false);
  };

  return (
    <Button onClick={handleSignIn} variant="outline" disabled>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          <FaApple className="w-5 h-5 mr-2" />
          Continue with Apple
        </>
      )}
    </Button>
  );
}
