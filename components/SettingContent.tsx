"use client";
import React from "react";
import { Button } from "./ui/button";
import { ChevronDown, CornerDownLeft, Trash } from "lucide-react";
import { useUser } from "@/app/context/UserContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const SettingContent = () => {
  const userContext = useUser();
  if (!userContext || !userContext.user) {
    return null;
  }
  const { user } = userContext;
  return (
    <div className="flex flex-col gap-9">
      {/* PROFILE SETTING CONTENT */}
      <div className="flex flex-col gap-7">
        <h3 className="uppercase text-[#98A2B3] text-sm font-normal">
          Profile
        </h3>

        <EachSettingList heading=" E-Mail Address" subheading={user.email} />
        <EachSettingList
          heading="Username"
          subheading={user.name}
          action
          actionText="Update Username"
        />
        <EachSettingList
          heading="Log Out"
          subheading={`You are signed in as ${user.email}`}
          action
          actionText="Log out"
        />
      </div>
      {/* GENERAL SETTING CONTENT */}
      <div className="flex flex-col gap-7">
        <h3 className="uppercase text-[#98A2B3] text-sm font-normal">
          GENERAL
        </h3>
        <EachSettingList
          heading="Application Language"
          subheading="English"
          action
          actionText="English"
          icon={<ChevronDown size={16} />}
        />
        <EachSettingList
          heading="Theme Mode"
          subheading="Default (Match System)"
          action
          actionText="Default"
          icon={<ChevronDown size={16} />}
        />
        <EachSettingList
          heading="About Sub AI"
          action
          actionText="Check About us"
          icon={<CornerDownLeft size={16} />}
        />
      </div>
      {/* DANGER SETTING CONTENT */}
      <div className="flex flex-col gap-7">
        <h3 className="uppercase text-[#98A2B3] text-sm font-normal">
          DANGER ZONE
        </h3>
        <EachSettingList
          heading="Delete History"
          subheading="Deleting your ingredient history is permanent and irreversible"
          action
          actionText="Delete History"
        />
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-red-600 font-medium text-[17px]">
              Delete Account
            </h2>
            <p className="text-[#475367] font-normal text-base">
              Deleting your account is permanent and irreversible
            </p>
          </div>
          <AlertDialog> 
            <AlertDialogTrigger className="h-9 border border-[#EEEEEE] rounded-[8px] text-[#DF1C41] font-medium text-sm p-2 cursor-pointer hover:bg-[#DF1C41] hover:text-white shadow-none">
              Delete Account
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Account</AlertDialogTitle>
                <AlertDialogDescription>
                  Deleting your account will erase your profile, chat history,
                  and all associated data from our system. This action is
                  permanent and cannot be reversed. Click Confirm to permanently
                  delete your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex sm:justify-between w-full mt-6">
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-600/70 cursor-pointer">
                  Confirm Delete <Trash />
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default SettingContent;

interface EachSettingListProps {
  heading: string;
  subheading?: string;
  action?: boolean;
  actionText?: string;
  icon?: React.ReactNode;
}

const EachSettingList = ({
  heading,
  subheading,
  action,
  actionText,
  icon,
}: EachSettingListProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-black1 font-medium text-[17px]">{heading}</h2>
        <p className="text-[#475367] font-normal text-base">{subheading}</p>
      </div>
      {action && (
        <Button
          variant="outline"
          className="h-9 border-[#EEEEEE] text-black1 font-medium text-sm p-2 cursor-pointer hover:bg-green-700 hover:text-white shadow-none"
        >
          {actionText}
          {icon}
        </Button>
      )}
    </div>
  );
};
