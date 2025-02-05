"use client";

import { Button } from "@/components/ui/button";
import { manageSubscription } from "@/lib/actions/stripe-actions";
import { useToast } from "@/lib/hooks/useToast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/validation/types";

interface SubscriptionManagerProps {
  user: User;
}

export function SubscriptionManager({ user }: SubscriptionManagerProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleManageSubscription = async () => {
    try {
      setIsLoading(true);
      const response = await manageSubscription();

      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
        return;
      }

      if (response.url) {
        router.push(response.url);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open subscription management. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">Subscription Status</h3>
            <p className="text-sm text-muted-foreground">{user.is_subscribed ? "Active" : "Inactive"}</p>
          </div>
        </div>
      </div>

      {user.is_subscribed ? (
        <Button onClick={handleManageSubscription} disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Manage Subscription
        </Button>
      ) : (
        <Button onClick={() => router.push("/ai")} className="w-full sm:w-auto">
          Upgrade to Premium
        </Button>
      )}
    </div>
  );
}
