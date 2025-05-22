"use client";
import React from "react";
import { motion } from "motion/react";

const UserInput = ({ text }: { text: string }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="inline-flex justify-end w-full"
    >
      <p className=" text-[17px] text-black1 font-semibold leading-[26px] tracking-[0.36%] px-4.5 py-2 bg-[#FAFAFA] rounded-[40px]">
        {text}
      </p>
    </motion.div>
  );
};

export default UserInput;
