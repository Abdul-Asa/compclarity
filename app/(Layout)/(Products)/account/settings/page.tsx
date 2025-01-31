import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings",
};

export default async function Settings() {
  return (
    <div className="flex max-w-5xl flex-col gap-10">
      <h1>Settings</h1>
    </div>
  );
}
