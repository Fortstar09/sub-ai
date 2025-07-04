// "use client";

// import { motion } from "motion/react";
// import Link from "next/link";

// const page = () => {
//   return (
//     <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0">
//       <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
//         <motion.div
//           initial={{ opacity: 0.5, width: "15rem" }}
//           whileInView={{ opacity: 1, width: "30rem" }}
//           transition={{
//             delay: 0.3,
//             duration: 0.8,
//             ease: "easeInOut",
//           }}
//           style={{
//             backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
//           }}
//           className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
//         >
//           <div className="absolute  w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
//           <div className="absolute  w-40 h-[100%] left-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0.5, width: "15rem" }}
//           whileInView={{ opacity: 1, width: "30rem" }}
//           transition={{
//             delay: 0.3,
//             duration: 0.8,
//             ease: "easeInOut",
//           }}
//           style={{
//             backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
//           }}
//           className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
//         >
//           <div className="absolute  w-40 h-[100%] right-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
//           <div className="absolute  w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
//         </motion.div>
//         <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
//         <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
//         <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
//         <motion.div
//           initial={{ width: "8rem" }}
//           whileInView={{ width: "16rem" }}
//           transition={{
//             delay: 0.3,
//             duration: 0.8,
//             ease: "easeInOut",
//           }}
//           className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
//         ></motion.div>
//         <motion.div
//           initial={{ width: "15rem" }}
//           whileInView={{ width: "30rem" }}
//           transition={{
//             delay: 0.3,
//             duration: 0.8,
//             ease: "easeInOut",
//           }}
//           className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400 "
//         ></motion.div>

//         <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950 "></div>
//       </div>

//       <div className="relative z-50 flex -translate-y-80 flex-col gap-5 items-center px-5">
//         <motion.h1
//           initial={{ opacity: 0.5, y: 100 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{
//             delay: 0.3,
//             duration: 0.8,
//             ease: "easeInOut",
//           }}
//           className="mt-20 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
//         >
//           Out of <br /> Ingredients?
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0.5, y: 100 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{
//             delay: 0.3,
//             duration: 0.8,
//             ease: "easeInOut",
//           }}
//           className="text-white text-center text-xl"
//         >
//           Get instant, AI-powered recipe substitutions <br />
//           for anything in your kitchen.
//         </motion.p>
//         <motion.div
//         className="mt-9"
//           initial={{ opacity: 0, y: 100 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{
//             delay: 1.2,
//             duration: 0.8,
//             ease: "easeInOut",
//           }}
//         >
//           <Link className="text-white mt-20 bg-cyan-500 px-5 py-3 text-xl rounded" href="/sign-in">Get Started</Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default page;

import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-2">
          <Image
            src="/logo/logo-full.svg"
            alt="sub ai logo"
            width={160}
            height={160}
            className="size-20 sm:size-40"
          />
        </div>
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">Get started with sub ai.</li>
          <li className="tracking-[-.01em]">
            Get your substitute ingredient instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/sign-in"
            rel="noopener noreferrer"
          >
            Login
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[160px]"
            href="/sign-up"
          >
            Create account
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <p>Learn more about the builders:</p>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          rel="noopener noreferrer"
        >
          Quake
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://fortunate-portfolio.vercel.app"
          rel="noopener noreferrer"
        >
          xblank
        </a>
      </footer>
    </div>
  );
}
