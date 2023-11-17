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
import { useParams } from "next/navigation";
import useAxios from "@/hooks/useFetch";
import { getUserInfo } from "@/helper";
import { userRoleEnums } from "@/app/admin-pages/users/index/userInfo";

const { default: PageLayout } = require("@/layout/pageLayout");

const FieldEditPage = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const params = useParams();
  const fieldId = parseInt(params.id, 10);

  //Handle user role
  const user = getUserInfo();
  const disabledRole = !user || userRoleEnums[user.role] != "Admin";

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

  //Fetch old field data
  const {
    response: fieldResponse,
    loading: fieldLoading,
    error: fieldError,
  } = useAxios({
    method: "get",
    url: `${API}/sportFields/?filter=ID%20eq%20${fieldId}`,
  });

  //Fetch old data to form
  useEffect(() => {
    if (fieldResponse) {
      console.log(fieldResponse);
      formik.setValues({
        ...fieldResponse[0],
      });
    }
  }, [fieldResponse]);

  const formik = useFormik({
    initialValues: {
      Id: fieldId,
      sportFieldName: "",
      displayIndex: "",
      sportTypeId: "",
      sportFieldStatus: 1,
      fieldClusterId: 1,
    },
    validationSchema: Yup.object({
      sportFieldName: Yup.string().required("Required"),
      displayIndex: Yup.number().required("Required"),
      sportTypeId: Yup.number().required("Required"),
      fieldClusterId: Yup.number().required("Required"),
      sportFieldStatus: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      const payloadData = {
        data: values,
      };
      console.log("submit data", payloadData.data);
      axios
        .put(`${API}/sportFields/${fieldId}`, payloadData.data)
        .then((response) => {
          setSpinner(false);
          formik.resetForm();
          message.success("Update sport field success");
          router.push("/admin-pages/sport-fields/index");
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
          <h2 className="text-3xl font-bold">Edit sport field</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[600px]"
        >
          <Label value="Field ID" />
          <div>{formik.values.Id}</div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="sportFieldName" value="Field name" />
            <TextInput
              id="sportFieldName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sportFieldName}
            />
            {formik.touched.sportFieldName && formik.errors.sportFieldName ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.sportFieldName}
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
            <Label htmlFor="fieldClusterId" value="Field cluster" />
            <div className="flex w-full gap-2">
              <div className="w-[500px]">
                <Select
                  id="fieldClusterId"
                  onChange={(e) => {
                    const stringSelection = e.target.value;
                    formik.setFieldValue(
                      "fieldClusterId",
                      parseInt(stringSelection)
                    );
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.fieldClusterId}
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

            {formik.touched.fieldClusterId && formik.errors.fieldClusterId ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.fieldClusterId}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="sportFieldStatus" value="sportFieldStatus" />
            <Select
              id="sportFieldStatus"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sportFieldStatus}
            >
              <option value="1">Available</option>
              <option value="2">Unavailable</option>
            </Select>
            {formik.touched.sportFieldStatus && formik.errors.sportFieldStatus ? (
              <div className="text-xs text-red-600 dark:text-red-400">
                {formik.errors.sportFieldStatus}
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

export default FieldEditPage;
