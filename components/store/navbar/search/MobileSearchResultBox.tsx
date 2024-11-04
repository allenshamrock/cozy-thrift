"use client";
import { TProducts } from "@/types/supabaseTypes";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { Dispatch, SetStateAction } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

type Prototype = {
  products: TProducts[] | null;
  searchInput: string | null;
  setSearchInput: Dispatch<SetStateAction<string | null>>;
};

export default function MobileSearchResultBox({
  products,
  searchInput,
  setSearchInput,
}: Prototype) {
  const params = useSearchParams();
  const router = useRouter();

  const handleSearch = () => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
      console.log("current query", currentQuery);
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
  };

  return (
    <div className="flex md:hidden items-center">
      <Sheet>
        <SheetTrigger asChild>
          <button>
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[60vh]">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex items-center gap-3 bg-gray-100 mb-3 px-3 py-1 rounded-full mt-4">
            <input
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-transparent outline-none w-full transition placeholder:text-xs"
              placeholder="search for products"
              type="search"
            />
            <button>
              <Search className="w-4 h-4 opacity-40" />
            </button>
          </div>
          <div>
            {products && products.length > 0 && searchInput ? (
              products.slice(0, 5).map((product) => (
                <SheetClose asChild key={product.id}>
                  <Link
                    className="h-10 w-full hover:bg-slate-100 border-b last:border-none pb-1 mb-2 flex items-center  transition px-1"
                    href={`/products/${product?.id}`}
                  >
                    <div className="realative h-full w-8 mr-4 rounded-sm overflow-hidden bg-slate-200">
                      <Image
                        src={product?.images[0] as string}
                        className="object-cover"
                        alt={product.name || ""}
                        fill
                      />
                    </div>
                    <h2 className="line-clamp-1 mr-8 text-xs font-semibold">
                      {product?.name}
                    </h2>
                    <p className="ml-auto font-semibold text-xs">
                      {product?.price}
                    </p>
                  </Link>
                </SheetClose>
              ))
            ) : (
              <div className="w-full h-full flex gap-2 items-center justify-center">
                <p>Tpe something to Search</p>
                <Search className="w-4 h-4 text-slate-500" />
              </div>
            )}
          </div>
          {products && products.length > 0 && searchInput && (
            <SheetClose asChild>
              <button
                className="bg-primary/10 hover:bg-primary/40 transition-smooth px-3  text-sm rounded-full py-1 mt-3"
                onClick={handleSearch}
              >
                See all results
              </button>
            </SheetClose>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
