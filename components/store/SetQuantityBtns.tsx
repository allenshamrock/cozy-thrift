import { Minus,Plus } from "lucide-react";
import { TCartItem, useCartStore } from "@/store/cart-store";


export default function SetQuantityBtns({ cartItem }:{ cartItem: TCartItem }){

    const {increaseCartQty,decreaseCartQty} =useCartStore((state)=>{
        return{
            increaseCartQty:state.increaseCartQuantity,
            decreaseCartQty:state.decreaseCartQuantity
        }
    })

    return (
      <div className="flex items-center border bg-white rounded-sm h-8 overflow-hidden">
        <button
          onClick={() => decreaseCartQty(cartItem.itemId)}
          className="px-3 hover:bg-slate-200 h-full w-full transition duration-500 active:scale-75"
        >
          <Minus className="w-4" />
        </button>
        <div className="px-2 border border-slate-100 border-t-0 border-b-0">
          {cartItem.quantity}
        </div>
        <button
          onClick={() => increaseCartQty(cartItem.itemId)}
          className="px-3 hover:bg-slate-200 h-full w-full transition duration-500 active:scale-75"
        >
          <Plus className="w-4" />
        </button>
      </div>
    );
}