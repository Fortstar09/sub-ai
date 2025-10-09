"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { Check, EllipsisVertical } from "lucide-react";
import { deleteStarredItem, getStarred } from "@/lib/actions/user.actions";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "sonner";

export function ExpandableCardDemo() {
  interface StarredType {
    documents: {
      ingredient: string;
      response: string;
      responseId: string;
    }[];
  }

  const [Starred, setStarred] = useState<StarredType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // New loading state
  const [active, setActive] = useState<
    (typeof starredCards)[number] | boolean | null
  >(null);
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    async function fetchStarred() {
      try {
        setIsLoading(true); // Set loading to true before fetching
        const data = await getStarred();
        setStarred(data);
      } catch (error) {
        console.error("Error fetching starred items:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    }
    fetchStarred();
  }, []);

  const unStarredItem = async (id: string) => {
    console.log("Unstarring item with id:", active);
    try {
      await deleteStarredItem(id);
      toast("Un-starred");
      //fiter out the unstarred item from the state
      if (Starred) {
        const updatedStarred = {
          documents: Starred.documents.filter((item) => item.responseId !== id),
        };
        setStarred(updatedStarred);
      }
    } catch (error) {
      console.error("Error deleting starred item:", error);
      toast("Failed to unstar ingredient");
    }
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  interface StarredDocument {
    ingredient: string;
    response: string;
    responseId: string;
  }

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
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
                  className="text-neutral-600 text-xs md:text-sm lg:text-base md:h-fit flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400  [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
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
            src="/icon/loader.svg" // Replace with your actual loading icon
            alt="Loading"
            width={60}
            height={60}
            className="animate-spin" // Optional: Add spin animation
          />
          <p className="text-[#475367] font-semibold text-base text-center mt-10">
            Loading starred items...
          </p>
        </div>
      ) : starredCards.length > 0 ? (
        <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-start gap-6">
          {starredCards.map((card) => (
            <div
              className="p-4 border w-full h-[173px] cursor-pointer overflow-hidden flex-col flex gap-1 border-[#EEEEEE] dark:border-[#1E1E1E] rounded-[20px]"
              key={card.responseId}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-[#475367] text-base font-semibold">
                  Substitutes for{" "}
                  <span className="capitalize">“{card.ingredient}”</span>
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
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <div className="max-w-[112px] px-1 flex items-center gap-2 py-1 hover:bg-gray-100 cursor-pointer rounded-sm">
                            <Image
                              src="/icon/starIcon.svg"
                              alt="unstar"
                              width={16}
                              height={16}
                            />
                            <p className="text-sm text-[#98A2B3] font-normal">
                              Un-star
                            </p>
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Un-star item?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to unstar this starred item?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex sm:justify-between w-full">
                            <AlertDialogCancel className="cursor-pointer">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-green-600 hover:bg-green-600/70 text-white cursor-pointer"
                              onClick={() => unStarredItem(card.responseId)}
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div onClick={() => setActive(card)}>
                <p className="text-xs text-[#D0D5DD] dark:text-[#2D333E] font-normal">
                  Yesterday
                </p>
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
            src="/icon/star.svg"
            alt="No starred items"
            width={60}
            height={60}
          />
          <p className="text-[#475367] font-semibold text-base text-center mt-10">
            No starred items yet
            {<br />}
            Start a chat to see your starred ingredients appear here.
          </p>
        </div>
      )}
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-2 md:p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
          className
        )}
      >
        {header}
        <div className="transition duration-200 group-hover/bento:translate-x-2">
          {icon}
          <div className="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
            {title}
          </div>
          <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
            {description}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
