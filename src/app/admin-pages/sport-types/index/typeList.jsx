import React, { useState } from "react";
import { typeColumns, typeInfo } from "./typeInfo";
import DataTable from "react-data-table-component";
import useAxios from "@/hooks/useFetch";
import { Spinner } from "flowbite-react";
import { API } from "@/constants";
import { message } from "antd";

const TypeList = () => {
  const [keyword, setKeyword] = useState("");
  const { response, loading, error } = useAxios({
    method: "get",
    url: `${API}/sportTypes`,
  });

  console.log("Fetched sport types data", response);
  if (error) {
    message.error("Error While Getting Sport Types data");
    return <>No Data</>;
  }
  if (loading && !error)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );

  const customStyles = {
    rows: {
      style: {
        minHeight: "200px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "3px", // override the cell padding for data cells
        paddingRight: "3px",
      },
    },
    cells: {
      style: {
        paddingLeft: "3px", // override the cell padding for data cells
        paddingRight: "3px",
      },
    },
  };

  return (
    <>
      <div className="flex flex-row">
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            console.log(keyword);
          }}
          name="search"
          placeholder="Enter your search"
        />
      </div>
      <DataTable
        columns={typeColumns}
        data={
          keyword && keyword.length > 0
            ? response.filter((x) => {
                const idMatch = x.id.toString().includes(keyword);
                const nameMatch = x.sportName
                  .toLowerCase()
                  .includes(keyword.toLowerCase());
                return idMatch || nameMatch;
              })
            : response
        }
        pagination
        className="overflow-auto"
        customStyles={customStyles}
      />
    </>
  );
};

export default TypeList;
