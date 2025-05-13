import React from "react";
import ResultData from "./ResultData";
import LikeButton from "./LikeButton";
import CopyButton from "./CopyButton";
import DislikeButton from "./DislikeButton";
import AiLogoText from "./AiLogoText";

const AIresponse = ({ text, loading }: { text: string; loading: boolean }) => {
  return (
    <div className="flex flex-col gap-3 mb-20 md:mb-14 justify-start w-full">
      <AiLogoText />
      {loading ? (
        <div className="flex gap-1 -mt-1 ml-3 md:ml-6">
          <span className="circle"></span>
          <span className="circle"></span>
          <span className="circle"></span>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-fit ml-0 md:ml-6">
          <ResultData text={text} />
          <div className="flex justify-end items-center gap-5">
            <LikeButton />
            <DislikeButton />
            <CopyButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default AIresponse;
