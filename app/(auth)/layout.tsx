import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const loggedIn = await getLoggedInUser();
  if (loggedIn) redirect("/dashboard");

  return (
    <section className=" flex flex-col items-center justify-center gap-2 md:gap-4 min-h-screen px-4 py-10 bg-white dark:bg-[#171717]">
      <Link href="/">
        <Image src="/logo/logo-full.svg" alt="logo" height={10} width={100} />
      </Link>
      {children}
    </section>
  );
};

export default Layout;
