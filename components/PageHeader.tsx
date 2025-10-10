'use client'
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
    <div className="flex-col justify-start flex gap-10 py-8 px-0 md:py-8 md:px-8 lg:px-24">
      <div className="flex items-center justify-between">
        <p className="text-xl md:text-2xl font-medium text-black1 dark:text-white">{title}</p>
        {start && (
          <Button
            variant="outline"
            className="p-2 text-xs md:text-base font-semibold text-black1 dark:text-white bg-[#EDEEF0] dark:bg-transparent dark:border-[#1B1C20] cursor-pointer shadow-none"
          >
            <Link href="/dashboard" className="flex items-center gap-1 md:gap-2">
              <Plus  strokeWidth={2.5} className="text-[#072206] dark:text-white text-xs"/>
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
