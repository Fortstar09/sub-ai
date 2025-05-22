"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { SparklesIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { getStarred } from "@/lib/actions/user.actions";

export function ExpandableCardDemo() {
  interface StarredType {
    documents: {
      ingredient: string;
      response: string;
      responseId: string;
    }[];
  }

  const [Starred, setStarred] = useState<StarredType | null>(null);

  useEffect(() => {
    async function fetchStarred() {
      const data = await getStarred();
      setStarred(data);
    }
    fetchStarred();
  }, []);

  const [active, setActive] = useState<
    (typeof starredCards)[number] | boolean | null
  >(null);
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

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
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={active.responseId}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.ingredient}`}
              ref={ref}
              className="w-full max-w-[500px] h-fit md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl "
            >
              <div className="flex gap-9 items-center p-2 md:p-4">
                <motion.h3
                  layoutId={`title-${active.ingredient}`}
                  className="font-medium text-neutral-700 leading-normal capitalize dark:text-neutral-200 text-2xl md:text-4xl"
                >
                  {active.ingredient}
                </motion.h3>

                <motion.svg
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  target="_blank"
                  className="cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#1bb425"
                  stroke="#1bb425"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </motion.svg>
              </div>
              <div className="py-4 relative h-full px-2 md:px-4">
                <motion.div
                  layoutId={`card-${active.ingredient}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 text-xs md:text-sm lg:text-base md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white, white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                >
                  {active && active.response
                    ? JSON.parse(active.response).map(
                        (res: {
                          name: string;
                          ratio: string;
                          notes: string;
                        }) => (
                          <div key={res.name}>
                            <h2 className="text-sm">
                              {res.name}{" "}
                              <span className="text-xs font-bold">
                                ({res.ratio})
                              </span>
                            </h2>
                            <p>Tip: {res.notes}</p>
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
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{
          duration: 1,
          staggerChildren: 0.2,
        }}
        className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-4"
      >
        {starredCards.length > 0 ? starredCards.map((card) => (
          <motion.div
            layoutId={card.responseId}
            key={card.responseId}
            onClick={() => setActive(card)}
            className="py-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{
          duration: 1,
          staggerChildren: 0.8,
              }}
              className="flex gap-4 flex-col  w-full"
            >
              <BentoGridItem
          title={card.ingredient}
          description={`Click the card to view the substitute for ${card.ingredient}`}
          header={<Skeleton className="h-32 w-full bg-neutral-200 " />}
          icon={<SparklesIcon className="h-4 w-4 text-neutral-500" />}
          className="md:col-span-2"
              />
            </motion.div>
          </motion.div>
        )) : (
          <h2 className="text-black1 mt-3 text-base">No starred sub ingredient yet</h2>
        )}
      </motion.div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
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
