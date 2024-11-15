import ProductsCard from "./ProductCard";
import ProductsPagination from "./ProductsPagination";
import { TProducts } from "@/types/supabaseTypes";

type PropType = {
  products: TProducts | null;
  noOfpages?: number;
  page?: number | undefined;
};

export default function Products({ products, noOfpages, page }: PropType) {
  return (
    <div className="md:col-span-4">
      {products && products?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 ">
          {products?.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-xs font-semibold">Nothing to see here!</div>
      )}
      {page && <ProductsPagination noOfPages={noOfpages} page={page} />}
    </div>
  );
}
