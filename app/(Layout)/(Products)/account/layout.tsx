import { TabMenu } from "@/components/layout/account/tab-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex flex-col w-full h-full p-4">
      <TabMenu
        items={[
          { path: "/account", label: "General" },
          // { path: "/account/documents", label: "Documents" },
          // { path: "/account/settings", label: "Settings" },
        ]}
      />

      <main className="flex-1 py-4">{children}</main>
    </div>
  );
}
