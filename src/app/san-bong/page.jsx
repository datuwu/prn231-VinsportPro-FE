"use client";
import PageLayout from "@/layout/pageLayout";
import React from "react";
import FieldCard from "./field-card";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";

const FieldPage = () => {
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/fieldclusters`,
  });

  return (
    <PageLayout>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Sân bóng</h2>
        <div className="flex flex-row flex-wrap gap-4">
          {response &&
            response.length > 0 &&
            response.map((item, index) => {
              return <FieldCard fieldData={item}/>;
            })}
        </div>
      </div>
    </PageLayout>
  );
};

export default FieldPage;
