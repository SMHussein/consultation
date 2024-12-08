"use client";

import Image from "next/image";
import { useState } from "react";
import Heading from "./Heading";

export default function TeamMember({ name, position, imageUrl }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-[220px] h-[220px] overflow-hidden shadow-2xl group rounded-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={imageUrl}
        alt={`${name} - ${position}`}
        width={220}
        height={220}
        className={`transition-all duration-500 w-full h-full rounded-full block${
          isHovered ? "brightness-50" : "brightness-100"
        }`}
      />

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center bg-primary-200 bg-opacity-75 text-white transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-lg mb-4">{name}</p>
        <p className="text-sm">{position}</p>
      </div>
    </div>
  );
}
