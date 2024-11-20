"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // For Burger Menu
  const [submenuOpen, setSubmenuOpen] = useState(false); // For Submenu in Mobile

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // Toggle open/close
  };

  // Toggle submenu visibility for mobile view
  const toggleSubmenu = () => {
    setSubmenuOpen((prev) => !prev); // Toggle submenu
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image width={150} height={150} src="/logo.png" alt="Logo" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-900 hover:text-blue-600 transition duration-300"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-900 hover:text-blue-600 transition duration-300">
                Services
              </button>
              {/* Submenu for Desktop, appears on hover */}
              <div className="absolute hidden mt-2 space-y-2 bg-white shadow-lg rounded-md group-hover:block transition-all duration-300">
                <Link
                  href="/service1"
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                >
                  Service 1
                </Link>
                <Link
                  href="/service2"
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                >
                  Service 2
                </Link>
              </div>
            </div>
            <Link
              href="/about"
              className="text-gray-900 hover:text-blue-600 transition duration-300"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-900 hover:text-blue-600 transition duration-300"
            >
              Contact
            </Link>

            {/* Desktop Search Bar */}
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <div className="flex items-center space-x-4">
              <Link href="/en" className={`px-4 py-2 rounded-md`}>
                EN
              </Link>
              <Link href="/ar" className={`px-4 py-2 rounded-md`}>
                AR
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-900 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 transition-all duration-300 ${
          isOpen ? "left-0" : "-left-full"
        }`}
      >
        <div
          className={`bg-white w-3/4 h-full p-6 transition-all duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={toggleMenu}
            className="text-gray-900 absolute top-6 right-6 text-2xl"
          >
            &times;
          </button>
          <div className="space-y-4">
            <Link href="/" className="block text-gray-900 text-lg">
              Home
            </Link>
            <div className="relative">
              <button
                className="text-gray-900 text-lg"
                onClick={toggleSubmenu} // Toggle submenu visibility on click in mobile
              >
                Services
              </button>
              {/* Submenu for Mobile, shown on click */}
              {submenuOpen && (
                <div className="space-y-2 bg-white shadow-lg rounded-md mt-2">
                  <Link
                    href="/service1"
                    className="block px-4 py-2 text-gray-900"
                  >
                    Service 1
                  </Link>
                  <Link
                    href="/service2"
                    className="block px-4 py-2 text-gray-900"
                  >
                    Service 2
                  </Link>
                </div>
              )}
            </div>
            <Link href="/about" className="block text-gray-900 text-lg">
              About
            </Link>
            <Link href="/contact" className="block text-gray-900 text-lg">
              Contact
            </Link>

            <input
              type="text"
              placeholder="Search"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
