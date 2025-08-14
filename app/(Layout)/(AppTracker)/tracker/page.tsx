import Kanban from "@/components/kanban/kanban";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CompClarity - Job Application Tracker",
  description:
    "CompClarity's mission is dedicated to demystifying compensation packages across Europe, by ensuring that you have all the information required to understand your worth and make informed decisions.",
};

export default async function page() {
  return (
    <main className="flex-1 py-4">
      <Kanban />
    </main>
  );
}
