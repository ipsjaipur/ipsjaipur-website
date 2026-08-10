'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Handshake, TrendingUp } from 'lucide-react';

export default function StrategicExcellence() {
  const excellenceData = [
    {
      icon: GraduationCap,
      title: 'Practical Pedagogy',
      description:
        'Emphasizing case study teaching methods, real time corporate simulations, and hands-on IT applications to ensure industry readiness.',
    },
    {
      icon: Handshake,
      title: 'Ethical Foundations',
      description:
        'Instilling strong traditional values, integrity, and social responsibility alongside functional management capabilities.',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Evolution',
      description:
        'Constantly updating course packages, integrating AI/ML and analytics certifications to meet dynamic corporate demands.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
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

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
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
    <section className="px-[16px] py-[40px] lg:py-[64px] bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        className="w-full max-w-[1320px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div className="text-center mb-12" variants={titleVariants}>
          <h2 className="text-[26px] md:text-[32px] lg:text-[36px] font-bold text-gray-900 rubik-fonts">
            Guided by <span className="text-[#FF6B00]">Strategic Excellence</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {excellenceData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div key={index} variants={cardVariants} className="group">
                <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 h-full hover:shadow-xl hover:border-[#FF6B00]/30 transition-all duration-300">
                  {/* Icon */}
                  <div className="mb-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-7 h-7 text-[#FF6B00]" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 rubik-fonts mb-3">{item.title}</h3>

                  {/* Description */}
                  <p className="text-[14px] md:text-[15px] text-gray-600 rubik-fonts leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
