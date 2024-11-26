import ProductImages from "@/components/store/productDetails/ProductImages";
import React from "react";
import { createClient } from "@/lib/supabase/server";
import { getUserSession } from "@/lib/getSession";
import Details from "@/components/store/productDetails/Details";
import Products from "@/components/store/products/Products";

export default async function page({
  params: { id },
}: {
  params: { id: number };
}) {
  const supabase = createClient();

  const [productsData, reviewsData] = await Promise.all([
    supabase.from("products").select().eq("id", id).single(),
    supabase.from("reviews").select().eq("productId", id),
  ]);

  //check if current user has bought the product before
  const user = await getUserSession();
  const { data: boughtProducts } = await supabase
    .from("orderProduct")
    .select()
    .match({ status: "completed", buyerId: user?.id, productId: id });

  const { data: relatedProduct } = await supabase
    .from("products")
    .select()
    .eq("categorySlug", productsData.data?.categorySlug as string)
    .eq("status", "active")
    .neq("id", id);

  return (
    <div className="container mt-[5rem]">
      <section className="flex flex-col lg:flex-row gap-9">
        <ProductImages images={productsData.data?.images || []} />
        <Details
          reviews={reviewsData.data}
          product={productsData.data}
          hasBoughtProduct={boughtProducts && boughtProducts?.length > 0}
        />
      </section>
      <section className="my-4 md:my-[6rem]">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3">
          Similar items you might like
        </h1>
        <Products products={relatedProduct} />
      </section>
    </div>
  );
}
