"use client";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "../../components/backoffice/navbar/Navbar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Admin({ children }:{
     children: React.ReactNode }) {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <div>
      <Navbar setShowSideBar={setShowSideBar} />
      <div className="mt-16 flex gap-6">
        <Sidebar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
        <main
          className={cn("py-5 px-3 w-full", showSideBar && "md:ml-80")}
        > {children} </main>
      </div>
    </div>
  );
}
