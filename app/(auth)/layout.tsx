import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className=" flex flex-col items-center justify-center gap-2 md:gap-4 min-h-screen px-4 py-10 bg-white">
      <Image src='/logo/logo-full.svg' alt="logo" height={10} width={100} />
      {children}
    </section>
  );
};

export default Layout;
