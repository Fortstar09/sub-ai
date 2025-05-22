import { ExpandableCardDemo } from "@/components/ExpandableCardDemo";
import PageWrapper from "@/components/PageWrapper";

const Starred = () => {
  return (
    <PageWrapper>
      <div className="flex-col justify-start flex py-8 px-0 md:p-4 lg:p-8">
        <p className="text-2xl font-semibold text-brand ">Starred Sub </p>
        <ExpandableCardDemo/>
      </div>
    </PageWrapper>
  );
};

export default Starred;
