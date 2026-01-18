"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 bg-gradient-to-t from-black to-transparent border-t border-cyan-500/20">
      <div className="max-w-6xl mx-auto">
        {/* Contact et réseaux */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-cyan-300 mb-4">
            Envie d&apos;échanger ?
          </h3>
          <p className="text-gray-400 mb-6">
            Je suis ouvert aux opportunités, collaborations et discussions sur la tech.
          </p>

          {/* Liens de contact (à personnaliser) */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:herman.vanel@example.com"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg transition-all text-gray-300 hover:text-cyan-300"
            >
              📧 Email
            </a>
            <a
              href="https://linkedin.com/in/hermanvanel"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg transition-all text-gray-300 hover:text-cyan-300"
            >
              💼 LinkedIn
            </a>
            <a
              href="https://github.com/hermanvanel"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg transition-all text-gray-300 hover:text-cyan-300"
            >
              🔧 GitHub
            </a>
          </div>
        </div>

        {/* Note sur le site */}
        <div className="text-center text-gray-500 text-sm border-t border-white/10 pt-6">
          <p className="mb-2">
            Ce site est un <span className="text-cyan-400 font-semibold">portfolio vivant</span>, conçu pour évoluer dans le temps.
          </p>
          <p>
            © {currentYear} Herman Vanel. Construit avec Next.js, TypeScript et Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
