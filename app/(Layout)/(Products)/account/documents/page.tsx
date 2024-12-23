import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documents",
  description: "Manage your account documents",
};

export default async function Documents() {
  return (
    <div className="flex max-w-5xl flex-col gap-10">
      <h1>Documents</h1>
    </div>
  );
}
