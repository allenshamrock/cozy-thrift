import { TProducts } from "@/types/supabaseTypes";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { persist, devtools } from "zustand/middleware";

export type Gender = "male" | "female" | "both";

export interface TCartItem extends TProducts {
  variant?: string;
  quantity: number;
  itemId: string;
}

type TState = {
  cart: TCartItem[];
};

type TAction = {
  addToCart: (product: TProducts, variants?: string) => void;
  addSingleProductToCart: (product: TProducts, variants?: string) => void;
  increaseCartQuantity: (itemId: string) => void;
  decreaseCartQuantity: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<TState & TAction>()(
  devtools(
    persist(
      (set) => ({
        cart: [],
        addToCart: (product, variant) =>
          set((state) => ({
            cart: [
              ...state.cart,
              { ...product, variant: variant, quantity: 1, itemId: uuidv4() },
            ],
          })),
        addSingleProductToCart: (product, variant) =>
          set((state) => ({
            cart: [
              ...state.cart,
              { ...product, variant: variant, quantity: 1, itemId: uuidv4() },
            ],
          })),
        increaseCartQuantity: (itemId: string) =>
          set((state) => {
            let updatedCart;

            //Check if the item is already in the cart
            const itemInCart = state.cart.some(
              (item) => item.itemId === itemId
            );

            //If the item is not in the cart,return the current cart unchanged
            if (!itemInCart) {
              return { cart: state.cart };
            }
            //If the item is in the cart,map through the cart to create an updated version
            updatedCart = state.cart.map((item) =>
              item.itemId === itemId
                ? {
                    ...item,
                    quantity:
                      item.quantity < item.quantity!
                        ? item.quantity + 1
                        : item.quantity!,
                  }
                : item
            );
            return { cart: updatedCart };
          }),
        decreaseCartQuantity: (itemId: string) =>
          set((state) => {
            let updatedCart;

            //Check if the item is already in the cart
            const itemInCart = state.cart.some(
              (item) => item.itemId === itemId
            );

            //If the item is not in the cart,return the current cart unchanged
            if (!itemInCart) {
              return { cart: state.cart };
            }
            //If the item is in the cart,map through the cart to create an updated version
            updatedCart = state.cart.map((item) =>
              item.itemId === itemId
                ? {
                    ...item,
                    quantity:
                      item.quantity < item.quantity!
                        ? item.quantity - 1
                        : item.quantity!,
                  }
                : item
            );
            return { cart: updatedCart };
          }),
        removeFromCart: (itemId: string) =>
          set((state) => {
            let updatedCart;

            const itemInCart = state.cart.find(
              (item) => item.itemId === itemId
            );

            if (itemInCart) {
              return { cart: state.cart };
            }

            updatedCart = state.cart.filter((item) => item.itemId !== itemId);
            return { cart: updatedCart };
          }),
        clearCart: () => set({ cart: [] }),
      }),
      {
        name: "cart", //unique name for persisting the store
        skipHydration: true,
      }
    )
  )
);
