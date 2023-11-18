"use client";
import { API } from "@/constants";
import useAxios from "@/hooks/useFetch";
import PageLayout from "@/layout/pageLayout";
import { Button, Image } from "antd";
import { Spinner } from "flowbite-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";

const FieldDetail = () => {
  const router = useRouter();
  const params = useParams();
  const userId = parseInt(params.id);
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/fieldclusters(${userId})`,
  });

  if (loading)
    return (
      <PageLayout>
        <Spinner />
      </PageLayout>
    );
  if (error)
    return (
      <PageLayout>
        <div className="flex flex-col w-full gap-4">Error occured</div>
      </PageLayout>
    );
  return (
    <PageLayout>
      <div className="flex flex-col w-full gap-4">
        <Link href={"/san-bong"} className="flex flex-row gap-2">
          {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
        </Link>
        <Image
          src={
            "https://www.sporta.vn/assets/default_venue_1-a42787aefdf8d9e53ffd559a5962172947f2effdfdc1122e6185c5cb0690bd16.jpg"
          }
          height={300}
        />
        <h2 className="text-3xl font-bold">{response.fieldName}</h2>
        <div className="font-bold">Address </div>
        <div>{response.address}</div>
        <div className="font-bold">Description </div>
        <div>{response.description}</div>
        <div className="font-bold">Opening time </div>
        <div>{response.openingTime}</div>
        <Link href={{
          pathname:'/dat-san',
          query: {fieldClusterId: 1}
        }}>
          <Button className="w-[100px] ">Đặt sân</Button>
        </Link>
      </div>
    </PageLayout>
  );
};

export default FieldDetail;
