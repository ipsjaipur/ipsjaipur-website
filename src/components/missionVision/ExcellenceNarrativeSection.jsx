'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target } from 'lucide-react';

// Static visual config — icons and colour tokens are not stored in DB
const CARD_CONFIG = {
  vision: {
    icon: Eye,
    gradient: 'from-orange-500 to-orange-600',
    bgGradient: 'from-orange-50/80 to-orange-100/50',
    iconBg: 'bg-gradient-to-br from-orange-100 to-orange-200',
    iconColor: 'text-orange-600',
    borderColor: 'border-orange-200',
    hoverBorder: 'hover:border-orange-400',
    labelColor: 'text-orange-500/15',
  },
  mission: {
    icon: Target,
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50/80 to-blue-100/50',
    iconBg: 'bg-gradient-to-br from-blue-100 to-blue-200',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    hoverBorder: 'hover:border-blue-400',
    labelColor: 'text-blue-500/15',
  },
};

// Fallback cards match the original static content exactly
const FALLBACK_CARDS = [
  {
    cardType: 'vision',
    label: 'Our Vision',
    title: 'Achieving Excellence in Professional Education',
    description:
      'To be a globally recognized institution of management and technical education that empowers individuals with cutting-edge techno-managerial capabilities, ethical leadership, and practical corporate mastery—driving economic progress and social transformation.',
    order: 0,
  },
  {
    cardType: 'mission',
    label: 'Our Mission',
    title: 'Employability & Social Responsibility',
    description:
      'Providing multi-level education with an emphasis on employability skills and nurturing social responsibility. The mission of IPS is to equip students for effective contributions in their chosen professions through affordable, high-quality, practical education.',
    order: 1,
  },
];

export default function ExcellenceNarrativeSection({ data = {} }) {
  const rawCards = data.visionMissionCards;
  const cards =
    rawCards && rawCards.length > 0 ? [...rawCards].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : FALLBACK_CARDS;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  return (
    <section className="relative px-[16px] py-[60px] lg:py-[100px] bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-100/20 via-transparent to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-100/20 via-transparent to-transparent rounded-full blur-3xl -z-10" />

      <motion.div
        className="w-full max-w-330 mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {cards.map((card, index) => {
            const cfg = CARD_CONFIG[card.cardType] || CARD_CONFIG.vision;
            const IconComponent = cfg.icon;

            return (
              <motion.div
                key={card._id || card.cardType || index}
                variants={cardVariants}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="group relative"
              >
                <div
                  className={`relative h-full bg-gradient-to-br ${cfg.bgGradient} backdrop-blur-sm border-2 ${cfg.borderColor} ${cfg.hoverBorder} rounded-2xl p-6 md:p-10 transition-all duration-500 overflow-hidden`}
                >
                  {/* Large Background Label */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <h2
                      className={`text-[44px] md:text-[60px] lg:text-[80px] font-black ${cfg.labelColor} rubik-fonts tracking-tight select-none`}
                      style={{ textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.02em' }}
                    >
                      {card.label}
                    </h2>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`inline-flex items-center justify-center md:w-16 w-[56px] h-[56px] md:h-16 md:w-20 md:h-20 ${cfg.iconBg} rounded-2xl mb-6 shadow-md group-hover:scale-110 transition-transform duration-500`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className={`w-8 h-8 md:w-10 md:h-10 ${cfg.iconColor}`} strokeWidth={2} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-[20px] md:text-[24px] lg:text-[26px] font-bold text-gray-900 rubik-fonts mb-4 leading-tight">
                      {card.title}
                    </h3>

                    {/* Divider */}
                    <div className={`w-16 h-1 bg-gradient-to-r ${cfg.gradient} rounded-full mb-5`} />

                    {/* Description */}
                    <p className="text-[14px] md:text-[16px] lg:text-[17px] text-gray-700 rubik-fonts leading-[1.8] tracking-wide">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Corner Number Badge */}
                  <div className="absolute bottom-4 right-4 flex items-center justify-center w-12 h-12 bg-white/60 backdrop-blur-sm rounded-full border border-white/40 shadow-lg">
                    <span
                      className={`text-[20px] font-bold bg-gradient-to-br ${cfg.gradient} bg-clip-text text-transparent`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
