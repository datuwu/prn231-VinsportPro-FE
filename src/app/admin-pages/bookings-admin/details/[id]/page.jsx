"use client";
import { Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import useAxios from "@/hooks/useFetch";
import { API } from "@/constants";
import { useParams } from "next/navigation";

const { default: PageLayout } = require("@/layout/pageLayout");

const BookingDetailPage = () => {
  const params = useParams();
  const bookingId = parseInt(params.id, 10);

  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/booking/?filter=ID%20eq%20${bookingId}`,
  });

  if (isNaN(bookingId) || bookingId < 0) {
    return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <p>Booking not found.</p>
        </div>
      </PageLayout>
    );
  }
  if (error) {
    message.error("Error While Getting Booking data");
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

  const bookingData = response[0];
  console.log(bookingData);

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col gap-4">
          <Link
            href={"/bookings-admin/index"}
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <HiOutlineArrowSmallLeft className="text-xl" /> Back to list
          </Link>
          <h2 className="text-3xl font-bold">Booking Details</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="bookingId" className="text-lg font-bold">
                ID
              </label>
              <p>{bookingData.bookingId}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="userId" className="text-lg font-bold">
              User ID
              </label>
              <p>{bookingData.userId}</p>
            </div>           
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="bookerName" className="text-lg font-bold">
              Booker Name
              </label>
              <p>{bookingData.bookerName}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="note" className="text-lg font-bold">
              Note
              </label>
              <p>{bookingData.note}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="totalPrice" className="text-lg font-bold">
              Total Price
              </label>
              <p>{bookingData.totalPrice}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="status" className="text-lg font-bold">
              Status
              </label>
              <p>{bookingData.status}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="bookerPhone" className="text-lg font-bold">
              Booker Phone
              </label>
              <p>{bookingData.bookerPhone}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="sportFieldId" className="text-lg font-bold">
              Sport Field ID
              </label>
              <p>{bookingData.sportFieldId}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="timeSlot" className="text-lg font-bold">
              Time Slot
              </label>
              <p>{bookingData.timeSlot}</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BookingDetailPage;
