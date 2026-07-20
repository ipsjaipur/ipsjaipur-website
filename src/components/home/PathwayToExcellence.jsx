'use client';
import { delay, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PathwayToExcellence() {
  const allCards = [
    {
      id: 1,
      icon: 'images/home/online-learning.webp',
      title: 'Regular Degree with Work Experience(OJTs & Live projects).',
      color: '#FF6B00',
    },
    {
      id: 2,
      icon: 'images/home/advertisig-agency.webp',
      title: 'Additional Digital Marketing Course',
      color: '#FF6B00',
    },
    {
      id: 3,
      icon: 'images/home/monitor.webp',
      title: 'Additional Data/Business Analytics Course',
      color: '#FF6B00',
    },
    {
      id: 4,
      icon: 'images/home/exellent.webp',
      title: '18+ Years Of Excellence In Technical Education',
      color: '#FF9E3D',
    },
    {
      id: 5,
      icon: 'images/home/artificial-intelligence.webp',
      title: 'Additional Artificial Intelligence and Machine Learning Course',
      color: '#FF9E3D',
    },
    {
      id: 6,
      icon: 'images/home/foreign.webp',
      title: '3 Months Foreign Immersion Programme Each Year',
      color: '#FF9E3D',
    },
    {
      id: 7,
      icon: 'images/home/experienced.webp',
      title: 'Best & Experienced Faculty Members',
      color: '#FF9E3D',
    },
    {
      id: 8,
      icon: 'images/home/ranking.webp',
      title: 'Top Ranked College For Best Placements In The Country',
      color: '#FF6B00',
    },
    {
      id: 9,
      icon: 'images/home/save.webp',
      title: 'Leading College With Affordable Fee Structure',
      color: '#FF6B00',
    },
    {
      id: 10,
      icon: 'images/home/group.webp',
      title: 'Strong Alumni Network',
      color: '#FF6B00',
    },
  ];

  // For desktop - split cards into columns
  const leftCards = allCards.slice(0, 3);
  const leftMiddleCards = allCards.slice(3, 5);
  const rightMiddleCards = allCards.slice(5, 7);
  const rightCards = allCards.slice(7, 10);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const cardVariants2 = {
    hidden: { opacity: 0, x: 20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1, y: 140 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.4,
      },
    },
  };

  const imageVariants2 = {
    hidden: { opacity: 0, scale: 1, y: 60 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.4,
      },
    },
  };

  return (
    <section
      aria-label="Your Pathway to Excellence"
      className="relative overflow-hidden pt-[60px] md:pt-[80px] px-[16px]"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_IMG_PATH}images/home/ab-bg-ips.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1202px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-white font-semibold text-[12px] md:text-[16px] uppercase tracking-wide mb-2 figtree-font">
            IPS COLLEGE
          </p>
          <h2 className="text-[#FF9E3D] relative font-bold leading-tight figtree-font text-[28px] md:text-[42px] lg:text-[48px]">
            Your Pathway to Excellence
            <div className="absolute bottom-[-10px] left-[50%] translate-x-[-50%] w-[60px] h-px border-b border-dashed border-[#ff9e3d]"></div>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="flex flex-col gap-6 md:gap-8">
          {/* ── Mobile/Tablet: All Cards in 2-column Grid ─────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:hidden"
          >
            {allCards.map((card) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-3 rounded-lg w-[44px]" style={{ backgroundColor: `${card.color}15` }}>
                    <img src={`${process.env.NEXT_PUBLIC_IMG_PATH}${card.icon}`} alt={card.title} />
                  </div>
                  <h3 className="font-semibold text-[12px] leading-snug figtree-font text-[#eb5905]">{card.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Desktop: 3-column Layout ─────────────────────────── */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 md:gap-8 items-end">
            {/* Left Column */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-row gap-4 mb-8 items-center"
            >
              <div className="flex flex-col gap-4">
                {leftCards.map((card) => (
                  <motion.div
                    key={card.id}
                    variants={cardVariants}
                    whileHover={{ scale: 1.01, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="w-[163px] bg-white rounded-xl p-4 shadow-lg"
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 rounded-lg w-[65px]" style={{ backgroundColor: `${card.color}15` }}>
                        <img src={`${process.env.NEXT_PUBLIC_IMG_PATH}${card.icon}`} alt={card.title} />
                      </div>
                      <h3 className="font-semibold text-[13px] leading-snug figtree-font text-[#eb5905]">
                        {card.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col gap-4 ">
                {leftMiddleCards.map((card) => (
                  <motion.div
                    key={card.id}
                    variants={cardVariants}
                    whileHover={{ scale: 1.01, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="w-[163px] bg-white rounded-xl p-4 shadow-lg"
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 rounded-lg w-[65px]" style={{ backgroundColor: `${card.color}15` }}>
                        <img src={`${process.env.NEXT_PUBLIC_IMG_PATH}${card.icon}`} alt={card.title} />
                      </div>
                      <h3 className="font-semibold text-[13px] leading-snug figtree-font text-[#eb5905]">
                        {card.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Center: Graduate Image (Desktop only here) */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative px-8 pt-8">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/home/ab-n-1.webp`}
                  alt="Graduate Student"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-row gap-4 mb-8  items-center"
            >
              <div className="flex flex-col gap-4">
                {rightMiddleCards.map((card) => (
                  <motion.div
                    key={card.id}
                    variants={cardVariants2}
                    whileHover={{ scale: 1.01, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="w-[163px] bg-white rounded-xl p-4 shadow-lg"
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 rounded-lg w-[65px]" style={{ backgroundColor: `${card.color}15` }}>
                        <img src={`${process.env.NEXT_PUBLIC_IMG_PATH}${card.icon}`} alt={card.title} />
                      </div>
                      <h3 className="font-semibold text-[13px] leading-snug figtree-font text-[#eb5905]">
                        {card.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {rightCards.map((card) => (
                  <motion.div
                    key={card.id}
                    variants={cardVariants2}
                    whileHover={{ scale: 1.01, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="w-[163px] bg-white rounded-xl p-4 shadow-lg"
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 rounded-lg w-[65px]" style={{ backgroundColor: `${card.color}15` }}>
                        <img src={`${process.env.NEXT_PUBLIC_IMG_PATH}${card.icon}`} alt={card.title} />
                      </div>
                      <h3 className="font-semibold text-[13px] leading-snug figtree-font text-[#eb5905]">
                        {card.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Graduate Image for Mobile/Tablet (Bottom Center) ─────────────────────────── */}
          <motion.div
            variants={imageVariants2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:hidden relative"
          >
            <div className="w-[150px] md:w-[200px] mx-auto">
              <img
                src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/home/ab-n-1.webp`}
                alt="Graduate Student"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
