"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApplicationObject, UpdateApplicationSchema } from "@/lib/validation/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { updateApplicationSchema } from "@/lib/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerButton } from "@/components/Buttons/SpinnerButton";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { updateApplicationCard, deleteApplicationCard } from "@/app/(AppTracker)/tracker/actions";
import { toast } from "../hooks/useToast";

interface EditApplicationProps {
  application: ApplicationObject;
}
export default function EditApplication({ application }: EditApplicationProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    register,
    getValues,
    reset,
  } = useForm<UpdateApplicationSchema>({
    resolver: zodResolver(updateApplicationSchema),
    defaultValues: {
      title: application.title,
      companyName: application.company || "",
      dateApplied: application.date_applied
        ? new Date(application.date_applied).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      dateScreened: application.date_screened
        ? new Date(application.date_screened).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      dateOffered: application.date_offered
        ? new Date(application.date_offered).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      dateInterviewed: application.date_interviewed
        ? new Date(application.date_interviewed).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      dateRejected: application.date_rejected
        ? new Date(application.date_rejected).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      location: application.location || "",
      description: application.description || "",
    },
  });

  useEffect(() => {
    setValue("title", application.title);
    setValue("companyName", application.company || "");
    setValue(
      "dateApplied",
      application.date_applied
        ? new Date(application.date_applied).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]
    );
    setValue(
      "dateScreened",
      application.date_screened
        ? new Date(application.date_screened).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]
    );
    setValue(
      "dateOffered",
      application.date_offered
        ? new Date(application.date_offered).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]
    );
    setValue(
      "dateInterviewed",
      application.date_interviewed
        ? new Date(application.date_interviewed).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]
    );
    setValue(
      "dateRejected",
      application.date_rejected
        ? new Date(application.date_rejected).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]
    );
    setValue("location", application.location || "");
    setValue("description", application.description || "");
  }, [application, setValue]);

  function getLabel(todo_level: string) {
    switch (todo_level) {
      case "0":
        return "Date of Application";
      case "1":
        return "Date Screened";
      case "2":
        return "Date Interviewed";
      case "3":
        return "Date Offered";
      case "4":
        return "Date Rejected";
      default:
        return "Date of Application";
    }
  }

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

  const closeModal = () => {
    setModalOpen(false);
    reset();
  };

  const onSubmit = async (data: UpdateApplicationSchema) => {
    const { error, message } = await updateApplicationCard(data, application.id);
    if (error) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      console.error(message);
    } else {
      toast({
        title: "Success",
        description: message,
        variant: "constructive",
      });
      console.log(message);
    }
    closeModal();
  };

  const onDelete = async () => {
    const { error, message } = await deleteApplicationCard(application.id);
    if (error) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      console.error(message);
    } else {
      toast({
        title: "Success",
        description: message,
        variant: "constructive",
      });
    }
    closeModal();
  };

  return (
    <Dialog
      open={modalOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          reset();
        }
        setModalOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <span className="sr-only">Save</span>
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit application</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position-title">Position Title</Label>
                <Input id="position-title" placeholder="Enter position title" {...register("title")} />
                <p className="text-red-500 text-xs h-1 my-1">{errors.title ? errors.title.message : ""}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="Enter company name" {...register("companyName")} />
                <p className="text-red-500 text-xs h-1 my-1">{errors.companyName ? errors.companyName.message : ""}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" {...register("location")} />
                <p className="text-red-500 text-xs h-1 my-1">{errors.location ? errors.location.message : ""}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-of-application">{getLabel(application.todo_level)}</Label>
              <Input
                className="pl-2"
                {...register(fieldName)}
                id="date-of-application"
                type="date"
                max={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
              />
              <p className="text-red-500 text-xs h-1 my-1">
                {errors.dateApplied?.message ||
                  errors.dateInterviewed?.message ||
                  errors.dateOffered?.message ||
                  errors.dateRejected?.message ||
                  errors.dateScreened?.message ||
                  ""}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register("description")}
                id="description"
                placeholder="Enter job description"
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex  justify-between w-full">
              <Button type="button" variant="destructive" onClick={onDelete}>
                Delete
              </Button>
              <div>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <SpinnerButton type="submit" state={isSubmitting} name="Edit" />
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
