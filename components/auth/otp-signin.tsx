"use client";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EmailSignInSchema } from "@/lib/validation/types";
import { emailSignInSchema } from "@/lib/validation/schema";
import { verifyOTP } from "@/lib/actions/auth";
import { useAction } from "next-safe-action/hooks";

interface OTPSignInProps {
  className?: string;
}

export function OTPSignIn({ className }: OTPSignInProps) {
  const { execute, isPending } = useAction(verifyOTP);

  const [isLoading, setLoading] = useState(false);
  const [isSent, setSent] = useState(false);
  const [email, setEmail] = useState<string>();
  const supabase = createClient();

  const form = useForm<EmailSignInSchema>({
    resolver: zodResolver(emailSignInSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit({ email }: EmailSignInSchema) {
    setLoading(true);

    setEmail(email);

    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/api/auth/confirm` },
    });

    setSent(true);
    setLoading(false);
  }

  async function onComplete(token: string) {
    console.log("execute");
    if (!email) return;
    execute({ email, token });
  }

  if (isSent) {
    return (
      <div className={cn("flex flex-col space-y-4 items-center", className)}>
        <InputOTP
          maxLength={6}
          autoFocus
          onComplete={onComplete}
          disabled={isPending}
          render={({ slots }) => (
            <InputOTPGroup>
              {slots.map((slot, index) => (
                <InputOTPSlot key={index.toString()} {...slot} className="w-[62px] h-[62px] border-foreground" />
              ))}
            </InputOTPGroup>
          )}
        />
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}

        <div className="flex space-x-2">
          <span className="text-sm text-foreground">Didn't receive the email?</span>
          <button onClick={() => setSent(false)} type="button" className="text-sm text-primary underline font-medium">
            Resend code
          </button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cn("flex flex-col space-y-4", className)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@doe.com"
                    {...field}
                    autoCapitalize="false"
                    autoCorrect="false"
                    spellCheck="false"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>Continue</span>}
          </Button>
        </div>
      </form>
    </Form>
  );
}
