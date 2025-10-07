"use client";
import { getHistory } from "@/lib/actions/user.actions";
import { Check, EllipsisVertical, Star, Trash } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { AnimatePresence, motion } from "motion/react";
import { CloseIcon } from "./ExpandableCardDemo";
import Image from "next/image";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface HistoryType {
  documents: {
    ingredient: string;
    response: string;
    responseId: string;
  }[];
}

interface HistoryDocument {
  ingredient: string;
  response: string;
  responseId: string;
}

const HistoryTab = () => {
  const [history, setHistory] = useState<HistoryType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // New loading state
  const [active, setActive] = useState<
    (typeof historyCards)[number] | boolean | null
  >(null);

  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    async function fetchHistory() {
      try {
        setIsLoading(true); // Set loading to true before fetching
        const data = await getHistory();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    }
    fetchHistory();
  }, []);

  let historyCards: {
    ingredient: string;
    response: string;
    responseId: string;
  }[] = [];

  if (history && Array.isArray(history.documents)) {
    historyCards = history.documents.map((doc: HistoryDocument) => ({
      ingredient: doc.ingredient,
      response: doc.response,
      responseId: doc.responseId,
    }));
  }

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 bg-black/80 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={active.responseId}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 cursor-pointer right-2 lg:top-10 lg:right-96 items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.ingredient}`}
              ref={ref}
              className="w-full lg:w-[600px] h-fit md:h-fit flex flex-col gap-8 bg-white dark:bg-neutral-900 sm:rounded-3xl p-8"
            >
              <motion.h3
                layoutId={`title-${active.ingredient}`}
                className="font-medium text-black1 leading-normal capitalize dark:text-neutral-200 text-2xl md:text-[34px]"
              >
                {active.ingredient}
              </motion.h3>
              <div className="relative">
                <motion.div
                  layoutId={`card-${active.ingredient}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 text-xs md:text-sm lg:text-base md:h-fit flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                >
                  {active && active.response
                    ? JSON.parse(active.response).map(
                        (
                          res: { name: string; ratio: string; notes: string },
                          index: number
                        ) => (
                          <div key={res.name}>
                            <p className="text-[#475367] font-semibold">
                              <span className="pr-2">{index + 1}.</span>
                              {res.name}
                            </p>
                            <p className="text-[#98A2B3]">{res.notes}</p>
                          </div>
                        )
                      )
                    : null}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full mt-[90px] w-full">
          <Image
            src="/icon/loader.svg" // Replace with your loading icon/image
            alt="Loading"
            width={60}
            height={60}
            className="animate-spin" // Optional: Add spin animation
          />
          <p className="text-[#475367] font-semibold text-base text-center mt-10">
            Loading your history...
          </p>
        </div>
      ) : historyCards.length > 0 ? (
        <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-start gap-4">
          {historyCards.map((card) => (
            <div
              className="p-4 border w-full h-[173px] cursor-pointer overflow-hidden flex-col flex gap-1 border-[#EEEEEE] dark:border-[#1E1E1E] rounded-[20px]"
              key={card.responseId}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-[#475367] text-base font-semibold">
                  Substitutes for “{card.ingredient}”
                </h2>
                <Popover>
                  <PopoverTrigger className="cursor-pointer">
                    <EllipsisVertical size={20} color="#667185" />
                  </PopoverTrigger>
                  <PopoverContent className="max-w-[122px] px-2 py-1 m-0">
                    <div className="flex flex-col gap-1">
                      <div className="max-w-[112px] px-1 flex items-center gap-2 py-1 hover:bg-gray-100 cursor-pointer rounded-sm">
                        <Check size={16} color="#98A2B3" strokeWidth={2.5} />
                        <p className="text-sm text-[#98A2B3] font-normal">
                          Select
                        </p>
                      </div>
                      <div className="max-w-[112px] px-1 flex items-center gap-2 py-1 hover:bg-gray-100 cursor-pointer rounded-sm">
                        <Star size={16} color="#98A2B3" strokeWidth={1.5} />
                        <p className="text-sm text-[#98A2B3] font-normal">
                          Star
                        </p>
                      </div>
                      <Separator />
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <div className="max-w-[112px] px-1 flex items-center gap-2 py-1 hover:bg-gray-100 cursor-pointer rounded-sm">
                            <Trash
                              size={16}
                              color="#D42620"
                              strokeWidth={2.5}
                            />
                            <p className="text-sm text-[#D42620] font-normal">
                              Delete
                            </p>
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete starred item?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this starred item?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex sm:justify-between w-full">
                            <AlertDialogCancel className="cursor-pointer">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-600/70 cursor-pointer">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div onClick={() => setActive(card)}>
                <p className="text-xs text-[#D0D5DD] dark:text-[#2D333E] font-normal">Yesterday</p>
                <ol className="mt-1 list-decimal text-[#98A2B3] font-normal text-sm pl-4 space-y-1">
                  {JSON.parse(card.response).map(
                    (item: { name: string }, index: number) => (
                      <li key={index}>{item.name}</li>
                    )
                  )}
                </ol>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full mt-[90px] w-full">
          <Image
            src="/icon/clock.svg"
            alt="No history"
            width={60}
            height={60}
          />
          <p className="text-[#475367] font-semibold text-base text-center mt-10">
            No history yet
            {<br />}
            Start a new chat to see your conversations appear here.
          </p>
        </div>
      )}
    </>
  );
};

export default HistoryTab;
