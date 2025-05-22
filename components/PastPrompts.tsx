import { ArrowUpRight } from "lucide-react";
import React from "react";

const PastPrompts = ({ pastData, handlePrompt }: { pastData: string[], handlePrompt: (prompt: string) => void; }) => {



  return (
    <div className="flex flex-col gap-2 md:gap-5 items-center justify-center">
      <p className="font-normal text-base text-[#98A2B3]">
        What most user search for:
      </p>
      <div className="flex gap-x-2 gap-y-3 flex-wrap items-center justify-center max-w-[422px]">
        {pastData.map((prompt, index) => (
          <EachPast key={index} prompt={prompt} handlePrompt={handlePrompt} />
        ))}
        {/* <div className='flex justify-center items-center gap-1 cursor-pointer'>
            <Clock size='14' color='#667185' /><span className='text-xs brand-black1 leading-[20px] font-medium'>Check history</span>
        </div> */}
      </div>
    </div>
  );
};

export default PastPrompts;

const EachPast = ({
  prompt,
  handlePrompt,
}: {
  prompt: string;
  handlePrompt: (prompt: string) => void;
}) => {
  return (
    <div
      className="flex gap-1 py-1 pl-[7px] pr-[5px] cursor-pointer border bg-[#FAFAFA] w-fit border-[#EEEEEEEE] rounded-[40px] items-center justify-center"
      onClick={() => {
        handlePrompt(prompt);
      }}
    >
      <p className="font-normal text-sm capitalize text-black1 leading-[16px]">
        {prompt}
      </p>
      <ArrowUpRight size="16" color="#072206" />
    </div>
  );
};
