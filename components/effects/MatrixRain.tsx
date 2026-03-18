"use client";

import { useEffect, useRef } from "react";

interface Stream {
  x: number;
  y: number;
  spd: number;
  fs: number;
  opBase: number;
  color: number[];
  head: number[];
  trail: number;
  chars: string[];
  tick: number;
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const allChars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789abcdefghijklmnopqrstuvwxyz{}[]()<>=/+*&|!?;:._#@$%".split(
        ""
      );

    let w: number, h: number;
    let streams: Stream[] = [];

    const layers = [
      { fs: 15, spd: 1.3, opBase: 0.32, color: [0, 255, 65], head: [180, 255, 180], dens: 0.85, trailMin: 10, trailMax: 30 },
      { fs: 12, spd: 0.9, opBase: 0.18, color: [0, 220, 60], head: [140, 255, 140], dens: 0.65, trailMin: 8, trailMax: 22 },
      { fs: 9, spd: 0.55, opBase: 0.09, color: [0, 180, 50], head: [100, 230, 100], dens: 0.45, trailMin: 6, trailMax: 16 },
    ];

    function initStreams() {
      streams = [];
      layers.forEach((L) => {
        const cols = Math.floor(w / L.fs);
        for (let i = 0; i < cols; i++) {
          if (Math.random() > L.dens) continue;
          const trail = L.trailMin + Math.floor(Math.random() * (L.trailMax - L.trailMin));
          const chars: string[] = [];
          for (let j = 0; j < trail; j++) chars.push(allChars[Math.floor(Math.random() * allChars.length)]);
          streams.push({
            x: i * L.fs + (Math.random() * 3 - 1.5),
            y: Math.random() * -h,
            spd: (0.8 + Math.random() * 0.7) * L.spd,
            fs: L.fs,
            opBase: L.opBase * (0.6 + Math.random() * 0.4),
            color: L.color,
            head: L.head,
            trail,
            chars,
            tick: 0,
          });
        }
      });
    }

    function resize() {
      w = c!.width = window.innerWidth;
      h = c!.height = window.innerHeight;
      initStreams();
    }

    resize();
    window.addEventListener("resize", resize);

    const interval = setInterval(() => {
      if (!ctx) return;
      ctx.fillStyle = "rgba(5,5,16,.1)";
      ctx.fillRect(0, 0, w, h);

      streams.forEach((s) => {
        s.y += s.spd * s.fs * 0.11;
        s.tick++;

        if (s.tick % 3 === 0) {
          const ri = Math.floor(Math.random() * s.chars.length);
          s.chars[ri] = allChars[Math.floor(Math.random() * allChars.length)];
        }

        ctx.font = s.fs + "px monospace";

        for (let j = 0; j < s.trail; j++) {
          const cy = s.y - j * s.fs;
          if (cy < -s.fs || cy > h + s.fs) continue;
          const fade = 1 - j / s.trail;

          if (j === 0) {
            ctx.shadowColor = `rgba(${s.head[0]},${s.head[1]},${s.head[2]},.7)`;
            ctx.shadowBlur = s.fs;
            ctx.fillStyle = `rgba(${s.head[0]},${s.head[1]},${s.head[2]},${Math.min(1, s.opBase * 3.5)})`;
          } else if (j < 3) {
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.fillStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${s.opBase * 2.5 * fade})`;
          } else {
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.fillStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${s.opBase * fade})`;
          }
          ctx.fillText(s.chars[j % s.chars.length], s.x, cy);
        }
        ctx.shadowBlur = 0;

        if (s.y - s.trail * s.fs > h) {
          s.y = Math.random() * (-h * 0.6);
          s.spd = (0.8 + Math.random() * 0.7) * 1.1;
          for (let j = 0; j < s.chars.length; j++)
            s.chars[j] = allChars[Math.floor(Math.random() * allChars.length)];
        }
      });
    }, 40);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: 0.12,
        pointerEvents: "none",
      }}
    />
  );
}
