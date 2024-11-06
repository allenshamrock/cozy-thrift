"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "../Button";

export default function Hero() {
  <section className="mt-16 contain">
    <motion.h1
      initial={{ y: -"-200px", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ style: "spring" }}
      className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl  xl:tracking-[1.52rem] lg:tracking-[.7rem] sm:tracking-[.4rem] tracking-tight text-center font-normal mt-10 mb-4 text-primary"
    >
      UNMATCHED FASHION ESSENTIALS
    </motion.h1>
    <div className="h-[85vh] sm:h-[70vh] md:h-[50vh] lg:h-[70vh] flex flex-col sm:flex-row items-center ">
      {/* Men section */}
      <div className="realtive overflow-hidden w-full group h-full transition">
        <motion.div
          whileInView={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 6,
            ease: "backInOut",
          }}
          className="absolute inset-0 w-full h-full bg-slate-100"
        >
          <Image
            className="object-top object-cover"
            src="/preme.jpeg"
            alt="supreme"
            fill
          />
        </motion.div>
        {/* 2nd image */}
        <motion.div
          whileInView={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 6,
            ease: "backInOut",
          }}
          className="absolute inset-0 w-full h-full bg-slate-100"
        >
          <Image
            className="object-top object-cover"
            src="/sup.jpeg"
            alt="supreme"
            fill
          />
        </motion.div>
        {/* 3rd image */}
        <motion.div
          whileInView={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 6,
            ease: "backInOut",
          }}
          className="absolute inset-0 w-full h-full bg-slate-100"
        >
          <Image
            className="object-top object-cover"
            src="/supreme.jpeg"
            alt="supreme"
            fill
          />
        </motion.div>
        <div className="flex flex-col justify-center items-center gap-3  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-center text-xl text-white font-bold tracking-wider">
            MEN
          </h2>
          <Link href="/store">
            <Button
              label="SHOP NOW"
              className="rounded-md px-8 bg-white text-primary border-none text-xs font-bold "
            />
          </Link>
        </div>
      </div>
      {/* Women */}
      <div className="w-full h-full contain group relative overflow-hidden transition">
        <motion.div
          whileInView={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 6,
            ease: "backInOut",
          }}
          className="absolute inset-0 w-full h-full bg-slate-100"
        >
          <Image
            className="object-top object-cover"
            src="/bape.jpeg"
            alt="bape"
            fill
          />
        </motion.div>
        {/* 2nd image */}
        <motion.div
          whileInView={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 6,
            ease: "backInOut",
          }}
          className="absolute inset-0 w-full h-full bg-slate-100"
        >
          <Image
            className="object-top object-cover"
            src="/nike.jpeg"
            alt="nike"
            fill
          />
        </motion.div>
        {/* 3rd image */}
        <motion.div
          whileInView={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 6,
            ease: "backInOut",
          }}
          className="absolute inset-0 w-full h-full bg-slate-100"
        >
          <Image
            className="object-top object-cover"
            src="/metallica.jpeg"
            alt="metallica"
            fill
          />
        </motion.div>
        <div className="flex flex-col justify-center items-center gap-3  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-center text-xl text-white font-bold tracking-wider">
            WOMEN
          </h2>
          <Link href="/store">
            <Button
              label="SHOP NOW"
              className="rounded-md px-8 bg-white text-primary border-none text-xs font-bold "
            />
          </Link>
        </div>
      </div>
    </div>
  </section>;
}
