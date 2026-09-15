'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cloudinaryImage } from '@/_utils/cloudinaryImage';

export default function InstitutionalSection({ data = {} }) {
  const heading = data.institutionalHeading || 'Shaping Practice & Transforming Careers';
  const quote =
    data.institutionalQuote ||
    '"Discover who you really are. Think independently. Find your own voice. IPS BUSINESS SCHOOL is one of Rajasthan\'s elite business schools shaping business practice and transforming careers across the globe."';
  const paragraph1 =
    data.institutionalParagraph1 ||
    "As one of Rajasthan's leading Business Schools, IPS BUSINESS SCHOOL brings together people, cultures and ideas to change lives and to transform organizations. A global perspective and cultural diversity are reflected in all aspects of our research and teaching.";
  const paragraph2 =
    data.institutionalParagraph2 ||
    'For over 18 years, IPS has been at the forefront of Management Education, developing and inspiring business leaders who strive to make a deep, positive and lasting impact on the people, companies, and society they serve.';
  const imageAlt = data.institutionalImageAlt || 'Shaping Practice & Transforming Careers - IPS Business School';

  // Cloudinary optimised — 550 px wide, auto format/quality
  const imageSrc = cloudinaryImage(data.institutionalImageUrl || '', 'f_auto,q_auto,w_550');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] } },
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] } },
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
          {/* Left Side — Content */}
          <motion.div className="lg:col-span-7" variants={slideInLeftVariants}>
            <div className="flex flex-col md:gap-10 gap-6">
              {/* Main Heading */}
              <motion.div variants={fadeInUpVariants} className="relative">
                <div className="absolute -top-6 md:-top-8 left-0 right-0 pointer-events-none overflow-hidden">
                  <h3
                    className="text-[40px] md:text-[60px] lg:text-[80px] font-black text-gray-500/10 rubik-fonts tracking-tight select-none whitespace-nowrap"
                    style={{ textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.02em' }}
                  >
                    Institutional
                  </h3>
                </div>
                <h2 className="relative text-[24px] md:text-[32px] lg:text-[38px] font-bold text-gray-900 rubik-fonts leading-tight">
                  {heading}
                </h2>
              </motion.div>

              {/* Quote Box */}
              <motion.div
                className="relative bg-white rounded-2xl p-4 border-l-[6px] border-[#FF6B00] group transition-all duration-300 mb-4"
                variants={fadeInUpVariants}
              >
                <p className="text-[15px] md:text-[20px] text-gray-700 leading-[1.9] rubik-fonts italic pl-2">
                  {quote}
                </p>
              </motion.div>

              {/* Content Paragraphs */}
              <motion.div className="md:space-y-8 space-y-4" variants={fadeInUpVariants}>
                {paragraph1 && (
                  <div className="transition-all duration-300">
                    <p className="text-[14px] md:text-[18px] text-gray-700 leading-[1.8] rubik-fonts">{paragraph1}</p>
                  </div>
                )}
                {paragraph2 && (
                  <div className="transition-all duration-300">
                    <p className="text-[14px] md:text-[18px] text-gray-700 leading-[1.8] rubik-fonts">{paragraph2}</p>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side — Image */}
          <motion.div className="lg:col-span-5" variants={slideInRightVariants}>
            <div className="relative w-full max-w-[550px] mx-auto lg:mx-0 lg:ml-auto md:p-0 p-2">
              <div className="relative">
                {/* Corner decorative borders */}
                <div className="absolute -top-3 -left-3 md:-top-5 md:-left-5 w-20 h-20 border-t-[6px] border-l-[6px] border-[#FF6B00] rounded-tl-[2rem] z-10" />
                <div className="absolute -bottom-3 -right-3 md:-bottom-5 md:-right-5 w-20 h-20 border-b-[6px] border-r-[6px] border-[#FF6B00] rounded-br-[2rem] z-10" />

                <motion.div
                  className="relative overflow-hidden rounded-[2rem] shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 z-10" />

                  {/* Shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                  />

                  <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 550px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                        <span className="text-orange-400 text-sm font-rubik">No image set</span>
                      </div>
                    )}
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
