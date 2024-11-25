"use server";
import { getUserSession } from "@/lib/getSession";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type PropType = {
  rating: number;
  comment: string;
  productId: number;
};

export async function createReview({ rating, comment, productId }: PropType) {
  if (!rating || !comment) {
    return {
      error: "No rating or comment",
      status: 400,
      success: false,
    };
  }

  const user = await getUserSession();
  if (!user) {
    return {
      error: "Unauthorized access",
      status: 401,
      success: false,
    };
  }

  const supabase = createClient();
  const { error } = await supabase
    .from("reviews")
    .insert({
      rating,
      comment,
      username: `${user.firstname} ${user.lastname}`,
      productId,
    });
  if (error) {
    return {
      error: "Internal server error",
      status: 500,
      success: false,
    };
  }
  revalidatePath(`/product/${productId}`);

  return {
    error: null,
    status: 201,
    success: true,
  };
}
