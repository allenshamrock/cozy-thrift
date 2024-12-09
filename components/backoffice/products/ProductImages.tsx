"use client";
import { getUserSession } from "@/lib/getSession";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();
// A function that takes the keys of a particular image and deletes it from the server
export async function deleteImage(key: string) {
  const user = await getUserSession();

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized access");
  }

  try {
    await utapi.deleteFiles(key);
  } catch (error) {
    console.log(error);
  }
}
