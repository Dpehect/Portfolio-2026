"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Homepage = () => {
  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 py-6 lg:py-0 gap-8 lg:gap-0">
        {/* IMAGE CONTAINER */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto lg:h-full lg:w-1/2">
          <Image
            src="/user_hero.png"
            alt="Hero"
            fill
            className="object-contain lg:-translate-x-16"
            priority
          />
        </div>
        {/* TEXT CONTAINER */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6 md:gap-8 items-center lg:items-start justify-center text-center lg:text-left pb-8 lg:pb-0">
          {/* TITLE */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl">
            Crafting Digital Experiences, Designing Tomorrow.
          </h1>
          {/* DESC */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl">
            Welcome to my digital canvas, where innovation and creativity
            converge. With a keen eye for aesthetics and a mastery of code, my
            portfolio showcases a diverse collection of projects that reflect my
            commitment to excellence.
          </p>
          {/* BUTTONS */}
          <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start max-w-xl">
            <button className="px-5 py-3 rounded-lg ring-1 ring-black bg-black text-white">
              View My Work
            </button>
            <button className="px-5 py-3 rounded-lg ring-1 ring-black">
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Homepage;
