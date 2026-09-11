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
  CheckCircle2,
  School,
  Briefcase,
  Bot,
  TrendingUp,
  Megaphone,
  Globe,
  Users,
  Building2,
  Network,
  MessageSquare,
  DollarSign,
  BookOpen,
  Dumbbell,
  Lightbulb,
  Handshake,
  Star,
  Zap,
  Target,
  Award,
  Heart,
  Shield,
  Cpu,
  BarChart,
  FlaskConical,
  Rocket,
  Layers,
  Eye,
  Clock,
  MapPin,
  Phone,
  Mail,
  Tag,
  Flame,
  Leaf,
  Compass,
} from 'lucide-react';

// Map iconName strings to Lucide components
const ICON_MAP = {
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
  CheckCircle2,
  School,
  Briefcase,
  Bot,
  TrendingUp,
  Megaphone,
  Globe,
  Users,
  Building2,
  Network,
  MessageSquare,
  DollarSign,
  BookOpen,
  Dumbbell,
  Lightbulb,
  Handshake,
  Star,
  Zap,
  Target,
  Award,
  Heart,
  Shield,
  Cpu,
  BarChart,
  FlaskConical,
  Rocket,
  Layers,
  Eye,
  Clock,
  MapPin,
  Phone,
  Mail,
  Tag,
  Flame,
  Leaf,
  Compass,
};

// Static fallback advantages — used when DB has no data
const STATIC_ADVANTAGES = [
  { iconName: 'GraduationCap', text: 'व्यवसायिक प्रशिक्षण सहित पाठ्यक्रम', color: 'from-orange-500 to-orange-600' },
  { iconName: 'HandCoins', text: 'प्रशिक्षण के साथ भुगतान', color: 'from-blue-500 to-blue-600' },
  { iconName: 'BrainCircuit', text: 'क्षमता निर्माण के साथ-साथ ज्ञान संचय', color: 'from-orange-500 to-orange-600' },
  { iconName: 'Plane', text: '2 महीने का अंतर्राष्ट्रीय प्रशिक्षण (Sponsored*)', color: 'from-blue-500 to-blue-600' },
  { iconName: 'Factory', text: 'नियमित उद्योगों और कंपनियों का दौरा', color: 'from-orange-500 to-orange-600' },
  { iconName: 'BadgeIndianRupee', text: 'सस्ती शुल्क संरचना', color: 'from-blue-500 to-blue-600' },
  { iconName: 'Languages', text: 'अंतर्राष्ट्रीय भाषा का ज्ञान', color: 'from-orange-500 to-orange-600' },
  { iconName: 'BadgeCheck', text: 'औद्योगिक शिक्षा प्रमाणपत्र', color: 'from-blue-500 to-blue-600' },
  { iconName: 'Presentation', text: 'प्रभावी प्रबंधकीय LAB', color: 'from-orange-500 to-orange-600' },
  { iconName: 'UserRoundCheck', text: 'कॉर्पोरेट सेक्टर से मार्गदर्शन', color: 'from-blue-500 to-blue-600' },
  { iconName: 'Laptop', text: 'Free Laptop*', color: 'from-orange-500 to-orange-600' },
  { iconName: 'MessagesSquare', text: 'Soft Skills LAB', color: 'from-blue-500 to-blue-600' },
  { iconName: 'Trophy', text: 'A+ श्रेणी का प्रबंधन संस्थान', color: 'from-orange-500 to-orange-600' },
];

export default function IpsAdvantagesSection({ advantagesData = {} }) {
  const heading = advantagesData.advantagesHeading || 'IPS Advantages';
  const applyText = advantagesData.advantagesApplyText || 'Apply Now';
  const applyHref = advantagesData.advantagesApplyHref || 'https://admissions.ipsedu.in/';

  // Use DB advantages if available, sorted by order; otherwise fall back to static list
  const rawAdvantages =
    advantagesData.advantages?.length > 0
      ? [...advantagesData.advantages].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : STATIC_ADVANTAGES;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } },
  };

  // Split heading into base + highlighted last word (matches original "IPS Advantages" style)
  const headingParts = heading.split(' ');
  const headingBase = headingParts.slice(0, -1).join(' ');
  const headingLast = headingParts[headingParts.length - 1];

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
                {headingBase}
                {headingBase ? ' ' : ''}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                  {headingLast}
                </span>
              </h2>
            </div>
          </div>
          <motion.a
            variants={buttonVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={applyHref}
            target="_blank"
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-[16px] rubik-fonts hover:shadow-xl transition-all duration-300 flex items-center gap-2 group shadow-lg hover:from-orange-600 hover:to-orange-700"
          >
            {applyText}
          </motion.a>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5"
          variants={containerVariants}
        >
          {rawAdvantages.map((advantage, index) => {
            const IconComponent = ICON_MAP[advantage.iconName] || Lightbulb;
            const color = advantage.color || 'from-orange-500 to-orange-600';
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -2, transition: { duration: 0.1 } }}
                className="group relative bg-white rounded-2xl p-4 shadow-sm transition-all duration-300 border border-gray-100 hover:border-orange-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-blue-50/0 group-hover:from-orange-50/50 group-hover:to-blue-50/30 rounded-2xl transition-all duration-300 -z-10"></div>
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </motion.div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${color} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                    ></div>
                  </div>
                  <p className="text-[15px] md:text-[16px] text-gray-700 font-medium rubik-fonts leading-relaxed flex-1 group-hover:text-gray-900 transition-colors">
                    {advantage.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
