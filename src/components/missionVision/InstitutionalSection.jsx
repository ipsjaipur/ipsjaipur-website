'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GraduationCap } from 'lucide-react';

export default function InstitutionalSection() {
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

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section className="px-[16px] lg:py-[84px] py-[40px] bg-gradient-to-br from-white via-orange-50/20 to-blue-50/20 relative overflow-hidden">
      <motion.div
        className="w-full max-w-330 mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div className="lg:col-span-7 " variants={slideInLeftVariants}>
            <div className="flex flex-col md:gap-10 gap-6">
              {/* Main Heading */}
              <motion.div variants={fadeInUpVariants} className="relative">
                {/* Large Background Text */}
                <div className="absolute -top-6 md:-top-8 left-0 right-0 pointer-events-none overflow-hidden">
                  <h3
                    className="text-[40px] md:text-[60px] lg:text-[80px] font-black text-gray-500/10 rubik-fonts tracking-tight select-none whitespace-nowrap"
                    style={{
                      textTransform: 'uppercase',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Institutional
                  </h3>
                </div>

                <h2 className="relative text-[24px] md:text-[32px] lg:text-[38px] font-bold text-gray-900 rubik-fonts leading-tight">
                  Shaping Practice & Transforming Careers
                </h2>
              </motion.div>

              {/* Quote Box with Enhanced Design */}
              <motion.div
                className="relative bg-white rounded-2xl p-4 border-l-[6px] border-[#FF6B00] group transition-all duration-300 mb-4"
                variants={fadeInUpVariants}
              >
                <p className="text-[15px] md:text-[20px] text-gray-700 leading-[1.9] rubik-fonts italic pl-2">
                  "Discover who you really are. Think independently. Find your own voice. IPS BUSINESS SCHOOL is one of
                  Rajasthan's elite business schools shaping business practice and transforming careers across the
                  globe."
                </p>
              </motion.div>

              {/* Content Paragraphs with Card Design */}
              <motion.div className="md:space-y-8 space-y-4" variants={fadeInUpVariants}>
                <div className="transition-all duration-300">
                  <p className="text-[14px] md:text-[18px] text-gray-700 leading-[1.8] rubik-fonts">
                    As one of Rajasthan's leading Business Schools, IPS BUSINESS SCHOOL brings together people, cultures
                    and ideas to change lives and to transform organizations. A global perspective and cultural
                    diversity are reflected in all aspects of our research and teaching.
                  </p>
                </div>

                <div className="transition-all duration-300">
                  <p className="text-[14px] md:text-[18px] text-gray-700 leading-[1.8] rubik-fonts">
                    For over 18 years, IPS has been at the forefront of Management Education, developing and inspiring
                    business leaders who strive to make a deep, positive and lasting impact on the people, companies,
                    and society they serve.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Enhanced Image */}
          <motion.div className="lg:col-span-5" variants={slideInRightVariants}>
            <div className="relative w-full max-w-[550px] mx-auto lg:mx-0 lg:ml-auto md:p-0 p-2">
              {/* Main Image Container */}
              <div className="relative">
                {/* Corner Decorative Borders */}
                <div className="absolute -top-3 -left-3 md:-top-5  md:-left-5 w-20 h-20 border-t-[6px] border-l-[6px] border-[#FF6B00] rounded-tl-[2rem] z-10"></div>
                <div className="absolute -bottom-3 -right-3 md:-bottom-5 md:-right-5 w-20 h-20 border-b-[6px] border-r-[6px] border-[#FF6B00] rounded-br-[2rem] z-10"></div>

                {/* Image with Advanced Effects */}
                <motion.div
                  className="relative overflow-hidden rounded-[2rem] shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glass Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 z-10"></div>

                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: 'easeInOut',
                    }}
                  ></motion.div>

                  <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/about/ab-image.webp`}
                      alt="Shaping Practice & Transforming Careers - IPS Business School"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 550px"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
