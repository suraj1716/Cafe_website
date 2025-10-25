import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, scale } from "framer-motion";
import { router } from "@inertiajs/react";
import { title } from "process";
import Navbar from "./Navbar";

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
  image_path: string;
  is_active: boolean;
  background_image_path?: string;
}

interface HeroCarouselProps {
  banners: Banner[];
}

const ZOOM_DURATION = 10_000; // 10 seconds



function HeroBanner({
  title,
  subtitle,
  image_path,
  button_text,
  button_link,
  background_image_path
}: Banner) {
console.log("banner:", title, subtitle, image_path, button_text, button_link);


 return (
  <motion.section
    className="relative w-full min-h-screen overflow-hidden text-gray-600 font-montserrat flex flex-col md:flex-row items-center justify-between"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
  >
    <Navbar />

    {/* Background Image */}
    <motion.div
      className="absolute inset-0 bg-center bg-cover bg-no-repeat z-0"
      style={{
        backgroundImage: `url(${background_image_path || image_path})`,
      }}
      initial={{ scale: 1 }}
      animate={{ scale: 1.05 }}
      exit={{ scale: 1.02 }}
      transition={{ duration: ZOOM_DURATION / 1000, ease: "easeInOut" }}
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/20 z-10" />

    {/* Content Section */}
 <div className="relative z-20 container mx-auto flex flex-col-reverse md:flex-row px-5 py-24 items-center">
  {/* Left: Text */}
  <motion.div
    className="flex flex-col items-center text-center md:items-start md:text-left mb-10 md:mb-0 md:w-1/2 lg:pr-24 md:pr-16"
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1 }}
  >
    <h1 className="title-font font-funky font-bold text-white drop-shadow-md mb-4 text-5xl sm:text-7xl md:text-6xl lg:text-7xl">
      {title}
    </h1>

    <p className="mb-8 text-gray-100 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl">
      {subtitle}
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
      <motion.button
        type="button"
        onClick={() => router.visit(button_link)}
        className="inline-flex text-black bg-yellow-400 border-0 py-2 px-6 font-semibold hover:bg-yellow-500 rounded-lg text-base sm:text-lg w-full sm:w-auto justify-center"
        whileHover={{ scale: 1.05 }}
      >
        {button_text || "Learn More"}
      </motion.button>

      <motion.button
        onClick={() =>
          window.scrollBy({ top: 550, behavior: "smooth" })
        }
        className="inline-flex text-gray-100 bg-transparent border border-white/60 py-2 px-6 hover:bg-white/10 rounded-lg text-base sm:text-lg w-full sm:w-auto justify-center"
        whileHover={{ scale: 1.05 }}
      >
        About Us
      </motion.button>
    </div>
  </motion.div>

  {/* Right: Image */}
  <motion.div
    className="w-full md:w-1/2 lg:max-w-lg mb-10 md:mb-0 flex justify-center"
    initial={{ opacity: 0, x: 40, scale: 1.05 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    transition={{ duration: 1 }}
  >
    <img
      className="object-cover object-center rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-full"
      alt={title}
      src={image_path}
    />
  </motion.div>
</div>

  </motion.section>
);

}

export default function HeroCarousel({ banners }: HeroCarouselProps) {
  const activeBanners = banners.filter((b) => b.is_active);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeBanners.length);
    }, ZOOM_DURATION);

    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) return null;

  return (
    <div className="relative w-full min-h-screen overflow-hidden z-[15]">

      <AnimatePresence initial={false}>
        <HeroBanner
          key={activeBanners[activeIndex].id}
          {...activeBanners[activeIndex]}
        />
      </AnimatePresence>
    </div>
  );
}
