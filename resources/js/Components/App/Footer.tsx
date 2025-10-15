import { usePage } from "@inertiajs/react";

export default function Footer() {
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
    console.log(business);
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">{business?.business_name}</h3>
          <p className="text-gray-400 text-sm">
            A cozy retreat in the heart of the city, where coffee, creativity, and conversation blend beautifully.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Contact</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>Address: {business?.address}</li>
            <li>
              Phone: <a href="tel:+61234567890" className="text-yellow-500 hover:underline">{business?.phone}</a>
            </li>
            <li>
              Email: <a href="mailto:contact@brew-haven.com" className="text-yellow-500 hover:underline">{business?.email}</a>
            </li>
            <li>{business?.hours}</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href={business?.facebook} className="text-gray-400 hover:text-yellow-500 transition">Facebook</a>
            <a href={business?.instagram} className="text-gray-400 hover:text-yellow-500 transition">Instagram</a>
            <a href={business?.twitter} className="text-gray-400 hover:text-yellow-500 transition">Twitter</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} The Brew Haven Café. All rights reserved.
      </div>
    </footer>
  );
}

