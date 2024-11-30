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
      className="rounded-full transition-opacity hover:text-primary-170"
      aria-label="Scroll to top"
      title="Back To Top"
    >
      <BsArrowUpCircle size={20} />
    </button>
  );
};

export default ScrollToTopButton;
