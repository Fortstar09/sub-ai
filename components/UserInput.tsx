import React from "react";

const UserInput = ({text}:{text:string}) => {
  return (
    <div className="inline-flex justify-end w-full">
      <p className=" text-[17px] text-black1 font-semibold leading-[26px] tracking-[0.36%] px-4.5 py-2 bg-[#FAFAFA] rounded-[40px]">
       {text}
      </p>
    </div>
  );
};

export default UserInput;
