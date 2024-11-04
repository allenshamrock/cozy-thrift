"use client";
import { TProducts } from "@/types/supabaseTypes";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type ProtoType = {
  product: TProducts | null;
  setOpenSearchDropDown: Dispatch<SetStateAction<boolean>>;
};

export default function SearchResultBoxItem({
  product,
  setOpenSearchDropDown,
}: ProtoType) {
  return (
    <Link
      href={`/product/${product?.id}`}
      onClick={() => setOpenSearchDropDown(false)}
      className="h-10 w-full rounded border-b last:border-none pb-1 mb-2 items-center hover:bg-slate-100 transition px-1"
    >
        <div className="relative mr-4 h-full w-8  rounded-sm overflow-hidden bg-slate-200">
            <Image src={product?.images[0] as string} className="object-cover" alt="" fill />
        </div>
        <h2 className="line-clamp-1 mr-8 text-xs font-semibold">{product?.name}</h2>
        <p className="ml-auto font-semibold text-sm">Ksh{product?.price?.toFixed(2)}</p>
    </Link>
  );
}
