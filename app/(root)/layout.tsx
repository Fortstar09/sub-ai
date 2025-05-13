import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) redirect("/sign-in");

  const user = {
    name: loggedIn.name,
    email: loggedIn.email,
   avatar: "/icon/user.svg",
  };

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      {children}
    </SidebarProvider>
  );
};

export default Layout;
