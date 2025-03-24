import React from "react";
import Image from "next/image";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2   items-center bg-[#1BB425]/60 justify-center px-1 py-6 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-10">
          <Image
            src="/logo/logo-full-white.svg"
            alt="logo"
            width={200}
            height={82}
            className="h-auto"
          />

          <div className="space-y-5 text-white">
            <h1 className="h1">Seamless access to smart recipe substitutions</h1>
            <p className="body-1">
            Effortlessly find the best ingredient replacements for any recipe with AI-powered precision.
            </p>
          </div>
          <Image
            src="/illus/recipe.png"
            alt="Files"
            width={300}
            height={300}
            className="transition-all hover:rotate-10 hover:scale-105"
          />
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <Image
            src="/logo/logo-full.svg"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
          />
        </div>

        {children}
      </section>
     
    </div>
  );
};

export default Layout;
