import React from "react";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className=" flex flex-col items-center justify-center gap-2 md:gap-4 min-h-screen px-4 py-10 bg-white">
      <Link href='/'>
      <Image src='/logo/logo-full.svg' alt="logo" height={10} width={100} />
      </Link>
      {children}
    </section>
  );
};

export default Layout;
