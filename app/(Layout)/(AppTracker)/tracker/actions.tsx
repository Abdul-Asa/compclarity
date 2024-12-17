"use server";
import { fetchJob } from "@/lib/actions/data";
import { createClient } from "@/lib/supabase/server";
import { ApplicationObject, CreateApplicationSchema, UpdateApplicationSchema } from "@/lib/validation/types";
import { revalidatePath } from "next/cache";

export async function getApplicationOffer(id: string) {
  const job = await fetchJob(id);
  if (!job) {
    return {
      error: true,
      message: "Job not found",
    };
  } else {
    return {
      error: false,
      job,
    };
  }
}

export async function createApplicationCard(formData: CreateApplicationSchema) {
  const supabase = await createClient();
  const userInfo = await supabase.auth.getUser();
  if (userInfo.error || !userInfo.data.user) {
    return {
      error: true,
      message: "User not logged in",
    };
  }

  const { data } = await supabase
    .from("todos")
    .select("kanban_order")
    .eq("user_id", userInfo.data.user.id)
    .eq("todo_level", 0)
    .order("kanban_order", { ascending: false })
    .limit(1);
  // Get the last kanban order and increment it by 1

  const kanbanOrder = data?.length ? data[0].kanban_order + 1 : 0;

  const { error } = await supabase
    .from("todos")
    .insert({
      user_id: userInfo.data.user.id,
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
    })
    .select();

  revalidatePath("/tracker", "layout");
  if (error) {
    console.error(error);
    return {
      error: true,
      message: error.message,
    };
  } else {
    return {
      error: false,
      message: "Application created",
    };
  }
}

export async function updateApplicationCard(formData: UpdateApplicationSchema, id: number) {
  const supabase = await createClient();
  const userInfo = await supabase.auth.getUser();
  if (userInfo.error || !userInfo.data.user) {
    return {
      error: true,
      message: "User not logged in",
    };
  }

  const updateObject: Partial<ApplicationObject> = {
    title: formData.title,
    company: formData.companyName,
    location: formData.location,
    description: formData.description,
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

  const { error } = await supabase.from("todos").update(updateObject).eq("id", id).eq("user_id", userInfo.data.user.id);

  revalidatePath("/", "layout");
  if (error) {
    console.error(error);
    return {
      error: true,
      message: error.message,
    };
  } else {
    return {
      error: false,
      message: "Application updated",
    };
  }
}
export async function deleteApplicationCard(id: number) {
  const supabase = await createClient();
  const userInfo = await supabase.auth.getUser();
  if (userInfo.error || !userInfo.data.user) {
    return {
      error: true,
      message: "User not logged in",
    };
  }

  const { error } = await supabase.from("todos").delete().eq("id", id).eq("user_id", userInfo.data.user.id);

  revalidatePath("/tracker", "layout");
  if (error) {
    console.error(error);
    return {
      error: true,
      message: error.message,
    };
  } else {
    return {
      error: false,
      message: "Application deleted",
    };
  }
}

// Update multiple applications at once (for reordering)
export async function updateApplications(applications: ApplicationObject[]) {
  const supabase = await createClient();
  const userInfo = await supabase.auth.getUser();
  if (userInfo.error || !userInfo.data.user) {
    return {
      error: true,
      message: "User not logged in",
    };
  }

  const { error } = await supabase.from("todos").upsert(applications).eq("user_id", userInfo.data.user.id);

  // revalidatePath("/tracker", "layout");
  if (error) {
    console.error(error);
    return {
      error: true,
      message: error.message,
    };
  } else {
    return {
      error: false,
      message: "Applications updated",
    };
  }
}
