"use client";
import { Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import { useParams } from "next/navigation";
import { fieldStatusEnums } from "../../index/fieldInfo";

const { default: PageLayout } = require("@/layout/pageLayout");

const FieldDetailPage = () => {
  const params = useParams();
  const fieldId = parseInt(params.id, 10);

  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/sportFields/?filter=ID%20eq%20${fieldId}`,
  });

  if (isNaN(fieldId) || fieldId < 0) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Sport field not found.</p>
        </div>
      </PageLayout>
    );
  }
  if (error) {
    message.error("Error While Getting Sport Field data");
    return <>No Data</>;
  }
  if (loading && !error)
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <Spinner />
        </div>
      </PageLayout>
    );

  const fieldData = response[0];
  console.log(fieldData);

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col gap-4">
          <Link
            href={"/admin-pages/sport-fields/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Sport Field Details</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="id" className="text-lg font-bold">
                ID
              </label>
              <p>{fieldData.id}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="name" className="text-lg font-bold">
              Field name
              </label>
              <p>{fieldData.name}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="displayIndex" className="text-lg font-bold">
                Display Index
              </label>
              <p>{fieldData.displayIndex}</p>
            </div>            
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="sportTypeId" className="text-lg font-bold">
              Sport Type Id
              </label>
              <p>{fieldData.sportTypeId}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="status" className="text-lg font-bold">
              Status
              </label>
              <p>{fieldStatusEnums[fieldData.status]}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="sportFieldClusterId" className="text-lg font-bold">
              Sport Field Cluster Id
              </label>
              <p>{fieldData.sportFieldClusterId}</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FieldDetailPage;
