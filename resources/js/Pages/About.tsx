import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { motion } from "framer-motion";
import { Coffee, Heart, Users, Leaf } from "lucide-react";

export default function About() {
  return (
    <>
      <Head title="About Us" />

      <AuthenticatedLayout>
        {/* Hero Section */}

        <div  className="relative min-h-screen font-sans text-gray-900"
         style={{
            backgroundImage: "url('/storage/menu/cafe-bg1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
        <section
          className="relative flex items-center justify-center h-[30vh]  text-white"
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
            <h1 className="text-5xl font-bold mb-4 tracking-wide">Our Story</h1>
            <p className="text-lg max-w-2xl mx-auto text-gray-200">
              From humble beginnings to your favorite cup — discover how our passion for coffee and community began.
            </p>
          </motion.div>
        </section>

        {/* Story Section */}
        <section className=" p-10 text-gray-800">
          <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-start py-16 gap-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 mr-10"
            >
              <img
                src="/storage/about/coffee-enjoy.jpg"
                alt="Our Café"
                className="rounded-2xl w-full h-[500px] sm:h-[250px] md:h-[500px] object-cover object-center"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 space-y-4 mt-4"
            >
              <h2 className="text-3xl font-bold text-[#5C4033]">Brewing Since 2008 ☕</h2>
              <p className="text-gray-700 leading-relaxed">
                Our journey started with a simple dream — to bring authentic, freshly roasted coffee to our neighborhood.
                Every bean we brew carries our story of dedication, warmth, and a deep love for community.
                Our journey started with a simple dream — to bring authentic, freshly roasted coffee to our neighborhood.
                Every bean we brew carries our story of dedication, warmth, and a deep love for community.
                Our journey started with a simple dream — to bring authentic, freshly roasted coffee to our neighborhood.
                Every bean we brew carries our story of dedication, warmth, and a deep love for community.
                Our journey started with a simple dream — to bring authentic, freshly roasted coffee to our neighborhood.
                Every bean we brew carries our story of dedication, warmth, and a deep love for community.
              </p>
              <p className="text-gray-600">
                We’ve grown into a cozy space where people connect, relax, and share moments over a cup of coffee.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-4 ">
          <div className="max-w-6xl mx-auto text-center px-6">
            <h2 className="text-3xl font-bold py-10 text-[#5C4033]">Our Core Values</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { icon: <Coffee className="w-10 h-10 text-orange-600" />, title: "Quality Coffee", desc: "Only the finest beans, roasted to perfection." },
                { icon: <Heart className="w-10 h-10 text-orange-600" />, title: "Passion", desc: "Every cup we make is brewed with love." },
                { icon: <Leaf className="w-10 h-10 text-orange-600" />, title: "Sustainability", desc: "We support ethical and eco-friendly sourcing." },
                { icon: <Users className="w-10 h-10 text-orange-600" />, title: "Community", desc: "Creating a place where everyone belongs." },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#FFF9F5] p-8 rounded-2xl  hover:shadow-lg transition-all"
                >
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="font-semibold text-lg mb-2 text-[#5C4033]">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto text-center px-6">
            <h2 className="text-3xl font-bold mb-14 text-[#5C4033]">Meet Our Team</h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
              {[
                { name: "Emma Johnson", role: "Founder", img: "/storage/team1.jpg" },
                { name: "Liam Brown", role: "Head Barista", img: "/storage/team2.jpg" },
                { name: "Sophia Lee", role: "Chef", img: "/storage/team3.jpg" },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-40 h-40 mx-auto mb-5">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover shadow-lg"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-[#5C4033]">{member.name}</h3>
                  <p className="text-orange-600 text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
