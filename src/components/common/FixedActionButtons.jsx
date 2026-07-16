'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// ─── WhatsApp Icon ─────────────────────────────────────────────────────────
const WhatsAppIcon = () => (
  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M24 0C10.745 0 0 10.745 0 24c0 4.243 1.113 8.224 3.053 11.671L.051 46.619a1 1 0 0 0 1.33 1.33l10.948-3.002A23.88 23.88 0 0 0 24 48c13.255 0 24-10.745 24-24S37.255 0 24 0z"
      fill="#25D366"
    />
    <path
      d="M35.176 32.824c-.584 1.645-2.906 3.015-4.744 3.404-1.248.263-2.875.474-8.356-1.794-7.016-2.903-11.548-10.005-11.897-10.465-.337-.46-2.794-3.718-2.794-7.092 0-3.374 1.77-5.034 2.397-5.72.627-.685 1.368-.857 1.826-.857.457 0 .915.005 1.314.024.421.02.986-.16 1.542 1.175.575 1.378 1.964 4.796 2.134 5.145.17.349.285.756.057 1.215-.228.46-.342.746-.684 1.155-.342.408-.718.912-1.026 1.224-.342.348-.698.724-.3 1.421.399.697 1.772 2.921 3.808 4.73 2.617 2.325 4.822 3.05 5.508 3.398.685.349 1.085.291 1.484-.175.398-.466 1.712-1.998 2.17-2.683.457-.686.915-.572 1.543-.343.628.228 3.99 1.882 4.676 2.225.685.343.1142.514 1.142 1.174 0 .66-.115 1.944-.699 3.59z"
      fill="#fff"
    />
  </svg>
);

export default function FixedActionButtons() {
  const [showButtons, setShowButtons] = useState(false);

  // ── Show/Hide buttons based on scroll position ─────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setShowButtons(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ══ Apply Now Button ═══════════════════════════════════════════════════ */}
      <Link
        href="https://admissions.ipsedu.in/"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed top-1/2 -translate-y-1/2 md:right-[-40px] right-[-30px] -rotate-90 z-40 px-4 md:px-5 py-2.5 md:py-3 rounded-t-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-xs md:text-sm transition-all duration-300 flex items-center gap-2 group ${
          showButtons ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
        aria-label="Apply Now"
        title="Apply for Admission"
      >
        <span className="whitespace-nowrap">Apply Now</span>
        {/* Pulse effect */}
      </Link>

      {/* ══ WhatsApp Button ════════════════════════════════════════════════════ */}
      <a
        href="https://wa.me/+917976814849"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-[24px] right-[80px] md:right-[80px] z-40 w-12 h-12 md:w-12 md:h-12 rounded-full bg-white shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group overflow-hidden ${
          showButtons ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 bottom-[-40px] pointer-events-none'
        }`}
        aria-label="Contact us on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="relative z-10 scale-90 md:scale-100">
          <WhatsAppIcon />
        </span>
        {/* Hover scale effect */}
        <span className="absolute inset-0 bg-[#25D366] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full"></span>
        {/* Ripple effect */}
      </a>

      {/* ══ Custom Keyframes for Animations ════════════════════════════════════ */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.2;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </>
  );
}
