"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Track interactive element hovers
    const handleElementEnter = () => setHovering(true);
    const handleElementLeave = () => setHovering(false);

    const observeInteractives = () => {
      const els = document.querySelectorAll("a, button, [data-cursor-hover]");
      els.forEach((el) => {
        el.addEventListener("mouseenter", handleElementEnter);
        el.addEventListener("mouseleave", handleElementLeave);
      });
    };

    // Initial + observe DOM changes
    observeInteractives();
    const observer = new MutationObserver(observeInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      const els = document.querySelectorAll("a, button, [data-cursor-hover]");
      els.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementEnter);
        el.removeEventListener("mouseleave", handleElementLeave);
      });
    };
  }, [cursorX, cursorY, visible]);

  if (isTouchDevice.current) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.3)",
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference"
        style={{
          background: "#CECED0",
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 6 : 4,
          height: hovering ? 6 : 4,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
      />
    </>
  );
}
