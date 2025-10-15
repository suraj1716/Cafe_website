import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { motion } from "framer-motion";
import { PageProps } from "@/types";
import { Coffee, Heart, Users, Leaf } from "lucide-react";

export default function Contact() {
  const { departments: rawDepartments, contactReasons } = usePage<PageProps>().props;

  const reasons = [
    { value: "", label: "Select reason" },
    ...((contactReasons as { value: string; label: string }[]) || []),
  ];

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    reason: "",
    department: "",
    category: "",
    product: "",
    quantity: "",
    file: null as File | null,
    message: "",
  });

  const isGettingQuote = data.reason === "getting_quote";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData("file", e.target.files?.[0] ?? null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/contact", {
      forceFormData: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <>
      <Head title="About Us" />
      <AuthenticatedLayout>
        {/* Background Wrapper */}
         <div  className="relative min-h-screen font-sans text-gray-900"
         style={{
            backgroundImage: "url('/storage/menu/cafe-bg1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
          {/* Hero Section */}
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
              <h1 className="text-5xl font-bold mb-4 tracking-wide">Contact Us</h1>
              <p className="text-lg max-w-2xl mx-auto text-gray-200">
                We'd love to hear from you! Whether it's feedback, partnership, or inquiries — drop us a message.
              </p>
            </motion.div>
          </section>

          {/* Main Content Grid */}
          <div className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column: Contact Form */}
            <section>
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-md p-8 space-y-6"
                encType="multipart/form-data"
                noValidate
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send a Message</h2>

                {/* Name */}
                <div>
                  <label className="block mb-1 font-medium text-gray-700" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="John Doe"
                    required
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-1 font-medium text-gray-700" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="you@example.com"
                    required
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Conditional Fields */}
                {isGettingQuote && (
                  <>
                    <div>
                      <label className="block mb-1 font-medium text-gray-700" htmlFor="department">
                        Department
                      </label>
                      <select
                        id="department"
                        value={data.department}
                        onChange={(e) => {
                          setData("department", e.target.value);
                          setData("category", "");
                          setData("product", "");
                        }}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none bg-white"
                        required
                      >
                        <option value="">Select Department</option>
                        {/* You can map departments here */}
                      </select>
                      {errors.department && (
                        <p className="mt-1 text-sm text-red-600">{errors.department}</p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700" htmlFor="quantity">
                        Quantity
                      </label>
                      <input
                        id="quantity"
                        type="number"
                        min={1}
                        value={data.quantity}
                        onChange={(e) => setData("quantity", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Quantity needed"
                        required
                      />
                      {errors.quantity && (
                        <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700" htmlFor="file">
                        Upload File (optional)
                      </label>
                      <input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        className="w-full"
                        accept="image/*,application/pdf"
                      />
                      {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
                    </div>
                  </>
                )}

                {/* Message */}
                <div>
                  <label className="block mb-1 font-medium text-gray-700" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={data.message}
                    onChange={(e) => setData("message", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Write your message here..."
                    required
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
                >
                  {processing ? "Sending..." : "Send Message"}
                </button>
              </form>
            </section>

            {/* Right Column: Contact Info + Map */}
            <section className="space-y-10">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h2>
                <ul className="space-y-4 text-gray-700">
                  <li>
                    <strong className="block mb-1">Address:</strong>
                    123 Business Street, <br /> Melbourne, VIC 3000, Australia
                  </li>
                  <li>
                    <strong className="block mb-1">Phone:</strong>
                    <a href="tel:+61234567890" className="text-blue-600 hover:underline">
                      +61 2 3456 7890
                    </a>
                  </li>
                  <li>
                    <strong className="block mb-1">Email:</strong>
                    <a href="mailto:contact@yourcompany.com" className="text-blue-600 hover:underline">
                      contact@yourcompany.com
                    </a>
                  </li>
                  <li>
                    <strong className="block mb-1">Business Hours:</strong>
                    Mon - Fri: 9:00 AM - 5:00 PM
                  </li>
                </ul>
              </div>

              <div className="w-full h-80 rounded-lg overflow-hidden shadow-md">
                <iframe
                  title="Company Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019777120943!2d144.96305831573905!3d-37.813611879751115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43b01b4e5b%3A0x8dd1a4a1d34c892a!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1627485040554!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="border-0"
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex={0}
                />
              </div>
            </section>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
