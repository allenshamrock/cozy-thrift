import ProductsCard from "./ProductCard";
import ProductsPagination from "./ProductsPagination";
import { TProducts } from "@/types/supabaseTypes";

type PropType = {
  products: TProducts | null;
  page?: number | undefined;
  noOfPages?: number;
};

export default function Products({ products, noOfPages, page }: PropType) {
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
      <>
        {/* {console.log("pagination props:", { noOfPages, page })} */}
        {page && <ProductsPagination noOfPages={noOfPages} page={page} />}
      </>
    </div>
  );
}
