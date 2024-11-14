"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TProducts } from "@/types/supabaseTypes";
import Button from "@/components/Button";
import { useCartStore } from "@/store/cart-store";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProtoType = {
  product: TProducts[] | null;
};

export default function ProductsCard({ product }: ProtoType) {
  const [imgUrl, setImgUrl] = useState(product?.images[0]);

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);

  const addItemToCart = (product: TProducts | null, variant?: string) => {
    if (product && variant) {
      addToCart(product, variant);
      toast.success(`Size ${variant} added to cart`);
    } else {
      addToCart(product as TProducts);
      toast.success("Item added to cart");
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ type: "tween" }}
      viewport={{ once: true }}
      className="overflow-hidden border border-slate-100"
    >
      <Link href={`/product/${product?.id}`}>
        <div
          onMouseOver={() =>
            setImgUrl(
              product?.images.length! > 1
                ? product?.images[1]
                : product?.images[0]
            )
          }
          onMouseLeave={() => setImgUrl(product?.images[0])}
          className="relative h-[14rem] md:h-[20rem] bg-gray-100 "
        >
          <Image
            className="object-cover"
            fill
            src={imgUrl as string}
            alt="product image"
          />
        </div>
      </Link>
      <div className="p-2 md:p-4">
        <h2 className="text-base md:text-lg font-semibold truncate">
          {product?.name}
        </h2>
        <div className="md:flex flex-between items-end">
          <div>
            <span className="text-muted-foreground text-xs">
              {product?.category}
            </span>
            <h2 className="text-xl font-semibold">
              {product?.price && <span>${product?.price.toFixed(2)}</span>}
            </h2>
          </div>
          {product?.variants.length ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  label="Add To cart"
                  className="border-gray-400 py-1.5 rounded-none text-gray-900 max-md:mt-2 max-md:text-xs max-md:w-full "
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select a variant</DialogTitle>
                  <DialogDescription>{product.name}</DialogDescription>
                </DialogHeader>
                <div className="my-3 grid grid-cols-2 md:grid-cols-4 items-start justify-between gap-2">
                  {product.images.map((image, i) => (
                    <Image
                      key={1}
                      src={image}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="aspect-square rounded-md object-cover bg-slate-100"
                    />
                  ))}
                </div>
                <div className="w-full flex flex-wrap gap-2 items-end justify-start">
                  {product?.variants.map((variant, i) => {
                    const inCart = cart.some(
                      (item) =>
                        item.id === product.id && item.variant === variant
                    );

                    return (
                      <button
                        disabled={incart}
                        onClick={() => addItemToCart(product, variant)}
                        key={i}
                        className="h-8 text-sm font-semibold flex items-center justify-center border-2 rounded-md cursor-pointer px-3 bg-white hover:bg-primary hover:text-white transition-smooth hover:border-transparent  disabled:bg-primary disabled:border-transparent disabled:text-white disabled:cursor-not-allowed disabled:pointer-events-none "
                      >
                        {variant}
                      </button>
                    );
                  })}
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              label={"Add to cart"}
              disabled={cart.some((item) => item.id === product?.id)}
              onClick={() => addItemToCart(product)}
              className="border-gray-400 max-md:mt-2 max-md:text-xs max-md:w-full text-gray-900 rounded-none py-1.5"
            />
          )}
        </div>
      </div>
    </motion.article>
  );
}
