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

const TypeDetailPage = () => {
  const params = useParams();
  const typeId = parseInt(params.id, 10);

  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/sportType/?filter=ID%20eq%20${typeId}`,
  });

  if (isNaN(typeId) || typeId < 0) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Sport type not found.</p>
        </div>
      </PageLayout>
    );
  }
  if (error) {
    message.error("Error While Getting Sport Type data");
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

  const typeData = response[0];
  console.log(typeData);

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col gap-4">
          <Link
            href={"/sport-types/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Sport Type Details</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="id" className="text-lg font-bold">
                ID
              </label>
              <p>{typeData.id}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="sportName" className="text-lg font-bold">
              Sport name
              </label>
              <p>{typeData.sportName}</p>
            </div>           
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="icon" className="text-lg font-bold">
              Icon
              </label>
              <p>{typeData.icon}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="costRate" className="text-lg font-bold">
              Cost rate
              </label>
              <p>{typeData.costRate}</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TypeDetailPage;
