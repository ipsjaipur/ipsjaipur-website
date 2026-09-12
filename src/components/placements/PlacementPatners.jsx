'use client';
import React from 'react';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { cloudinaryImage } from '@/_utils/cloudinaryImage';

/**
 * PlacementPatners — "INTERNSHIP & PLACEMENT PARTNERS" marquee.
 * Hidden entirely if no companyLogos in CMS.
 *
 * Props:
 *  placementsData — home-page CMS `placements` section doc
 */
export default function PlacementPatners({ placementsData }) {
  const rawLogos =
    placementsData?.companyLogos?.length > 0
      ? [...placementsData.companyLogos].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : [];

  // Hide section if no logos
  if (rawLogos.length === 0) return null;

  const companyLogos = rawLogos.map((l) => ({
    ...l,
    logo: cloudinaryImage(l.logo, 'f_auto,q_auto,w_220'),
  }));

  const scaleInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <section className="py-[64px] bg-accent/50">
      <h2 className="text-center text-gray-900 font-bold rubik-fonts text-[28px] md:text-[32px] lg:text-[36px] lg:mb-[24px] mb-[12px]">
        INTERNSHIP &amp; <span className="text-[#FF9E3D]">PLACEMENT</span> PARTNERS
      </h2>
      <motion.div variants={scaleInVariants}>
        <Marquee gradient={false} speed={100} pauseOnHover={true} className="py-4">
          {companyLogos.map((company, index) => (
            <div
              key={company._id || index}
              className="mx-2 flex items-center justify-center border lg:w-[190px] lg:h-[90px] w-[160px] h-[70px] border-gray-200 p-1 bg-white rounded-lg px-2 py-0 transition-shadow duration-300"
            >
              <img src={company.logo} alt={company.name} className="max-w-full max-h-full object-contain" />
            </div>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
