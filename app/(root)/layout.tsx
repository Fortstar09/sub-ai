import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { UserProvider } from "../context/UserContext";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const loggedIn = await getLoggedInUser();

const user = {
    name: loggedIn?.name || '',
    email: loggedIn?.email || '',
    username: loggedIn?.username || '',
  };


  if (!loggedIn) redirect("/sign-in");

  return (
    <UserProvider user={user}>
      <SidebarProvider>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </UserProvider>
  );
};

export default Layout;
