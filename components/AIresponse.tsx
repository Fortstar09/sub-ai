"use client";
import React, { useState } from "react";
import ResultData from "./ResultData";
import LikeButton from "./LikeButton";
import CopyButton from "./StarButton";
import DislikeButton from "./DislikeButton";
import AiLogoText from "./AiLogoText";
import { storeStarred } from "@/lib/actions/user.actions";
import { toast } from "sonner";

const AIresponse = ({ text, isLoading }: { text: string; isLoading: boolean }) => {
  const [likes, setLikes] = useState(true);
  const [dislikes, setDislikes] = useState(false);
  const [star, setStar] = useState(false);

  const cleanedText = text.replace(/^```json|```$/gm, "").trim();

  const jsonObject = JSON.parse(cleanedText);

  const handleLike = () => {
    if (likes) {
      setLikes(false);
      setDislikes(false);
    } else {
      setLikes(true);
    }
  };

  const handleDislike = () => {
    if (!dislikes) {
      setLikes(true);
      setDislikes(true);
    } else {
      setDislikes(false);
    }
  };

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
            <span>{isLoading}</span>
            <LikeButton handleLike={handleLike} likes={likes} />
            <DislikeButton handleDislike={handleDislike} dislikes={dislikes} />
            <CopyButton handleStar={addToStar} star={star} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AIresponse;
