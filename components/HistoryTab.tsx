"use client";
import {
  deleteEachHistory,
  getHistory,
  storeStarred,
} from "@/lib/actions/user.actions";
import { Square, SquareCheck, Trash } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { AnimatePresence, motion } from "motion/react";
import { CloseIcon } from "./ExpandableCardDemo";
import Image from "next/image";
import { toast } from "sonner";
import HistoryEachTab from "./HistoryEachTab";
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

interface HistoryType {
  documents: {
    $id?: string;
    ingredient: string;
    response: string;
    responseId: string;
    $createdAt?: string;
    star?: boolean;
  }[];
}

const HistoryTab = () => {
  const [history, setHistory] = useState<HistoryType | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [active, setActive] = useState<
    (typeof historyCards)[number] | boolean | null
  >(null);

  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  // Fetch History Data

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

  // Toggle Select each Item

  const toggleSelect = (id: string) => {
    if (isDeleting) return;
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  // Delete each Item

  const deleteHistoryIt = async (id: string) => {
    try {
      await deleteEachHistory(id);
      toast("History deleted");
      // Filter out the deleted item from the state
      if (history) {
        const updatedHistory = {
          documents: history.documents.filter((item) => item.responseId !== id),
        };
        setHistory(updatedHistory);
      }
      // Also remove from selected if it was selected
      const newSet = new Set(selectedIds);
      newSet.delete(id);
      setSelectedIds(newSet);
    } catch (error) {
      console.error("Error deleting history item:", error);
      toast.error("Failed to delete history item");
    }
  };

  // Bulk Delete Items

  const handleDelete = async () => {
    if (selectedIds.size === 0) return;
    setIsDeleting(true);
    try {
      const results = await Promise.allSettled(
        Array.from(selectedIds).map((responseId) => deleteHistoryIt(responseId))
      );

      const successes = results.filter((r) => r.status === "fulfilled").length;
      const failures = results.filter((r) => r.status === "rejected").length;

      if (history && history.documents.length > 0) {
        const deletedIds = Array.from(selectedIds);
        const updatedDocuments = history.documents.filter(
          (item) => !deletedIds.includes(item.responseId)
        );
        setHistory({ documents: updatedDocuments });
      }

      setSelectedIds(new Set());

      if (successes > 0) {
        toast(`${successes} item(s) deleted successfully`);
      }
      if (failures > 0) {
        toast.error(`${failures} item(s) failed to delete`);
      }
    } catch (error) {
      console.error("Bulk delete error:", error);
      toast.error("Failed to delete items");
    } finally {
      setIsDeleting(false);
    }
  };

  // Star each Item
  const starItem = async (card: HistoryDocument) => {
    try {
      const starResponse = await storeStarred({
        ingredient: card.ingredient,
        response: card.response,
        shouldDelete: true,
        historyId: card.$id, // Pass the history document ID to update the star field
      });

      if (starResponse) {
        toast(starResponse);
        console.log(card.$id);
        console.log(card);
        // Immediately update local history state for instant UI feedback
        setHistory((prev) => {
          if (!prev || !prev.documents) return prev;
          const newStarValue = starResponse === "Starred" ? true : false;
          return {
            ...prev,
            documents: prev.documents.map((doc) =>
              doc.responseId === card.responseId
                ? { ...doc, star: newStarValue }
                : doc
            ),
          };
        });
      }
    } catch (error) {
      console.error("Error starring item:", error);
      toast.error("Failed to star item");
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

  let historyCards: {
    $id?: string;
    $createdAt?: string;
    ingredient: string;
    response: string;
    responseId: string;
    star?: boolean;
  }[] = [];

  if (history && Array.isArray(history.documents)) {
    historyCards = history.documents.map((doc: HistoryDocument) => ({
      $id: doc.$id,
      star: doc.star,
      $createdAt: doc.$createdAt,
      ingredient: doc.ingredient,
      response: doc.response,
      responseId: doc.responseId,
    }));
  }

  const selectionMode = selectedIds.size > 0;
  const allSelected = selectedIds.size === historyCards.length;

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
      {isDeleting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg flex flex-col items-center gap-4">
            <Image
              src="/icon/loader.svg"
              alt="Unstarring"
              width={40}
              height={40}
              className="animate-spin"
            />
            <p className="text-[#475367] font-semibold text-base text-center">
              Deleting history...
            </p>
          </div>
        </div>
      )}
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
              <div className="w-full flex items-center justify-between">
                <motion.h3
                  layoutId={`title-${active.ingredient}`}
                  className="font-medium text-black1 leading-normal capitalize dark:text-neutral-200 text-2xl md:text-[34px]"
                >
                  {active.ingredient}
                </motion.h3>
                {active.star && (
                  <Image
                    src="/icon/starred-fill.svg"
                    width={32}
                    height={32}
                    alt="starred"
                  />
                )}
              </div>
              <div className="relative">
                <motion.div
                  layoutId={`card-${active.ingredient}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 text-sm lg:text-base md:h-fit flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
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
        <div>
          {selectedIds.size > 0 && (
            <div className="mb-4 flex items-center gap-1">
              {allSelected ? (
                <SquareCheck
                  size={20}
                  className="cursor-pointer fill-brand stroke-1.5 stroke-white rounded-xs"
                  onClick={() => setSelectedIds(new Set())}
                />
              ) : (
                <Square
                  size={20}
                  color="#EEEEEE"
                  strokeWidth={2.5}
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedIds(
                      new Set(historyCards.map((c) => c.responseId))
                    )
                  }
                />
              )}
              <span className="text-[#475367] text-sm font-normal">
                Select all ({selectedIds.size} selected)
              </span>
              <span className="flex justify-center items-center gap-4 ml-8">
                {/* <Star className="cursor-pointer size-4 text-[#98A2B3] " /> */}

                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash className="cursor-pointer size-4 text-[#98A2B3] " />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete history item?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete selected histories? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex sm:justify-between w-full">
                      <AlertDialogCancel className="shadow-none border-[#EEEEEE] dark:border-[#1E1E1E] cursor-pointer text-sm font-semibold text-black1 dark:text-white">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-600/70 text-white cursor-pointer"
                        onClick={handleDelete}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </span>
            </div>
          )}
          <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-start gap-4">
            {historyCards.map((card) => {
              const isSelected = selectedIds.has(card.responseId);
              return (
                <HistoryEachTab
                  deleteHistoryIt={deleteHistoryIt}
                  selectionMode={selectionMode}
                  setActive={setActive}
                  toggleSelect={toggleSelect}
                  card={card}
                  isSelected={isSelected}
                  starItem={starItem}
                  key={card.responseId}
                />
              );
            })}
          </div>
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
