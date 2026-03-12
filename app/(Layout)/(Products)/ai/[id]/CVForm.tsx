"use client";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Check, InfoIcon, Loader2, User } from "lucide-react";
import Link from "next/link";
import { toUrlFriendly } from "@/lib/utils";
import { PhoneInput } from "@/components/ui/phone-input";
import { FileUploader } from "@/components/ui/file-upload";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvServiceSchema } from "@/lib/validation/schema";
import { Controller, useForm } from "react-hook-form";
import { CVServiceSchema } from "@/lib/validation/types";
import { toast } from "sonner";
import { Tooltip } from "react-tooltip";
import { createClient } from "@/lib/supabase/client";
import { getTier } from "../product";
import { useRouter } from "next/navigation";

interface CVServiceFormProps {
  serviceId: string;
}

export const CVServiceForm = ({ serviceId }: CVServiceFormProps) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const service = getTier(serviceId);

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors, isDirty },
  } = useForm<CVServiceSchema>({
    resolver: zodResolver(cvServiceSchema),
    defaultValues: {
      service: serviceId as "cv-writing" | "cv-full-package",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!isDirty || currentStep === 1) return;

    function beforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
    }

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [isDirty, currentStep]);

  if (!service) {
    router.replace("/404");
    return null;
  }

  const uploadFilesToSupabase = async (data: CVServiceSchema) => {
    const supabase = createClient();
    const files = data.cvFile;
    if (!files) return [];
    const fileNames = files.map((file: File) => `${data.email}/${Date.now()}/${toUrlFriendly(file.name)}`);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = fileNames[i];
      const { error } = await supabase.storage.from("file_storage").upload(`cvs/${fileName}`, file);
      if (error) {
        toast.error(error.message);
        return;
      }
    }
    return fileNames;
  };

  const saveDataToSupabase = async (data: CVServiceSchema, fileNames: string[]) => {
    const supabase = createClient();
    const { error } = await supabase.from("payments").insert({
      full_name: data.firstName + " " + data.lastName,
      email: data.email,
      phone: data.phoneNumber,
      discord: data.discordUsername,
      file_names: fileNames,
      service: serviceId,
      status: "open",
      session_id: null,
      additional_info: data.extraInformation,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
  };

  const onSubmit = async (data: CVServiceSchema) => {
    setLoading(true);
    const fileNames = await uploadFilesToSupabase(data);
    if (!fileNames) {
      toast.error("Failed to upload files");
      setLoading(false);
      return;
    }
    await saveDataToSupabase(data, fileNames)
      .then(() => {
        setCurrentStep(1);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const steps = [
    { id: 0, text: "Information", icon: <User /> },
    { id: 1, text: "Complete", icon: <Check /> },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Stepper steps={steps} currentStep={currentStep} />
      <div className="flex-1 flex justify-center container relative mx-auto p-5">
        {currentStep === 0 && (
          <div className="bg-white dark:bg-black flex flex-col max-w-screen-md items-center w-full p-4 rounded-sm md:p-10">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-bold">{service.title}</h1>
              <p>{service.description}</p>
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
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => <PhoneInput placeholder="+44 7123 456789" {...field} />}
                  />
                  <p className="text-red-500 text-sm h-4">{errors.phoneNumber?.message}</p>
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                  <Label htmlFor="discord">Discord Username</Label>
                  <Input id="discord" placeholder="JohnDoe#1234" {...register("discordUsername")} />
                  <p className="text-red-500 text-sm h-4">{errors.discordUsername?.message}</p>
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                  <Label htmlFor="file" className="flex items-center gap-2">
                    Upload your current CV{" "}
                    <span className="text-xs text-gray-500">
                      <InfoIcon
                        className="inline-block h-4 w-4"
                        data-tooltip-id="cv-info"
                        data-tooltip-content="Any document that will help us understand your experience and skills"
                      />
                      <Tooltip id="cv-info" />
                    </span>
                  </Label>
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
                    placeholder="Any additional information i.e. LinkedIn, GitHub, etc. or Word/LaTeX requirement"
                    rows={4}
                    {...register("extraInformation")}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="w-full lg:w-60 bg-emerald-500 dark:bg-emerald-700 text-white"
                  disabled={!isValid || loading}
                >
                  {loading ? <Loader2 className="animate-spin size-4" /> : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        )}
        {currentStep === 1 && (
          <div className="bg-white dark:bg-black w-full p-4 flex justify-center items-center">
            <div className="flex flex-col justify-center gap-2 text-center rounded-sm max-w-screen-md">
              <h1 className="text-2xl font-bold">Thank you!</h1>
              <p>
                We will email you with more info within the next 48 hours. You can contact us at{" "}
                <a className="underline" href="mailto:contact@compclarity.com">
                  contact@compclarity.com
                </a>{" "}
                if needed.
              </p>
              <Link href="/ai" className={buttonVariants({ variant: "ghost", className: "w-fit self-center" })}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden md:block">Back to AI Suite</span>
                <span className="md:hidden">AI Suite</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface StepperItem {
  id: number;
  text: string;
  icon?: React.ReactNode;
}

const Stepper = ({ steps, currentStep }: { steps: StepperItem[]; currentStep: number }) => {
  return (
    <div className="flex items-center md:flex-row flex-col relativelg:px-10 px-2 border-b shadow-sm bg-white dark:bg-black dark:border-gray-800 border-gray-200 py-4 select-none">
      <Link href="/ai" className={buttonVariants({ variant: "ghost" })}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span className="hidden md:block">Back to AI Suite</span>
        <span className="md:hidden">AI Suite</span>
      </Link>
      <div className="px-4 py-2 md:absolute md:left-1/2 md:-translate-x-1/2 right-0">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                className={`md:size-12 size-10 rounded-full flex items-center justify-center p-3 transition-all duration-500 ${
                  index <= currentStep
                    ? "bg-emerald-500 dark:bg-emerald-700 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
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
