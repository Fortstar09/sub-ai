import {
  Check,
  EllipsisVertical,
  Square,
  SquareCheck,
  Star,
  Trash,
} from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
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
import { formatRelativeDate } from "@/lib/utils";

interface HistoryEachTabProps {
  isSelected: boolean;
  card: HistoryDocument;
  selectionMode: boolean;
  toggleSelect: (responseId: string) => void;
  setActive: (card: HistoryDocument) => void;
  deleteHistoryIt: (responseId: string) => void;
  starItem: (card: HistoryDocument) => void;
}

const HistoryEachTab = ({
  isSelected,
  card,
  selectionMode,
  toggleSelect,
  setActive,
  deleteHistoryIt,
  starItem,
}: HistoryEachTabProps) => {
  return (
    <div
      className={`p-4 border w-full h-[173px] cursor-pointer overflow-hidden flex-col flex gap-1 rounded-[20px] ${
        isSelected
          ? "border-green-500 shadow-md shadow-[#25A81F1A] shadow-[2_35px_35px_rgba(37, 168, 31, 0.1)]"
          : "border-[#EEEEEE] dark:border-[#1E1E1E]"
      }`}
      key={card.responseId}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[#475367] text-base font-semibold">
          Substitutes for <span className="capitalize">“{card.ingredient}”</span>
        </h2>
        {selectionMode ? (
          <div
            className="cursor-pointer flex items-center justify-center"
            onClick={() => toggleSelect(card.responseId)}
          >
            {isSelected ? (
              <SquareCheck
                size={20}
                className="cursor-pointer fill-brand stroke-1.5 stroke-white rounded-xs"
              />
            ) : (
              <Square
                size={20}
                color="#EEEEEE"
                className="cursor-pointer p-0.5"
              />
            )}
          </div>
        ) : (
          <Popover>
            <PopoverTrigger className="cursor-pointer">
              <EllipsisVertical size={20} color="#667185" />
            </PopoverTrigger>
            <PopoverContent className="max-w-[122px] p-1 m-0">
              <div className="flex flex-col gap-1">
                <div
                  className="max-w-[112px] px-1 flex items-center gap-2 py-1 text-[#98A2B3] dark:hover:text-[#171717] hover:bg-gray-100 cursor-pointer rounded-sm"
                  onClick={() => toggleSelect(card.responseId)}
                >
                  <Check size={16} color="#98A2B3" strokeWidth={2.5} />
                  <p className="text-sm font-normal">Select</p>
                </div>
                <div
                  className="max-w-[112px] px-1 flex items-center gap-2 py-1 text-[#98A2B3] dark:hover:text-[#171717] hover:bg-gray-100 cursor-pointer rounded-sm"
                  onClick={() => starItem(card)}
                >
                  {card.star ? (
                    <Star className="cursor-pointer size-4 text-brand fill-brand" />
                  ) : (
                    <Star className="cursor-pointer size-4 text-[#98A2B3] " />
                  )}
                  <p className="text-sm font-normal">
                    {card.star ? "Un-star" : "Star"}
                  </p>
                </div>
                <Separator />
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="max-w-[112px] px-1 flex items-center gap-2 py-1 hover:bg-gray-100 cursor-pointer rounded-sm">
                      <Trash size={16} color="#D42620" strokeWidth={2.5} />
                      <p className="text-sm text-[#D42620] font-normal">
                        Delete
                      </p>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete history item?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this history item? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex sm:justify-between w-full">
                      <AlertDialogCancel className="shadow-none border-[#EEEEEE] dark:border-[#1E1E1E] cursor-pointer text-sm font-semibold text-black1 dark:text-white">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-600/70 text-white cursor-pointer"
                        onClick={() => deleteHistoryIt(card.responseId)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <div onClick={() => setActive(card)}>
        <p className="text-xs text-[#D0D5DD] dark:text-[#2D333E] font-normal">
          {card.$createdAt ? formatRelativeDate(card.$createdAt): "Unknown date"}
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
  );
};

export default HistoryEachTab;
