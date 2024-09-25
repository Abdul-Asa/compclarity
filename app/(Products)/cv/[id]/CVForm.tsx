"use client";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Check, CreditCard, User } from "lucide-react";
import Link from "next/link";
import { cn, fromUrlFriendly, toUrlFriendly } from "@/lib/utils";
import { PhoneInput } from "@/components/ui/phone-input";
import { FileUploader } from "@/components/ui/file-upload";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvServiceSchema } from "@/lib/validations/form";
import { Controller, useForm } from "react-hook-form";
import { CVServiceSchema } from "@/lib/types";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import getStripe from "@/lib/stripe/load-stripe";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/client";
interface CVServiceFormProps {
  serviceId: string;
  session?: any;
}

interface StepperItem {
  id: number;
  text: string;
  icon?: React.ReactNode;
}

const steps: StepperItem[] = [
  { id: 0, text: "Information", icon: <User /> },
  { id: 1, text: "Payment", icon: <CreditCard /> },
  { id: 2, text: "Complete", icon: <Check /> },
];

export const CVServiceForm = ({ serviceId, session }: CVServiceFormProps) => {
  const [currentStep, setCurrentStep] = useState(session ? 2 : 0);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) return;
    if (session.status === "open") setCurrentStep(1);
    else setCurrentStep(2);
  }, [session]);

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<CVServiceSchema>({
    resolver: zodResolver(cvServiceSchema),
    defaultValues: {
      service: serviceId as "cv-writing" | "interview-coaching",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: CVServiceSchema) => {
    setLoading(true);
    // Upload files to supabase storage first
    const supabase = createClient();
    const files = data.cvFile;
    const fileNames = files.map((file: File) => `${data.email}-${Date.now()}-${toUrlFriendly(file.name)}`);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = fileNames[i];
      const { error } = await supabase.storage.from("file_storage").upload(`cvs/${fileName}`, file);
      if (error) {
        toast.error(error.message);
        setCurrentStep(0);
        setLoading(false);
        return;
      }
    }

    const response = await fetch("/stripe/checkout", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        origin: window.location.href,
        fileNames,
      }),
    });
    const res = await response.json();
    if (res.error) {
      toast.error(res.error);
      setCurrentStep(0);
    } else {
      setClientSecret(res.clientSecret);
      setCurrentStep(1);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Stepper steps={steps} currentStep={currentStep} />
      <div className="flex-1 flex justify-center container mx-auto p-5">
        <AnimatePresence>
          {currentStep === 0 && (
            <div className="bg-white dark:bg-black flex flex-col max-w-screen-md items-center w-full p-4 rounded-sm md:p-10">
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-bold">{fromUrlFriendly(serviceId).toUpperCase()}</h1>
                <p>
                  Our CV writing service is designed to help you stand out in the job market. Our team of experts will
                  work with you to create a CV that highlights your skills and experience, and makes you stand out from
                  the competition.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 justify-between mt-10 size-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex col-span-2 md:col-span-1 flex-col gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" {...register("firstName")} />
                    <p className="text-red-500 text-sm h-4">{errors.firstName?.message}</p>
                  </div>
                  <div className="flex col-span-2 md:col-span-1 flex-col gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" {...register("lastName")} />
                    <p className="text-red-500 text-sm h-4">{errors.lastName?.message}</p>
                  </div>
                  <div className="flex col-span-2 md:col-span-1 flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="john.doe@example.com" {...register("email")} />
                    <p className="text-red-500 text-sm h-4">{errors.email?.message}</p>
                  </div>
                  <div className="flex col-span-2 md:col-span-1 flex-col gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => <PhoneInput placeholder="+44 7123 456789" {...field} />}
                    />
                    <p className="text-red-500 text-sm h-4">{errors.phoneNumber?.message}</p>
                  </div>
                  <div className="flex flex-col gap-2 col-span-2">
                    <Label htmlFor="file">Upload your CV</Label>
                    <Controller
                      name="cvFile"
                      control={control}
                      render={({ field }) => (
                        <FileUploader
                          value={field.value}
                          onValueChange={field.onChange}
                          maxFileCount={2}
                          maxSize={1024 * 1024 * 2} // 2MB
                          accept={{
                            "application/pdf": [".pdf"],
                            "application/msword": [".doc"],
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
                            "text/plain": [".txt"],
                            "application/x-latex": [".tex", ".latex"],
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2 col-span-2">
                    <Label htmlFor="info">Additional Information</Label>
                    <Textarea
                      id="info"
                      placeholder="Tell us a little bit about yourself"
                      rows={4}
                      {...register("extraInformation")}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    className="w-full lg:w-60 bg-emerald-500 dark:bg-emerald-700 text-white"
                    disabled={!isValid || loading}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {loading ? "Loading..." : "Proceed to Payment"}
                  </Button>
                </div>
              </form>
            </div>
          )}
          {currentStep === 1 && <PaymentForm clientSecret={clientSecret} />}
          {currentStep === 2 && (
            <div className=" bg-white dark:bg-black w-full p-4 flex justify-center items-center ">
              <div className=" flex flex-col justify-center gap-2 text-center rounded-sm p-10">
                <h1 className="text-2xl font-bold">
                  {session.status === "complete" ? "Thank you for your purchase! " : "Payment failed"}
                </h1>

                {session.status === "complete" ? (
                  <p>
                    You may contact us at <a href="mailto:contact@compclarity.com">contact@compclarity.com</a> for any
                    questions.
                  </p>
                ) : (
                  <p>Payment failed. Please try again.</p>
                )}
                <Link href="/cv" className={buttonVariants({ variant: "ghost" })}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span className="hidden md:block">Back to products</span>
                  <span className="md:hidden">Products</span>
                </Link>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Stepper = ({ steps, currentStep }: { steps: StepperItem[]; currentStep: number }) => {
  return (
    <div className="flex items-center md:flex-row flex-col relativelg:px-10 px-2 border-b shadow-sm bg-white dark:bg-black dark:border-gray-800 border-gray-200 py-4 select-none">
      <Link href="/cv" className={buttonVariants({ variant: "ghost" })}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span className="hidden md:block">Back to products</span>
        <span className="md:hidden">Products</span>
      </Link>
      <div className="px-4 py-2 md:absolute md:left-1/2 md:-translate-x-1/2 right-0">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  "md:size-12 size-10 rounded-full flex items-center justify-center p-3 transition-all duration-500 ",
                  index <= currentStep
                    ? "bg-emerald-500 dark:bg-emerald-700 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                )}
              >
                {step.icon || index + 1}
              </div>

              {index < steps.length - 1 && (
                <div className="w-16 h-1 mx-1 bg-gray-200 relative flex items-center rounded-full">
                  <div
                    className="absolute top-0 left-0 h-full bg-emerald-500 dark:bg-emerald-700 transition-all duration-500 rounded-full"
                    style={{ width: index < currentStep ? "100%" : "0%" }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div />
    </div>
  );
};

const PaymentForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripePromise = getStripe();
  const { theme } = useTheme();

  if (clientSecret === "") return <Skeleton className="w-full h-full" />;

  return (
    <div id="checkout" className="w-full border-2 p-1 stripe-issue">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
