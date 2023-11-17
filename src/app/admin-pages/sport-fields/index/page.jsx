"use client";
import FieldList from "./fieldList";
import PageLayout from "@/layout/pageLayout";
import { HiPlus } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import Link from "next/link";
import { getUserInfo } from "@/helper";
import { userRoleEnums } from "../../users/index/userInfo";


const FieldListPage = () => {
  const router = useRouter();
  const user = getUserInfo();

  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-row justify-between">
          <h2 className="text-3xl font-bold">Sport Fields List</h2>
          {user && userRoleEnums[user.role] !== "Admin" && (
            <Link href={"/admin-pages/sport-fields/create"}>
              <Button>
                <div className="flex flex-row justify-center gap-4">
                  <div className="my-auto">
                    <HiPlus />
                  </div>
                  <p>Add new sport field</p>
                </div>
              </Button>
            </Link>
          )}
        </div>
        <FieldList />
      </div>
    </PageLayout>
  );
};

export default FieldListPage;
