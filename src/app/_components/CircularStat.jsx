"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Heading from "./Heading";

const CircularStat = ({ label, value }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= value) {
            clearInterval(timer);
            return value;
          }
          return prev + Math.ceil(value / 100);
        });
      }, 20);
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center relative">
      <svg className="transform -rotate-90" width="190" height="190">
        <circle
          cx="95"
          cy="95"
          r="85"
          className="stroke-gray-300"
          strokeWidth="10"
          fill="none"
        />
        <motion.circle
          cx="95"
          cy="95"
          r="85"
          className="stroke-primary-150"
          strokeWidth="10"
          fill="none"
          strokeDasharray="534.07" /* Circumference = 2 * Math.PI * 85 */
          strokeDashoffset={534.07 - (534.07 * progress) / value}
          initial={{ strokeDashoffset: 534.07 }}
          animate={{ strokeDashoffset: 534.07 - (534.07 * progress) / value }}
          transition={{ duration: 0.5 }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <Heading
          type="tertiary"
          classes="text-primary-200 flex flex-col items-center gap-2"
        >
          <span>{label}</span>
          <span className="text-3xl font-bold">{progress}+</span>
        </Heading>
      </div>
    </div>
  );
};

export default CircularStat;
