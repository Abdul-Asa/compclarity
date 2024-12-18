"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IntroFormSchema } from "@/lib/validation/types";
import { introFormSchema } from "@/lib/validation/schema";
import { FileUploader } from "../ui/file-upload";
import { InfoIcon, Loader2 } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useToast } from "@/lib/hooks/useToast";
import { createClient } from "@/lib/supabase/client";
import { upload } from "@/lib/supabase/storage";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function IntroForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  //   const stepper = useStepper();
  //   const { execute, result } = useAction(updateProfile);
  const { toast } = useToast();

  const form = useForm<IntroFormSchema>({
    resolver: zodResolver(introFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      cv: [],
    },
  });

  async function handleSubmit(values: IntroFormSchema) {
    setIsLoading(true);
    try {
      // First update the profile
      const supabase = createClient();
      const { data, error } = await supabase.auth.updateUser({
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .update({
          first_name: values.firstName,
          last_name: values.lastName,
          signup_flow: true,
        })
        .eq("id", data.user?.id)
        .select();

      if (profileError) {
        toast({
          title: "Error",
          description: profileError.message,
          variant: "destructive",
        });
        return;
      }

      if (values.cv && values.cv.length > 0) {
        await upload(supabase, {
          file: values.cv[0],
          path: [data.user?.id, "cv"],
          bucket: "users",
        });
      }

      router.push("/account");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="cv"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Upload your CV{" "}
                <span className="text-xs text-gray-500">
                  <InfoIcon
                    className="inline-block h-4 w-4"
                    data-tooltip-id="cv-info"
                    data-tooltip-content="Don't have a CV yet? No problem! Fill in the form manually and we'll create a one for you"
                  />
                  <Tooltip id="cv-info" />
                </span>
              </FormLabel>
              {/* <FormDescription>We'll use it to prefill your profile information</FormDescription> */}
              <FormControl>
                <FileUploader
                  value={field.value}
                  onValueChange={field.onChange}
                  accept={{
                    "application/pdf": [".pdf"],
                    "application/msword": [".doc"],
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
                  }}
                  maxSize={1024 * 1024 * 5} // 5MB
                  maxFileCount={1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-center flex-col gap-2">
          <Button type="submit" className=" w-fit">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>Continue</span>}
          </Button>
        </div>
      </form>
    </Form>
  );
}
