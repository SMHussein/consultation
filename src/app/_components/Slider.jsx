"use client";

import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

const EmblaCarousel = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true }, // Loop enabled
    [AutoScroll({ playOnInit: true, speed: 2 })] // Auto-play on load with adjustable speed
  );

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;
    autoScroll.play(); // Ensure continuous autoplay
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((src, index) => (
            <div className="embla__slide" key={index}>
              <Image
                src={src}
                width={150}
                height={100}
                alt={`client-${index + 1} logo`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
