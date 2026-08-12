'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Laptop,
  Trophy,
  GraduationCap,
  HandCoins,
  BrainCircuit,
  Plane,
  Factory,
  BadgeIndianRupee,
  Languages,
  BadgeCheck,
  Presentation,
  UserRoundCheck,
  MessagesSquare,
} from 'lucide-react';

export default function IpsAdvantagesSection() {
  const advantages = [
    {
      icon: GraduationCap,
      text: 'व्यवसायिक प्रशिक्षण सहित पाठ्यक्रम',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: HandCoins,
      text: 'प्रशिक्षण के साथ भुगतान',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: BrainCircuit,
      text: 'क्षमता निर्माण के साथ-साथ ज्ञान संचय',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Plane,
      text: '2 महीने का अंतर्राष्ट्रीय प्रशिक्षण (Sponsored*)',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Factory,
      text: 'नियमित उद्योगों और कंपनियों का दौरा',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: BadgeIndianRupee,
      text: 'सस्ती शुल्क संरचना',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Languages,
      text: 'अंतर्राष्ट्रीय भाषा का ज्ञान',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: BadgeCheck,
      text: 'औद्योगिक शिक्षा प्रमाणपत्र',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Presentation,
      text: 'प्रभावी प्रबंधकीय LAB',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: UserRoundCheck,
      text: 'कॉर्पोरेट सेक्टर से मार्गदर्शन',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Laptop,
      text: 'Free Laptop*',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: MessagesSquare,
      text: 'Soft Skills LAB',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Trophy,
      text: 'A+ श्रेणी का प्रबंधन संस्थान',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
  };

  return (
    <section className="px-[16px] lg:py-[84px] py-[40px] bg-gradient-to-br from-slate-50 via-white to-orange-50/30 relative overflow-hidden">
      <motion.div
        className="w-full max-w-330 mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-6"
          variants={headingVariants}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <h2 className="relative text-[28px] md:text-[36px] lg:text-[42px] font-bold text-gray-900 rubik-fonts">
                IPS{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                  Advantages
                </span>
              </h2>
            </div>
          </div>
          <motion.a
            variants={buttonVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://admissions.ipsedu.in/"
            target="_blank"
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-[16px] rubik-fonts hover:shadow-xl transition-all duration-300 flex items-center gap-2 group shadow-lg hover:from-orange-600 hover:to-orange-700"
          >
            Apply Now
          </motion.a>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5"
          variants={containerVariants}
        >
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.1 },
                }}
                className="group relative bg-white rounded-2xl p-4 shadow-sm transition-all duration-300 border border-gray-100 hover:border-orange-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-blue-50/0 group-hover:from-orange-50/50 group-hover:to-blue-50/30 rounded-2xl transition-all duration-300 -z-10"></div>
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${advantage.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </motion.div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${advantage.color} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                    ></div>
                  </div>
                  <p className="text-[15px] md:text-[16px] text-gray-700 font-medium rubik-fonts leading-relaxed flex-1 group-hover:text-gray-900 transition-colors">
                    {advantage.text}
                  </p>
                </div>
                {/* <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-100/0 group-hover:from-orange-100/50 to-transparent rounded-br-2xl transition-all duration-300"></div> */}
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
