'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function IpsSutraContentSection() {
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
      {/* Decorative Background Elements */}
      <div className="absolute top-10 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-100/30 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl -z-10"></div>

      <motion.div
        className="w-full max-w-[1320px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div className="lg:col-span-7 order-2 lg:order-1" variants={slideInLeftVariants}>
            <div className="flex flex-col gap-4">
              {/* Main Heading with Background Text */}
              <motion.div variants={fadeInUpVariants} className="relative">
                <h2 className="relative text-[20px] md:text-[22px] lg:text-[24px] font-bold text-gray-900 rubik-fonts leading-tight">
                  आईपीएस सूत्र
                </h2>
              </motion.div>

              {/* Content Section */}
              <motion.div className="space-y-2" variants={fadeInUpVariants}>
                <p className="text-[14px] md:text-[18px] text-gray-500 leading-[1.9] rubik-fonts mb-4">
                  <strong>आईपीएस बिज़नेस स्कूल का बीबीए प्रोग्राम </strong> एक <strong>UGC </strong>द्वारा प्रदान किया
                  जाने वाला 3 वर्षीय <strong>Degree Program</strong> है जिसके अंतर्गत विद्यार्थी के व्यक्तित्व के
                  सम्पूर्ण विकास के लिए शिक्षा वर्ग के विद्वानों और व्यापार जगत के सफल व्यक्तियों द्वारा specialized
                  session लिए जाते है |
                </p>

                <p className="text-[14px] md:text-[18px] text-gray-500 leading-[1.9] rubik-fonts mb-4">
                  व्यापार जगत को एक कमी कई वर्षो से महसूस होती रही है कि रोजगार के लिए उपलब्द्ध विध्यार्थी शैक्षणिक
                  दृष्टिकोण से तो उपयुक्त होते है किन्तु व्यापारिक परिदृश्य में परिपक्व नहीं होते |
                </p>

                <p className="text-[14px] md:text-[18px] text-gray-500 leading-[1.9] rubik-fonts mb-4">
                  <strong> आईपीएस बिज़नेस स्कूल </strong> में इस विसंगति को दूर करने के लिए एक अनूठे 3 वर्षीय{' '}
                  <strong> बीबीए प्रोग्राम </strong> की शुरुआत की है इसके अंतर्गत विध्यार्थी को <strong> बीबीए </strong>{' '}
                  की शिक्षा के साथ – साथ व्यापार जगत में कार्य करने का अनुभव भी मिलता है |
                </p>

                <p className="text-[14px] md:text-[18px] text-gray-500 leading-[1.9] rubik-fonts mb-4">
                  शिक्षा और व्यवसायिक अनुभव के इस अनोखे संगम से विद्यार्थी को प्रबंधन की जानकारी और व्यापार जगत में
                  <strong> experience </strong> करने का अवसर मिलता है, जिसके फलस्वरूप <strong> बीबीए प्रोग्राम </strong>{' '}
                  को पूर्ण करने की पश्चात व्यापार जगत को एक ऐसा प्रबंधक मिलता है जो व्यापारिक प्रबंधन के द्रिस्टीकोण से
                  एक निपुण प्रबंधक होता है और वह व्यापार के बारीकियों और उतार – चढ़ाव का अनुभव ले चुका होता है, और वह
                  व्यापार जगत की जिम्मेदारियों और चुनोतियो का सामना करने के लिए पूर्ण रूप से तैयार होता है |
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={fadeInUpVariants}>
                <Link
                  href="https://admissions.ipsedu.in/"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-[16px] rubik-fonts hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  Start Journey Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div className="lg:col-span-5 order-1 lg:order-2" variants={slideInRightVariants}>
            <div className="relative w-full max-w-[550px] mx-auto lg:mx-0 lg:ml-auto md:p-0 p-2">
              {/* Animated Gradient Glow Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-300/30 via-purple-300/20 to-blue-300/30 rounded-[3rem] blur-2xl"
                animate={{
                  scale: [1, 1.08, 1],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              ></motion.div>

              {/* Main Image Container */}
              <div className="relative">
                {/* Corner Decorative Borders */}
                <div className="absolute -top-3 -left-3 md:-top-5 md:-left-5 w-20 h-20 border-t-[6px] border-l-[6px] border-[#FF6B00] rounded-tl-[2rem] z-10"></div>
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
                      src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/about/bba-ab.webp`}
                      alt="IPS Sutra - Skill Development Program"
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
