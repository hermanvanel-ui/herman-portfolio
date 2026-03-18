"use client";

import dynamic from "next/dynamic";

const NeuralNetwork = dynamic(() => import("@/components/effects/NeuralNetwork"), { ssr: false });

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <NeuralNetwork />
      <div className="relative z-10 text-center px-6 py-12" style={{ background: "radial-gradient(ellipse at center, rgba(5,5,16,.7) 0%, rgba(5,5,16,.3) 50%, transparent 70%)", borderRadius: "20px" }}>
        <h1 className="font-black uppercase leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 6vw, 4.5rem)", letterSpacing: "4px", color: "#fff" }}>
          <span className="block mb-2" style={{ fontSize: "0.45em", letterSpacing: "8px", color: "var(--text-mid)", fontWeight: 400 }}>Bienvenue dans</span>
          <span style={{ background: "linear-gradient(135deg, var(--cyan), var(--purple))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 30px rgba(0,240,255,.3))" }}>mon futur</span>
        </h1>
        <div className="flex justify-center mt-6 overflow-hidden">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(.85rem, 1.5vw, 1.1rem)", color: "var(--green)", letterSpacing: "2px", whiteSpace: "nowrap", borderRight: "2px solid var(--green)", animation: "typing 3s steps(40) 1s forwards, blink .8s step-end infinite", width: 0, overflow: "hidden", display: "inline-block" }}>
            {`$ system.init("herman_vanel") → ready_`}
          </div>
        </div>
        <p className="mt-8 mx-auto max-w-[600px] leading-relaxed" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "var(--text-mid)", fontWeight: 400 }}>
          Je ne me contente pas d&apos;imaginer le futur — <span className="font-semibold" style={{ color: "var(--cyan-bright)" }}>je le code.</span><br />
          J&apos;expérimente, je prototype, j&apos;automatise.<br />
          Ce site n&apos;est pas un CV. <span className="font-semibold" style={{ color: "var(--cyan-bright)" }}>C&apos;est une démonstration vivante.</span>
        </p>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: ".65rem", color: "var(--text-faint)", letterSpacing: "3px", textTransform: "uppercase" }}>scroll</span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--cyan), transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}
