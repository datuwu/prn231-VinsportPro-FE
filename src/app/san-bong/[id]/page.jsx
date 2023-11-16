"use client";
import PageLayout from "@/layout/pageLayout";
import { Button, Image } from "antd";
import Link from "next/link";
import React from "react";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";

const FieldDetail = () => {
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
        <h2 className="text-3xl font-bold">Field Name</h2>
        <div>Address: ...</div>
        <div>Description</div>
        <Button className="w-[100px] ">Đặt sân</Button>

      </div>
    </PageLayout>
  );
};

export default FieldDetail;
