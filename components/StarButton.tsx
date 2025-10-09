import Image from "next/image";

const StarButton = ({
  star,
  handleStar,
}: {
  star: boolean;
  handleStar?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className="cursor-pointer" onClick={handleStar}>
      {star ? (
        <Image src="/icon/starred-fill.svg" width={20} height={20} alt="starred" />
      ) : (
        <Image src="/icon/starred.svg" width={20} height={20} alt="unstar" />
      )}
    </div>
  );
};

export default StarButton;
