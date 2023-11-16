'use client';
import PageLayout from "@/layout/pageLayout";
import React from "react";
import FieldCard from "./field-card";

const FieldPage = () => {
  return (
    <PageLayout>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Sân bóng</h2>
        <div className="flex flex-row flex-wrap gap-4">
          <FieldCard/>
          <FieldCard/>
          <FieldCard/>
          <FieldCard/>
          <FieldCard/>
          <FieldCard/>
          <FieldCard/>
        </div>
      </div>
    </PageLayout>
  );
};

export default FieldPage;
