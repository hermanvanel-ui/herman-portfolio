"use client";

export default function Footer() {
  return (
    <footer className="relative z-5 py-20 px-6 text-center border-t border-[rgba(0,240,255,.08)]">
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "2px", color: "#fff", marginBottom: "1rem" }}>ON ÉCHANGE ?</h2>
      <p style={{ color: "var(--text-mid)", fontWeight: 400, marginBottom: "2.5rem", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
        Je cherche une école (Epitech), des missions en automatisation,
        ou juste à discuter avec des gens qui construisent des trucs.
      </p>
      <div className="flex justify-center gap-10 mb-12">
        {[
          { icon: "📧", label: "Email", href: "mailto:herman.vanel@gmail.com" },
          { icon: "💼", label: "LinkedIn", href: "https://linkedin.com/in/hermanvanel" },
          { icon: "🔧", label: "GitHub", href: "https://github.com/hermanvanel-ui" },
        ].map((l, i) => (
          <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-all duration-300 hover:text-[var(--cyan)]" style={{ color: "var(--text-mid)", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: ".8rem", letterSpacing: "1px" }}>
            {l.icon} {l.label}
          </a>
        ))}
      </div>
      <p style={{ color: "var(--text-faint)", fontSize: ".7rem", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}>© 2025 HERMAN VANEL · NICE · NEXT.JS + TYPESCRIPT</p>
    </footer>
  );
}
