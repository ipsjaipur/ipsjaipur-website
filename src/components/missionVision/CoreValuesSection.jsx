'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, HeartPulse, Users, Lightbulb } from 'lucide-react';

export default function CoreValuesSection() {
  const coreValues = [
    {
      id: 1,
      icon: Shield,
      title: 'Integrity',
      description: 'Absolute transparency in academic standards, admissions, and institutional operations.',
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50/80 to-orange-50/60',
      iconBg: 'bg-gradient-to-br from-yellow-100 to-orange-100',
      iconColor: 'text-yellow-600',
      borderColor: 'border-yellow-200',
      hoverBorder: 'hover:border-yellow-400',
      hoverShadow: 'hover:shadow-yellow-200/50',
    },
    {
      id: 2,
      icon: HeartPulse,
      title: 'Holistic Health',
      description: 'Balancing physical, mental, emotional, spiritual, and social development across campus life.',
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50/80 to-pink-50/60',
      iconBg: 'bg-gradient-to-br from-red-100 to-pink-100',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200',
      hoverBorder: 'hover:border-red-400',
      hoverShadow: 'hover:shadow-red-200/50',
    },
    {
      id: 3,
      icon: Users,
      title: 'Social Responsibility',
      description:
        'Educating leaders committed to ethical governance, community service, and environmental stewardship.',
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50/80 to-amber-50/60',
      iconBg: 'bg-gradient-to-br from-orange-100 to-amber-100',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200',
      hoverBorder: 'hover:border-orange-400',
      hoverShadow: 'hover:shadow-orange-200/50',
    },
    {
      id: 4,
      icon: Lightbulb,
      title: 'Agility & Innovation',
      description:
        'Embracing AI, business analytics, and digital tools to stay at the forefront of global management education.',
      gradient: 'from-yellow-500 to-yellow-600',
      bgGradient: 'from-yellow-50/80 to-yellow-100/60',
      iconBg: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
      iconColor: 'text-yellow-600',
      borderColor: 'border-yellow-200',
      hoverBorder: 'hover:border-yellow-400',
      hoverShadow: 'hover:shadow-yellow-200/50',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
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
    <section className="relative px-[16px] py-[60px] lg:py-[100px]  overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div
        className="w-full max-w-330 mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div className="text-center mb-12 lg:mb-16 relative" variants={titleVariants}>
          {/* Large Background Text */}
          <div className="absolute -top-5 left-0 right-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <h3
              className="text-[40px] md:text-[60px] lg:text-[80px] font-black text-gray-500/8 rubik-fonts tracking-tight select-none whitespace-nowrap"
              style={{
                textTransform: 'uppercase',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              The IPS DNA
            </h3>
          </div>

          <h2 className="relative text-[28px] md:text-[36px] lg:text-[42px] font-bold text-gray-900 rubik-fonts mb-4">
            Our Core Values
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mx-auto"></div>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {coreValues.map((value) => {
            const IconComponent = value.icon;
            return (
              <motion.div key={value.id} variants={cardVariants} className="group">
                <motion.div
                  className={`relative h-full bg-gradient-to-br ${value.bgGradient} backdrop-blur-sm border-2 ${value.borderColor} ${value.hoverBorder} rounded-2xl p-6 md:p-8 transition-all duration-500 overflow-hidden`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon Container */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 ${value.iconBg} rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-500`}
                      whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className={`w-8 h-8 md:w-10 md:h-10 ${value.iconColor}`} strokeWidth={2} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-[18px] md:text-[20px] lg:text-[22px] font-bold text-gray-900 rubik-fonts mb-3 leading-tight">
                      {value.title}
                    </h3>

                    {/* Divider */}
                    <div className={`w-12 h-1 bg-gradient-to-r ${value.gradient} rounded-full mb-4`}></div>

                    {/* Description */}
                    <p className="text-[13px] md:text-[14px] lg:text-[15px] text-gray-700 rubik-fonts leading-[1.7] tracking-wide">
                      {value.description}
                    </p>
                  </div>

                  {/* Bottom Decorative Element */}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
