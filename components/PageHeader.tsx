import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  start?: boolean;
  children?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, start, children }) => {
  return (
    <div className="flex-col justify-start flex gap-16 py-8 px-0 md:py-8 md:px-8 lg:px-24">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-medium text-black1">{title}</p>
        {start && (
          <Button
            variant="outline"
            className="p-2 font-semibold text-black1 bg-[#EDEEF0] cursor-pointer shadow-none"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <Plus size={16} strokeWidth={2.5} color="#072206" />
              Start a new chat
            </Link>
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};

export default PageHeader;
