"use client";
import { useState } from "react";
import { Link, usePathname } from "@/src/i18n/routing";
import { HiBars4, HiXMark } from "react-icons/hi2";
import Logo from "../_components/Logo";
import { useTranslations } from "next-intl";

const Header = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-accent-150 dark:bg-primary-210 shadow-md z-50 text-primary-170 dark:text-accent-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <GeneratHeaderLinks />
          </div>
          <div className="hidden md:flex">
            <Link href={pathname} locale={locale === "ar" ? "en" : "ar"}>
              {locale === "ar" ? "English" : "عربي"}
            </Link>
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
            className={`text-primary-170 absolute top-6 text-2xl ${
              locale === "en" ? "right-6" : "left-6"
            }`}
          >
            <HiXMark size={28} />
          </button>
          <div className="space-y-4 flex flex-col">
            <GeneratHeaderLinks onClick={closeMenu} />
            <Link href={pathname} locale={locale === "ar" ? "en" : "ar"}>
              {locale === "ar" ? "English" : "عربي"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

function GeneratHeaderLinks({ onClick }) {
  const links = [
    "home",
    "services",
    "about",
    "contact",
    "publications",
    "careers",
  ];
  return links.map((link, i) => (
    <HeaderLink key={i} item={link} onClick={onClick} />
  ));
}

function HeaderLink({ item, onClick = () => {} }) {
  const t = useTranslations("navigation");

  const pathname = usePathname(); // Get the current path
  const href = item === "home" ? "/" : `/${item}`;
  const label = t(`${item}`);

  return (
    <Link
      onClick={() => onClick()}
      href={href}
      className={`${
        pathname === href
          ? "text-primary-160"
          : "text-primary-200 dark:text-white"
      } hover:text-accent-200 transition duration-300 capitalize`}
    >
      {label}
    </Link>
  );
}
