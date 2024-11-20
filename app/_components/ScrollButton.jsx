"use client";

import { BsArrowUpCircle } from "react-icons/bs";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="rounded-full text-white shadow-lg transition-opacity hover:text-gray-300"
      aria-label="Scroll to top"
      title="Back To Top"
    >
      <BsArrowUpCircle size={20} />
    </button>
  );
};

export default ScrollToTopButton;
