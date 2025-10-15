"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  ArrowRightFromLine,
  ChevronDown,
  CornerDownLeft,
  Plus,
  Trash,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
// import Image from "next/image";
import {
  deleteAllHistory,
  signOut,
  updateUserName,
} from "@/lib/actions/user.actions";
import { toast } from "sonner";
import { useTheme } from "@/app/context/ThemeContext";
import Link from "next/link";

interface User {
  email: string;
  name: string;
  username: string;
}

const SettingContent = () => {
  const { user, setUser } = useUser();
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState("");

  const handleLogout = async () => {
    await signOut();

    toast("Successfully Sign Out");
  };

  const deleteHistory = async () => {
    await deleteAllHistory();

    toast("Delete all history");
  };

  const updateName = async (name: string) => {
    console.log("Updating username to:", name);
    try {
      const result = await updateUserName(name);
      if (result) {
        toast.success("Username updated");
        setUser({ ...user, username: name } as User);
      }
    } catch (error) {
      console.error("Failed to update username:", error);
      toast.error("Failed to update username. Please try again.");
    } finally {
      setName("");
    }
  };

  const handleThemeChange = (value: "light" | "dark" | "system") => {
    setTheme(value);
  };

  console.log("Current theme:", user);
  return (
    <div className="flex flex-col gap-9">
      {/* PROFILE SETTING CONTENT */}
      <div className="flex flex-col gap-7">
        <h3 className="uppercase text-[#98A2B3] text-sm font-normal">
          Profile
        </h3>

        <EachSettingList heading=" E-Mail Address" subheading={user?.email} />
        <EachSettingList heading=" Full Name" subheading={user?.name} />
        <EachSettingList
          heading="Username"
          subheading={user?.username ? user.username : user?.name.split(" ")[0]}
          actionComponent={
            <AlertDialog>
              <AlertDialogTrigger className="h-9 border border-[#EEEEEE] dark:border-[#1E1E1E] rounded-[8px] text-black1 dark:text-white font-medium text-sm p-2 cursor-pointer hover:bg-green-600 hover:text-white shadow-none">
                Update Username
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-black1 dark:text-white text-2xl font-semibold">
                    Update Username
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base font-normal text-[#475367]">
                    Update your username by entering a new one
                  </AlertDialogDescription>
                  <div className="grid w-full items-center gap-1 mt-10 ">
                    <Label
                      htmlFor="username"
                      className="text-[#475367] text-sm font-semibold"
                    >
                      New username
                    </Label>
                    <Input
                      type="username"
                      id="username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g John"
                      className="p-4.5 min-h-14 text-[#475367] w-full text-sm placeholder:text-[#98A2B3]"
                    />
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex sm:justify-between gap-3 w-full mt-3 md:mt-6">
                  <AlertDialogCancel className="shadow-none border-[#EEEEEE] dark:border-[#1E1E1E] cursor-pointer text-base font-semibold text-black1 dark:text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="shadow-none border-[#EEEEEE] dark:text-white dark:border-[#1E1E1E] bg-green-600 hover:bg-green-600/70 cursor-pointer"
                    onClick={() => {
                      updateName(name);
                    }}
                  >
                    Update <Plus />
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          }
        />
        <EachSettingList
          heading="Log Out"
          subheading={`You are signed in as ${user?.email}`}
          actionComponent={
            <AlertDialog>
              <AlertDialogTrigger className="h-9 border border-[#EEEEEE] dark:border-[#1E1E1E] rounded-[8px] text-black1 dark:text-white font-medium text-sm p-2 cursor-pointer hover:bg-[#DF1C41] hover:text-white shadow-none">
                Log out
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-black1 dark:text-white text-2xl font-semibold">
                    Log out
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base font-normal text-[#475367]">
                    Are you sure you want to log out your account from Sub Ai?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex sm:justify-between w-full mt-6">
                  <AlertDialogCancel className="shadow-none border-[#EEEEEE] dark:border-[#1E1E1E] cursor-pointer text-base font-semibold text-black1 dark:text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="shadow-none border-[#EEEEEE] dark:border-[#1E1E1E] dark:text-white bg-red-600 hover:bg-red-600/70 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Log out <ArrowRightFromLine />
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          }
        />
      </div>

      {/* GENERAL SETTING CONTENT */}

      <div className="flex flex-col gap-7">
        <h3 className="uppercase text-[#98A2B3]  text-sm font-normal">
          GENERAL
        </h3>
        {/* <EachSettingList
            heading="Application Language"
            subheading="English"
            actionComponent={
              <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-2 items-center h-9 border border-[#EEEEEE] dark:border-[#1E1E1E] rounded-[8px] text-black1 dark:text-white font-medium text-sm p-2 cursor-pointer hover:bg-green-600 hover:text-white shadow-none">
                  <Image
                    src="/flag/en.svg"
                    alt="eng"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  English
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[144px]">
                  <DropdownMenuItem className="flex gap-2 items-center text-sm font-medium text-black1 dark:text-white p-2 cursor-pointer">
                    <Image
                      src="/flag/en.svg"
                      alt="eng"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2 items-center text-sm font-medium text-black1 dark:text-white p-2 cursor-pointer">
                    <Image
                      src="/flag/es.svg"
                      alt="es"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    Español
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2 items-center text-sm font-medium text-black1 dark:text-white p-2 cursor-pointer">
                    <Image
                      src="/flag/de.svg"
                      alt="de"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    Deutsch
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2 items-center text-sm font-medium text-black1 dark:text-white p-2 cursor-pointer">
                    <Image
                      src="/flag/fr.svg"
                      alt="fr"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    Francais
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            }
          /> */}
        <EachSettingList
          heading="Theme Mode"
          subheading="System (match device theme)"
          actionComponent={
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-2 items-center h-9 border border-[#EEEEEE] dark:border-[#1E1E1E] rounded-[8px] text-black1 dark:text-white font-medium text-sm p-2 cursor-pointer hover:bg-green-600 hover:text-white shadow-none">
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
                <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup
                  value={theme}
                  onValueChange={(value) =>
                    handleThemeChange(value as "light" | "dark" | "system")
                  }
                >
                  <DropdownMenuRadioItem value="system">
                    System
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="light">
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    Dark
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />
        <EachSettingList
          heading="About Sub AI"
          actionComponent={
            <Button
              variant="outline"
              className="h-9 border-[#EEEEEE] dark:border-[#1E1E1E] text-black1 dark:text-white font-medium text-sm p-2 cursor-pointer hover:bg-green-700 hover:text-white shadow-none"
            >
              <Link
                href="https://empathetic-communication-530229.framer.app/"
                target="_blank"
              >
                Check About us
              </Link>
              <CornerDownLeft size={16} />
            </Button>
          }
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
          actionComponent={
            <AlertDialog>
              <AlertDialogTrigger className="h-9 border border-[#EEEEEE] dark:border-[#1E1E1E] rounded-[8px] text-black1 dark:text-white font-medium text-sm p-2 cursor-pointer hover:bg-[#DF1C41] hover:text-white shadow-none">
                Delete History
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-black1 dark:text-white text-2xl font-semibold">
                    Delete History
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base font-normal text-[#475367]">
                    Deleting your history will permanently remove all past
                    conversations from this account. This action cannot be
                    undone. Click Confirm to proceed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex sm:justify-between w-full mt-6">
                  <AlertDialogCancel className="shadow-none dark:bg-transparent border-[#EEEEEE] cursor-pointer text-base font-semibold text-black1 dark:text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="shadow-none border-[#EEEEEE] dark:text-white bg-[#E53051] hover:bg-[#E53051]/70 cursor-pointer"
                    onClick={deleteHistory}
                  >
                    Confirm Delete <Trash />
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          }
        />
        <EachSettingList
          heading="Delete Account"
          subheading="Deleting your account is permanent and irreversible"
          isDanger
          actionComponent={
            <AlertDialog>
              <AlertDialogTrigger className="h-9 border border-[#EEEEEE] dark:border-[#1E1E1E]  rounded-[8px] text-[#E53051] font-medium text-sm p-2 cursor-pointer hover:bg-[#DF1C41] hover:text-white shadow-none">
                Delete Account
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-black1 dark:text-white text-2xl font-semibold ">
                    Delete Account
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base font-normal text-[#475367]">
                    Deleting your account will erase your profile, chat history,
                    and all associated data from our system. This action is
                    permanent and cannot be reversed. Click Confirm to
                    permanently delete your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex sm:justify-between w-full mt-6">
                  <AlertDialogCancel className="shadow-none cursor-pointer dark:bg-transparent border-[#EEEEEE] dark:border-[#1E1E1E] text-base font-semibold text-black1 dark:text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="shadow-none border-[#EEEEEE] dark:text-white dark:border-[#1E1E1E] bg-[#E53051] hover:bg-[#E53051]/70 cursor-pointer">
                    Confirm Delete <Trash />
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          }
        />
      </div>
    </div>
  );
};

export default SettingContent;

interface EachSettingListProps {
  heading: string;
  subheading?: string;
  actionComponent?: React.ReactNode;
  isDanger?: boolean;
}

const EachSettingList = ({
  heading,
  subheading,
  actionComponent,
  isDanger,
}: EachSettingListProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-0.5">
        <h2
          className={`${
            isDanger ? "text-[#DF1C41]" : "text-black1 dark:text-white"
          } font-normal text-base md:text-[17px]`}
        >
          {heading}
        </h2>
        <p className="text-[#475367] font-normal text-sm md:text-base max-w-[200px] md:max-w-full">
          {subheading}
        </p>
      </div>
      {actionComponent}
    </div>
  );
};
