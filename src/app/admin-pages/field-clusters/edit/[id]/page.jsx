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

const ClusterEditPage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const params = useParams();
  const clusterId = parseInt(params.id, 10);

  // Get user list
  const {
    response: userResponse,
    loading: userLoading,
    error: userError,
  } = useAxios({
    method: "get",
    url: `${API}/user/`,
  });

  //Fetch old type data
  const {
    response: clusterResponse,
    loading: clusterLoading,
    error: clusterError,
  } = useAxios({
    method: "get",
    url: `${API}/fieldCluster/?filter=ID%20eq%20${clusterId}`,
  });

  //Fetch old data to form
  useEffect(() => {
    if (clusterResponse) {
      console.log(clusterResponse);
      formik.setValues({
        ...clusterResponse[0],
      });
    }
  }, [clusterResponse]);

  const formik = useFormik({
    initialValues: {
      fieldName: "",
      address: "",
      adminId: 1,
      description: "",
      openingTime: "",
    },
    validationSchema: Yup.object({
      fieldName: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      adminId: Yup.number().required("Required"),
      description: Yup.string().required("Required"),
      openingTime: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
        setSpinner(true);
        const payloadData = {
          data: values,
        };
        console.log("submit data", payloadData.data);
        axios
          .put(`${API}/fieldCluster/${clusterId}`, payloadData.data)
          .then((response) => {
            setSpinner(false);
            formik.resetForm();
            message.success("Update field cluster success");
            router.push("/field-clusters/index");
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
            <Link href={"/field-clusters/index"} className="flex flex-row gap-2">
              {<HiOutlineArrowSmallLeft className="self-center" />} Back to list
            </Link>
            <h2 className="text-3xl font-bold">Add new field cluster</h2>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 w-[600px]"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="fieldName" value="Field name" />
              <TextInput
                id="fieldName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fieldName}
              />
              {formik.touched.fieldName && formik.errors.fieldName ? (
                <div className="text-xs text-red-600 dark:text-red-400">
                  {formik.errors.fieldName}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="address" value="Address" />
              <TextInput
                id="address"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-xs text-red-600 dark:text-red-400">
                  {formik.errors.address}
                </div>
              ) : null}
            </div>

            {/* //* Admin ID */}
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="adminId" value="Admin" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
                <Select
                  id="adminId"
                  onChange={(e) => {
                    const stringSelection = e.target.value;
                    formik.setFieldValue(
                      "adminId",
                      parseInt(stringSelection)
                    );
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.adminId}
                >
                  {typeResponse && typeResponse.length > 0 ? (
                    typeResponse.map((user, index) => {
                      return (
                        <option key={index} value={user.id}>
                          {user.fullname}
                        </option>
                      );
                    })
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </Select>
              </div>
            </div>

            {formik.touched.adminId && formik.errors.adminId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.adminId}
              </div>
            ) : null}
          </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description" value="Description" />
              <TextInput
                id="description"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-xs text-red-600 dark:text-red-400">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="openingTime" value="Opening time" />
              <TextInput
                id="openingTime"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.openingTime}
              />
              {formik.touched.openingTime && formik.errors.openingTime ? (
                <div className="text-xs text-red-600 dark:text-red-400">
                  {formik.errors.openingTime}
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

export default ClusterEditPage;
