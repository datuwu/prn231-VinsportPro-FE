"use client";
import {
  Button,
  Label,
  Select,
  TextInput,
  Datepicker,
  Spinner,
} from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { message } from "antd";
import { HiPlus } from "react-icons/hi";
import moment from "moment/moment";
import axios from "axios";
import { API } from "@/constants";

const { default: PageLayout } = require("@/layout/pageLayout");

const TypeCreatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);

  const formik = useFormik({
    initialValues: {
      sportName: "",
      icon: "",
      costRate: 1,
    },
    validationSchema: Yup.object({
      sportName: Yup.string().required("Required"),
      icon: Yup.string().required("Required"),
      costRate: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log(payloadData.data);
      axios
        .post(`${API}/sportType`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();

          router.push("/sport-types/index");
        })
        .then((response) => {
          message.success("Add new sport type success");
        })
        .catch((error) => {
          message.error("An error occurred");
          setSpinner(false);
          console.log("An error occurred:", error.response);
        });
    },
  });

  return (
      <PageLayout>
        <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
          <div className="flex flex-col justify-between gap-4">
            <Link href={"/sport-types/index"} className="flex flex-row gap-2">
              {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
            </Link>
            <h2 className="text-3xl font-bold">Add new sport type</h2>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 w-[600px]"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="sportName" value="Sport name" />
              <TextInput
                id="sportName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sportName}
              />
              {formik.touched.sportName && formik.errors.sportName ? (
                <div className="text-xs text-red-600 dark:text-red-400">
                  {formik.errors.sportName}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="icon" value="Icon" />
              <TextInput
                id="icon"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.icon}
              />
              {formik.touched.icon && formik.errors.icon ? (
                <div className="text-xs text-red-600 dark:text-red-400">
                  {formik.errors.icon}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="costRate" value="Cost rate" />
              <TextInput
                id="costRate"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.costRate}
              />
              {formik.touched.costRate && formik.errors.costRate ? (
                <div className="text-xs text-red-600 dark:text-red-400">
                  {formik.errors.costRate}
                </div>
              ) : null}
            </div>

            <Button type="submit">
              {spinner ? (
                <div className="flex justify-center items-center gap-4">
                  <Spinner aria-label="Spinner button example" />
                  <p>Loading...</p>
                </div>
              ) : (
                <>Submit</>
              )}
            </Button>
          </form>
        </div>
      </PageLayout>
  );
};

export default TypeCreatePage;
