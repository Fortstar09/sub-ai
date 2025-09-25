import HistoryTab from "@/components/HistoryTab";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const history = () => {
  return (
    <PageWrapper>
      <div className="flex-col justify-start flex gap-16 py-8 px-0 md:py-8 md:px-8 lg:px-24">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-medium text-black1 ">
            Ingredient history{" "}
          </p>
          <Button
            variant="outline"
            className="p-2 font-semibold text-black1 bg-[#EDEEF0] cursor-pointer"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <Plus size={16} strokeWidth={2.5} color="#072206" />
              Start a new chat
            </Link>
          </Button>
        </div>
       <HistoryTab />
      </div>
    </PageWrapper>
  );
};

export default history;
