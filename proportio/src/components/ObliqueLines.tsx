import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ObliqueLines = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let lines: { x: number; y: number; speed: number; length: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initLines = () => {
      lines = Array.from({ length: 8 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 2 - canvas.height,
        speed: 0.3 + Math.random() * 0.5,
        length: 200 + Math.random() * 400,
        opacity: 0.04 + Math.random() * 0.08,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        const angle = Math.PI / 4; // 45 degrees
        const endX = line.x + Math.cos(angle) * line.length;
        const endY = line.y - Math.sin(angle) * line.length;

        // Main line
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(180, 180, 180, ${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Blue glow
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(56, 152, 236, ${line.opacity * 0.5})`;
        ctx.lineWidth = 2;
        ctx.filter = "blur(3px)";
        ctx.stroke();
        ctx.filter = "none";

        // Move line
        line.x += line.speed * 0.7;
        line.y -= line.speed;

        // Reset when off screen
        if (line.y + line.length < -100 || line.x - line.length > canvas.width + 100) {
          line.x = Math.random() * canvas.width * 0.5 - canvas.width * 0.25;
          line.y = canvas.height + Math.random() * 200;
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    initLines();
    draw();

    window.addEventListener("resize", () => {
      resize();
      initLines();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default ObliqueLines;
