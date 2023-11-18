"use client";

import { API } from "@/constants";
import useAxios from "@/hooks/useFetch";
import PageLayout from "@/layout/pageLayout";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { message } from "antd";
import Link from "next/link";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import {
  Button,
  Datepicker,
  Label,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import moment from "moment";
import { dayOfWeek } from "@/constants/enums";

const BookingPage = () => {
  const searchParams = useSearchParams();
  const [spinner, setSpinner] = useState(false);
  const [currentDOW, setCurrentDOW] = useState();
  console.log(searchParams);
  const router = useRouter()

  const {
    response: bookingResponse,
    loading: bookingLoading,
    error: bookingError,
  } = useAxios({
    method: "get",
    url: `${API}/SportFields?filter=fieldClusterId eq (${searchParams.get(
      "fieldClusterId"
    )})`,
  });

  //get all time slot
  const {
    response: timeslotResponse,
    loading: timeslotLoading,
    error: timeslotError,
  } = useAxios({
    method: "get",
    url: `${API}/timeslots`,
  });
  console.log(timeslotResponse);
  //get all sportType
  const {
    response: sportTypeResponse,
    loading: sportTypeLoading,
    error: sportTypeError,
  } = useAxios({
    method: "get",
    url: `${API}/sportTypes`,
  });
  const {
    response: sportFieldResponse,
    loading: sportFieldLoading,
    error: sportFieldError,
  } = useAxios({
    method: "get",
    url: `${API}/SportFields?filter=fieldClusterId eq (${searchParams.get(
      "fieldClusterId"
    )})`,
  });
  const formik = useFormik({
    initialValues: {
      BookerName: "",
      Note: "",
      BookerPhone: "",
      BookingDate: new Date(),
      TotalPrice: 150000,
      TimeSlotId: 1,
      SportFieldId: 1,
    },
    validationSchema: Yup.object({
      BookerName: Yup.string().required("Required"),
      BookerPhone: Yup.string().required("Required"),
      BookingDate: Yup.date().min(new Date(), "Booking date must after today"),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log("Submit data",payloadData.data);
      localStorage.setItem("bookingInfo",payloadData.data)

      router.push("/payment-method");
      // axios
      //   .post(`${API}/Bookings`, payloadData.data)
      //   .then((response) => {
      //     setSpinner(false);
      //     formik.resetForm();

      //     router.push("/");
      //   })
      //   .then((response) => {
      //     message.success("Book field success");
      //   })
      //   .catch((error) => {
      //     message.error("An error occurred");
      //     setSpinner(false);
      //     console.log("An error occurred:", error);
      //   });
    },
  });
  return (
    <PageLayout>
      <div className="w-full p-10 flex flex-col gap-4 h-[100vh] overflow-y-scroll">
        <div className="flex flex-col justify-between gap-4">
          <Link href={"/users/index"} className="flex flex-row gap-2">
            {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
          </Link>
          <h2 className="text-3xl font-bold">Add new user</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]"
        >
          {/* BookerName */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="BookerName" value="Full name" />
            <TextInput
              id="BookerName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.BookerName}
            />
            {formik.touched.BookerName && formik.errors.BookerName ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.BookerName}
              </div>
            ) : null}
          </div>
          {/* BookerPhone */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="BookerPhone" value="Phone number" />
            <TextInput
              id="BookerPhone"
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.BookerPhone}
            />
            {formik.touched.BookerPhone && formik.errors.BookerPhone ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.BookerPhone}
              </div>
            ) : null}
          </div>

          {/* Booking date */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="BookingDate" value="BookingDate" />
            <Datepicker
              id="BookingDate"
              language="vi-VN"
              value={moment(formik.values.BookingDate).format("DD/MM/YYYY")}
              onSelectedDateChanged={(date) => {
                console.log(new Date(date));
                setCurrentDOW(date.getDay());
                formik.setFieldValue("BookingDate", date);
                console.log("date value", formik.values);
              }}
              onBlur={formik.handleBlur}
              onSelect={(e) => {
                console.log(e);
              }}
            />
            {formik.touched.BookingDate && formik.errors.BookingDate ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.BookingDate}
              </div>
            ) : null}
          </div>
          {/* Booking type */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="SportFieldId" value="Sport field" />
            <Select
              id="SportFieldId"
              onChange={(e) => {
                const stringSelection = e.target.value;
                formik.setFieldValue("SportFieldId", parseInt(stringSelection));
              }}
              onBlur={formik.handleBlur}
              value={formik.values.SportFieldId}
            >
              {sportFieldResponse &&
                sportFieldResponse.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.sportFieldName}
                    </option>
                  );
                })}
            </Select>
          </div>

          {/* Booking slot */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="timeSlotId" value="Choose time slot" />
            <Select
              id="timeSlotId"
              onChange={(e) => {
                const stringSelection = e.target.value;
                formik.setFieldValue("timeSlotId", parseInt(stringSelection));
              }}
              onBlur={formik.handleBlur}
              value={formik.values.timeSlotId}
            >
              {formik.values.BookingDate &&
                timeslotResponse &&
                timeslotResponse
                  .filter((x) => x.dayOfWeek == currentDOW)
                  .map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {dayOfWeek[item.dayOfWeek]} -{" "}
                        {moment(item.startSlotTime).format("HH:mm")} -{" "}
                        {moment(item.endSlotTime).format("HH:mm")}
                      </option>
                    );
                  })}
            </Select>
          </div>

          {/* Note */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="Note" value="Note" />
            <TextInput
              id="Note"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Note}
            />
            {formik.touched.Note && formik.errors.Note ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.Note}
              </div>
            ) : null}
          </div>
          <Label value="Total Price" />
          <div>
            150000 VND
          </div>
          <Button type="submit" className="w-[300px] ">
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

export default BookingPage;
