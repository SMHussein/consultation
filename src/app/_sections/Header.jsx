"use client";
import { useState } from "react";
import { Link, usePathname } from "@/src/i18n/routing";
import { HiBars4, HiXMark } from "react-icons/hi2";
import Logo from "../_components/Logo";

const Header = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleSubmenu = () => {
    setSubmenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-accent-150 shadow-md z-50 text-primary-170">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`${
                pathname === "/" ? "text-primary-170" : "text-primary-200"
              } hover:text-blue-600 transition duration-300`}
            >
              Home
            </Link>
            <div className="relative group">
              <button className="text-primary-200 hover:text-blue-600 transition duration-300">
                Services
              </button>
              <div className="absolute hidden mt-2 space-y-2 bg-white shadow-lg rounded-md group-hover:block transition-all duration-300">
                <Link
                  href="/service1"
                  className={`block px-4 py-2 ${
                    pathname === "/service1"
                      ? "text-primary-170"
                      : "text-primary-200"
                  } hover:bg-gray-100`}
                >
                  Service 1
                </Link>
                <Link
                  href="/service2"
                  className={`block px-4 py-2 ${
                    pathname === "/service2"
                      ? "text-primary-170"
                      : "text-primary-200"
                  } hover:bg-gray-100`}
                >
                  Service 2
                </Link>
              </div>
            </div>
            <Link
              href="/about"
              className={`${
                pathname === "/about" ? "text-primary-170" : "text-primary-200"
              } hover:text-blue-600 transition duration-300`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`${
                pathname === "/contact"
                  ? "text-primary-170"
                  : "text-primary-200"
              } hover:text-blue-600 transition duration-300`}
            >
              Contact
            </Link>
          </div>
          <div className="hidden md:flex">
            {locale === "ar" ? (
              <Link href={pathname} locale="en">
                English
              </Link>
            ) : (
              <Link href={pathname} locale="ar">
                عربي
              </Link>
            )}
          </div>
          <button
            className="md:hidden flex items-center text-primary-170"
            onClick={isOpen ? closeMenu : openMenu}
          >
            <HiBars4 size={28} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 transition-all ${
          isOpen
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible -translate-x-full"
        }`}
        onClick={closeMenu}
      >
        <div
          className={`bg-white h-full p-6`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeMenu}
            className="text-primary-170 absolute top-6 right-6 text-2xl"
          >
            <HiXMark size={28} />
          </button>
          <div className="space-y-4">
            <Link
              href="/"
              className={`block text-lg ${
                pathname === "/" ? "text-primary-170" : "text-primary-200"
              }`}
            >
              Home
            </Link>
            <div className="relative">
              <button
                className="text-primary-200 text-lg w-full text-left"
                onClick={toggleSubmenu}
              >
                Services
              </button>
              <div
                className={`overflow-hidden transition-all duration-300  ${
                  pathname === "/service2"
                    ? "text-primary-170"
                    : "text-primary-200"
                } ${
                  submenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <Link href="/service1" className={`block px-4 py-2`}>
                  Service 1
                </Link>
                <Link href="/service2" className={`block px-4 py-2`}>
                  Service 2
                </Link>
              </div>
            </div>
            <Link
              href="/about"
              className={`block text-lg ${
                pathname === "/about" ? "text-primary-170" : "text-primary-200"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block text-lg ${
                pathname === "/contact"
                  ? "text-primary-170"
                  : "text-primary-200"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
