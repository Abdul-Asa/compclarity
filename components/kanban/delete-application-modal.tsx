import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { toast } from "@/lib/hooks/use-toast";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Trash2 } from "lucide-react";
import { ApplicationObject } from "@/lib/validation/types";

interface DeleteApplicationModalProps {
  application: ApplicationObject;
  onSuccess?: () => void;
}

export function DeleteApplicationModal({ application, onSuccess }: DeleteApplicationModalProps) {
  const [open, setOpen] = useState(false);
  const utils = trpc.useUtils();
  const mutation = trpc.application.deleteApplication.useMutation({
    onSuccess: (data) => {
      utils.application.getApplications.invalidate();
      toast({ title: "Success", description: data.message, variant: "success" });
      setOpen(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "error" });
    },
  });

  const onSubmit = () => {
    mutation.mutate({ id: application.id });
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Delete Application"
      className="lg:max-w-[600px]"
      trigger={
        <Button variant="destructive" className="-ml-1 p-2 rounded  h-fit ">
          <Trash2 size={16} />
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <p>Are you sure you want to delete this application? This action cannot be undone.</p>
        <p className="text-sm text-muted-foreground">
          {application.title} - {application.company}
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onSubmit} loading={mutation.isPending}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
