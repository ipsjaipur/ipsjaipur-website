'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, TrendingUp, Award, CheckCircle2, Star, Target, Zap } from 'lucide-react';

const ICON_MAP = {
  GraduationCap,
  Briefcase,
  TrendingUp,
  Award,
  CheckCircle2,
  Star,
  Target,
  Zap,
};

const CARD_COLOR = '#FF6B00';
const CARD_BG = '#FFF5ED';
const CARD_GRADIENT = 'from-orange-50 to-white';

export default function MbaFeatures({ data }) {
  const cards = [...(data.featureCards || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  return (
    <section
      aria-label="MBA Features"
      className="relative overflow-hidden py-[50px] md:py-[70px] lg:py-[90px] px-[16px]"
    >
      <div className="relative w-full max-w-330 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {cards.map((card, index) => {
            const IconComponent = ICON_MAP[card.iconName] || GraduationCap;

            return (
              <motion.div
                key={card._id || index}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
                className="group relative"
              >
                <div
                  className={`relative bg-gradient-to-br ${CARD_GRADIENT} rounded-2xl overflow-hidden h-full border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300`}
                >
                  {/* Decorative Background Element */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-30"
                    style={{ backgroundColor: CARD_COLOR }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-8 md:p-10 flex flex-col items-center text-center gap-5 md:gap-6">
                    {/* Icon */}
                    <motion.div transition={{ duration: 0.6, ease: 'easeInOut' }} className="relative">
                      <div className="p-5 bg-white md:p-6 rounded-2xl w-[85px] h-[85px] md:w-[95px] md:h-[95px] flex items-center justify-center shadow-md border border-gray-100 backdrop-blur-sm transition-all duration-300">
                        <IconComponent
                          className="w-[45px] h-[45px] md:w-[50px] md:h-[50px]"
                          style={{ color: CARD_COLOR }}
                          strokeWidth={2}
                        />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-bold text-[20px] md:text-[22px] lg:text-[24px] leading-tight figtree-font text-[#1E3A8A] transition-colors duration-300 group-hover:text-[#FF6B00]">
                      {card.title}
                    </h3>

                    {/* Decorative Divider */}
                    <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-50" />

                    {/* Description */}
                    <p className="text-[#4B5563] text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed figtree-font min-h-[80px] md:min-h-[100px]">
                      {card.description}
                    </p>

                    {/* Number Badge */}
                    <div className="absolute top-6 left-6 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm border border-gray-200">
                      <span className="text-[14px] font-bold figtree-font" style={{ color: CARD_COLOR }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
