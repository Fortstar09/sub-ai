import { MorphingText } from "./ui/MorphingText";
import Image from "next/image";

interface NotfoundProps {
  notFound: string;
}

const Notfound = ({ notFound }: NotfoundProps) => {
  return (
    <div className="flex-col justify-center items-center flex py-8 gap-10 px-0 md:p-4 lg:p-8">
      <p className="text-2xl font-semibold text-brand ">{notFound}</p>
      <div className="w-full md:w-[500px] h-full justify-center flex gap-4 flex-col items-center">
        <MorphingText
          texts={["404", "NotFound", "404", "NotFound"]}
          className="text-black1  w-full flex item-start justify-start"
        />
        <Image
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          height={500}
          width={900}
          alt="gif"
        />
      </div>
    </div>
  );
};

export default Notfound;
