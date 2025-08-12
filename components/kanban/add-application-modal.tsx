import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createApplicationSchema } from "@/lib/validation/schema";
import type { CreateApplicationSchema, Job } from "@/lib/validation/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/lib/hooks/useToast";
import { useAction } from "next-safe-action/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createApplicationAction, getJobOffer } from "@/lib/actions/server-actions";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { LocationSearch } from "@/components/ui/location-search";
import { Textarea } from "@/components/ui/textarea";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface AddApplicationModalProps {
  onSuccess?: () => void;
}

export function AddApplicationModal({ onSuccess }: AddApplicationModalProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm<CreateApplicationSchema>({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: {
      companyName: "",
      title: "",
      location: "",
      description: "",
      dateApplied: new Date().toISOString().split("T")[0],
    },
  });

  const { executeAsync, isPending } = useAction(createApplicationAction, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast({
        title: "Application created",
        description: data.data?.message || "Application created successfully",
      });
      form.reset();
      setOpen(false);
      onSuccess?.();
    },
    onError: ({ error }) => {
      toast({
        title: "Error",
        description: error.serverError || "Failed to create application",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: CreateApplicationSchema) => {
    await executeAsync(data);
  };

  const jobId = searchParams.get("id") ?? "";
  const jobQuery = useQuery({
    queryKey: ["job-offer", jobId],
    queryFn: () => getJobOffer(jobId),
    enabled: !!jobId,
  });

  // Get job id from query params to prefill the form
  useEffect(() => {
    if (jobQuery.data && jobQuery.data.title) {
      setOpen(true);
      form.setValue("title", jobQuery.data.title);
      form.setValue("companyName", jobQuery.data.company?.name || "");
      form.setValue("location", `${jobQuery.data.city || ""}, ${jobQuery.data.countryCode || ""}`);
      form.setValue("description", jobQuery.data.description || "");
      router.push(pathname);
    }
    // Only run when jobQuery.data changes
  }, [jobQuery.data, form, setOpen, router, pathname]);

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Add Application"
      className="lg:max-w-[600px]"
      trigger={
        <Button size={"lg"} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          <span>Add Application</span>
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <LocationSearch placeholder="Location" value={field.value} onValueChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateApplied"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Application</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 justify-end pt-2">
            <Button type="submit" loading={isPending} className="w-32">
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setOpen(false);
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
