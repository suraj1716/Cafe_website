import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const [transparent, setTransparent] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { url } = usePage();

  const isHomePage = url === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomePage) return; // Only apply scroll transparency on home
      setTransparent(window.scrollY < 50);
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // check immediately
    } else {
      setTransparent(false); // Always solid on non-home pages
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);



  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[9999] transition-colors duration-700 ${
          transparent
            ? "bg-transparent text-white"
            : "bg-white text-black shadow"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold">
              MySite
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <Link
                href="/menu"
                className="hover:text-yellow-400 transition duration-200"
              >
                Menu
              </Link>
               <Link
                href="/gallery"
                className="hover:text-yellow-400 transition duration-200"
              >
                Gallery
              </Link>
              <Link
                href="/about"
                className="hover:text-yellow-400 transition duration-200"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="hover:text-yellow-400 transition duration-200"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon
                    className={`w-6 h-6 ${
                      transparent ? "text-white" : "text-black"
                    }`}
                  />
                ) : (
                  <Bars3Icon
                    className={`w-6 h-6 ${
                      transparent ? "text-white" : "text-black"
                    }`}
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-yellow-500 text-black shadow-md">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/menu"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Add spacing so content is not hidden under navbar */}
      {/* <div className="h-16" /> */}
    </>
  );
}
