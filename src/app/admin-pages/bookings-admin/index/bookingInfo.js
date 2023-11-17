import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { FiEdit, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";

export const bookingColumns = [
  {
    name: "ID",
    selector: (row) => row.bookingId,
    sortable: true,
  },
  {
    name: "User ID",
    selector: (row) => row.userId,
    sortable: true,
  },
  {
    name: "Booker",
    selector: (row) => row.bookerName,
    sortable: true,
  },
  {
    name: "Note",
    selector: (row) => row.note,
    sortable: true,
  },
  {
    name: "Total Price",
    selector: (row) => row.totalPrice,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: "Booker Phone",
    selector: (row) => row.bookerPhone,
    sortable: true,
  },
  {
    name: "Sport Field ID",
    selector: (row) => row.sportFieldId,
    sortable: true,
  },
  {
    name: "Time slot",
    selector: (row) => row.timeSlot,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <Dropdown arrowIcon={false} inline label={<FiMoreVertical />}>
        <Link href={`/admin-pages/bookings-admin/details/${row.id}`}>
          <Dropdown.Item icon={FiEye}>Details</Dropdown.Item>
        </Link>
      </Dropdown>
    ),
  },
];
