"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface ResultDataProps {
  jsonObject: {
    status: string;
    message?: string;
    ingredient?: string;
    substitutes: Array<{
      name: string;
      ratio: string;
      note: string;
    }>;
  };
}

const ResultData = ({ jsonObject }: ResultDataProps) => {
  return (
    <AnimatePresence>
      {jsonObject.status === "success" ? (
        <motion.div
          className="border-[#F4F6F5] dark:border-[#1E1E1E]  border max-w-fit rounded-[24px]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            duration: 1,
            when: "beforeChildren", // 👈 use "afterChildren" if you want children to animate first
            staggerChildren: 0.5, // optional: stagger child animations
            delayChildren: 2, // optional: delay children start
          }}
        >
          <h1 className="py-3 px-4 text-[17px]  text-black1 dark:text-white leading-[22px] font-semibold bg-[#FAFAFA] dark:bg-[#121212] rounded-t-[24px] ">
            Here are some substitutes for{" "}
            <span className="font-bold capitalize">
              “{jsonObject.ingredient}”
            </span>
          </h1>
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            jsonObject.substitutes.map((item: any, index: number) => (
              <EachResult
                key={index}
                id={index + 1}
                name={item.name}
                notes={item.notes}
              />
            ))
          }
        </motion.div>
      ) : jsonObject.status === "internet-error" ? (
        <div className="border-[#F4F6F5] dark:border-[#171717] border max-w-fit rounded-[24px] p-4 bg-[#FAFAFA] dark:bg-[#121212]">
          <h1 className="text-[14px] max-w-[320px] font-normal text-[#98A2B3] dark:text-white leading-[20px]">
            {jsonObject.message}
          </h1>
        </div>
      ) : (
        <div className="border-[#F4F6F5] dark:border-[#171717] border max-w-fit rounded-[24px] p-4 bg-[#FAFAFA] dark:bg-[#121212]">
          <h1 className="text-[14px] max-w-[320px] font-normal text-[#98A2B3] dark:text-white leading-[20px]">
            {jsonObject.message}
          </h1>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResultData;

interface EachResultProps {
  id: number;
  name: string;
  notes: string;
}

const EachResult = ({ id, name, notes }: EachResultProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 1 }}
        className="py-3 px-4 flex flex-col gap-2 border-b border-[#F4F6F5] dark:border-[#171717] last:border-none last:mb-2"
      >
        <p className="text-base font-semibold text-[#475367]">
          {id}. {name}{" "}
        </p>
        <p className="text-[14px] max-w-[320px] font-normal text-[#98A2B3] leading-[20px]">
          {notes}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};
