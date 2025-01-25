"use client";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { createCV } from "@/lib/actions/server-actions";
import { getCombinedCVData, initialSections, initialSettings, initialCVData } from "@/components/cv-builder/store";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/lib/hooks/useToast";

export const CreateCVButton = () => {
  const { toast } = useToast();
  const { execute, hasErrored, isPending } = useAction(createCV);

  const handleCreateCV = async () => {
    const initialData = getCombinedCVData(initialCVData, initialSections, initialSettings);

    execute({ combinedCVData: initialData });

    if (hasErrored) {
      toast({
        title: "Failed to create CV",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <Modal
      className="md:max-w-screen-sm"
      trigger={
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Create New CV
        </Button>
      }
    >
      <div className="space-y-4">
        <h2 className="mb-4 text-xl font-semibold text-center">Choose an Option</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <button
            onClick={handleCreateCV}
            disabled={isPending}
            className="flex flex-col items-center justify-center p-8 transition-colors border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50"
          >
            <PlusCircle className="w-8 h-8 mb-2" />
            <span className="font-medium">Create New CV</span>
            <span className="text-sm text-muted-foreground">Start from scratch</span>
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          </button>

          <button
            disabled
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-not-allowed bg-muted/50"
          >
            <PlusCircle className="w-8 h-8 mb-2 text-muted-foreground" />
            <span className="font-medium text-muted-foreground">Import CV</span>
            <span className="text-sm text-muted-foreground">Coming Soon</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
