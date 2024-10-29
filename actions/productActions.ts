"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../lib/supabase/server";
import { getUserSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { TProducts } from "@/types/supabaseTypes";
import { deleteImage } from "./uploadThingActions";
import { cache } from "react";
import { promise } from "zod";

type DataType =
  | {
      productId?: string;
      productName: string;
      productDescription: string;
      category: string;
      quantity: string;
      sku: string;
      price: string;
      color: string;
      status: "active" | "draft" | "scheduled";
      scheduledDate?: Date | null;
      categorySlug: string;
      deliveryInfo: string;
      variants: [];
      images: [];
      gender: string;
    }
  | FieldValues;

export async function createProduct(data: DataType) {
  const supabase = createClient();
  const user = await getUserSession();

  if (!user || user.role !== "admin") throw new Error("Unauthorized access");

  try {
    const { error } = await supabase.from("products").insert({
      name: data.productName,
      description: data.productDescription,
      images: data.images,
      category: data.category,
      quantity: data.quantity,
      sku: data.sku,
      price: data.price,
      color: data.color,
      status: data.status,
      variants: data.variants,
      categorySlug: data.categorySlug,
      gender: data.gender,
      deliveryInfo: data.deliveryInfo,
      scheduledDate: data.scheduledDate,
    });
    if (error) {
      console.log("Product failed to be posted", error);
    }
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/dashboard/products");
  revalidatePath("/store");
}

export async function editProduct(data: DataType) {
  const supabase = createClient();

  const user = await getUserSession();
  if (!user || user.role !== "admin") {
    throw new Error("Unathorized Access!");
  }

  try {
    const { error } = await supabase
      .from("products")
      .update({
        name: data.productName,
        description: data.productDescription,
        images: data.images,
        category: data.category,
        quantity: data.quantity,
        sku: data.sku,
        price: data.price,
        color: data.color,
        status: data.status,
        variants: data.variants,
        categorySlug: data.categorySlug,
        gender: data.gender,
        deliveryInfo: data.deliveryInfo,
        ...(data.status !== "scheduled" && { scheduleDate: null }),
      })
      .eq("id", data.productId);
    if (error) {
      console.log("Product edit error", error);
    }
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/products");
  revalidatePath("/store");
}


export async function deleteProduct(data: TProducts) {
  const supabase = createClient();
  const user = await getUserSession();
  console.log("User", user);

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized access!");
  }
  try {
    const response = await supabase.from("products").delete().eq("id", data.id);

    if (response.status === 204) {
      data.images.map(async (image: string) => {
        await deleteImage(image.split("/")[4]);
      });
    }
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/products");
  revalidatePath("/store");
}

export async function setScheduledProductAsActive() {
    const supabase = createClient()
    try{
        const {error, data:scheduledProducts} =await supabase.from("products").select().eq("status","scheduled").lte("scheduledDate",new Date().toISOString())
        if(error){
            console.log("An error occured while scheduling a product.Try afgain")
            return
        }

        if (scheduledProducts.length){
            const promise = scheduledProducts.map((product)=>
            {
                return supabase.from("products").update({status:"active",scheduleDate:null}).eq("id",product.id)
            }
            )
        }

        await promise.all(promise)
    }catch(error){
        console.log(error)
    }
   revalidatePath("/dashboard/products");
   revalidatePath("/store");
}
