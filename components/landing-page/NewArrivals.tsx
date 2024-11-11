import Link from "next/link";
import Button from "../Button";
import Image from "next/image";

export default function NewArrivals() {
  return (
    <section className="mt-[16rem] sm:mt-[18rem] mb-10 sm:mb-20 max-w-[60rem] mx-auto px-2 flex gap-10 sm:gap-6 flex-col sm:flex-row ">
      <div className="flex flex-col w-full">
        <div className="bg-slate-100">
          <Image
            src="/nascar.jpeg"
            alt="nascar"
            width={500}
            height={1000}
            className="object-cover object-center transition h-[25rem] w-full"
           
          />
        </div>
        <div className="sm:mt-4 mb-2 sm:mb-0 max-sm:-order-1 ">
          <h2 className="font-extralight text-sm">REDIFINE YOUR CLOSET</h2>
          <p className="text-sm mt-2 opacity-70">
            Step into fashion world that make statement pieces that turn heads
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col gap-2 sm:gap-4 mb-4 ">
          <h2 className="text-sm font-extrabold">NEW COLLECTION</h2>
          <p className="font-semibold font-2xl">
            Best graphic shirts <br /> and tracksuits for everyone!
          </p>
          <p className="text-sm opacity-70">
            Our clothing store offers an exquisite collection of high-quality
            apparel designed to meet diverse tastes and styles. From
            sophisticated evening wear to everyday essentials, each piece is
            carefully curated to help you discover and express your unique
            personality. With a range that balances elegance, comfort, and
            modern trends, our store provides an effortless shopping experience
            tailored to elevate your wardrobe.
          </p>
          <Link href="/store">
            <Button
              label="SHOP NOW"
              className="rounded-none px-8 border bg-white text-xs text-primary font-bold"
            />
          </Link>
        </div>
        <Image
          src="/honda.jpeg"
          alt="honda"
          width={500}
          height={1000}
          className="h-[25rem] object-cover object-top sm:h-[18rem] w-full mt-4"
      
        />
      </div>
    </section>
  );
}
