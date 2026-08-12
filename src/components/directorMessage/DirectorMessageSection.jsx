'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DirectorMessageSection() {
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
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="px-[16px] lg:py-[84px] py-[40px]">
      <motion.div
        className="w-full max-w-330 mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div variants={fadeInUpVariants}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left Side - Director Image */}
            <div className="lg:col-span-4">
              <div className="relative w-full max-w-[450px] mx-auto lg:mx-0">
                {/* Decorative Frame */}
                <div className="relative">
                  {/* Top-Left Corner Border */}
                  <div className="absolute -top-3 -left-3 w-20 h-20 border-t-[4px] border-l-[4px] border-[#FF6B00] rounded-tl-2xl z-10"></div>

                  {/* Bottom-Right Corner Border */}
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-[4px] border-r-[4px] border-[#FF6B00] rounded-br-2xl z-10"></div>

                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-lg shadow-2xl">
                    <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/about/director.jpg`}
                        alt="Dr. Deepti Agrawal - Director, IPS Business School"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 450px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Message Content */}
            <div className="lg:col-span-8">
              <div className="flex flex-col gap-6">
                {/* Main Heading */}
                <div>
                  <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-gray-900 rubik-fonts leading-tight uppercase">
                    "IPS Business School is Established with a Clear Mission as Supported by its Name — Institute of
                    Professional Studies."
                  </h2>
                </div>

                {/* Highlighted Quote Box */}
                <div className="bg-gradient-to-r from-orange-50 to-white border-l-[6px] border-[#FF6B00] pl-6 pr-4 py-6 rounded-r-lg shadow-sm">
                  <p className="text-[14px] md:text-[16px] text-gray-700 leading-[1.8] text-justify rubik-fonts">
                    "At IPS, we focus on transforming students into true professionals through modern, practical
                    management education combined with strong traditional values. Our mission evolves with changing
                    times, ensuring academic excellence, social responsibility, and industry relevance through updated
                    courses, experienced faculty, case-based learning, and advanced IT infrastructure."
                  </p>
                </div>

                {/* Philosophy Section */}
                <div>
                  <p className="text-[14px] md:text-[16px] text-gray-700 leading-[1.8] text-justify rubik-fonts">
                    We believe a successful professional is shaped through intellectual growth, ethical values,
                    co-curricular engagement, and community involvement. Guided by the 'IPS Philosophy', our students
                    develop leadership qualities, organizational loyalty, and human values that help them stand out in
                    the competitive corporate world. We extend our best wishes to all students for a bright and
                    successful future.
                  </p>
                </div>

                {/* Director Name at Bottom Right */}
                <div className="mt-6 text-right">
                  <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 rubik-fonts">Dr. Deepti Agrawal</h3>
                  <p className="text-[14px] md:text-[15px] text-gray-600 rubik-fonts mt-1">
                    (Director, IPS Business School)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
