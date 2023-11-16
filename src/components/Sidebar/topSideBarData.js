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
    href: "/home",
    icon: FaHouseUser,
  },
  {
    title: "Book a field",
    href: "/booking/create",
    icon: FaTicketAlt,
  },
  {
    title: "Booked fields",
    href: "/booking/index",
    icon: CiBookmarkCheck,
  },
  {
    title: "User",
    href: "/users/index",
    icon: HiUserCircle,
  },
];
