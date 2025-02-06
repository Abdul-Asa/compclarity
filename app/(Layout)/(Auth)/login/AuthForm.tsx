"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { AuthFormSchema, ForgotPasswordSchema, LoginFormSchema, SignUpFormSchema } from "@/lib/validation/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, loginFormSchema, signUpFormSchema } from "@/lib/validation/schema";
import { forgotPassword, login, signup } from "./actions";
import { SpinnerButton } from "@/components/Buttons/SpinnerButton";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { invalidateUser } from "@/lib/hooks/useUser";

interface AuthFormProps {
  type: "login" | "register" | "forgot-password";
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormSchema>({
    //depending on the type of form, the schema will be different
    //the AuthFormSchema is a union of all the possible schemas
    resolver: zodResolver(
      type === "login" ? loginFormSchema : type === "register" ? signUpFormSchema : forgotPasswordSchema
    ),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (data: AuthFormSchema) => {
    let response;
    if (type === "login") {
      response = await login(data as LoginFormSchema);
    } else if (type === "register") {
      response = await signup(data as SignUpFormSchema);
    } else {
      response = await forgotPassword(data as ForgotPasswordSchema);
    }

    if (!response) return console.error("No response");

    if (response.error) {
      console.error(response.message);
      toast({
        title: "Error",
        description: response.message || "An error occurred",
        variant: "destructive",
      });

      // reset form
      if (type === "login") {
        reset({
          password: "",
        });
      } else if (type === "register") {
        reset({
          password: "",
          email: "",
        });
      } else if (type === "forgot-password") {
        reset({
          email: "",
        });
      }
    } else {
      // Invalidate user query on successful auth
      invalidateUser(queryClient);

      toast({
        title: "Success",
        description: response.message || "Success",
        variant: "default",
      });
      reset();

      // redirect
      if (type === "register") {
        router.push("/login");
      } else if (type === "login") {
        router.push("/tracker");
      } else if (type === "forgot-password") {
        router.push("/login");
      }
    }
  };

  //reset the form when the type changes
  useEffect(() => {
    reset();
  }, [reset, type]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-w-[90vw] p-2 sm:min-w-[500px]">
      <Card className="p-6 mx-auto">
        <div className="space-y-6">
          {type === "register" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register("firstName")} placeholder="John" autoComplete="on" />
                {"firstName" in errors && <ErrorMessage message={errors.firstName?.message} />}{" "}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input {...register("lastName")} id="lastName" placeholder="Doe" autoComplete="on" />
                {"lastName" in errors && <ErrorMessage message={errors.lastName?.message} />}
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="on" {...register("email")} placeholder="email@example.com" />
            <ErrorMessage message={errors.email?.message} />
          </div>
          {type !== "forgot-password" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {type === "login" && (
                  <Link href="?type=forgot-password" className="text-sm underline" prefetch={false}>
                    Forgot Password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  autoComplete="current-password"
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                />
                {showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(false)}
                    size={20}
                    className="absolute -translate-y-1/2 cursor-pointer right-2 top-1/2"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(true)}
                    size={20}
                    className="absolute -translate-y-1/2 cursor-pointer right-2 top-1/2"
                  />
                )}
              </div>
              {"password" in errors && <ErrorMessage message={errors.password?.message} />}
            </div>
          )}
          <SpinnerButton
            type="submit"
            className="w-full"
            state={isSubmitting}
            name={type === "login" ? "Login" : type === "register" ? "Sign Up" : "Reset Password"}
          />
        </div>
        <div className="mt-4 text-sm text-center">
          {type === "login"
            ? "Don't have an account? "
            : type === "register"
              ? "Already have an account? "
              : "Remember your password? "}
          <Link href={`?type=${type === "login" ? "register" : "login"}`} className="underline">
            {type === "login" ? "Register" : "Login"}
          </Link>
        </div>
      </Card>
    </form>
  );
};

interface ErrorMessageProps {
  message?: string;
}
const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p className="h-1 my-1 text-xs text-red-500">{message ? message : ""}</p>
);
