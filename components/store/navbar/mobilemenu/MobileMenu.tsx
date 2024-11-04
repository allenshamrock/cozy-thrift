"use client";
import { useState } from "react";
import { Key, LogIn, LogOut, MenuSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { TCategory } from "@/types/supabaseTypes";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "@/components/Button";

type ProtoType = { user: User | null; categories: TCategory[] | null };

export default function MobileMenu({ user, categories }: ProtoType) {
  const [showNav, setShowNav] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  const handleCategory = (value: string | null) => {
    let currentQuerry = {};

    if (params) {
      currentQuerry = queryString.parse(params.toString());
      console.log("current query", currentQuerry);
    }

    const updatedQuery: any = {
      ...currentQuerry,
      categorySlug: value,
      page: null,
    };

    if (params?.get("categorySlug") === value) {
      delete updatedQuery.categorySlug;
    }

    const url = queryString.stringifyUrl(
      { url: "/store", query: updatedQuery },
      { skipNull: true }
    );
    router.push(url);
    setShowNav(false);
  };

  return (
    <>
      <div className="md:hidden" onClick={() => setShowNav(true)}>
        <MenuSquare className="w-5 h-5 text-muted-foreground cursor-pointer" />
      </div>
      <nav
        className={cn(
          "md:hidden absolute-[80%] bg-white shadow-md h-screen top-0 p-2 border-l transition",
          !showNav && "translate-x-[100%]"
        )}
      >
        <button onClick={() => setShowNav(false)}>
          <X className="w-5 h-5 cursor-pointer" />
        </button>
        <div className="flex flex-col h-full justify-between">
          <div className="my-2">
            {categories &&
              categories.map((cat) => {
                return (
                  <button
                    onClick={() => handleCategory(cat?.slug)}
                    key={cat.id}
                    className={cn(
                      "px-2 pt-4 text-left rounded-md block w-full uppercase font-lighthover:underline transition-smooth",
                      params.get("categories") === cat.slug && " bg-slate-100"
                    )}
                  >
                    {cat.name}
                  </button>
                );
              })}
          </div>
          <div className="mb-[50px]">
            {user ? (
              <button className="text-sm text-white w-full rounded px-3 py-2  bg-secondary hover:shadow transition-smooth flex gap-1 justify-center items-center">
                <LogOut className="w-5 h-5" />
                Log Out
              </button>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" solid label="Sign in" />
                </DialogTrigger>
                <DialogContent>
                  <DialogDescription>
                    You can log in as a new user if you already have an account
                    or sign up if not or log in as John doe for quick demo.
                  </DialogDescription>
                  <DialogHeader>
                    <div className="flex items-end gap-3 justify-center">
                      <DialogClose asChild>
                        <Link
                          onClick={() => setShowNav(false)}
                          className="bg-primary px-3 pt-2 rounded  shodow-sm text-sm text-white font-semibold"
                          href="/signin"
                        >
                          Log in
                        </Link>
                      </DialogClose>
                      <DialogClose>
                        <Link
                          onClick={() => setShowNav(false)}
                          className="bg-primary px-3 pt-2 rounded  shodow-sm text-sm text-white font-semibold"
                          href="/signin?role=user"
                        >
                          Log in as John Doe
                        </Link>
                      </DialogClose>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
