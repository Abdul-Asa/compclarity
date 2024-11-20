"use server";
import { CoverLetterSchema } from "@/lib/types";

export async function generateCoverLetter(formData: CoverLetterSchema) {
  const request = await fetch(`https://compclarity.azurewebsites.net/api/process_gpt?code=${process.env.GPT_API_KEY}`, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  return request.json();
}
