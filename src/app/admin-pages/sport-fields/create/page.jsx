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

const FieldCreatePage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  // Get field cluster list
  const {
    response: clusterResponse,
    loading: clusterLoading,
    error: clusterError,
  } = useAxios({
    method: "get",
    url: `${API}/fieldClusters/`,
  });
  // Get sport type list
  const {
    response: typeResponse,
    loading: typeoading,
    error: typeError,
  } = useAxios({
    method: "get",
    url: `${API}/sportTypes/`,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      displayIndex: 1,
      sportTypeId: 1,
      status: 1,
      sportFieldClusterId: 1,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      displayIndex: Yup.string().required("Required"),
      sportTypeId: Yup.number().required("Required"),
      sportFieldClusterId: Yup.number().required("Required"),
      status: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log(payloadData.data);
      axios
        .post(`${API}/sportFields`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();

          router.push("/admin-pages/sport-fields/index");
        })
        .then((response) => {
          message.success("Add new sport field success");
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
            <Link href={"/admin-pages/sport-fields/index"} className="flex flex-row gap-2">
              {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
            </Link>
            <h2 className="text-3xl font-bold">Add new sport field</h2>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 w-[600px]"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" value="Field name" />
              <TextInput
                id="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-xs text-red-600 dark:text-red-400">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>

            {/* //* Sport Type */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="sportTypeId" value="Sport types" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
                <Select
                  id="sportTypeId"
                  onChange={(e) => {
                    const stringSelection = e.target.value;
                    formik.setFieldValue(
                      "sportTypeId",
                      parseInt(stringSelection)
                    );
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.sportTypeId}
                >
                  {typeResponse && typeResponse.length > 0 ? (
                    typeResponse.map((sportType, index) => {
                      return (
                        <option key={index} value={sportType.id}>
                          {sportType.sportName}
                        </option>
                      );
                    })
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </Select>
              </div>
            </div>

            {formik.touched.sportTypeId && formik.errors.sportTypeId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.sportTypeId}
              </div>
            ) : null}
          </div>

             {/* //* Field Cluster */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="sportFieldClusterId" value="Field cluster" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
                <Select
                  id="sportFieldClusterId"
                  onChange={(e) => {
                    const stringSelection = e.target.value;
                    formik.setFieldValue(
                      "sportFieldClusterId",
                      parseInt(stringSelection)
                    );
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.sportFieldClusterId}
                >
                  {clusterResponse && clusterResponse.length > 0 ? (
                    clusterResponse.map((fieldCluster, index) => {
                      return (
                        <option key={index} value={fieldCluster.id}>
                          {fieldCluster.fieldName}
                        </option>
                      );
                    })
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </Select>
              </div>
            </div>

            {formik.touched.sportFieldClusterId && formik.errors.sportFieldClusterId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.sportFieldClusterId}
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

export default FieldCreatePage;
