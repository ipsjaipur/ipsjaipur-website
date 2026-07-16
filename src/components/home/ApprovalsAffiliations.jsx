'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AFFILIATIONS = [
  {
    id: 1,
    label: 'Approved by',
    name: 'All India Council for Technical Education',
    logo: `images/home/aicte.webp`,
    alt: 'AICTE Logo',
  },
  {
    id: 2,
    label: 'Affiliated with',
    name: 'Rajasthan Technical University (RTU)',
    logo: `images/home/rtu.webp`,
    alt: 'RTU Logo',
  },
];

export default function ApprovalsAffiliations() {
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
          {AFFILIATIONS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.2 + index * 0.15,
                ease: 'easeOut',
              }}
              className="md:flex items-center gap-3 sm:gap-4 p-[12px] sm:p-[14px] w-full justify-start border border-dashed border-[#7b7b7b] rounded-[20px] hover:border-[#a89968] hover:bg-white/5 transition-colors duration-300"
            >
              {/* Logo */}
              <div className="shrink-0 relative w-[48px] mb-4 md:mb-0 mx-auto md:mx-0 h-[48px] sm:w-[75px] sm:h-[75px]">
                <Image
                  src={process.env.NEXT_PUBLIC_IMG_PATH + item.logo}
                  alt={item.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 65px, 75px"
                  unoptimized
                />
              </div>

              {/* Text */}
              <div className="relative flex-1 min-w-0 text-center md:text-start">
                <div className="md:block hidden absolute top-[50%] translate-y-[-50%] w-px h-[30px] sm:h-[35px] left-0 bg-[#7b7b7b]"></div>
                <div className="md:pl-[16px]">
                  <p className="text-(--color-ips-amber) figtree-font font-bold mb-0.5 text-[11px] sm:text-[12px] md:text-[13px]">
                    {item.label}
                  </p>
                  <p className="text-white leading-snug font-bold text-[13px] sm:text-[14px] md:text-[15px] break-words">
                    {item.name}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
