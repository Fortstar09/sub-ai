"use client"
import Logout from "./Logout";
import { SidebarInset, SidebarTrigger } from "./ui/sidebar";
import { useUser } from "@/app/context/UserContext";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
      const userContext = useUser();
      if (!userContext || !userContext.user) {
        return null;
      }
      const { user } = userContext;

  return (
    <SidebarInset>
      <header className="flex h-[65] border-b shrink-0 bg-white items-center gap-2 sticky top-0 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[57]">
        <div className="flex items-center justify-between px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <div className="flex justify-center gap-4 md:gap-0 items-center">
            <span className="text-sm font-semibold text-white bg-green-600 rounded-full flex items-center justify-center w-6 h-6 mr-6">
              {user.name[0].toUpperCase()}
            </span>
            <Logout />
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
    </SidebarInset>
  );
};

export default PageWrapper;
