import Link from "next/link";
import Button from "../Button";
import Image from "next/image";

export default function SummerSale() {
  return (
    <section className="contain mt-10  sm:mt-20 mb-10 h-[30rem] sm:h-[20rem] flex flex-col items-center sm:flex-row mx-2 md:mx-4">
      <div className="relative w-full h-full">
        <Image
          src="/jerz.jpeg"
          alt="jersey"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="w-full h-full bg-primary  flex  flex-col justify-center text-white p-4">
        <h3 className="text-xs font-semibold opacity-80">LIMITTED OFFER </h3>
        <p className="text-2xl md:text-3xl font-bold mt-3 mb-8 capitalize">
          Summer sale - Up to 30% <br /> off all products
        </p>
        <Link href="/store">
          <Button
            label="SHOP NOW"
            className="px-8 rounded-none bg-white text-primary border-none text-xs font-bold"
          />
        </Link>
      </div>
    </section>
  );
}
