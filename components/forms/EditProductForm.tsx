"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "../backoffice/CustomInput";
import CustomTextarea from "../backoffice/CustomTextArea";
import CustomSelect from "../backoffice/CustomSelect";
import { cn } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../Button";
import ProductVariants from "../backoffice/products/ProductVariants";
import ProductImages from "../store/productDetails/ProductImages";
import { createProduct } from "@/actions/productActions";
import { TCategory, TProducts } from "@/types/supabaseTypes";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  productName: z.string().min(2, "minimum of 2 characters"),
  productDescription: z.string().min(2, "minimum of 2 characters"),
  category: z.string(),
  gender: z.string(),
  quantitry: z.string(),
  deliveryInfo: z.string(),
  sku: z.string(),
  price: z.string().min(2, "Please add a price"),
});

type PropType = {
  categories: TCategory[] | null;
  product: TProducts | null;
};

export default function EditProductForm({ categories, product }: PropType) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [selectedColor, setSelectedColor] = useState<String>(
    product?.color || ""
  );
  const [variants, setVariants] = useState<String[]>(product?.variants || []);
  const [variant, setVariant] = useState("");
  const [showVariantInput, setShowVariantInput] = useState(false);
  const [imageUrls, setImageUrls] = useState<String[]>(product?.images || []);

  const categorySelectOptions = categories
    ? categories.map((cat) => cat.name)
    : [];

  const genderOptions = ["male", "female", "unisex"];

  const colorVariant = [
    {
      name: "White",
      value: "#FFFFFF",
    },
    {
      name: "Black",
      value: "#000000",
    },
    {
      name: "Red",
      value: "#FF0000",
    },
    {
      name: "Blue",
      value: "#0000FF",
    },
    {
      name: "Yellow",
      value: "#FFFF00",
    },
    {
      name: "Gray",
      value: "#808080",
    },
    {
      name: "Green",
      value: "#008000",
    },
    {
      name: "Purple",
      value: "#800080",
    },
    {
      name: "Navy",
      value: "#000080",
    },
  ];

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: product?.name,
      productDescription: product?.description,
      category: product?.category,
      gender: product?.gender,
      quantity: product?.quantity,
      deliveryInfo: product?.deliveryInfo,
      price: product?.price,
      sku: product?.sku,
    },
  });

  const onSubmit = async (data: FieldValues) => {
    data.color = selectedColor;
    data.variants = variants;

    if (imageUrls.length < 1) {
      toast.error("Upload atleast 1 image");
      return;
    }
    data.images = imageUrls;

    const categorySlug = categories?.find(
      (cat) => cat.name === data.category
    )?.slug;
    if (categorySlug) {
      data.categorySlug = categorySlug;
      console.log(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row gap-6"
    >
      <div className="flex-1">
        <section className="w-full">
          <h1 className="text-xlx font-semibold mb-4">Description</h1>
          <div className="border border-slate-300 p-4 rounded-md">
            <CustomInput
              label="Product name"
              placeholder="Name of the Product..."
              mutedLabel
              name="productName"
              register={register}
              errors={errors}
            />
            <CustomTextarea
              label="Description"
              name="productDescription"
              placeholder="Product Description"
              mutedLabel
              register={register}
              errors={errors}
            />
          </div>
        </section>
        <section className="w-full mt-6">
          <h1 className="text-xl font-semibold mb-4">Category</h1>
          <div className="border border-slate-300 p-4 rounded-md">
            <CustomSelect
              label="Category"
              name="category"
              options={categorySelectOptions}
              mutedLabel
              register={register}
            />
            <CustomSelect
              label="Gender"
              name="gender"
              options={genderOptions}
              mutedLabel
              register={register}
            />
          </div>
        </section>
        <section className="w-full mt-6">
          <h1 className="text-xl font-semibold mb-4"> Inventory</h1>
          <div className="border border-slate-300 rounded-md p-4">
            <CustomInput
              label="Quantity"
              placeholder="In stock"
              name="quantity"
              mutedLabel
              register={register}
              errors={errors}
            />
            <CustomInput
              label="SKU(Optional)"
              placeholder="sku"
              name="sku"
              mutedLabel
              register={register}
              errors={errors}
            />
          </div>
        </section>
        <section className="w-full mt-6">
          <h1 className="text-xl font-semibold mb-4">Colors</h1>
          <div className="border border-slate-300 rounded-md p-4">
            <div className="flex flex-col gap-2 items-start flex-1">
              <p className="font-semibold text-sm text-slate-500">
                Select available color
              </p>
              <div className="flex flex-wrap justify-center gap-2 items-center mt-3">
                {colorVariant.map((color) => {
                  const isSelected = selectedColor === color.value;
                  return (
                    <div
                      className={cn(
                        "w-16 py-2 border-2 hover:border-primary rounded grid place-items-center cursor-pointer",
                        isSelected ? "border-primary" : ""
                      )}
                      onClick={() =>
                        setSelectedColor((prev) =>
                          color.value === prev ? "" : color.value
                        )
                      }
                      key={color.name}
                    >
                      <p
                        className={cn(
                          "mb-2 text-sm",
                          isSelected ? "font-bold" : "font-medium"
                        )}
                      >
                        {color.name}
                      </p>
                      <div
                        className="aspect-square w-6 rounded-full border border-gray-400"
                        style={{ background: `${color.value}` }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <ProductVariants
          variant={variant}
          setVariant={setVariant}
          variants={variants}
          setVariants={setVariants}
          showVariantInput={showVariantInput}
          setShowVariantInput={setShowVariantInput}
        />
      </div>
      <div className="flex-1">
        <ProductImages imageUrls={imageUrls} setImageUrls={setImageUrls} />
        <section className="w-full mt-6">
          <h1 className="text-xl font-semibold mb-4">Shopping and Delivery</h1>
          <div className="border border-slate-300 p-4 rounded-md">
            <CustomTextarea
              label="Free delivery(Optional)"
              name="deliveryInfo"
              placeholder="Free delivery around CBD & environs"
              mutedLabel
              register={register}
              errors={errors}
            />
          </div>
        </section>
        <section className="w-full mt-6 ">
          <h1 className="text-xl font-semibold mb-4">Pricing</h1>
          <div className="border border-slate-300 p-4 rounded-md">
            <CustomInput
              label="price"
              placeholder="eg:3500"
              name="price"
              mutedLabel
              isPrice
              register={register}
              errors={errors}
            />
          </div>
        </section>
        <div className="w-full flex">
          <Button
            loading={loading}
            disabled={loading}
            label={loading ? "Please wait..." : "Add Product"}
            solid
            className="border rounded bg-secondary border-none px-3 py-2 mt-4 ml-auto"
          />
        </div>
      </div>
    </form>
  );
}
