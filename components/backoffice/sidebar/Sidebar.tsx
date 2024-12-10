"use client";
import { motion } from "framer-motion";
import { LayoutDashboard, ReceiptText, ShoppingBasket } from "lucide-react";
import { RiCoupon2Line } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { Dispatch, SetStateAction, ReactElement } from "react";
import SidebarLink from "./SidebarLink";

type SideBarType = {
  showSideBar: boolean;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
};

export type TsidebarLink = {
  label: string;
  href: string;
  icon: ReactElement;
  subLinks:
    | {
        label: string;
        href: string;
      }[]
    | null;
};

const sideBarLinks = [
  {
    label: "Overview",
    subLinks: null,
    href: "/dashboard/overview",
    icon: <LayoutDashboard />,
  },
  {
    label: "My Shop",
    subLinks: [
      {
        label: "Products",
        href: "/dashboard/products",
      },
      {
        label: "Orders",
        href: "/dashboard/orders",
      },
    ],
    href: "#",
    icon: <ShoppingBasket />,
  },
  {
    label: "Categories",
    subLinks: null,
    href: "/dashboard/categories",
    icon: <MdCategory className="w-5 h-5" />,
  },
  {
    label: "Orders",
    subLinks: null,
    href: "/dashboard/orders",
    icon: <ReceiptText />,
  },
  {
    label: "Coupons",
    subLinks: null,
    href: "/dashboard/coupons",
    icon: <RiCoupon2Line className="w-5 h-5" />,
  },
];

export default function Sidebar({ showSideBar, setShowSideBar }: SideBarType) {
  const variants = {
    close: {
      x: "-100%",
      transition: { type: "tween" },
    },
    open: {
      x: 0,
      transition: { type: "tween" },
    },
  };

  return (
    <motion.nav
      variants={variants}
      initial="close"
      animate={showSideBar ? "open" : "close"}
      className="h-screen w-80 bg-white border-r z-[990] fixed top-16 left-0 p-5"
    >
      <ul>
        {sideBarLinks.map((link, i) => (
          <SidebarLink setShowSideBar={setShowSideBar} key={i} link={link} />
        ))}
      </ul>
    </motion.nav>
  );
}
