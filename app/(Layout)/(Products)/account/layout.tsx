import { TabMenu } from "@/components/layout/account/tab-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col container p-4">
      <TabMenu
        items={[
          { path: "/account", label: "General" },
          { path: "/account/documents", label: "Documents" },
          { path: "/account/settings", label: "Settings" },
        ]}
      />

      <main className="flex-1">{children}</main>
    </div>
  );
}
