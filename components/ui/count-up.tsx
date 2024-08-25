"use client";

import { useEffect, useRef } from "react";

import {
  LazyMotion,
  domAnimation,
  m,
  useAnimate,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";

interface CountUpProps {
  className?: string;
  num: number;
  prefix?: string;
  suffix?: string;
  disableAnimation?: boolean; // New prop to disable animation
}

export default function CountUp({
  num,
  prefix,
  suffix,
  className,
  disableAnimation = false, // Default to false
}: CountUpProps) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  const [_, animate] = useAnimate();
  const startingValue = useMotionValue(0);

  const currentValue = useTransform(
    startingValue,
    (value) =>
      (prefix || "") + Math.round(value).toLocaleString() + (suffix || "")
  );

  useEffect(() => {
    if (isInView && !disableAnimation) {
      // Check if animation is not disabled
      animate(startingValue, num, {
        duration: 2.5,
        ease: "circIn",
      });
    } else if (isInView && disableAnimation) {
      startingValue.set(num); // Set the value directly if animation is disabled
    }
  }, [animate, isInView, num, startingValue, disableAnimation]);

  return (
    <LazyMotion features={domAnimation}>
      <m.p ref={ref} className={className}>
        {currentValue}
      </m.p>
    </LazyMotion>
  );
}
