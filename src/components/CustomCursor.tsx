"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const isTouchDevice = useRef(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const trail = useRef<{ x: number; y: number; age: number }[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    isTouchDevice.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      trail.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      // Keep trail length manageable
      if (trail.current.length > 30) trail.current.shift();
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!visible) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      // Age trail points
      trail.current.forEach((p) => (p.age += 1));
      // Remove old points
      trail.current = trail.current.filter((p) => p.age < 25);

      // Draw trail with fading glow
      for (let i = 0; i < trail.current.length; i++) {
        const p = trail.current[i];
        const life = 1 - p.age / 25;
        const radius = 3 + life * 4;

        // Glow
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, radius * 3
        );
        gradient.addColorStop(0, `rgba(0, 0, 255, ${life * 0.15})`);
        gradient.addColorStop(0.5, `rgba(0, 0, 255, ${life * 0.05})`);
        gradient.addColorStop(1, "rgba(0, 0, 255, 0)");

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 255, ${life * 0.4})`;
        ctx.fill();
      }

      // Main orb at current position
      const { x, y } = mousePos.current;

      // Outer glow
      const mainGlow = ctx.createRadialGradient(x, y, 0, x, y, 28);
      mainGlow.addColorStop(0, "rgba(0, 0, 255, 0.12)");
      mainGlow.addColorStop(0.4, "rgba(0, 0, 255, 0.04)");
      mainGlow.addColorStop(1, "rgba(0, 0, 255, 0)");
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fillStyle = mainGlow;
      ctx.fill();

      // Inner orb
      const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, 6);
      orbGradient.addColorStop(0, "rgba(0, 0, 255, 0.7)");
      orbGradient.addColorStop(0.6, "rgba(0, 0, 255, 0.3)");
      orbGradient.addColorStop(1, "rgba(0, 0, 255, 0)");
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = orbGradient;
      ctx.fill();

      // Bright core
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(100, 100, 255, 0.9)";
      ctx.fill();

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [visible]);

  if (isTouchDevice.current) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 9999 }}
    />
  );
}
