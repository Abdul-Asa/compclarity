"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateApplicationSchema, Offer, Job } from "@/lib/validation/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { createApplicationSchema } from "@/lib/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerButton } from "@/components/Buttons/SpinnerButton";
import { createApplicationCard, getApplicationOffer } from "@/app/(Layout)/(AppTracker)/tracker/actions";
import { toast } from "../hooks/useToast";

export default function CreateApplication() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [modalOpen, setModalOpen] = useState(false);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    register,
    reset,
  } = useForm<CreateApplicationSchema>({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: {
      title: "",
      companyName: "",
      dateApplied: new Date().toISOString().split("T")[0],
      location: "",
      description: "",
    },
  });

  const onSubmit = async (data: CreateApplicationSchema) => {
    const { error, message } = await createApplicationCard(data);
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
        description: "Application created successfully",
        variant: "constructive",
      });
      setModalOpen(false);
      reset();
    }
  };

  // Get job id from query params to prefill the form
  useEffect(() => {
    if (searchParams.has("id")) {
      const jobId = searchParams.get("id");
      if (!jobId) return;
      getApplicationOffer(jobId).then((res) => {
        if (!res.error && res.job) {
          const job = res.job as Job;
          setValue("title", job.title);
          setValue("companyName", job.company.name);
          setValue("location", job.city + ", " + job.countryCode);
        } else {
          console.error(res.message);
        }
      });

      setModalOpen(true);
      router.push(pathname);
    }
  }, [pathname, router, searchParams, setValue]);

  return (
    <Dialog
      open={modalOpen}
      onOpenChange={(isOpen) => {
        setModalOpen(isOpen);
        if (!isOpen) {
          reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="my-2 bg-emerald-700 text-lg font-bold text-white">Add Application</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create an application</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company</Label>
                <Input id="company-name" placeholder="Enter company name" {...register("companyName")} />
                <p className="my-1 h-1 text-xs text-red-500">{errors.companyName ? errors.companyName.message : ""}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position-title">Job Title</Label>
                <Input id="position-title" placeholder="Enter position title" {...register("title")} />
                <p className="my-1 h-1 text-xs text-red-500">{errors.title ? errors.title.message : ""}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" {...register("location")} />
                <p className="my-1 h-1 text-xs text-red-500">{errors.location ? errors.location.message : ""}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-of-application">Date of Application</Label>
              <Input
                className="pl-2"
                {...register("dateApplied")}
                id="date-of-application"
                type="date"
                max={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
              />
              <p className="my-1 h-1 text-xs text-red-500">{errors.dateApplied ? errors.dateApplied.message : ""}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register("description")}
                id="description"
                placeholder="Any notes you may have"
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter className="flex flex-row gap-2">
            <SpinnerButton type="submit" state={isSubmitting} name="Submit" />
            <div>
              <Button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  reset();
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
