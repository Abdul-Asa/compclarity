"use client";

import { useState } from "react";
import { RegisterOptions, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { coverLetterSchema } from "@/lib/validation/schema";
import { CoverLetterSchema } from "@/lib/validation/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ErrorMessage } from "@/components/ui/error-message";
import { Copy, Wand2 } from "lucide-react";
import { generateCoverLetter } from "./action";
import { User } from "@supabase/supabase-js";
import { toast } from "@/components/hooks/useToast";
import { createClient } from "@/lib/supabase/client";

export function CoverLetterForm({ user }: { user: User | null }) {
  const [generatedContent, setGeneratedContent] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [hasShownAuthWarning, setHasShownAuthWarning] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CoverLetterSchema>({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      Words: "300",
    },
  });

  const handleInputChange = () => {
    if (!user && !hasShownAuthWarning) {
      toast({
        title: "Please sign in to generate a cover letter",
        variant: "destructive",
      });
      setHasShownAuthWarning(true);
    }
  };

  const registerWithAuth = (
    name: keyof CoverLetterSchema,
    options?: RegisterOptions<CoverLetterSchema, keyof CoverLetterSchema>
  ) => ({
    ...register(name, options),
    onChange: handleInputChange,
  });

  const onSubmit = async (data: CoverLetterSchema) => {
    if (!user) {
      toast({
        title: "Please sign in to generate a cover letter",
        variant: "destructive",
      });
      return;
    }
    const { data: tokenData, error } = await supabase.from("users").select("tokens").single();

    if (error) {
      toast({
        title: "Error, please try again later",
        variant: "destructive",
      });
      return;
    }

    if (tokenData.tokens <= 0) {
      toast({
        title: "You have no tokens left. Please try again tomorrow.",
        variant: "destructive",
      });
      return;
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({ tokens: tokenData.tokens - 1 })
      .eq("id", user.id);

    if (updateError) {
      toast({
        title: "Error, please try again later",
        variant: "destructive",
      });
      return;
    }

    const response = await generateCoverLetter(data);
    setGeneratedContent(response.response);
  };

  const handleCopy = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(generatedContent);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full mt-8">
      <div className="flex-1 px-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Education</h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="university">University name</Label>
                <Input id="university" {...registerWithAuth("University")} placeholder="Name of university" />
                <ErrorMessage message={errors.University?.message} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="subject">Subject studied</Label>
                <Input id="subject" {...registerWithAuth("Subject")} placeholder="Subject studied" />
                <ErrorMessage message={errors.Subject?.message} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Past Experience</h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="pastCompany">Past company name</Label>
                <Input id="pastCompany" {...registerWithAuth("PastCompany")} placeholder="Past company" />
                <ErrorMessage message={errors.PastCompany?.message} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="pastRole">Past role title</Label>
                <Input id="pastRole" {...registerWithAuth("PastRole")} placeholder="Past role" />
                <ErrorMessage message={errors.PastRole?.message} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="experience">Relevant experience</Label>
                <Textarea
                  id="experience"
                  {...registerWithAuth("Experience")}
                  placeholder="Short sentence about what you did in your past role"
                  className="min-h-[100px]"
                />
                <ErrorMessage message={errors.Experience?.message} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">New Experience</h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="newCompany">Company you're applying to</Label>
                <Input id="newCompany" {...registerWithAuth("NewCompany")} placeholder="Company applying to" />
                <ErrorMessage message={errors.NewCompany?.message} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="newRole">Role you're applying for</Label>
                <Input id="newRole" {...registerWithAuth("NewRole")} placeholder="Role applying for" />
                <ErrorMessage message={errors.NewRole?.message} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="words">Word limit (Max 300)</Label>
                <Input
                  id="words"
                  type="number"
                  {...registerWithAuth("Words", {
                    valueAsNumber: true,
                    max: 300,
                  })}
                  placeholder="Word limit"
                  max={300}
                />
                <ErrorMessage message={errors.Words?.message} />
              </div>
            </div>
          </Card>

          <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800" disabled={isSubmitting}>
            {isSubmitting ? (
              "Generating..."
            ) : (
              <>
                Generate <Wand2 className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>

      <Card className="flex-1 p-6">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Generated Cover Letter</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                aria-label="Copy to clipboard"
                title={copySuccess ? "Copied!" : "Copy to clipboard"}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 min-h-[400px] bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
            {generatedContent || "Your cover letter will appear here..."}
          </div>
        </div>
      </Card>
    </div>
  );
}
