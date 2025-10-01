import { ExpandableCardDemo } from "@/components/ExpandableCardDemo";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";

const Starred = () => {
  return (
    <PageWrapper>
      <PageHeader title="Starred" start>
        <ExpandableCardDemo />
      </PageHeader>
    </PageWrapper>
  );
};

export default Starred;
