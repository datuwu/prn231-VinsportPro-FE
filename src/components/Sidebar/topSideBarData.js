import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiCheckCircle,
  HiDatabase,
  HiViewBoards,
  HiCalendar,
  HiShoppingCart,
  HiOutlineClipboardList,
  HiUserCircle,
} from "react-icons/hi";
import { FaAppleWhole } from "react-icons/fa6";
import { GiCage } from "react-icons/gi";
import { PiBirdFill, PiBowlFoodFill } from "react-icons/pi";
import { MdPets } from "react-icons/md";
import { BsUiChecksGrid } from "react-icons/bs";
import { FaTicketAlt } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { CiBookmarkCheck } from "react-icons/ci";


export const topSideBarData = [
  {
    title: "Home",
    href: "/",
    icon: FaHouseUser,
  },
  {
    title: "Bookings",
    href: "/admin-pages/booking-admin/index",
    icon: FaTicketAlt,
    allowRole: ["Admin"],
  },
  {
    title: "Field Clusters",
    href: "/admin-pages/field-clusters/index",
    icon: FaTicketAlt,
    allowRole: ["Admin"],
  },
  {
    title: "Sport Fields",
    href: "/admin-pages/sport-fields/index",
    icon: FaTicketAlt,
    allowRole: ["Admin"],
  },
  {
    title: "Sport Types",
    href: "/admin-pages/sport-types/index",
    icon: FaTicketAlt,
    allowRole: ["Admin"],
  },
  {
    title: "Book a field",
    href: "/san-bong",
    icon: FaTicketAlt,
    allowRole: ["Customer"],
  },
  {
    title: "Booked fields",
    href: "/booking/index",
    icon: CiBookmarkCheck,
    allowRole: ["Customer"],
  },
  {
    title: "User",
    href: "/admin-pages/users/index",
    icon: HiUserCircle,
    allowRole: ["Customer"],
  },
];
