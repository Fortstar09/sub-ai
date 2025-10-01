import HistoryTab from "@/components/HistoryTab";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import React from "react";

const history = () => {
  return (
    <PageWrapper>
      <PageHeader title="Chat history" start>
        <HistoryTab />
      </PageHeader>
    </PageWrapper>
  );
};

export default history;
