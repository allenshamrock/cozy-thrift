"use client";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ColorVariant, genderOptions } from "@/components/Constants";
import { cn } from "@/lib/utils";
import { Gender } from "@/store/cart-store";
import queryString from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export const priceRange = [
  {
    id: 1,
    label: "High to Low",
    value: "dsc",
  },
  {
    id: 2,
    label: "Low to High",
    value: "asc",
  },
];

const variants = {
  initial: {
    opacity: 0,
    y: 300,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export default function MobileProductsFilter() {
  const [openFilter, setOpenFilter] = useState(false);

  const router = useRouter();
  const params = useSearchParams();

  const handleGender = (gen: Gender) => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
      console.log("current query", currentQuery);
    }

    const updatedQuery: any = {
      ...currentQuery,
      gender: gen,
      page: null,
    };

    if (params?.get("gender") === gen) {
      delete updatedQuery.gender;
    }

    const url = queryString.stringifyUrl(
      { url: "/store", query: updatedQuery },
      { skipNull: true }
    );
    router.push(url);
    setOpenFilter(false);
  };

  const handleSort = (value: string) => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
      console.log("current query", currentQuery);
    }

    const updatedQuery: any = {
      ...currentQuery,
      sort: value,
      page: null,
    };

    if (params?.get("sort") === value) {
      delete updatedQuery.sort;
    }

    const url = queryString.stringifyUrl(
      { url: "/store", query: updatedQuery },
      { skipNull: true }
    );
    router.push(url);
    setOpenFilter(false);
  };

  const handleColor = (value: string) => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
      console.log("current query", currentQuery);
    }

    const updatedQuery: any = {
      ...currentQuery,
      color: value,
      page: null,
    };

    if (params?.get("color") === value) {
      delete updatedQuery.color;
    }

    const url = queryString.stringifyUrl(
      { url: "/store", query: updatedQuery },
      { skipNull: true }
    );
    router.push(url);
    setOpenFilter(false);
  };

  return (
    <div className="relative md:hidden">
      <div
        onClick={() => setOpenFilter((prev) => !prev)}
        className="text-muted-foreground flex items-center text-sm border border-gray-300 px-2 py-1 rounded-full hover:text-black hover:border-gray-400 outline-none cursor-pointer"
      >
        <span>Filter</span> <Filter className="w-4 h-4 ml-2" />
      </div>
      {openFilter && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/10 backdrop-blur-[2px] grid place-items-end z-[1000] ">
          <motion.div
            initial="initial"
            variants={variants}
            animate={openFilter ? "animate" : "initial"}
            transition={{ duration: 0.3 }}
            className="w-full h-[60vh] shadow-lg bg-gray-100 p-4 z-[1002]"
          >
            <button onClick={() => setOpenFilter(false)}>
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="my-3">
              <h2 className="uppercase font-medium mb-3 border-b-2 border-gray-200">
                Gender
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                {genderOptions.map((gen) => {
                  return (
                    <button
                      onClick={() => handleGender(gen)}
                      key={gen}
                      className={cn(
                        "h-6 px-2 capitalize rounded-md flex items-center justify-center border border-slate-400 hover:bg-secondary  hover:text-white hover:border-transparent transition-smooth text-xs",
                        gen === params.get("gender") &&
                          "text-white bg-secondary/40 border-transparent"
                      )}
                    >
                      {gen}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mb-3">
              <h2 className="uppercase font-medium mb-6 border-b-2 border-slate-200">
                colors
              </h2>
              <div className="flex flex-wrap items-center justify-start gap-2">
                {ColorVariant.map((item) => {
                  return (
                    <div
                      style={{ borderColor: `${item.value}` }}
                      key={item.value}
                      className={cn(
                        "w-8 place-items-center rounded-full aspect-square cursor-pointer hover:border-2 transition-smooth",
                        params.get("color") === item.name
                          ? "border-2"
                          : "border-transparent"
                      )}
                    >
                      <button
                        onClick={() => handleColor(item.name)}
                        style={{ background: `${item.value}` }}
                        className={cn(
                          "w-6 rounded-full aspect-square",
                          item.name === "white" && "border"
                        )}
                      ></button>
                    </div>
                  );
                })}
              </div>
              <div className="mb-6">
                <h2 className="uppercase font-medium mb-3 border-b-2 border-gray-200">
                  Prices
                </h2>
                <div className="flex items-center gap-2 flex-wrap">
                  {priceRange.map((range) => {
                    return (
                      <button
                        onClick={() => handleSort(range.value)}
                        key={range.id}
                        className={cn(
                          "h-6 px-2 text-sm capitalize rounded-md flex items-center justify-center border border-slate-400 hover:bg-secondary hover:border-transparent hover:text-white transition-smooth",
                          params.get("sort") === range.value &&
                            "text-white bg-secondary/50 border-transparent"
                        )}
                      >
                        {range.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <Link
              href={`?${new URLSearchParams()}`}
              className={"text-xs underline uppercase"}
              onClick={() => setOpenFilter(false)}
            >
              Reset
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
}
