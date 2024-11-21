"use client";
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import SearchResultBox from "./SearchResultBox";
import { createClient } from "@/lib/supabase/client";
import { TProducts } from "@/types/supabaseTypes";

import MobileSearchResultBox from "./MobileSearchResultBox";
import useDebounce from "@/lib/useDebonce";

export default function SearchBar() {
  const [openSearchDropdown, setOpenSearchDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const debounceInput = useDebounce(searchInput as string);

  const [products, setProducts] = useState<TProducts[] | null>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();

  // OPtimizing the search queries by delaying the API call until the user has finshed typing
  useEffect(() => {
    const searchProduct = async () => {
      if (debounceInput) {
        console.log("debouncedInput", debounceInput);

        const { data: products } = await supabase
          .from("products")
          .select()
          .ilike("name", `%${searchInput}%`);
        setProducts(products);
      }
      if (searchInput === null || searchInput === "") {
        setProducts([]);
      }
    };
    searchProduct();
  }, [debounceInput, supabase]);

  return (
    <div>
      {/* For larger screens */}
      <div className="hidden md:block relative">
        <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
          <motion.input
            onFocus={() => setOpenSearchDropdown(true)}
            ref={inputRef}
            initial={{ width: "15rem" }}
            whileFocus={{ width: "30rem" }}
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-transparent outline-none focus:w-[13rem] transition placeholder:text-xs"
            placeholder="search for products"
            type="search"
          />
          <button>
            <Search className="w-4 h-4 opacity-30" />
          </button>
        </div>
        {openSearchDropdown && (
          <SearchResultBox
            searchInput={searchInput}
            products={products}
            openSearchDropdown={openSearchDropdown}
            setOpenSearchDropdown={setOpenSearchDropdown}
          />
        )}
      </div>
      {/* for smaller screens  */}
      <MobileSearchResultBox
        setSearchInput={setSearchInput}
        searchInput={debounceInput}
        products={products}
      />
    </div>
  );
}
