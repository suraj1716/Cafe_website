import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { motion } from "framer-motion";
import { PageProps } from "@/types";

interface GalleryImage {
  id: number;
  url: string;
}

interface GalleryCategory {
  id: number;
  title: string;
  images: GalleryImage[];
}

export default function Gallery() {
  const { galleryItems } = usePage<PageProps<{ galleryItems: GalleryCategory[] }>>().props;
console.log("Gallery items:");
  return (
    <>
      <Head title="Gallery" />
      <AuthenticatedLayout>
        {/* Background Wrapper */}
        <div
          className="relative min-h-screen font-sans text-gray-900"
          style={{
            backgroundImage: "url('/storage/menu/cafe-bg1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Hero Section */}
          <section
            className="relative flex items-center justify-center h-[30vh] text-white"
            style={{
              backgroundImage: "url('/storage/menu/cafe-bg1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 text-center px-6"
            >
              <h1 className="text-5xl font-bold mb-4 tracking-wide">Our Gallery</h1>
              <p className="text-lg max-w-2xl mx-auto text-gray-200">
                Explore moments, memories, and craftsmanship — one picture at a time.
              </p>
            </motion.div>
          </section>

          {/* Gallery Content */}
          <div className="max-w-7xl mx-auto py-16 px-6">
            {galleryItems && galleryItems.length > 0 ? (
              galleryItems.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="mb-16"
                >
                  {/* Category Title */}
                  <h2 className="text-3xl font-semibold text-[#5C4033] mb-6 border-l-4 border-[#5C4033] pl-4">
                    {category.title}
                  </h2>

                  {/* Responsive Image Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {category.images.map((image) => (
                      <motion.div
                        key={image.id}
                        className="overflow-hidden rounded-2xl shadow-sm bg-white"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={image.url}
                          alt={category.title}
                          className="w-full h-48 sm:h-40 md:h-56 lg:h-60 object-cover object-center transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-600 py-16">No gallery images available.</p>
            )}
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
