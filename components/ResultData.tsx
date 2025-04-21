import React from "react";

const ResultData = ({ text }: { text: string }) => {
  const cleanedText = text.replace(/^```json|```$/gm, "").trim();

  const jsonObject = JSON.parse(cleanedText);

  console.log("Cleaned text:", jsonObject); // Log the cleaned text
  // Usage

  return (
    <div className="border-[#F4F6F5]  border max-w-fit rounded-[24px]">
      <h1 className="py-3 px-4 text-[17px]  text-black1 leading-[22px] font-semibold bg-[#FAFAFA] rounded-t-[24px] ">
        Here are some substitutes for{" "}
        <span className="font-bold capitalize">“{jsonObject.ingredient}”</span>
      </h1>
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jsonObject.substitutes.map((item: any, index: number) => (
          <EachResult
            key={index}
            id={index + 1}
            name={item.name}
            ratio={item.ratio}
            notes={item.notes}
          />
        ))
      }
    </div>
  );
};

export default ResultData;

interface EachResultProps {
  id: number;
  name: string;
  ratio: string;
  notes: string;
}

const EachResult = ({id, name, ratio, notes}: EachResultProps) => {
  return (
    <div className="py-3 px-4 flex flex-col gap-2 border-b border-[#F4F6F5] last:border-none last:mb-2">
      <p className="text-base font-semibold text-[#475367]">
        {id}. {name}{" "}
        <span className="flex text-xs text-black">({ratio})</span>
      </p>
      <p className="text-[14px] max-w-[320px] font-normal text-[#98A2B3] leading-[20px]">
        {notes}
      </p>
    </div>
  );
};
