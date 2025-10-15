"use client";
import React, { useEffect, useState } from "react";
import ResultData from "./ResultData";
import StarButton from "./StarButton";
import AiLogoText from "./AiLogoText";
import { storeHistory, storeStarred } from "@/lib/actions/user.actions";
import { toast } from "sonner";
// import Image from "next/image";
import CopyButton from "./CopyButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const AIresponse = ({
  text,
  isLoading,
}: {
  text: string;
  isLoading: boolean;
}) => {
  const [copy, setCopy] = useState(false);
  const [star, setStar] = useState(false);

  const cleanedText = text.replace(/^```json|```$/gm, "").trim();

  const jsonObject = JSON.parse(cleanedText);

  const copyText =
    "Here are some substitutes for " +
    jsonObject.ingredient +
    "\n" +
    (jsonObject.substitutes
      ? jsonObject.substitutes
          .map(
            (item: { name: string; notes: string }, index: number) =>
              index + 1 + ". " + item.name + "\n" + item.notes
          )
          .join("\n")
      : "No substitutes available");

  // Function to store history
  const addToHistory = async () => {
    try {
      if (jsonObject.ingredient) {
        await storeHistory({
          ingredient: jsonObject.ingredient,
          response: [JSON.stringify(jsonObject.substitutes)],
          shouldDelete: false,
        });
      }
    } catch (error) {
      console.error("Failed to store history:", error);
    }
  };

  // Use useEffect to call the function when the ingredient is valid
  useEffect(() => {
    if (jsonObject.ingredient) {
      addToHistory();
    }
  }, [jsonObject.ingredient]);

  const addToStar = async () => {
    if (!star) {
      setStar(true);

      const starResponse = await storeStarred({
        ingredient: jsonObject.ingredient,
        response: [JSON.stringify(jsonObject.substitutes)],
        shouldDelete: true,
      });

      if (starResponse) {
        toast(starResponse);
      } else {
        toast("Error");
      }
    } else {
      setStar(false);

      const starResponse = await storeStarred({
        ingredient: jsonObject.ingredient,
        response: [JSON.stringify(jsonObject.substitutes)],
        shouldDelete: true,
      });

      if (starResponse) {
        toast(starResponse);
      } else {
        toast("Error");
      }
    }
  };

  return (
    <div className="flex flex-col gap-3.5 mb-20 md:mb-14 justify-start w-full">
      <AiLogoText />
      {isLoading ? (
        <div className="flex gap-1 -mt-1 ml-3 md:ml-6">
          <span className="circle"></span>
          <span className="circle"></span>
          <span className="circle"></span>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-fit ml-0 md:ml-6">
          <ResultData jsonObject={jsonObject} />

          <div className="flex justify-end items-center gap-5">
            {/* <TooltipDemo
              trigger={
                <Image
                  src="/icon/regenerate.svg"
                  width={20}
                  height={20}
                  alt="share"
                  className="cursor-pointer"
                />
              }
              text="Regenerate"
            /> */}
            <TooltipDemo
              trigger={<CopyButton copyText={copyText} setCopy={setCopy} copy={copy} />}
              text="Copy to clipboard"
            />
            {/* <TooltipDemo
              trigger={
                <Image
                  src="/icon/share.svg"
                  width={20}
                  height={20}
                  alt="share"
                  className="cursor-pointer"
                />
              }
              text="Share"
            /> */}
            <TooltipDemo
              trigger={<StarButton handleStar={addToStar} star={star} />}
              text="Star"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AIresponse;

const TooltipDemo = ({
  trigger,
  text,
}: {
  text: string;
  trigger: React.ReactNode;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger className="Button">{trigger}</TooltipTrigger>
      <TooltipContent className="TooltipContent" side="top">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};
