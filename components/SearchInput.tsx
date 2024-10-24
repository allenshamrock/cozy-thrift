"use client";
import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const querySearch = (event.target as HTMLInputElement).value;
    const params = new URLSearchParams(searchParams);

    if (event.key === "Enter") {
      if (querySearch !== "") {
        params.set("query", querySearch);
        router.push(`${pathname}?query=${params.get("query")?.toString()}`);
      } else {
        router.push(pathname);
      }
    }
    // console.log(querySearch)
  };

  return (
    <>
      <div className="hidden md:block relative">
        <div className="flex items-center bg-gray-100 rounded-full gap-3 px-3 py-1">
          <input
            className="bg-transparent outline-none w-[10rem] focus:w-[15rem] transition-all duration-300 placeholder:text-xs"
            placeholder={!isFocused ? "Search for products.." : ""}
            defaultValue={searchParams.get("query")?.toString()}
            type="search"
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(true);
            }}
            onKeyDown={handleSearch}
          />
          <button>
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
      {isFocused && (
        <div className="flex md:hidden items-center">
          <button type="button">
            <Search className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
}
