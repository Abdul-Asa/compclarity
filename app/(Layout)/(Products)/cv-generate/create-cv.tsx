"use client";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { createCV } from "@/lib/actions/server-actions";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/lib/hooks/useToast";
import { INITIAL_CV_DATA } from "@/components/cv-builder/constants";
import { User } from "@/lib/validation/types";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { pricingTiers } from "../cv/product";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { createStripeSession, updateUserSubscriptionBySessionId } from "@/lib/actions/stripe-actions";

export const CreateCVButton = ({ user }: { user: User }) => {
  const { toast } = useToast();
  const { isPending } = useAction(createCV);
  const [isYearly, setIsYearly] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Handle subscription success/failure messages
  useEffect(() => {
    if (searchParams.get("success")) {
      const sessionId = searchParams.get("session_id");
      if (sessionId) {
        updateUserSubscriptionBySessionId(user.id, sessionId);
        toast({
          title: "Subscription successful!",
          description: "You now have access to all premium features.",
        });
      }
    }
    if (searchParams.get("canceled")) {
      toast({
        title: "Subscription canceled",
        description: "Your subscription was not completed.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      const { url } = await createStripeSession("cv-full-package", isYearly);
      if (url) {
        router.push(url);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const tier = pricingTiers[1];

  if (!user.is_subscribed) {
    return (
      <Modal
        className="md:max-w-screen-sm"
        trigger={
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            Create New CV
          </Button>
        }
      >
        <Card className="flex flex-col border-none">
          <CardHeader className="p-6">
            <CardTitle className="text-xl">{tier.title}</CardTitle>
            <div className="flex items-center justify-end gap-2 mt-2">
              <span className="text-sm text-muted-foreground">Monthly</span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} aria-label="Toggle yearly billing" />
              <span className="text-sm text-muted-foreground">Yearly</span>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow">
            <div className="mb-4">
              {tier.isFree ? (
                <span className="text-4xl font-bold">Free</span>
              ) : (
                <>
                  <span className="text-4xl font-bold">£{isYearly ? tier.yearlyPrice : tier.monthlyPrice}</span>
                  <span className="ml-2 text-xl line-through text-muted-foreground">
                    £{isYearly ? tier.originalYearlyPrice : tier.originalMonthlyPrice}
                  </span>
                  {isYearly && <span className="ml-2 text-sm">/ year</span>}
                  {!isYearly && <span className="ml-2 text-sm">/ month</span>}
                </>
              )}
              {tier.isPopular && <Badge className="ml-2 bg-emerald-500">MOST POPULAR</Badge>}
            </div>
            <p className="mb-4 text-red-700 dark:text-red-500">{tier.discount}</p>
            <Button
              className="mb-6 text-white bg-primary"
              disabled={!tier.isAvailable || isLoading}
              onClick={handleSubscribe}
            >
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {tier.cta}
            </Button>
            <h3 className="mb-2 font-semibold">WHAT'S INCLUDED</h3>
            <ul className="flex-grow space-y-2">
              {tier.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mt-1 mr-2 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Modal>
    );
  }

  return (
    <Modal
      className="md:max-w-screen-sm"
      trigger={
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Create New CV
        </Button>
      }
    >
      <div className="space-y-4">
        <h2 className="mb-4 text-xl font-semibold text-center">Choose an Option</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <button
            onClick={handleSubscribe}
            disabled={isPending || isLoading}
            className="flex flex-col items-center justify-center p-8 transition-colors border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50"
          >
            <PlusCircle className="w-8 h-8 mb-2" />
            <span className="font-medium">Create New CV</span>
            <span className="text-sm text-muted-foreground">Start from scratch</span>
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          </button>

          <button
            disabled
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-not-allowed bg-muted/50"
          >
            <PlusCircle className="w-8 h-8 mb-2 text-muted-foreground" />
            <span className="font-medium text-muted-foreground">Import CV</span>
            <span className="text-sm text-muted-foreground">Coming Soon</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
