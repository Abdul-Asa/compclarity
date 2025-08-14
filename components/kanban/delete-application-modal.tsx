import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/useToast";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { deleteApplicationAction } from "@/lib/actions/server-actions";
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
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { executeAsync, isPending } = useAction(deleteApplicationAction, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast({
        title: "Success",
        description: data.data?.message || "Application deleted successfully",
      });
      setOpen(false);
      onSuccess?.();
    },
    onError: ({ error }) => {
      toast({
        title: "Error",
        description: error.serverError || "Failed to delete application",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async () => {
    await executeAsync({ id: application.id });
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
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onSubmit} loading={isPending}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
