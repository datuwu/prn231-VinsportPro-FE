import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const clusterColumns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Field Name",
    selector: (row) => row.fieldName,
    sortable: true,
  },
  {
    name: "Address",
    selector: (row) => row.address,
    sortable: true,
  },
  {
    name: "Admin Id",
    selector: (row) => row.adminId,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.description,
    sortable: true,
  },
  {
    name: "openingTime",
    selector: (row) => row.openingTime,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/admin-pages/field-clusters/edit/${row.id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/admin-pages/field-clusters/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];
