"use client";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChatBox({handleSubmit, input, setInput}: any) {
   

  return (
    <div className=" fixed md:absolute bottom-10 md:bottom-[2%] px-4 w-full md:w-[600px] h-[100px]">
      <div className="flex flex-col justify-center items-center w-full rounded-[16px] bg-[#F4F4F5]">
        <p className="text-[#98A2B3] font-normal text-xs text-center px-4 leading-[16px] py-2">
          Sub AI may occasionally make mistakes. Please cross-check the results
          for accuracy.
        </p>
        <form
          className="w-full relative h-[68px] flex items-center border-[#EEEEEE] rounded-[16px] justify-center bg-white border"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter missing ingredient ... "
            className="resize-none placeholder:text-[#98A2B3] blink text-base font-medium h-[68px]
            text-[#475367] focus:outline-none focus:outline pl-4 pr-2 py-5 w-full md:w-[540px] border-none focus:border-none"
          />
          <button type="submit" className="py-5 pr-4">
            <svg
              width="28"
              height="28"
              fill="none"
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="28" height="28" rx="14" fill="#25A81F" />
              <path
                d="M11 12.5L14 9.5M14 9.5L17 12.5M14 9.5V18.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
