"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isTouchDevice = useRef(false);
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    isTouchDevice.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice.current) return;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      }
      if (!visible) setVisible(true);
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, [visible]);

  if (isTouchDevice.current) return null;

  return (
    <>
      <style>{`
        @keyframes cursor-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0"
        style={{
          zIndex: 9999,
          width: 20,
          height: 20,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s",
          willChange: "transform",
        }}
      >
        {/* Yin yang spinning cursor */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          style={{ animation: "cursor-spin 3s linear infinite" }}
        >
          {/* White half */}
          <path
            d="M10 0 A10 10 0 0 1 10 20 A5 5 0 0 1 10 10 A5 5 0 0 0 10 0"
            fill="#0A0A0A"
          />
          {/* Black half */}
          <path
            d="M10 0 A10 10 0 0 0 10 20 A5 5 0 0 0 10 10 A5 5 0 0 1 10 0"
            fill="#CECED0"
          />
          {/* Small dots */}
          <circle cx="10" cy="5" r="1.5" fill="#CECED0" />
          <circle cx="10" cy="15" r="1.5" fill="#0A0A0A" />
        </svg>
      </div>
    </>
  );
}
