export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">The Brew Haven Café</h3>
          <p className="text-gray-400 text-sm">
            A cozy retreat in the heart of the city, where coffee, creativity, and conversation blend beautifully.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Contact</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>123 Business Street, Melbourne, VIC 3000</li>
            <li>
              Phone: <a href="tel:+61234567890" className="text-yellow-500 hover:underline">+61 2 3456 7890</a>
            </li>
            <li>
              Email: <a href="mailto:contact@brew-haven.com" className="text-yellow-500 hover:underline">contact@brew-haven.com</a>
            </li>
            <li>Mon - Fri: 9:00 AM - 5:00 PM</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-yellow-500 transition">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-yellow-500 transition">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-yellow-500 transition">Twitter</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} The Brew Haven Café. All rights reserved.
      </div>
    </footer>
  );
}

