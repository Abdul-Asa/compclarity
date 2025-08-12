import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/useToast";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { deleteRejectedApplicationsAction } from "@/lib/actions/server-actions";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Trash } from "lucide-react";

export function DeleteRejectedApplicationsModal() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { executeAsync, isPending } = useAction(deleteRejectedApplicationsAction, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast({
        title: "Success",
        description: data.data?.message || "Rejected applications deleted successfully",
      });
      setOpen(false);
    },
    onError: ({ error }) => {
      toast({
        title: "Error",
        description: error.serverError || "Failed to delete rejected applications",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async () => {
    await executeAsync({});
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
