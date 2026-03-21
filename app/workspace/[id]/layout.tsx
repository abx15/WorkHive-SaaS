import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { redirect } from "next/navigation";
import { getWorkspaceById } from "@/lib/actions/workspace";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Security check: verify membership
  const workspace = await getWorkspaceById(id);
  
  if (!workspace) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar workspaceId={id} />
      <div className="flex-1 flex flex-col">
        {/* We pass a custom switcher inside Navbar or modify Navbar */}
        <Navbar showSwitcher={true} />
        <main className="flex-1 p-8 bg-background overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
