"use server";

import { setTimeout } from "timers/promises";
import { SalaryFormSchema } from "@/lib/validation/types";

export async function submitFormData(
  formData: SalaryFormSchema,
): Promise<{ success: boolean }> {
  const loggedContent = `Submitted form data: ${JSON.stringify(formData)}`;
  // console.log(loggedContent)

  // Simulating a 500ms delay to make the spinning animation
  // show for the submission button.
  await setTimeout(500);

  try {
    const response = await fetch(process.env.API_UPLOAD || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("Request sent successfully");
      return { success: true };
    } else {
      console.error("Error sending request:", response.statusText);
      return { success: false };
    }
  } catch (error) {
    console.error("Error sending request:", error);
    return { success: false };
  }
}
