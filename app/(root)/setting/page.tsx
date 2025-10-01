import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import SettingContent from "@/components/SettingContent";

const setting = () => {
  return (
    <PageWrapper>
      <PageHeader title="Settings">
        <SettingContent />
      </PageHeader>
    </PageWrapper>
  );
};

export default setting;
