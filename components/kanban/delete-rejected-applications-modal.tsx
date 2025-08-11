import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { toast } from "@/lib/hooks/use-toast";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Trash } from "lucide-react";

export function DeleteRejectedApplicationsModal() {
  const [open, setOpen] = useState(false);
  const utils = trpc.useUtils();
  const mutation = trpc.application.deleteRejectedApplications.useMutation({
    onSuccess: (data) => {
      utils.application.getApplications.invalidate();
      toast({ title: "Success", description: data.message, variant: "success" });
      setOpen(false);
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "error" });
    },
  });

  const onSubmit = () => {
    mutation.mutate();
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Delete Rejected Applications"
      className="lg:max-w-[600px]"
      trigger={
        <Button variant="destructive" className="w-full justify-start text-xs" size="sm">
          <Trash className="w-4 h-4 mr-2" />
          Delete rejected applications
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <p>Are you sure you want to delete all rejected applications? This action cannot be undone.</p>
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
