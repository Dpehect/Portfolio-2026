"use client";

import { AnimatePresence } from "framer-motion";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const TransitionProvider = ({ children }) => {
  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div
        key={pathName}
        className="w-full min-h-screen overflow-x-hidden bg-gradient-to-b from-blue-100 to-red-100"
      >
        <motion.div
          className="h-screen w-screen fixed bg-black rounded-b-[48px] sm:rounded-b-[100px] z-40"
          animate={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          className="hidden sm:block fixed m-auto top-0 bottom-0 left-0 right-0 text-white text-4xl md:text-6xl lg:text-8xl cursor-default z-50 w-fit h-fit px-4 text-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {pathName.substring(1)}
        </motion.div>
        <motion.div
          className="h-screen w-screen fixed bg-black rounded-t-[48px] sm:rounded-t-[100px] bottom-0 z-30"
          initial={{ height: "140vh" }}
          animate={{ height: "0vh", transition: { delay: 0.5 } }}
        />
        <div className="h-16 sm:h-20 md:h-24">
          <Navbar />
        </div>
        <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)]">
          {children}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default TransitionProvider;
