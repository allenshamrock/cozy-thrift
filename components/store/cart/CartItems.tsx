"use client";
import CartItem from "./CartItem";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

export default function CartItems() {
  const variants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cart = useCartStore((state) => state.cart);
  console.log("CartItem:", cart);

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <motion.section
      variants={variants}
      initial="initial"
      whileInView="animate"
      className="col-span-8 border shadow p-3 md:p-4 rounded-md md:pr-6 md:overflow-y-hidden md:max-h-[40rem] scroll-p-6 scroll-bar "
    >
      <div className="flex items-center justify-between mb-3 md:mb-6 w-full">
        <h2 className="font-semibold text-2xl md:text-3xl">Shopping Cart</h2>
        <h2 className="font-semibold text-2xl md:text-3xl">{cart.length}</h2>
      </div>
      <hr />
      {cart.length ? (
        cart.map((item, i) => <CartItem key={i} cartItem={item} />)
      ) : (
        <div className="md:h-[15rem] p-3 grid place-items-center ">
          Your cart is empty
        </div>
      )}
    </motion.section>
  );
}
