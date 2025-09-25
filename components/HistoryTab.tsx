"use client";
import { getStarred } from "@/lib/actions/user.actions";
import { EllipsisVertical } from "lucide-react";
import React, { useEffect, useState } from "react";

interface StarredType {
  documents: {
    ingredient: string;
    response: string;
    responseId: string;
  }[];
}

interface StarredDocument {
  ingredient: string;
  response: string;
  responseId: string;
}



const HistoryTab = () => {
  const [Starred, setStarred] = useState<StarredType | null>(null);

  useEffect(() => {
    async function fetchStarred() {
      const data = await getStarred();
      setStarred(data);
    }
    fetchStarred();
  }, []);

  //   const [active, setActive] = useState<
  //     (typeof starredCards)[number] | boolean | null
  //   >(null);
  //   const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  let starredCards: {
    ingredient: string;
    response: string;
    responseId: string;
  }[] = [];

  if (Starred && Array.isArray(Starred.documents)) {
    starredCards = Starred.documents.map((doc: StarredDocument) => ({
      ingredient: doc.ingredient,
      response: doc.response,
      responseId: doc.responseId,
    }));
  }

  return (
    <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-start gap-4">
      {starredCards.length > 0 ? (
        starredCards.map((card) => (
          <div
            className="p-4 border w-full h-[173px] overflow-hidden flex-col flex gap-1 border-gray-200 rounded-[20px] cursor-pointer hover:shadow-md transition-shadow duration-300"
            key={card.responseId}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-[#475367] text-base font-semibold">
                Substitutes for “{card.ingredient}”
              </h2>
              <EllipsisVertical size={20} color="#667185" />
            </div>
            <p className="text-xs text-[#D0D5DD] font-normal">Yesterday</p>
            {/* <div>{JSON.parse(card.response)}</div> */}
            <ol className="mt-1 list-decimal text-[#98A2B3] font-normal text-sm pl-4 space-y-1">
              {JSON.parse(card.response).map((item: { name: string }, index: number) => (
                <li key={index}>{item.name}</li>
              ))}   
            </ol>
          </div>
        ))
      ) : (
        <h2 className="text-black1 mt-3 text-base">
          No starred sub ingredient yet
        </h2>
      )}
    </div>
  );
};

export default HistoryTab;
