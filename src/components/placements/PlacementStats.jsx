'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function PlacementStats() {
  const placementData = [
    {
      id: 0,
      image: 'images/placements/sectorwise.webp',
      title: ' Placements ',
      description: 'Comprehensive overview of placements across various industry sectors',
    },
    {
      id: 1,
      image: 'images/placements/MBAOJTNEW.webp',
      title: ' MBA Internships  Sector Wise',
      description: 'Real-world experience and industry exposure for MBA students',
    },
    {
      id: 2,
      image: 'images/placements/BBAOJTNEW.webp',
      title: 'Live Projects  Sector Wise',
      description: 'Hands-on learning opportunities for BBA students',
    },
  ];

  // Enhanced Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const imageVariants = {
    hidden: {
      scale: 1.15,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative px-[16px] overflow-hidden pb-[64px]">
      <motion.div
        className="relative w-full max-w-[1320px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        {/* Cards Grid with Enhanced Layout */}
        <div className="grid grid-cols-1 gap-8 md:gap-10 lg:gap-12">
          {placementData.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="group relative"
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              {/* Card Container */}
              <div className="transition-shadow duration-500">
                <div className="relative">
                  {/* Image Container with Enhanced Effects */}
                  <motion.div className="relative" variants={imageVariants} transition={{ duration: 0.4 }}>
                    <h3>
                      <motion.div className="text-center mb-2" variants={titleVariants}>
                        <motion.div className="inline-block">
                          <h2 className="text-gray-900 font-bold rubik-fonts text-[22px] md:text-[32px] lg:text-[36px]">
                            <span className="text-[#FF9E3D]">{item?.title}</span>
                          </h2>
                        </motion.div>
                      </motion.div>
                    </h3>
                    <motion.img
                      src={`${process.env.NEXT_PUBLIC_IMG_PATH}${item.image}`}
                      alt={item.title}
                      className="w-full h-auto object-contain"
                    />
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
