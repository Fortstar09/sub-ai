import { useCopyToClipboard } from "@/lib/hooks";
import Image from "next/image";

const CopyButton = ({
  copy,
  setCopy,
  copyText,
}: {
  copy: boolean;
  setCopy: (value: boolean) => void;
  copyText: string;
}) => {
  const { copyToClipboard } = useCopyToClipboard();


  const copyTextToClipboard = () => {
    copyToClipboard(copyText);
    setCopy(true);
  }

  return (
    <div className="cursor-pointer" onClick={copyTextToClipboard}>
      {copy ? (
        <Image src="/icon/copy-fill.svg" width={20} height={20} alt="starred" />
      ) : (
        <Image src="/icon/copy.svg" width={20} height={20} alt="unstar" />
      )}
    </div>
  );
};

export default CopyButton;
