"use client";
import { motion } from "framer-motion";
import SearchResultBoxItem from "./SearchResultBoxItem";
import queryString from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { X, Search } from "lucide-react";
import { TProducts } from "@/types/supabaseTypes";

type ProtoType = {
  openSearchDropDown: boolean;
  setOpenSearchDropDown: Dispatch<SetStateAction<boolean>>;
  products: TProducts[] | null;
  searchInput: string | null;
};

export default function SearchResultBox({
  openSearchDropDown,
  setOpenSearchDropDown,
  products,
  searchInput,
}: ProtoType) {
  const variants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  const params = useSearchParams();
  const router = useRouter();

  const handleSearch = () => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
      console.log("currentQuery", currentQuery);
    }

    const updatedQuery: any = {
      ...currentQuery,
      search: searchInput,
      page: null,
    };

    const url = queryString.stringifyUrl(
      { url: "/store", query: updatedQuery },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
    setOpenSearchDropDown(false);
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={openSearchDropDown ? "animate" : "initial"}
      transition={{ duration: 0.5 }}
      className="md:w-[33rem] p-4 bg-white border rounded h-fit absolute top-[3.2rem] right-0shadow-md"
    >
      <div className="flex justify-between items-center mb-2">
        {products && products.length > 0 && searchInput && (
          <button
            className="bg-primary/10 hover:bg-primary/40 transition-smooth px-3 text-sm rounded-full py-1"
            onClick={handleSearch}
          >
            see all results
          </button>
        )}
        <X
          className="cursor-pointer w-4 h-4"
          onClick={() => setOpenSearchDropDown(false)}
        />
      </div>
      <div>
        {products && products.length > 0 && searchInput ? (
          products
            .slice(0, 5)
            .map((product) => (
              <SearchResultBoxItem
                key={product.id}
                product={product}
                setOpenSearchDropDown={setOpenSearchDropDown}
              />
            ))
        ) : (
          <div className="w-full h-full flex gap-2 items-center justify-center">
            <p>Type something to search</p>
            <Search className="w-4 h-4 text-slate-500" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
