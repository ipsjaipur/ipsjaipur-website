'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// ── Animation variants ─────────────────────────────────────────────────────
const bannerVariants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const overlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
    },
  },
};

export default function PlacementBanner() {
  return (
    <motion.section
      aria-label="Placement Banner"
      className="relative w-full overflow-hidden"
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="relative w-full h-[120px] sm:h-[220px] md:h-[240px] lg:h-[340px] xl:h-[430px] 2xl:h-[455px]"
        variants={bannerVariants}
      >
        <Image
          src={process.env.NEXT_PUBLIC_IMG_PATH + 'images/placements/placment.webp'}
          alt="IPS Business School - Placements"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          unoptimized
          quality={100}
          draggable={false}
        />

        {/* Optional subtle overlay for depth effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none"
          variants={overlayVariants}
        />
      </motion.div>
    </motion.section>
  );
}
