"use client";
import { useState } from "react";
// import { Input } from "@/components/ui/input";
import {
  // Search,
  LayoutDashboard,
  ShoppingBag,
  AlignJustify,
  X,
} from "lucide-react";
import Signin from "./Signin";
import SearchInput from "./SearchInput";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full top-0 border-b bg-white  z-[999] h-[4rem]  fixed gap-8">
      <div className=" contain h-full mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <p>Logo</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput/>
          <button className="border border-red-500 bg-secondary/10 px-3 py-1.5 rounded-md justify-center flex items-center gap-3">
            <LayoutDashboard className="w-4 h-4 text-red-500" />
            <p className="capitalize text-xs font-semibold text-red-500">
              dashboard
            </p>
          </button>

          <a className="relative" href="/cart">
            <ShoppingBag className="w-6 h-6" />
          </a>
          <div className="hidden md:flex items-center gap-3">
            <Signin />
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <AlignJustify className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`md:hidden absolute w-[80%] bg-white shadow-md h-screen top-0 right-0 p-2 border-1 transition-transform ${
          menuOpen ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <button onClick={() => setMenuOpen(false)}>
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col h-full justify-between">
          <div className="my-2">
            {["Blazers & Suits", "Shirts", "Trousers", "Shoes"].map((item) => (
              <button
                key={item}
                className="px-2 pt-4 uppercase text-left rounded-md block w-full transition-smooth hover:underline"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mb-[30px]">
            <Signin />
          </div>
        </div>
      </nav>
    </nav>
  );
}
