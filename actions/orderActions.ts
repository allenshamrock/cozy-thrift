"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getUserSession } from "@/lib/getSession";
import { FieldValues } from "react-hook-form";
import { TCartItem } from "@/store/cart-store";

type DataType =
  | {
      categoryId?: string;
      categoryName: string;
      categoryDescription: string;
      categoryImage: string;
    }
  | FieldValues;

type TOrderData = {
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  email: string;
  zipcode?: string;
  phone: number;
  paymentType: "cash on delivery" | "Stripe";
  orderId: string;
  checkoutItems: TCartItem[];
};

export async function createOrder(orderData: TOrderData) {
  const {
    firstname,
    lastname,
    address,
    city,
    email,
    zipcode,
    phone,
    paymentType,
    orderId,
    checkoutItems,
  } = orderData;

  const cartTotal = checkoutItems.reduce((acc, currVal) => {
    return acc + currVal.quantity * currVal.price!;
  }, 0);

  const supabase = createClient();

  const user = await getUserSession();
  if (!user) {
    throw new Error("Unauthorized access");
  }

  try {
    const { error } = await supabase.from("orders").insert({
      firstname,
      lastname,
      address,
      city,
      email,
      zipcode,
      phone,
      paymentType,
      orderId,
      noOfProducts: checkoutItems.length,
      totalPrice: cartTotal,
    });
    if (error) {
      console.log("create order error", error);
      return {
        success: false,
      };
    }
    // create order items
    checkoutItems.map(async (item) => {
      await supabase.from("orderProduct").insert({
        name: item.name,
        itemId: item.itemId, //Unique item cart id
        quantity: item.quantity,
        variant: item.variant,
        price: item.price,
        image: item.images[0],
        productId: item.id, ////product supabase id (not unique since there could be multiple cart Products with same id but different variants)
        orderId,
        buyerId: user.id,
      });
    });
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/dashboard/orders");
}

export const setOrderAsCompleted = async (id: number) => {
  const supabase = createClient();
  const user = await getUserSession();
  if (!user || user?.role !== "admin") {
    throw new Error("Unauthorized access");
  }
  try {
    const [orderData, orderProductData] = await Promise.all([
      supabase
        .from("orders")
        .update({ status: "completed", PaymentStatus: "completed" })
        .eq("orderId", id),
      supabase
        .from("orderProduct")
        .update({ status: "completed" })
        .eq("orderId", id),
    ]);

    if (orderData.error || orderProductData.error) {
      return {
        success: false,
      };
    }
    revalidatePath("/dashboard/orders");
    revalidatePath(`dashboard/orders/${id}`);
    return {
      success: true,
    };
  } catch (error) {
    console.log("[set order as completed]", error);
    return {
      success: false,
    };
  }
};
