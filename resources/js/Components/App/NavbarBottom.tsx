"use client";

import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Link, router, usePage } from "@inertiajs/react";
import { HomeIcon, UserIcon } from "lucide-react";
import { PageProps } from "@/types";


interface NavLink {
  name: string;
  href: string;
}

export default function NavbarBottom() {
  const [open, setOpen] = useState(false);
const { auth } = usePage<PageProps>().props;
  const user = auth?.user;

  // Basic nav links
  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* === Fixed Bottom Bar (Mobile Only) === */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-green-700 border-t border-green-800 flex justify-around items-center h-16 px-4 lg:hidden">
        <Link href="/" className="flex flex-col items-center text-white gap-1">
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex flex-col items-center text-white gap-1"
        >
          <Bars3Icon className="w-7 h-7" />
          <span className="text-xs">Menu</span>
        </button>

        <Link
          href={user ? "/profile" : "/login"}
          className="flex flex-col items-center text-white gap-1"
        >
          <UserIcon className="w-6 h-6" />
          <span className="text-xs">{user ? "Account" : "Login"}</span>
        </Link>
      </div>

      {/* === Slide-Up Mobile Menu === */}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <DialogBackdrop className="fixed inset-0 bg-black/25" />

          <div className="fixed inset-0 flex items-end justify-center">
            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transition ease-in duration-200"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <DialogPanel className="w-full max-w-md h-[85%] bg-white rounded-t-2xl shadow-xl overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold">Navigation</h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-md"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Auth Section */}
                <div className="px-6 py-4 border-b">
                  {!user ? (
                    <>
                      <Link
                        href="/login"
                        className="block w-full text-center border border-green-600 text-green-700 rounded-md py-2 hover:bg-green-50"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="block w-full text-center mt-2 text-green-700 hover:underline"
                      >
                        Create Account
                      </Link>
                    </>
                  ) : (
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="w-full flex justify-between items-center text-lg text-gray-800 font-medium py-2">
                            <div className="flex items-center gap-3">
                              <img
                                src={user.avatar ?? "https://placehold.co/40x40"}
                                alt="avatar"
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <span>{user.name ?? "Account"}</span>
                            </div>
                            <ChevronDownIcon
                              className={`w-5 h-5 transition-transform ${
                                open ? "rotate-180" : ""
                              }`}
                            />
                          </Disclosure.Button>
                          <DisclosurePanel className="pl-11 space-y-2 text-gray-700">
                            <Link href="/profile" className="block">
                              Profile
                            </Link>
                            <Link href="/orders" className="block">
                              Orders
                            </Link>
                            <Link
                              href="/logout"
                              method="post"
                              as="button"
                              className="block text-red-600"
                            >
                              Logout
                            </Link>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  )}
                </div>

                {/* Nav Links */}
                <nav className="p-6 space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block text-lg text-gray-700 hover:bg-green-600 hover:text-white rounded-md px-4 py-2"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                {/* Footer */}
                <div className="border-t px-6 py-4 text-sm text-gray-500 text-center">
                  © {new Date().getFullYear()} Café Site
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
