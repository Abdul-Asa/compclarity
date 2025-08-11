import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateApplicationSchema } from "@/lib/validation/schema";
import type { UpdateApplicationSchema, ApplicationObject } from "@/lib/validation/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { trpc } from "@/lib/trpc/client";
import { toast } from "@/lib/hooks/use-toast";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { LocationSearch } from "@/components/ui/location-search";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UpdateApplicationModalProps {
  application: ApplicationObject;
  onSuccess?: () => void;
}
export function UpdateApplicationModal({ application, onSuccess }: UpdateApplicationModalProps) {
  const [open, setOpen] = useState(false);
  const utils = trpc.useUtils();

  const form = useForm<UpdateApplicationSchema>({
    resolver: zodResolver(updateApplicationSchema),
    defaultValues: {
      companyName: application.company || "",
      title: application.title || "",
      location: application.location || "",
      todoLevel: application.todo_level ?? "0",
      description: application.description || "",
      dateApplied: application.date_applied || "",
      dateScreened: application.date_screened || "",
      dateInterviewed: application.date_interviewed || "",
      dateOffered: application.date_offered || "",
      dateRejected: application.date_rejected || "",
      notify: application.notifications ?? false,
    },
  });
  const mutation = trpc.application.updateApplication.useMutation({
    onSuccess: (data) => {
      utils.application.getApplications.invalidate();
      toast({
        title: "Application updated",
        description: data.message,
        variant: "success",
      });
      form.reset();
      setOpen(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "error",
      });
    },
  });

  const onSubmit = (data: UpdateApplicationSchema) => {
    mutation.mutate({ id: application.id, data });
  };
  // Before rendering the component, determine the field name based on the application's todo_level
  const fieldName = (() => {
    switch (application.todo_level) {
      case "0":
        return "dateApplied";
      case "1":
        return "dateScreened";
      case "2":
        return "dateInterviewed";
      case "3":
        return "dateOffered";
      case "4":
        return "dateRejected";
      default:
        return "dateApplied";
    }
  })();

  useEffect(() => {
    form.reset({
      companyName: application.company || "",
      title: application.title || "",
      location: application.location || "",
      description: application.description || "",
      dateApplied: application.date_applied || "",
      dateScreened: application.date_screened || "",
      dateInterviewed: application.date_interviewed || "",
      dateOffered: application.date_offered || "",
      dateRejected: application.date_rejected || "",
      notify: application.notifications ?? false,
      todoLevel: application.todo_level ?? "0",
    });
  }, [application]);

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Edit Application"
      className="lg:max-w-[600px]"
      trigger={
        <Button variant="ghost" className="-ml-1 p-2 rounded hover:bg-primary/10 h-fit">
          <Pencil size={16} />
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
            name={"todoLevel"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select defaultValue={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Applied</SelectItem>
                      <SelectItem value="1">Screened</SelectItem>
                      <SelectItem value="2">Interviewed</SelectItem>
                      <SelectItem value="3">Offered</SelectItem>
                      <SelectItem value="4">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={fieldName}
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
          {/* Notify Checkbox */}
          {/* <FormField
            control={form.control}
            name="notify"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 pt-2">
                <FormControl>
                  <Checkbox checked={field.value ?? false} onCheckedChange={field.onChange} id="notify" />
                </FormControl>
                <FormLabel htmlFor="notify" className="mb-0 cursor-pointer">
                  Notify me of updates
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <div className="flex gap-2 justify-end pt-2">
            <Button type="submit" loading={mutation.isPending} className="w-32">
              Save
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={mutation.isPending}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
