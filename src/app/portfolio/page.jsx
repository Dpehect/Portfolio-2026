"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import projectsJson from "../../../portfolio/src/content/projects/projects.json";

const items = projectsJson.map((project, idx) => ({
  id: idx + 1,
  color: project.color || "from-blue-300 to-violet-300",
  title: project.content.en.title,
  desc: project.content.en.previewDescription || project.content.en.description,
  img: project.img || "/user_hero.png",
  link: project.content.en.live || project.content.en.source || "#",
  tags: project.content.en.tags || []
}));

const PortfolioPage = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(items.length / (items.length + 1)) * 100}%`]);

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="relative lg:h-[600vh]" ref={ref}>
        <div className="lg:hidden px-4 sm:px-8 md:px-12 py-10 sm:py-14 flex flex-col gap-8">
          <div className="flex items-center justify-center text-center text-4xl sm:text-6xl font-bold">
            My Works
          </div>
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-3xl bg-white/70 shadow-xl backdrop-blur-sm">
                <div className={`bg-gradient-to-r ${item.color} p-5 sm:p-6 text-white`}> 
                  <h1 className="text-2xl sm:text-3xl font-bold">{item.title}</h1>
                </div>
                <div className="p-5 sm:p-6 flex flex-col gap-4">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image src={item.img} alt={item.title} fill className="object-cover" />
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                    {item.desc}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 bg-black/10 text-gray-800 text-xs rounded font-semibold uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link href={item.link} className="flex justify-start">
                    <button className="px-4 py-3 text-sm bg-black text-white font-semibold rounded-lg">
                      See Demo
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex w-screen h-[calc(100vh-6rem)] items-center justify-center text-6xl xl:text-8xl text-center">
          My Works
        </div>
        <div className="hidden lg:block sticky top-0 flex h-screen gap-4 items-center overflow-hidden">
          <motion.div style={{ x }} className="flex">
            <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-red-300" />
            {items.map((item) => (
              <div
                className={`h-screen w-screen flex items-center justify-center bg-gradient-to-r ${item.color}`}
                key={item.id}
              >
                <div className="flex flex-col gap-8 text-white">
                  <h1 className="text-xl font-bold md:text-4xl lg:text-6xl xl:text-8xl">
                    {item.title}
                  </h1>
                  <div className="relative w-80 h-56 md:w-96 md:h-64 lg:w-[500px] lg:h-[350px] xl:w-[600px] xl:h-[420px]">
                    <Image src={item.img} alt="" fill />
                  </div>
                  <p className="w-80 md:w96 lg:w-[500px] lg:text-lg xl:w-[600px]">
                    {item.desc}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 w-80 md:w-96 lg:w-[500px] xl:w-[600px]">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm rounded font-semibold uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link href={item.link} className="flex justify-end">
                    <button className="p-2 text-sm md:p-4 md:text-md lg:p-8 lg:text-lg bg-white text-gray-600 font-semibold m-4 rounded">See Demo</button>
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="w-full min-h-screen flex flex-col gap-10 sm:gap-12 lg:gap-16 items-center justify-center text-center px-4 sm:px-8 md:px-12 py-16 lg:py-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl max-w-4xl leading-tight">
          Do you have a project?
        </h1>
        <div className="relative">
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            viewBox="0 0 300 300"
            className="w-56 h-56 sm:w-64 sm:h-64 md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px]"
          >
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
              />
            </defs>
            <text fill="#000">
              <textPath xlinkHref="#circlePath" className="text-xl">
                Front-end Developer and UI Designer
              </textPath>
            </text>
          </motion.svg>
          <Link
            href="/contact"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 absolute top-0 left-0 right-0 bottom-0 m-auto bg-black text-white rounded-full flex items-center justify-center text-sm sm:text-base"
          >
            Hire Me
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
