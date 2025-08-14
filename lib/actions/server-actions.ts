"use server";
import { cache } from "react";
import { createClient } from "../supabase/server";
// import { addYears } from "date-fns";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { actionClient } from "./safe-action";
import { revalidatePath } from "next/cache";
import { CVData } from "@/components/cv-builder/types";
import { fetchJob } from "./data";
import { ApplicationObject } from "../validation/types";

export const getUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  if (!userId) {
    return null;
  }

  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();

  if (error || !data) {
    return null;
  }

  return data;
});

export const getCVs = cache(async () => {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    console.log("User not authenticated");
    return null;
  }
  const { data, error } = await supabase.from("cvs").select("*").eq("user_id", user.id);

  if (error || !data) {
    return null;
  }
  return data;
});

export const getCV = cache(async (cvId: string) => {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    console.log("User not authenticated");
    return null;
  }
  const { data, error } = await supabase.from("cvs").select("*").eq("id", cvId).eq("user_id", user.id).single();

  if (error || !data) {
    console.log(cvId, error);
    return null;
  }

  return {
    ...data,
    cv_data: data.cv_data as unknown as CVData,
  };
});

const createCVSchema = z.object({
  combinedCVData: z.object({
    sections: z.any(),
    settings: z.any(),
  }),
});

export const createCV = actionClient.schema(createCVSchema).action(async ({ parsedInput: { combinedCVData } }) => {
  const supabase = await createClient();

  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("cvs")
    .insert({
      user_id: user.id,
      cv_data: combinedCVData,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to create CV");
  }

  revalidatePath("/");
  redirect(`/cv-generate/${data.id}`);
});

const updateCVSchema = z.object({
  cvId: z.string(),
  combinedCVData: z.object({
    sections: z.any(),
    settings: z.any(),
  }),
});

export const updateCV = actionClient
  .schema(updateCVSchema)
  .action(async ({ parsedInput: { cvId, combinedCVData } }) => {
    const supabase = await createClient();

    const user = await getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    const { data, error } = await supabase
      .from("cvs")
      .update({
        cv_data: combinedCVData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", cvId)
      .select();

    if (error) {
      console.error(error);
      throw new Error("Failed to update CV");
    }

    revalidatePath("/");
    return data;
  });

const deleteCVSchema = z.object({
  cvId: z.string(),
});

export const deleteCV = actionClient.schema(deleteCVSchema).action(async ({ parsedInput: { cvId } }) => {
  const supabase = await createClient();

  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("cvs").delete().eq("id", cvId).eq("user_id", user.id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete CV");
  }

  revalidatePath("/");
  return { success: true };
});

export const updateUserSubscription = async (userId: string, customerId: string | null, isSubscribed: boolean) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("users")
    .update({
      stripe_customer_id: customerId,
      is_subscribed: isSubscribed,
    })
    .eq("id", userId);

  if (error) {
    console.error(error);
    throw new Error("Failed to update user subscription");
  }
};

const tailorCVSchema = z.object({
  cv_id: z.string(),
  job_name: z.string(),
  company_name: z.string(),
});

export const tailorCV = actionClient
  .schema(tailorCVSchema)
  .action(async ({ parsedInput: { cv_id, job_name, company_name } }) => {
    const supabase = await createClient();
    const user = await getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    if (!user.is_subscribed) {
      throw new Error("User not subscribed");
    }
    const { data: cv, error: cvError } = await supabase
      .from("cvs")
      .select("*")
      .eq("id", cv_id)
      .eq("user_id", user.id)
      .single();

    if (cvError || !cv) {
      throw new Error("CV not found");
    }
    const cvData = cv.cv_data as unknown as CVData;
    if (!cvData) {
      throw new Error("CV data not found");
    }
    const response = await fetch(
      `https://compclarity.azurewebsites.net/api/custom_cv?code=r562vGcndnHAaO1oWYiqnJP5s95wJPaxBIC82u0P2jykAzFuuvkIQw%3D%3D`,
      {
        method: "POST",
        body: JSON.stringify({
          sections: cvData.sections,
          settings: cvData.settings,
          job: job_name,
          company: company_name,
        }),
      }
    );

    if (!response.ok) {
      console.error(response);
      throw new Error("Failed to tailor CV");
    }

    const tailoredCVData = await response.json();
    console.log(tailoredCVData);
    await createCV({
      combinedCVData: {
        sections: tailoredCVData.sections,
        settings: { ...cvData.settings, name: `${job_name} - ${company_name} CV` },
      },
    });
  });

// Application server actions
export const getApplications = cache(async () => {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    console.log("User not authenticated");
    return null;
  }
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", user.id)
    .order("todo_level")
    .order("kanban_order");

  if (error) {
    console.error(error);
    return null;
  }
  return data;
});

const createApplicationActionSchema = z.object({
  companyName: z.string().min(1, { message: "Company name cannot be empty" }),
  title: z.string().min(1, { message: "Title cannot be empty" }),
  dateApplied: z.string().min(1, { message: "Date of application cannot be empty" }),
  location: z.string().min(1, { message: "Location cannot be empty" }),
  description: z.string().optional(),
});

export const createApplicationAction = actionClient
  .schema(createApplicationActionSchema)
  .action(async ({ parsedInput: formData }) => {
    const supabase = await createClient();
    const user = await getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { data } = await supabase
      .from("applications")
      .select("kanban_order")
      .eq("user_id", user.id)
      .eq("todo_level", "0")
      .order("kanban_order", { ascending: false })
      .single();

    const kanbanOrder = data ? data.kanban_order + 1 : 0;
    const { error } = await supabase.from("applications").insert({
      user_id: user.id,
      kanban_order: kanbanOrder,
      todo_level: "0",
      title: formData.title,
      company: formData.companyName,
      location: formData.location,
      description: formData.description,
      date_applied: formData.dateApplied,
      date_screened: null,
      date_interviewed: null,
      date_offered: null,
      date_rejected: null,
    });

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    revalidatePath("/tracker", "layout");
    return { message: "Application created" };
  });

const updateApplicationActionSchema = z.object({
  id: z.number(),
  data: z.object({
    companyName: z.string().min(1, { message: "Company name cannot be empty" }),
    title: z.string().min(1, { message: "Title cannot be empty" }),
    location: z.string().min(1, { message: "Location cannot be empty" }),
    description: z.string().optional(),
    dateScreened: z.string().optional(),
    dateApplied: z.string().optional(),
    dateInterviewed: z.string().optional(),
    dateOffered: z.string().optional(),
    dateRejected: z.string().optional(),
    todoLevel: z.string().optional(),
    notify: z.boolean().optional(),
  }),
});

export const updateApplicationAction = actionClient
  .schema(updateApplicationActionSchema)
  .action(async ({ parsedInput: { id, data: formData } }) => {
    const supabase = await createClient();
    const user = await getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const updateObject: Partial<ApplicationObject> = {
      title: formData.title,
      company: formData.companyName,
      location: formData.location,
      description: formData.description,
      notifications: formData.notify,
      todo_level: formData.todoLevel,
      kanban_order: 0,
      completed: formData.todoLevel === "4",
    };
    if (formData.dateApplied) {
      updateObject.date_applied = formData.dateApplied;
    }
    if (formData.dateScreened) {
      updateObject.date_screened = formData.dateScreened;
    }
    if (formData.dateOffered) {
      updateObject.date_offered = formData.dateOffered;
    }
    if (formData.dateInterviewed) {
      updateObject.date_interviewed = formData.dateInterviewed;
    }
    if (formData.dateRejected) {
      updateObject.date_rejected = formData.dateRejected;
    }
    // You can use notify here for notification logic if needed
    const { error } = await supabase.from("applications").update(updateObject).eq("id", id).select();

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    revalidatePath("/", "layout");
    return { message: "Application updated" };
  });

const deleteApplicationActionSchema = z.object({
  id: z.number(),
});

export const deleteApplicationAction = actionClient
  .schema(deleteApplicationActionSchema)
  .action(async ({ parsedInput: { id } }) => {
    const supabase = await createClient();
    const user = await getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase.from("applications").delete().eq("id", id).eq("user_id", user.id);

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    revalidatePath("/tracker", "layout");
    return { message: "Application deleted" };
  });

const updateApplicationsActionSchema = z.object({
  applications: z.array(z.custom<ApplicationObject>()),
});

export const updateApplicationsAction = actionClient
  .schema(updateApplicationsActionSchema)
  .action(async ({ parsedInput: { applications } }) => {
    const supabase = await createClient();
    const user = await getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase.from("applications").upsert(applications).eq("user_id", user.id);

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    return { message: "Applications updated" };
  });

const deleteAllApplicationsActionSchema = z.object({});

export const deleteAllApplicationsAction = actionClient.schema(deleteAllApplicationsActionSchema).action(async () => {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("applications").delete().eq("user_id", user.id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  revalidatePath("/tracker", "layout");
  return { message: "All applications deleted" };
});

const deleteRejectedApplicationsActionSchema = z.object({});

export const deleteRejectedApplicationsAction = actionClient
  .schema(deleteRejectedApplicationsActionSchema)
  .action(async () => {
    const supabase = await createClient();
    const user = await getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase.from("applications").delete().eq("user_id", user.id).eq("todo_level", "4");

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    revalidatePath("/tracker", "layout");
    return { message: "Rejected applications deleted" };
  });

export const getJobOffer = cache(async (id: string) => {
  // Use the existing fetchJob function from data.ts
  const job = await fetchJob(id);
  return job;
});

export const exportCSVData = cache(async () => {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    console.log("User not authenticated");
    return null;
  }

  const { data, error } = await supabase
    .from("applications")
    .select(
      `
      title,
      company,
      location,
      todo_level,
      completed,
      date_applied,
      date_screened,
      date_interviewed,
      date_offered,
      date_rejected
    `
    )
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
    return null;
  }

  // Map todo_level and completed
  const todoLevelMap: Record<string, string> = {
    "0": "Applied",
    "1": "Screen",
    "2": "Interview",
    "3": "Offer",
    "4": "Rejected",
  };

  const mappedData = (data ?? []).map((row) => ({
    title: row.title || "",
    company: row.company || "",
    location: row.location || "",
    status: todoLevelMap[row.todo_level] ?? row.todo_level,
    offered: row.completed ? "true" : "false",
    date_applied: row.date_applied || "",
    date_screened: row.date_screened || "",
    date_interviewed: row.date_interviewed || "",
    date_offered: row.date_offered || "",
    date_rejected: row.date_rejected || "",
  }));

  // Convert to CSV format manually (similar to Papa.unparse)
  const headers = [
    "title",
    "company",
    "location",
    "status",
    "offered",
    "date_applied",
    "date_screened",
    "date_interviewed",
    "date_offered",
    "date_rejected",
  ];

  const csvRows = [
    headers.join(","),
    ...mappedData.map((row) => headers.map((header) => `"${row[header as keyof typeof row]}"`).join(",")),
  ];
  return csvRows.join("\n");
});
