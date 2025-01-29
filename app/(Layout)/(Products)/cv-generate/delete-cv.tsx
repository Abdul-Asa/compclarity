"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { deleteCV } from "@/lib/actions/server-actions";
import { useToast } from "@/lib/hooks/useToast";
import { Loader2, Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

interface DeleteCVButtonProps {
  cvId: string;
  cvName: string;
}

export const DeleteCVButton = ({ cvId, cvName }: DeleteCVButtonProps) => {
  const { toast } = useToast();
  const { execute, isPending } = useAction(deleteCV, {
    onSuccess: () => {
      toast({
        title: "CV deleted",
        description: "Your CV has been successfully deleted",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete CV. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = async () => {
    execute({ cvId });
  };

  return (
    <Modal
      trigger={
        <Button variant="outline" size="sm" className="flex-1">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      }
    >
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Delete CV</h2>
        <p className="text-muted-foreground">
          Are you sure you want to delete &quot;{cvName}&quot;? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" data-dismiss-modal>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
