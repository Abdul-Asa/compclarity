"use client";
import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, User } from "lucide-react";
import Link from "next/link";
import { cn, fromUrlFriendly } from "@/lib/utils";
import { PhoneInput } from "@/components/ui/phone-input";
import { FileUploader } from "@/components/ui/file-upload";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvServiceSchema } from "@/lib/validations/form";
import { Controller, useForm } from "react-hook-form";
import { CVServiceSchema } from "@/lib/types";
// import StripePayment from "./stripe-embed";
interface CVServiceFormProps {
  serviceId: string;
}

interface StepperItem {
  id: number;
  text: string;
  icon?: React.ReactNode;
}

const steps: StepperItem[] = [
  { id: 0, text: "Information", icon: <User /> },
  { id: 1, text: "Payment", icon: <CreditCard /> },
];

export const CVServiceForm = ({ serviceId }: CVServiceFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);

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

  const onSubmit = (data: CVServiceSchema) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="flex-1 flex justify-center container mx-auto p-5">
        <div className="bg-white dark:bg-black flex flex-col max-w-screen-md items-center w-full p-4 rounded-sm md:p-10">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold">{fromUrlFriendly(serviceId).toUpperCase()}</h1>
            <p>
              Our CV writing service is designed to help you stand out in the job market. Our team of experts will work
              with you to create a CV that highlights your skills and experience, and makes you stand out from the
              competition.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 justify-between mt-10 size-full">
            {currentStep === 0 ? (
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
            ) : (
              // <StripePayment />
              <div>Hello</div>
            )}
            <div className="flex justify-end">
              {currentStep === 1 && (
                <Button className=" lg:w-40 mr-4" onClick={() => setCurrentStep(currentStep - 1)}>
                  Go Back
                </Button>
              )}
              <Button
                className="w-full lg:w-60 bg-emerald-500 dark:bg-emerald-700 text-white"
                disabled={!isValid}
                onClick={(e) => {
                  setCurrentStep(1);
                  handleSubmit(onSubmit)(e);
                }}
              >
                {currentStep === 0 ? "Proceed to Payment" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Stepper = ({
  steps,
  currentStep,
  setStep,
}: {
  steps: StepperItem[];
  currentStep: number;
  setStep: (step: number) => void;
}) => {
  return (
    <div className="flex items-center relativelg:px-10 px-2 border-b shadow-sm bg-white dark:bg-black dark:border-gray-800 border-gray-200 py-4 select-none">
      <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span className="hidden md:block">Back to products</span>
        <span className="md:hidden">Products</span>
      </Link>
      <div className="px-4 py-2 absolute md:left-1/2 md:-translate-x-1/2 right-0">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  "md:size-12 size-10 rounded-full flex items-center justify-center p-3 transition-all duration-500 cursor-pointer",
                  index <= currentStep
                    ? "bg-emerald-500 dark:bg-emerald-700 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                )}
                onClick={() => setStep(index)}
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
        </div>{" "}
      </div>
      <div />
    </div>
  );
};
