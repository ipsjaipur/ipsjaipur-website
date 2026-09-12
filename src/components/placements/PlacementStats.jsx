'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cloudinaryImage } from '@/_utils/cloudinaryImage';

/**
 * PlacementStats — sector-wise infographic images.
 * Hidden entirely if no statItems in CMS.
 *
 * Props:
 *  data — placements-page CMS `stats` section doc
 */
export default function PlacementStats({ data }) {
  const rawItems =
    data?.statItems?.length > 0 ? [...data.statItems].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : [];

  // Hide section if no data
  if (rawItems.length === 0) return null;

  const placementData = rawItems.map((item) => ({
    ...item,
    image: cloudinaryImage(item.image, 'f_auto,q_auto,w_1200'),
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } },
  };
  const imageVariants = {
    hidden: { scale: 1.15, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section className="relative px-[16px] overflow-hidden pb-[64px]">
      <motion.div
        className="relative w-full max-w-330 mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 gap-8 md:gap-10 lg:gap-12">
          {placementData.map((item, index) => (
            <motion.div
              key={item._id || index}
              variants={cardVariants}
              className="group relative"
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <div className="transition-shadow duration-500">
                <div className="relative">
                  <motion.div className="relative" variants={imageVariants} transition={{ duration: 0.4 }}>
                    <h3>
                      <motion.div className="text-center mb-2" variants={titleVariants}>
                        <h2 className="text-gray-900 font-bold rubik-fonts text-[22px] md:text-[32px] lg:text-[36px]">
                          <span className="text-[#FF9E3D]">{item.title}</span>
                        </h2>
                      </motion.div>
                    </h3>
                    <motion.img src={item.image} alt={item.title} className="w-full h-auto object-contain" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
