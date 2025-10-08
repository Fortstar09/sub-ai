import { useState } from "react";
import { toast } from "sonner";

export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied!");
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      return true;
    } catch (error) {
      console.error("Failed to copy text: ", error);
      return false;
    }
  };

  return { copied, copyToClipboard };
};