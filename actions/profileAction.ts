"use server";
import { getUserSession } from "@/lib/getSession";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";

export async function createProfile(data: {
  firstName: string;
  lastName: string;
  userId: string;
}) {
  const supabase = createClient();
  const { error } = await supabase
    .from("profiles")
    .upsert({
      id: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      updated_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    console.log("Profile create error", error);
    redirect(`/signup?message=${error.message}`);
  }
}

export async function editProfile(profileDetails: FieldValues) {
  const supabase = createClient();
  const user = await getUserSession();

  if (!user) {
    return {
      message: "Unauthorized access",
    };
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      phone: profileDetails.phone,
      zipcode: profileDetails.zipcode,
      city: profileDetails.city,
      address: profileDetails.address,
    })
    .eq("id", user.id);

  if (error) {
    console.log("[update_profile]", error);
    return {
      message: "Something went wrong",
      success: "false",
    };
  }
  revalidatePath("/checkout");
  return {
    message: "Delivery information updated successfully",
    success: "true",
  };
}
