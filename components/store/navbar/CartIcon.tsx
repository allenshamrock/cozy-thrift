"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useEffect } from "react";

export default function CartIcon() {

  const cart = useCartStore((state) => state.cart);

  useEffect(()=>{
    //To restore the persisted data from the localStorage
    useCartStore.persist.rehydrate
  },[])
  return (
    <Link href="/cart" className="relative">
      <ShoppingBag className="w-5 h-5 opacity-50" />
      <div className="w-6 aspect-square bg-rose-600 rounded-full absolute -top-2  -right-2 grid place-item-center text-sm text-white font-semibold cursor-pointer">
        {cart.length}
      </div>
    </Link>
  );
}
