import Image from "next/image";

const CopyButton = ({
  copy,
  setCopy,
}: {
  copy: boolean;
  setCopy: (value: boolean) => void;
}) => {
  return (
    <div className="cursor-pointer" onClick={() => setCopy(true)}>
      {copy ? (
        <Image src="/icon/copy-fill.svg" width={20} height={20} alt="starred" />
      ) : (
        <Image src="/icon/copy.svg" width={20} height={20} alt="unstar" />
      )}
    </div>
    
  );
};

export default CopyButton;
