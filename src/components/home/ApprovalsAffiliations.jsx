'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// ── Static fallback ────────────────────────────────────────────────────────────
const IMG = process.env.NEXT_PUBLIC_IMG_PATH || '/';

const FALLBACK_AFFILIATIONS = [
  {
    label: 'Approved by',
    name: 'All India Council for Technical Education',
    logo: `${IMG}images/home/aicte.webp`,
    alt: 'AICTE Logo',
  },
  {
    label: 'Affiliated with',
    name: 'Rajasthan Technical University (RTU)',
    logo: `${IMG}images/home/rtu.webp`,
    alt: 'RTU Logo',
  },
];

export default function ApprovalsAffiliations({ data }) {
  const affiliations =
    data?.affiliations?.length > 0
      ? [...data.affiliations].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : FALLBACK_AFFILIATIONS;

  return (
    <section
      aria-label="Approvals and Affiliations"
      className="relative overflow-hidden mt-[-4px]"
      style={{ backgroundColor: '#2A3E61' }}
    >
      {/* Illustration background — decorative */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/home/illustration-bg.webp`}
          alt=""
          fill
          className="object-cover object-center opacity-50"
          sizes="100vw"
          unoptimized
          priority={false}
        />
      </div>

      {/* Content */}
      <div
        className="relative mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 py-[30px] md:py-[40px] px-[16px] md:px-[24px]"
        style={{ maxWidth: '1202px' }}
      >
        {/* ── Left: Section title ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="shrink-0 md:py-7 md:pr-10 text-center md:text-left w-full md:w-auto md:max-w-[358px]"
        >
          <h2 className="text-(--color-ips-amber) font-bold leading-tight montserrat-font text-[26px] md:text-[32px]">
            Our Approvals &amp;&nbsp;
            <br className="hidden md:block" />
            Affiliations
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
            className="h-px border-b mt-2 border-dashed border-(--color-ips-amber) mx-auto md:mx-0"
          ></motion.div>
        </motion.div>

        {/* ── Right: Affiliations Cards ─────────────────────────── */}
        <div className="flex flex-row flex-1 w-full md:max-w-[747px] gap-[16px] sm:gap-[20px]">
          {affiliations.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.1, ease: 'easeOut' }}
              className="flex flex-1 flex-col sm:flex-row items-center gap-3 sm:gap-4 rounded-xl bg-white/10 backdrop-blur-sm p-4 sm:p-5 border border-white/20"
            >
              <div className="relative w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] flex-shrink-0 bg-white rounded-lg p-2">
                <Image
                  src={item.logo}
                  alt={item.alt || item.name}
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                  unoptimized
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white/70 text-[11px] sm:text-[12px] font-medium uppercase tracking-wide mb-0.5">
                  {item.label}
                </p>
                <p className="text-white font-semibold text-[13px] sm:text-[14px] leading-snug">{item.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
