"use client";
import BookingList from "./bookingList";
import PageLayout from "@/layout/pageLayout";
import { HiPlus } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import Link from "next/link";
import { getUserInfo } from "@/helper";
import { userRoleEnums } from "../../users/index/userInfo";


const BookingListPage = () => {
  const router = useRouter();

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-row justify-between">
          <h2 className="text-3xl font-bold">Bookings List</h2>
        </div>
        <BookingList />
      </div>
    </PageLayout>
  );
};

export default BookingListPage;
