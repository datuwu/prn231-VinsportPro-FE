import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const userColumns = [
  {
    name: "id",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: (row) => row.phoneNumber,
    sortable: true,
  },
  {
    name: "Role",
    selector: (row) => userRoleEnums[row.role],
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => userStatusEnums[row.status],
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/users/edit/${row.id}`}>
          <Dropdown.Item icon={FiEdit}>Edit</Dropdown.Item>
        </Link>
        <Link href={`/users/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];

export const userRoleEnums = ["Admin", "Manager", "Staff"];

export const userStatusEnums = ["Activated", "Deactivated"];
