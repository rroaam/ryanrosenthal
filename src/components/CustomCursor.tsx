"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const isTouchDevice = useRef(false);
  const mousePos = useRef({ x: 0, y: 0 });

  // Magnetic pull effect
  const applyMagnetic = useCallback(
    (el: Element) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mousePos.current.x - cx;
      const dy = mousePos.current.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = Math.max(rect.width, rect.height) * 0.8;

      if (dist < radius) {
        const pull = 0.35;
        const tx = cx + dx * pull;
        const ty = cy + dy * pull;
        cursorX.set(tx);
        cursorY.set(ty);
        return true;
      }
      return false;
    },
    [cursorX, cursorY],
  );

  useEffect(() => {
    isTouchDevice.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Check if hovering a magnetic element
      const magnetic = document.querySelectorAll("a, button, [data-cursor-hover]");
      let pulled = false;
      magnetic.forEach((el) => {
        if ((el as HTMLElement).matches(":hover")) {
          pulled = applyMagnetic(el);
        }
      });

      if (!pulled) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
      if (!visible) setVisible(true);
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Track interactive element hovers with context labels
    const handleElementEnter = (e: Event) => {
      setHovering(true);
      const el = e.currentTarget as HTMLElement;
      const cursorLabel = el.getAttribute("data-cursor-label");
      if (cursorLabel) setLabel(cursorLabel);
    };
    const handleElementLeave = () => {
      setHovering(false);
      setLabel(null);
    };

    const observeInteractives = () => {
      const els = document.querySelectorAll("a, button, [data-cursor-hover]");
      els.forEach((el) => {
        el.addEventListener("mouseenter", handleElementEnter);
        el.addEventListener("mouseleave", handleElementLeave);
      });
    };

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
  }, [cursorX, cursorY, visible, applyMagnetic]);

  if (isTouchDevice.current) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference flex items-center justify-center"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.3)",
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? (label ? 80 : 48) : 32,
          height: hovering ? (label ? 80 : 48) : 32,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {/* Context label */}
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              fontFamily: "var(--font-helvetica)",
              fontSize: "8px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.9)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
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
          opacity: visible ? (label ? 0 : 1) : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
      />
    </>
  );
}
