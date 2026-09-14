'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { cloudinaryImage } from '@/_utils/cloudinaryImage';

export default function MbaVsPgdmContentSection({ data }) {
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

  const card1LogoUrl = cloudinaryImage(data.card1LogoUrl || '', 'f_auto,q_auto,w_100');
  const card2LogoUrl = cloudinaryImage(data.card2LogoUrl || '', 'f_auto,q_auto,w_100');

  const card1SubtitleClass = data.card1SubtitleColor === 'orange' ? 'text-orange-600' : 'text-blue-600';

  const card2SubtitleClass = data.card2SubtitleColor === 'orange' ? 'text-orange-600' : 'text-blue-600';

  return (
    <section className="px-[16px] lg:py-[84px] py-[64px] relative overflow-hidden">
      <motion.div
        className="w-full max-w-330 mx-auto relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Content Grid */}
        <div className="md:flex justify-between lg:gap-18 gap-16">
          <motion.div
            variants={fadeInUpVariants}
            className="space-y-4 w-full sm:sm:max-w-2xl xl:max-w-249.5 md:mb-0 mb-12"
          >
            {/* Main Heading Section */}
            <motion.div variants={fadeInUpVariants} className="mb-6 relative">
              {/* Large Background Text */}
              <div className="absolute lg:-top-8 -top-4 left-0 right-0 flex items-start pointer-events-none overflow-hidden">
                <h3
                  className="text-[28px] md:text-[40px] lg:text-[60px] font-black text-gray-500/8 tracking-tight select-none whitespace-nowrap"
                  style={{ lineHeight: 1, letterSpacing: '-0.02em' }}
                >
                  {data.backgroundWatermarkText}
                </h3>
              </div>

              <h2 className="relative text-[24px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 rubik-fonts leading-tight mb-4">
                {data.mainHeading}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mb-6"></div>
              <p className="text-[14px] md:text-[18px] text-gray-600 leading-[1.8] rubik-fonts max-w-4xl mx-auto">
                {data.introParagraph}
              </p>
            </motion.div>

            <p
              className="text-[14px] md:text-[18px] text-gray-600 leading-[1.9] rubik-fonts mb-4"
              dangerouslySetInnerHTML={{ __html: data.paragraph2 }}
            />
            <p
              className="text-[14px] md:text-[18px] text-gray-600 leading-[1.9] rubik-fonts"
              dangerouslySetInnerHTML={{ __html: data.paragraph3 }}
            />

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
              {/* Card 1 */}
              <motion.div variants={fadeInUpVariants}>
                <div className="bg-white rounded-md p-4 shadow-md border border-gray-200 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                      {card1LogoUrl && (
                        <img src={card1LogoUrl} alt={data.card1Title} className="w-full h-full object-contain" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-[14px] md:text-[14px] font-bold text-gray-900 rubik-fonts">
                        {data.card1Title}
                      </h3>
                      <span className={`text-[13px] md:text-[14px] font-medium rubik-fonts ${card1SubtitleClass}`}>
                        {data.card1Subtitle}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div variants={fadeInUpVariants}>
                <div className="bg-white rounded-md p-4 shadow-md border border-gray-200 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                      {card2LogoUrl && (
                        <img src={card2LogoUrl} alt={data.card2Title} className="w-full h-full object-contain" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-[14px] md:text-[14px] font-bold text-gray-900 rubik-fonts">
                        {data.card2Title}
                      </h3>
                      <span className={`text-[13px] md:text-[14px] font-medium rubik-fonts ${card2SubtitleClass}`}>
                        {data.card2Subtitle}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right dark card — IPS Hybrid Solution */}
          <motion.div variants={fadeInUpVariants} className="w-full md:max-w-[500px]">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl h-full flex flex-col justify-center relative overflow-hidden w-full">
              <div className="relative z-10">
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 text-xs font-bold px-4 py-2 rounded-full mb-4">
                  {data.hybridBadgeText}
                </div>
                <h3 className="text-[22px] md:text-[26px] font-bold text-white rubik-fonts mb-4 leading-tight">
                  {data.hybridHeading}
                </h3>
                <p
                  className="text-[14px] md:text-[16px] text-gray-300 leading-[1.8] rubik-fonts mb-6"
                  dangerouslySetInnerHTML={{ __html: data.hybridDescription }}
                />
                <a
                  href={data.hybridCtaHref}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-bold text-[14px] md:text-[16px] rubik-fonts hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl group mt-6"
                >
                  {data.hybridCtaText}
                  <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
