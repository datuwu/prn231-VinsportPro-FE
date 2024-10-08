import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const fieldColumns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.sportFieldName,
    sortable: true,
  },
  {
    name: "Display Index",
    selector: (row) => row.displayIndex,
    sortable: true,
  },
  {
    name: "Sport Type",
    selector: (row) => row.sportTypeId,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => fieldStatusEnums[row.sportFieldStatus],
    sortable: true,
  },
  {
    name: "Field Cluster",
    selector: (row) => row.fieldClusterId,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/admin-pages/sport-fields/edit/${row.id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/admin-pages/sport-fields/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];

export const fieldStatusEnums = ["Available", "Unavailable"];
