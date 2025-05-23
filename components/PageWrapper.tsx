import Image from "next/image";
import Logout from "./Logout";
import { SidebarInset, SidebarTrigger } from "./ui/sidebar";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarInset>
      <header className="flex h-[65] border-b shrink-0 bg-white items-center gap-2 sticky top-0 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[57]">
        <div className="flex items-center justify-between px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <div className="flex justify-center gap-4 md:gap-0 items-center">
            <Image
              src="/icon/user.svg"
              alt="user"
              width={28}
              height={28}
              className="mr-0 md:mr-5"
            />
            <Logout />
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
    </SidebarInset>
  );
};

export default PageWrapper;
