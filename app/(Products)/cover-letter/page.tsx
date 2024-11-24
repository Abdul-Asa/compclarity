"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { coverLetterSchema } from "@/lib/validations/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Wand2 } from "lucide-react";
import { ErrorMessage } from "@/components/ui/error-message";
import { useState } from "react";
import { CoverLetterSchema } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { generateCoverLetter } from "./action";

export default function CoverLetter() {
  const [generatedContent, setGeneratedContent] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
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

  const onSubmit = async (data: CoverLetterSchema) => {
    const response = await generateCoverLetter(data);
    setGeneratedContent(response.response);
  };

  const handleCopy = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(generatedContent);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full p-4">
      <div className="flex-1 flex justify-center container relative flex-col items-center mx-auto p-5">
        <h1 className="max-w-4xl animate-fade-in text-wrap p-2 text-center text-2xl font-bold tracking-tight transition lg:text-5xl">
          <span className="inline-block text-emerald-700 dark:text-emerald-500 transition hover:-translate-y-1">
            AI
          </span>{" "}
          Cover Letter Generator
        </h1>
        <p className="max-w-4xl animate-fade-in text-wrap p-2 text-center text-lg font-normal tracking-tight transition lg:text-2xl">
          Generate a cover letter in seconds with our AI-powered cover letter generator.
        </p>

        <div className="flex flex-col lg:flex-row gap-4 w-full mt-8">
          <div className="flex-1 px-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-6">Education</h2>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="university">University name</Label>
                    <Input id="university" {...register("University")} placeholder="Name of university" />
                    <ErrorMessage message={errors.University?.message} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="subject">Subject studied</Label>
                    <Input id="subject" {...register("Subject")} placeholder="Subject studied" />
                    <ErrorMessage message={errors.Subject?.message} />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-6">Past Experience</h2>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="pastCompany">Past company name</Label>
                    <Input id="pastCompany" {...register("PastCompany")} placeholder="Past company" />
                    <ErrorMessage message={errors.PastCompany?.message} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="pastRole">Past role title</Label>
                    <Input id="pastRole" {...register("PastRole")} placeholder="Past role" />
                    <ErrorMessage message={errors.PastRole?.message} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="experience">Relevant experience</Label>
                    <Textarea
                      id="experience"
                      {...register("Experience")}
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
                    <Input id="newCompany" {...register("NewCompany")} placeholder="Company applying to" />
                    <ErrorMessage message={errors.NewCompany?.message} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="newRole">Role you're applying for</Label>
                    <Input id="newRole" {...register("NewRole")} placeholder="Role applying for" />
                    <ErrorMessage message={errors.NewRole?.message} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="words">Word limit (Max 300)</Label>
                    <Input
                      id="words"
                      type="number"
                      {...register("Words", {
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
              <div className="flex-1 min-h-[400px] bg-muted rounded-lg p-4">
                {generatedContent || "Your cover letter will appear here..."}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
