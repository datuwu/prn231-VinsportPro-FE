"use client";
import { Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import { useParams } from "next/navigation";

const { default: PageLayout } = require("@/layout/pageLayout");

const ClusterDetailPage = () => {
  const params = useParams();
  const clusterId = parseInt(params.id, 10);

  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/fieldCluster/?filter=ID%20eq%20${clusterId}`,
  });

  if (isNaN(clusterId) || clusterId < 0) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Field Cluster not found.</p>
        </div>
      </PageLayout>
    );
  }
  if (error) {
    message.error("Error While Getting Field Cluster data");
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

  const clusterData = response[0];
  console.log(clusterData);

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col gap-4">
          <Link
            href={"/field-clusters/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Field Cluster Details</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="id" className="text-lg font-bold">
                ID
              </label>
              <p>{clusterData.id}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="fieldName" className="text-lg font-bold">
              Field name
              </label>
              <p>{clusterData.fieldName}</p>
            </div>           
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="address" className="text-lg font-bold">
              Address
              </label>
              <p>{clusterData.address}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="adminId" className="text-lg font-bold">
              Admin ID
              </label>
              <p>{clusterData.adminId}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="description" className="text-lg font-bold">
              Description
              </label>
              <p>{clusterData.description}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="openingTime" className="text-lg font-bold">
              Opening Time
              </label>
              <p>{clusterData.openingTime}</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ClusterDetailPage;
