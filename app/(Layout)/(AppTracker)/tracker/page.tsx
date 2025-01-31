import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Kanban from "@/components/kanban/Kanban";
import CreateApplication from "@/components/kanban/CreateApplication";
import { ApplicationObject } from "@/lib/validation/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CompClarity - Job Application Tracker",
  description:
    "CompClarity's mission is dedicated to demystifying compensation packages across Europe, by ensuring that you have all the information required to understand your worth and make informed decisions.",
};

const page = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  // Fetch cards from the database
  const { data: cards } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", data.user.id)
    .order("todo_level")
    .order("kanban_order");

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex self-center pb-4 sm:self-end sm:p-0">
        <CreateApplication />
      </div>
      <Kanban initialData={cards as ApplicationObject[]} />
    </div>
  );
};
export default page;
