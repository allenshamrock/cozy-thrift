import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { createClient } from "@/lib/supabase/server";
import { setScheduledProductAsActive } from "@/actions/productActions";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import "./globals.css";
const dmsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cozy thrift",
  description: "Ecommerce store ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("status", "scheduled");
  if (data?.length) await setScheduledProductAsActive();

  return (
    <html lang="en">
      <body className={dmsans.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
