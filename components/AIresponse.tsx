import React from "react";
import ResultData from "./ResultData";
import LikeButton from "./LikeButton";
import CopyButton from "./CopyButton";
import DislikeButton from "./DislikeButton";
import AiLogoText from "./AiLogoText";

const AIresponse = ({text}:{text:string}) => {
  return (
    <div className="flex flex-col gap-3 mb-[40px] justify-start w-full">
      <AiLogoText />
      <div className="flex flex-col gap-4 w-fit ml-6">
          <ResultData text = {text}/>
        <div className="flex justify-end items-center gap-5">
          <LikeButton />
          <DislikeButton />
          <CopyButton />
        </div>
      </div>
    </div>
  );
};

export default AIresponse;
