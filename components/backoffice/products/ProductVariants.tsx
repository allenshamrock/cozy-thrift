"use client";
import { Plus, X } from "lucide-react";
import { SetStateAction, Dispatch } from "react";

type PropType = {
  showVariantInput: boolean;
  setShowVariantInput: Dispatch<SetStateAction<boolean>>;
  variant: string;
  setVariant: Dispatch<SetStateAction<string>>;
  variants: String[];
  setVariants: Dispatch<SetStateAction<String[]>>;
};

export default function ProductVariants({
  showVariantInput,
  setShowVariantInput,
  variant,
  setVariant,
  variants,
  setVariants,
}: PropType) {
  const addVariant = () => {
    if (!variant) return;
    setVariants((prev) => [variant, ...prev]);
    setVariant("");
  };

  return (
    <section className="w-full mt-6">
      <h1 className="text-xl font-semibold mb-4 ">Variants</h1>
      <div className="border border-slate-300 rounded-md p-4">
        <div className="flex justify-between items-center mb-3">
          <p className="font-medium">Product Variant</p>
          <button
            className="text-primary text-sm flex gap-1 items-center font-semibold"
            onClick={() => setShowVariantInput((prev) => !prev)}
          >
            <Plus className="w-4 h-4 " /> <span>Add variants</span>
          </button>
        </div>
        {showVariantInput && (
          <div className="bg-white gap-2 flex items-center">
            <input
              type="text"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className="border border-slate-300 rounded h-9 px-2 w-full hover:shadow-md hover:border-primary/40  focus:outline-none "
              placeholder="e.g: 34, 41 for shoes or White XXL for clothes..."
            />
            <button
              disabled={!variant}
              onClick={addVariant}
              className="disabled:opacity-50 bg-primary rounded px-3 h-9 text-white"
            >
              Add
            </button>
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          {variants.length > 0 &&
            variants.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-secondary/20 rounded-full px-3 py-1 mt-3"
                >
                  <button
                    onClick={() =>
                      setVariants((prev) =>
                        prev.filter((variant) => variant !== item)
                      )
                    }
                    type="button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="text-secondary/60 font-semibold text-xs capitalize">
                    {item}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
