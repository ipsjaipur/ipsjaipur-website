'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, TrendingUp } from 'lucide-react';

export default function MbaVsPgdmContentSection() {
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
                  style={{
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Strategic Decision
                </h3>
              </div>

              <h2 className="relative text-[24px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 rubik-fonts leading-tight mb-4">
                University MBA vs. Autonomous PGDM
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mb-6"></div>
              <p className="text-[14px] md:text-[18px] text-gray-600 leading-[1.8] rubik-fonts max-w-4xl mx-auto">
                Making the right choice between a Master of Business Administration (MBA) degree and a Post Graduate
                Diploma in Management (PGDM) is pivotal for management aspirants.
              </p>
            </motion.div>
            <p className="text-[14px] md:text-[18px] text-gray-600 leading-[1.9] rubik-fonts mb-4">
              While <strong>traditional university MBA degrees</strong> provide statutory legal security, government job
              eligibility, and worldwide academic recognition for Ph.D. studies, autonomous PGDM diplomas emphasize
              practical industry exposure.
            </p>
            <p className="text-[14px] md:text-[18px] text-gray-600 leading-[1.9] rubik-fonts">
              <strong>IPS Business School</strong>, this dilemma is resolved by offering the{' '}
              <strong>IPS Hybrid Solution</strong> - a program that delivers maximum ROI at an affordable fee.
            </p>
            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
              {/* AICTE Approved Card */}
              <motion.div variants={fadeInUpVariants}>
                <div className="bg-white rounded-md p-4 shadow-md border border-gray-200 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <img src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/home/aicte.webp`} />
                    </div>
                    <div>
                      <h3 className="text-[14px] md:text-[14px] font-bold text-gray-900 rubik-fonts">AICTE Approved</h3>
                      <span className="text-[13px] md:text-[14px] font-medium text-blue-600 rubik-fonts">
                        Govt. of India Statutory Body
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={fadeInUpVariants}>
                <div className="bg-white rounded-md p-4 shadow-md border border-gray-200 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <img src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/home/rtu.webp`} />
                    </div>
                    <div>
                      <h3 className="text-[14px] md:text-[14px] font-bold text-gray-900 rubik-fonts">RTU Affiliated</h3>
                      <span className="text-[13px] md:text-[14px] font-medium text-orange-600 rubik-fonts">
                        UGC Recognized University Degree
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUpVariants} className="w-full md:max-w-[500px]">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl h-full flex flex-col justify-center relative overflow-hidden w-full">
              {/* Decorative Elements */}

              <div className="relative z-10">
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 text-xs font-bold px-4 py-2 rounded-full mb-4">
                  The IPS Hybrid Solution
                </div>
                <h3 className="text-[22px] md:text-[26px] font-bold text-white rubik-fonts mb-4 leading-tight">
                  Get the Best of Both Worlds
                </h3>
                <p className="text-[14px] md:text-[16px] text-gray-300 leading-[1.8] rubik-fonts mb-6">
                  Why compromise? At IPS Business School, students earn a{' '}
                  <strong className="text-white">UGC-recognized University MBA Degree*</strong> while undergoing{' '}
                  <strong className="text-white">**100% Practical Corporate OJTA*</strong>, attends, and executive
                  mentorship - delivering maximum ROI at an affordable fee.
                </p>

                <a
                  href="/mba"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-bold text-[14px] md:text-[16px] rubik-fonts hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl group mt-6"
                >
                  Explore MBA Program
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
