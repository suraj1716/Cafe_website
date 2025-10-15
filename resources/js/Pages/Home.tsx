import Hero_Banner from "@/Components/App/Hero_Banner";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PaginationProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    FireIcon,
    ArrowTrendingUpIcon,
    TagIcon,
    SparklesIcon,
    StarIcon,
    ShoppingCartIcon,
    Squares2X2Icon,
    GiftIcon,
    TicketIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import HeroCarousel from "@/Components/App/Hero_Banner";
import CountUp from "react-countup";
import Footer from "@/Components/App/Footer";
import useScrollInfo from "@/hooks/useScrollDirection";
import { ChevronUp, MessageCircle } from "lucide-react";

const iconPool = [
    FireIcon,
    ArrowTrendingUpIcon,
    TagIcon,
    SparklesIcon,
    StarIcon,
    ShoppingCartIcon,
    Squares2X2Icon,
    GiftIcon,
    TicketIcon,
    ShoppingBagIcon,
];

interface HeroBannerProps {
    id: number;
    title: string;
    subtitle: string;
    image_path: string;
    button_text?: string;
    button_link?: string;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

interface PageProps {
    banners: HeroBannerProps[];
}

const getIconByIndex = (index: number) => {
    const Icon = iconPool[index % iconPool.length];
    const colors = [
        "text-red-500",
        "text-blue-500",
        "text-green-500",
        "text-yellow-500",
        "text-green-500",
        "text-pink-500",
        "text-indigo-500",
        "text-orange-500",
    ];
    return (
        <Icon
            className={cn(
                "w-5 h-5 sm:w-6 sm:h-6",
                colors[index % colors.length]
            )}
        />
    );
};

export default function Home({
    banners, // now banners array here
}: PageProps) {
    console.log("Banners from Inertia:", banners);
    const { url } = usePage();
    const [isActive, setIsActive] = useState(false);
    const toggleExpand = () => setIsActive(!isActive);
    const [landscapeImages, setLandscapeImages] = useState<
        Record<number, string>
    >({});

   const { business } = usePage().props as {
    business?: {
        business_name:string,
      address: string;
      phone: string;
      email: string;
      hours: string;
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };

  const showScrollTop = useScrollInfo(200);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // showBar is a boolean, not a function, so we cannot call it
  };




    useEffect(() => {
        AOS.init({ duration: 800, once: true });
        setTimeout(() => {
            document.querySelectorAll(".aos-init").forEach((el) => {
                el.classList.remove("opacity-0");
            });
        }, 100);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const scrollToCategoryId = params.get("scrollToCategoryId");
        if (scrollToCategoryId) {
            document
                .getElementById(`category-group-${scrollToCategoryId}`)
                ?.scrollIntoView({ behavior: "smooth" });
        }
    }, [url]);


const features = [
  "Premium, locally roasted coffee beans",
  "Freshly baked pastries and desserts",
  "Cozy ambiance with free Wi-Fi",
  "Community events and open mic nights",
];

    return (

        <div className="overflow-x-hidden font-sans isolate">
            {/* Hero section */}
            <div className="relative z-50">
                <HeroCarousel
                    banners={(banners ?? []).map((banner) => ({
                        ...banner,
                        button_text: banner.button_text ?? "",
                        button_link: banner.button_link ?? "",
                    }))}
                />
            </div>

            {/* Services Grid */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-14 mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                            Raw Denim Heirloom Man Braid
                        </h1>
                        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
                            Blue bottle crucifix vinyl post-ironic four dollar
                            toast vegan taxidermy. Gastropub indxgo juice
                            poutine, ramps microdosing banh mi pug.
                        </p>
                        <div className="flex mt-6 justify-center">
                            <div className="w-16 h-1 rounded-full bg-yellow-500 inline-flex"></div>
                        </div>
                        <button className="flex mx-auto mt-5 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                            Explore more
                        </button>
                        <div className="lg:w-full sm:w-1/2 h-42 sm:h-300 overflow-hidden">
                            <img
                                src="/storage/home/long_banner.png"
                                alt="Explore More"
                                className="w-full h-full object-cover object-[center_80%] cursor-pointer transition-transform duration-300"
                            />
                        </div>

                        <div className="bg-yellow-400 py-5 relative -mt-20 z-10">
                            <section className="text-gray-600 body-font">
                                <div className="container px-5 mx-auto">
                                    {/* Logos */}
                                    <div className="flex flex-wrap justify-center gap-8">
                                        {/* Logo Card */}
                                        <div className="flex flex-col items-center text-center w-80 p-4 rounded-lg ">
                                            <div className="w-64 h-24 ">
                                                <img
                                                    alt="Logo 1"
                                                    className="object-contain h-full w-full"
                                                    src="/storage/home/quality.png"
                                                />
                                            </div>
                                            <h2 className="text-lg font-bold text-gray-900">
                                                Fast Service
                                            </h2>
                                            <p className="text-sm text-gray-800 mt-1">
                                                Amazing burgers made with fresh
                                                ingredients daily. Amazing
                                                burgers made with fresh
                                                ingredients daily.
                                            </p>
                                        </div>

                                        {/* Logo Card */}
                                        <div className="flex flex-col items-center text-center w-80 p-4 rounded-lg">
                                            <div className="w-48 h-24 ">
                                                <img
                                                    alt="Logo 2"
                                                    className="object-contain h-full w-full"
                                                    src="/storage/home/burger-outline.png"
                                                />
                                            </div>
                                            <h2 className="text-lg font-bold text-gray-900">
                                                Original
                                            </h2>
                                            <p className="text-sm text-gray-800 mt-1">
                                                Amazing burgers made with fresh
                                                ingredients daily. Amazing
                                                burgers made with fresh
                                                ingredients daily.
                                            </p>
                                        </div>

                                        {/* Logo Card */}
                                        <div className="flex flex-col items-center text-center w-80 p-4 rounded-lg ">
                                            <div className="w-24 h-24 ">
                                                <img
                                                    alt="Logo 3"
                                                    className="object-contain h-full w-full"
                                                    src="/storage/home/coffee.png"
                                                />
                                            </div>
                                            <h2 className="text-lg font-bold text-gray-900">
                                                Quality Foods
                                            </h2>
                                            <p className="text-sm text-gray-800 mt-1">
                                                Amazing burgers made with fresh
                                                ingredients daily. Amazing
                                                burgers made with fresh
                                                ingredients daily.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-gray-600 body-font">
      <div className="container px-5 mx-auto flex flex-wrap">
        {/* Left: Image */}
        <div className="lg:w-1/2 w-full lg:mb-0 rounded-lg overflow-hidden">
          <img
            alt="feature"
            className="object-contain object-center lg:h-[700px] w-full"
            src="/storage/home/photo_polaroid.png"
          />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col flex-wrap sm:mb-30 lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {/* Heading */}
            <motion.h2
              className="text-gray-900 text-2xl font-bold mb-3"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              The Brew Haven Café
            </motion.h2>

            {/* Paragraphs */}
            {[
              "Nestled in the heart of the city, The Brew Haven Café is a cozy retreat where coffee, creativity, and conversation blend beautifully. Step inside and be greeted by the rich aroma of freshly ground beans, warm lighting, and the gentle hum of friendly chatter.",
              "Whether you're looking to recharge, work in peace, or share a moment with friends, our café offers the perfect escape. Indulge in our Caramel Velvet Latte or Hazelnut Mocha Bliss, paired with a freshly baked pastry or our signature blueberry cheesecake.",
              "At The Brew Haven Café, we believe every sip should tell a story — one that warms your heart and brightens your day.",
            ].map((text, i) => (
              <motion.p
                key={i}
                className="leading-relaxed text-base text-gray-700 mt-3"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                {text}
              </motion.p>
            ))}

            {/* Features List */}
            <ul className="list-disc list-inside text-gray-700 mt-3 space-y-1">
              {features.map((item, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>

            {/* Learn More Link */}
            <motion.a
              className="mt-4 text-yellow-500 inline-flex items-center font-medium cursor-pointer hover:text-yellow-600 transition"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>

            <section
                className="relative bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('/storage/hero-banners/backgrounds/01K749KE17JFFWFKD32WSEYBK8.jpg')",
                }}
            >
                {/* Dark overlay */}
                {/* <div className="absolute inset-0 bg-red-700 z-0 opacity-90" /> */}
                <div className="container px-5 mx-auto">
                    <div className="flex flex-wrap -m-4 text-center">
                        {/* Happy Customers */}
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 border-white/30 px-4 py-6 rounded-lg backdrop-blur-sm">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="text-yellow-400 w-12 h-12 mb-3 inline-block"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 17l4 4 4-4m-4-5v9" />
                                    <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
                                </svg>
                                <h2 className="title-font font-bold text-3xl text-white">
                                    <CountUp
                                        end={2700}
                                        duration={10}
                                        separator=","
                                    />
                                </h2>
                                <p className="leading-relaxed text-white">
                                    Happy Customers
                                </p>
                            </div>
                        </div>

                        {/* Positive Reviews */}
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 border-white/30 px-4 py-6 rounded-lg  backdrop-blur-sm">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="text-yellow-400 w-12 h-12 mb-3 inline-block"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
                                </svg>
                                <h2 className="title-font font-bold text-3xl text-white">
                                    <CountUp
                                        end={1300}
                                        duration={2}
                                        separator=","
                                    />
                                </h2>
                                <p className="leading-relaxed text-white">
                                    Positive Reviews
                                </p>
                            </div>
                        </div>

                        {/* Awards Winning */}
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 border-white/30 px-4 py-6 rounded-lg backdrop-blur-sm">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="text-yellow-400 w-12 h-12 mb-3 inline-block"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M3 18v-6a9 9 0 0118 0v6" />
                                    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
                                </svg>
                                <h2 className="title-font font-bold text-3xl text-white">
                                    <CountUp end={704} duration={2} /> K
                                </h2>
                                <p className="leading-relaxed text-white">
                                    Awards Winning
                                </p>
                            </div>
                        </div>

                        {/* Hair Styles */}
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 border-white/30 px-4 py-6 rounded-lg backdrop-blur-sm">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="text-yellow-400 w-12 h-12 mb-3 inline-block"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                <h2 className="title-font font-bold text-3xl text-white">
                                    <CountUp end={406} duration={2} />
                                </h2>
                                <p className="leading-relaxed text-white">
                                    Hair Styles{" "}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="relative text-white py-10"
                style={{
                    // backgroundImage:
                    // "url('/storage/hero-banners/White Black Minimalist Natural Light Room Zoom Background.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "left",
                }}
            >
                {/* Dark Overlay for better contrast */}
            </section>

            {/* testimonils */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-14 mx-auto">
                    <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
                        Testimonials
                    </h1>
                    <div className="flex flex-wrap -m-4">
                        <div className="p-4 md:w-1/2 w-full">
                            <div className="h-full bg-gray-100 p-8 rounded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="block w-5 h-5 text-gray-400 mb-4"
                                    viewBox="0 0 975.036 975.036"
                                >
                                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                                </svg>
                                <p className="leading-relaxed mb-6">
                                    Synth chartreuse iPhone lomo cray raw denim
                                    brunch everyday carry neutra before they
                                    sold out fixie 90's microdosing. Tacos
                                    pinterest fanny pack venmo, post-ironic
                                    heirloom try-hard pabst authentic iceland.
                                </p>
                                <a className="inline-flex items-center">
                                    <img
                                        alt="testimonial"
                                        src="https://dummyimage.com/106x106"
                                        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                                    />
                                    <span className="flex-grow flex flex-col pl-4">
                                        <span className="title-font font-medium text-gray-900">
                                            Holden Caulfield
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            UI DEVELOPER
                                        </span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/2 w-full">
                            <div className="h-full bg-gray-100 p-8 rounded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="block w-5 h-5 text-gray-400 mb-4"
                                    viewBox="0 0 975.036 975.036"
                                >
                                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                                </svg>
                                <p className="leading-relaxed mb-6">
                                    Synth chartreuse iPhone lomo cray raw denim
                                    brunch everyday carry neutra before they
                                    sold out fixie 90's microdosing. Tacos
                                    pinterest fanny pack venmo, post-ironic
                                    heirloom try-hard pabst authentic iceland.
                                </p>
                                <a className="inline-flex items-center">
                                    <img
                                        alt="testimonial"
                                        src="https://dummyimage.com/107x107"
                                        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                                    />
                                    <span className="flex-grow flex flex-col pl-4">
                                        <span className="title-font font-medium text-gray-900">
                                            Alper Kamu
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            DESIGNER
                                        </span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



  <a
        href={`https://m.me/${business?.business_name}`} // 🔁 replace with your Messenger username
        // href="https://wa.me/+61414226056" // 🔁 replace with your whatsapp username
        target="_blank"
        rel="noopener noreferrer"
        className={` xs:mb-7 lg:right
        fixed bottom-16  md:translate-y-12  xs:left-6 z-[9999] flex items-center gap-2
         bg-yellow-400 text-green-950 px-4 py-2 rounded-full shadow-lg
       hover:bg-yellow-700 transition-all
          transform duration-500 ease-in-out
          ${
            showScrollTop
              ? "opacity-100 scale-100"
              : "opacity-0 scale-0 pointer-events-none"
          }
      `}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium text-sm">Let’s Chat</span>
      </a>

      {/* 🔼 Go To Top Button */}

      <button
        onClick={scrollToTop}
        aria-label="Go to top"
        className={` xs:mb-16
          fixed bottom-8 right-6 z-[9999]
          bg-yellow-400 text-green-950 p-3 rounded-full shadow-lg
          hover:bg-yellow-400 transition
          transform duration-500 ease-in-out
          ${
            showScrollTop
              ? "opacity-100 scale-100"
              : "opacity-0 scale-0 pointer-events-none"
          }
        `}
      >
        <ChevronUp className="w-5 h-5" />
      </button>











            <Footer />


        </div>
    );
}
