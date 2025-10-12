import React from "react";
import { usePage, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { motion } from "framer-motion";

interface GalleryImage {
  id: number;
  url: string;
}

interface GalleryItem {
  id: number;
  title: string;
  images: GalleryImage[];
}

interface PageProps {
  galleryItems: GalleryItem[];
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "New Gallery",
    images: [
      { id: 1, url: "http://localhost/storage/2/01K7BMX9Q2W7CD3DXA670WEM8X.jpg" },
      { id: 2, url: "http://localhost/storage/3/01K7BMXA453VM0RBKEG2EZZAY6.jpg" }
    ]
  }
];
export default function Gallery() {
//   const { galleryItems } = usePage<PageProps>().props;

  if (!galleryItems || galleryItems.length === 0) {
    return (
      <AuthenticatedLayout>
        <Head title="Gallery" />
        <p className="text-center text-gray-500 py-12">No gallery items available.</p>
      </AuthenticatedLayout>
    );
  }

  return (
    <>
      <Head title="Gallery" />
      <AuthenticatedLayout>
        <section className="w-full py-12">
          <h2 className="text-4xl font-semibold mb-12 text-center font-serif">Gallery</h2>
{/* <img src={image.url} alt="gallery" /> */}
          {galleryItems.map((gallery) => (
            <div key={gallery.id} className="mb-20 px-4 md:px-8 lg:px-12">
              <h3 className="text-2xl font-bold mb-6">{gallery.title}</h3>

              {gallery.images.length === 0 ? (
                <p className="text-center text-gray-500">No images for this gallery.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[280px]">
                  {gallery.images.map((image) => (
                    <motion.div
                      key={image.id}
                      className="overflow-hidden rounded-lg shadow-md relative"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      whileHover={{ scale: 1.03 }}
                    >
<img
  src={image.url}
  alt={`Gallery Image ${image.id}`}
  className="w-full h-full object-cover rounded-lg"
  loading="lazy"
  draggable={false}
/>

                      <img
                        src={image.url}
                        alt={`Gallery Image ${image.id}`}
                        className="w-full h-full object-cover rounded-lg"
                        draggable={false}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      </AuthenticatedLayout>
    </>
  );
}
