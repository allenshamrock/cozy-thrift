// import { getUserSession } from "@/lib/getSession";
// import Footer from "@/components/Footer";
import Categories from "@/components/landing-page/Categories";
import Hero from "@/components/landing-page/Hero";
import InfoCards from "@/components/landing-page/InfoCards";
import NewArrivals from "@/components/landing-page/NewArrivals";
import SummerSale from "@/components/landing-page/SummerSale";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data: categories, error } = await supabase
    .from("categories")
    .select();
    console.log("Categories:", categories);
  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
  return (
    <div className="">
      <Hero />
      <Categories categories={categories} />
      <NewArrivals />
      <InfoCards />
      <SummerSale />
      {/* <Footer /> */}
    </div>
  );
}
