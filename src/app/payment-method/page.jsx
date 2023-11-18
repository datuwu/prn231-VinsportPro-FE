"use client";

import PageLayout from "@/layout/pageLayout";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";

const PaymentPage = () => {
  const router = useRouter()
  const bookingInfo = JSON.parse(localStorage.getItem("bookingInfo"))

  
  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col justify-between gap-4">
          <Link onClick={router.back()} className="flex flex-row gap-2">
            {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
          </Link>
          <h2 className="text-3xl font-bold">Choose payment method</h2>
        </div>

        <div>
          <Button>Pay with cash</Button>
        </div>

      </div>
    </PageLayout>
  );
};

export default PaymentPage;
