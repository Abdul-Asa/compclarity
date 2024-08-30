"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type FadeDirection = "in" | "up" | "left" | "right" | "down";

interface TransitionViewProps {
  className?: string;
  fade?: FadeDirection;
  children: React.ReactNode;
}

const getInitialAndAnimate = (fade: FadeDirection) => {
  switch (fade) {
    case "in":
      return { initial: { opacity: 0 }, animate: { opacity: 1 } };
    case "up":
      return { initial: { y: 50, opacity: 0 }, animate: { y: 0, opacity: 1 } };
    case "down":
      return { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 } };
    case "left":
      return { initial: { x: 50, opacity: 0 }, animate: { x: 0, opacity: 1 } };
    case "right":
      return { initial: { x: -50, opacity: 0 }, animate: { x: 0, opacity: 1 } };
  }
};

export const TransitionView: React.FC<TransitionViewProps> = ({ className, fade = "up", children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10px 0px" });
  const { initial, animate } = getInitialAndAnimate(fade);

  return (
    <motion.div ref={ref} initial={initial} animate={inView ? animate : initial} transition={{ duration: 0.5 }} className={className}>
      {children}
    </motion.div>
  );
};
