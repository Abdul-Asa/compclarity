"use client";
import { SpinnerButton } from "@/components/Buttons/SpinnerButton";
import { ResetPasswordSchema } from "@/lib/validation/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useToast } from "@/lib/hooks/useToast";
import { resetPasswordSchema } from "@/lib/validation/schema";

export const PasswordResetForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const router = useRouter();

  const supabase = createClient();

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (credentials: ResetPasswordSchema) => {
    setIsSubmitting(true);

    if (credentials.password === credentials.confirmPassword) {
      const { error } = await supabase.auth.updateUser({
        password: credentials.password,
      });

      if (!error) {
        toast({
          title: "Success",
          description: "Password reset successfully!",
          variant: "default",
        });
        router.replace("/account");
      } else {
        console.log(error);
        toast({
          title: "Error",
          description: error.message || "An error occurred, please try again later.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Please ensure your passwords match!",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full p-8 space-y-4">
      <div className="text-2xl font-extrabold tracking-tight">Reset your Password</div>
      <div>
        <label htmlFor="password" className="block">
          New Password:
        </label>
        <div className="relative">
          <Input {...register("password")} type={passwordVisible ? "text" : "password"} className="w-full border" />
          <button
            className="absolute -translate-y-1/2 right-3 top-1/2"
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            <Eye size="12" color="gray" />
          </button>
        </div>
        <p className="h-1 my-1 text-xs text-red-500">{errors.password ? errors.password.message : ""}</p>
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block">
          Confirm Password:
        </label>
        <div className="relative">
          <Input
            {...register("confirmPassword")}
            type={confirmPasswordVisible ? "text" : "password"}
            className="w-full border"
          />
          <button
            className="absolute -translate-y-1/2 right-3 top-1/2"
            type="button"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <Eye size="12" color="gray" />
          </button>
        </div>
        <p className="h-1 my-1 text-xs text-red-500">{errors.confirmPassword ? errors.confirmPassword.message : ""}</p>
      </div>
      <SpinnerButton type="submit" className="w-full" name="Submit" state={isSubmitting} />
    </form>
  );
};
