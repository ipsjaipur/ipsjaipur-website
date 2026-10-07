'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays,
  MapPin,
  Download,
  ClipboardList,
  Lightbulb,
  Copyright,
  BadgeCheck,
  Palette,
  ShieldCheck,
  BookOpen,
  Users,
  Star,
  Globe,
  TrendingUp,
  Lock,
  FileText,
  ChevronDown,
  ArrowRight,
  Building2,
  GraduationCap,
  Scale,
  Rocket,
  Cpu,
  FlaskConical,
  Briefcase,
  Microscope,
  PenTool,
  Zap,
  Heart,
  Target,
} from 'lucide-react';

// ─── Icon resolver ─────────────────────────────────────────────────────────────
const ICON_MAP = {
  Lightbulb,
  Copyright,
  BadgeCheck,
  Palette,
  ShieldCheck,
  BookOpen,
  Users,
  Star,
  Globe,
  TrendingUp,
  Lock,
  FileText,
  ArrowRight,
  Building2,
  GraduationCap,
  Scale,
  CalendarDays,
  MapPin,
  Download,
  ClipboardList,
  ChevronDown,
  Rocket,
  Cpu,
  FlaskConical,
  Briefcase,
  Microscope,
  PenTool,
  Zap,
  Heart,
  Target,
};
function getIcon(name) {
  return ICON_MAP[name] || Star;
}

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: 'easeOut' },
  }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.75 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' },
  }),
};

// ─── FAQ accordion ─────────────────────────────────────────────────────────────
function FaqItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index * 0.35}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-slate-800 font-semibold text-[15px]">{faq.question}</span>
        <ChevronDown
          size={18}
          className={`text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FaqList({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <FaqItem
          key={i}
          faq={faq}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex((p) => (p === i ? null : i))}
        />
      ))}
    </div>
  );
}

// ─── Main light-theme component ───────────────────────────────────────────────
export default function IprSeminarPageLight({ data = {} }) {
  const {
    brochurePdfUrl = '/images/brochure/IPS_IPR_International_Seminar_Brochure.pdf',
    brochureDownloadName = 'IPS-IPR-Seminar-Brochure.pdf',
    heroBadgeText = 'IPS Business School & IPS College · 9 October 2026',
    heroSuperText = 'International Seminar on',
    heroTitleLine1 = 'Intellectual',
    heroTitleLine2 = 'Property',
    heroTitleHighlight = 'Rights',
    heroSubtitle = 'Ideas Today. Impact Tomorrow.',
    heroDescription = 'Understand Patents, Copyrights, Trademarks, Designs and Intellectual Property Rights — and how they can help protect ideas, creativity and innovation.',
    heroDate = '9 October 2026',
    heroDaytime = 'Friday · 8:00 AM onwards',
    heroVenueName = 'IPS College',
    heroVenueCity = 'Jaipur, Rajasthan',
    heroEntryBadge = 'Free Entry',
    heroEntryBadgeSub = 'All Welcome',
    heroRegisterButtonText = 'Register Now — Free',
    heroRegisterButtonLink = 'https://forms.gle/1BjmWr9vKXE5ckx29',
    heroBrochureButtonText = 'Download Brochure',
    heroPosterImageUrl = '/images/poster-img.webp',
    heroPosterDownloadText = 'Download Poster',
    heroTrustBadges = ['AICTE Approved', 'RTU Affiliated'],
    topicsHeading = 'Know What You Can Protect.',
    topicsSubheading = 'Topics Covered',
    topics = [],
    aboutSuperText = 'About the Event',
    aboutHeading = 'Your Idea Has Value. Do You Know How to Protect It?',
    aboutParagraph1 = '',
    aboutParagraph2 = '',
    aboutImageUrl = '/images/event-img-2.webp',
    aboutAttendeesCount = '500+',
    aboutAttendeesLabel = 'Attendees',
    aboutAttendeesSubLabel = 'Expected',
    takeawaysSuperText = 'What You Will Take Away',
    takeawaysHeading = 'Turn Your Ideas Into Protected Assets.',
    takeawaysDescription = '',
    takeaways = [],
    audienceSuperText = 'Open For All',
    audienceHeading = 'This Seminar Is For You If You Are…',
    audienceDescription = '',
    audience = [],
    agendaSuperText = 'What to Expect',
    agendaHeading = 'One Seminar. Multiple Perspectives.',
    agendaRegisterButtonText = 'Register now →',
    highlights = [],
    eventDetailsSuperText = 'Mark Your Calendar',
    eventDetailsHeading = 'Event Details',
    eventDetailRows = [],
    faqSuperText = 'Got Questions?',
    faqHeading = 'Frequently Asked Questions',
    faqDescription = '',
    faqs = [],
    ctaBadgeText = '9 October 2026 · IPS College, Jaipur',
    ctaHeading = 'Have an Idea? Know How to Protect It.',
    ctaDescription = '',
    ctaRegisterButtonText = 'Register Now →',
    ctaRegisterButtonLink = 'https://forms.gle/1BjmWr9vKXE5ckx29',
    ctaBrochureButtonText = 'Download Brochure',
    ctaAudienceTags = ['Students', 'Researchers', 'Entrepreneurs', 'Creators', 'Professionals', 'Innovators'],
  } = data;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = brochurePdfUrl;
    link.download = brochureDownloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white font-rubik">
      {/* ══ HERO ═══════════════════════════════════════════════════════════════
          Premium light hero — mesh gradient background, no top border
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[580px] lg:min-h-[680px] flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f8faff 0%, #eef2fb 40%, #fdf6f0 100%)' }}
      >
        {/* Layered ambient glows — no border, pure depth */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large indigo bloom — top-left */}
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-indigo-100 opacity-60 blur-[140px]" />
          {/* Warm orange bloom — top-right */}
          <div className="absolute -top-20 right-0 w-[500px] h-[400px] rounded-full bg-orange-100 opacity-70 blur-[120px]" />
          {/* Subtle warm cream bloom — bottom-center */}
          <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] rounded-full bg-amber-50 opacity-80 blur-[100px]" />
          {/* Very fine dot grid */}
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #1e3a5f 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left */}
            <div>
              {/* Live badge */}
              <motion.div
                className="inline-flex items-center gap-2 mb-6"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <span className="flex items-center gap-2 bg-white/80 border border-orange-200 text-orange-600 text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  {heroBadgeText}
                </span>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                <p className="text-orange-500 font-montserrat font-semibold text-sm sm:text-base tracking-[0.2em] uppercase mb-3">
                  {heroSuperText}
                </p>
                <h1 className="text-slate-900 font-rubik font-black text-[38px] sm:text-[52px] lg:text-[64px] leading-[0.95] tracking-tight mb-4">
                  {heroTitleLine1}
                  <br />
                  {heroTitleLine2} <span className="text-orange-500">{heroTitleHighlight}</span>
                </h1>
                <div className="flex items-center gap-3 mt-5 mb-2">
                  <div className="h-[2px] w-12 bg-gradient-to-r from-orange-400 to-transparent rounded-full" />
                  <p className="text-slate-500 font-montserrat font-bold sm:text-xs text-[10px] uppercase tracking-[0.25em]">
                    {heroSubtitle}
                  </p>
                </div>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-4 max-w-md">{heroDescription}</p>
              </motion.div>

              {/* Meta chips */}
              <motion.div
                className="flex flex-wrap gap-3 mt-8 mb-10"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <div className="flex items-center gap-2.5 bg-white/70 border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm backdrop-blur-sm">
                  <CalendarDays size={17} className="text-orange-500 shrink-0" />
                  <div>
                    <p className="text-slate-800 font-semibold text-sm leading-tight">{heroDate}</p>
                    <p className="text-slate-400 text-[11px]">{heroDaytime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/70 border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm backdrop-blur-sm">
                  <MapPin size={17} className="text-orange-500 shrink-0" />
                  <div>
                    <p className="text-slate-800 font-semibold text-sm leading-tight">{heroVenueName}</p>
                    <p className="text-slate-400 text-[11px]">{heroVenueCity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-orange-50 border border-orange-200 rounded-xl px-4 py-2.5">
                  <Star size={17} className="text-orange-500 shrink-0" />
                  <div>
                    <p className="text-slate-800 font-semibold text-sm leading-tight">{heroEntryBadge}</p>
                    <p className="text-slate-400 text-[11px]">{heroEntryBadgeSub}</p>
                  </div>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-3"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                <a
                  href={heroRegisterButtonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 sm:w-auto w-full justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5"
                >
                  <ClipboardList size={16} />
                  {heroRegisterButtonText}
                </a>
                <button
                  onClick={handleDownload}
                  className="cursor-pointer inline-flex items-center gap-2 sm:w-auto w-full justify-center px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl border border-slate-300 hover:border-orange-400 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                >
                  <Download size={16} className="text-orange-500" />
                  {heroBrochureButtonText}
                </button>
              </motion.div>

              {/* Trust badges */}
              {heroTrustBadges?.length > 0 && (
                <motion.div
                  className="flex flex-wrap gap-2 mt-8"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
                  {heroTrustBadges.map((badge) => (
                    <span
                      key={badge}
                      className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider border border-slate-200 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1"
                    >
                      {badge}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Right: poster */}
            <motion.div
              className="flex justify-center lg:justify-end items-center mt-4 lg:mt-0"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[460px]">
                {/* Soft glow ring */}
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-orange-100 via-indigo-50 to-transparent blur-2xl pointer-events-none opacity-70" />
                <div
                  className="relative w-full rounded-[1.75rem] overflow-hidden border border-slate-200 shadow-2xl shadow-slate-300/50"
                  style={{ aspectRatio: '460/640' }}
                >
                  <Image
                    src={heroPosterImageUrl}
                    alt="International IPR Seminar 2026 — IPS Business School Jaipur"
                    fill
                    priority
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 420px, 460px"
                    quality={90}
                    className="object-cover object-center"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
                  <a
                    href={heroPosterImageUrl}
                    download="IPR-Seminar-2026-Poster.webp"
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-[13px] rounded-xl shadow-lg transition-all duration-200 hover:-translate-x-1/2 hover:-translate-y-0.5 whitespace-nowrap z-10"
                  >
                    <Download size={15} className="text-orange-500" />
                    {heroPosterDownloadText}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {topics?.length > 0 && (
        <section className="py-14" style={{ background: 'linear-gradient(180deg, #f1f5ff 0%, #f8f9fc 100%)' }}>
          <div className="mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="inline-block text-orange-500 font-montserrat font-semibold text-xs uppercase tracking-widest mb-3">
                {topicsSubheading}
              </span>
              <h2 className="text-slate-900 font-rubik font-black text-[22px] sm:text-[30px] leading-tight">
                {topicsHeading}
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {topics.map((topic, i) => {
                const Icon = getIcon(topic.iconName);
                return (
                  <motion.div
                    key={topic.title || i}
                    className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 cursor-default"
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={i}
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${topic.color}15`, border: `1.5px solid ${topic.color}40` }}
                    >
                      <Icon size={20} style={{ color: topic.color }} />
                    </div>
                    <div className="text-center">
                      <p className="text-slate-800 font-semibold text-sm">{topic.title}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5 leading-tight">{topic.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ ABOUT THE SEMINAR ═════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <span className="inline-block text-orange-500 font-montserrat font-semibold text-xs uppercase tracking-widest mb-3">
                {aboutSuperText}
              </span>
              <h2 className="text-slate-900 font-rubik font-black text-[28px] sm:text-[36px] lg:text-[42px] leading-tight mb-6">
                {aboutHeading}
              </h2>
              {aboutParagraph1 && <p className="text-slate-500 text-base leading-relaxed mb-4">{aboutParagraph1}</p>}
              {aboutParagraph2 && <p className="text-slate-500 text-base leading-relaxed mb-8">{aboutParagraph2}</p>}
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: ShieldCheck, label: 'AICTE Approved', color: '#1e3a5f' },
                  { icon: BadgeCheck, label: 'RTU Affiliated', color: '#1e3a5f' },
                  { icon: Star, label: 'Free Entry', color: '#ea580c' },
                ].map(({ icon: Icon, label, color }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
                    style={{ color, background: `${color}0d`, borderColor: `${color}22` }}
                  >
                    <Icon size={12} /> {label}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-orange-50 via-indigo-50 to-transparent blur-2xl pointer-events-none" />
              <div
                className="relative rounded-[1.75rem] overflow-hidden shadow-xl shadow-slate-200 border border-slate-200 max-w-[520px] mx-auto lg:ml-auto"
                style={{ aspectRatio: '4/5' }}
              >
                <Image
                  src={aboutImageUrl}
                  alt="Experts at the International IPR Seminar, IPS Business School Jaipur"
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  quality={90}
                  className="object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-5 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={15} className="text-white" />
                    <div>
                      <p className="text-white font-bold text-sm leading-tight">{heroDate}</p>
                      <p className="text-white/70 text-[11px]">
                        {heroVenueName}, {heroVenueCity?.split(',')[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating AICTE badge */}
              <motion.div
                className="absolute -top-2 -left-2 sm:-left-6 flex items-center gap-2.5 bg-orange-500 rounded-2xl shadow-xl shadow-orange-200 px-4 py-2.5"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.45 }}
              >
                <ShieldCheck size={16} className="text-white shrink-0" />
                <div>
                  <p className="text-white font-black text-xs leading-tight">AICTE Approved</p>
                  <p className="text-orange-100 text-[10px]">RTU Affiliated</p>
                </div>
              </motion.div>
              {/* Floating attendees badge */}
              <motion.div
                className="absolute -bottom-2 -right-2 sm:-right-6 flex items-center gap-2.5 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-2.5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65, duration: 0.45 }}
              >
                <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center shrink-0">
                  <Users size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-slate-800 font-black text-sm leading-tight">
                    {aboutAttendeesCount} {aboutAttendeesLabel}
                  </p>
                  <p className="text-slate-400 text-[11px]">{aboutAttendeesSubLabel}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ KEY TAKEAWAYS ═════════════════════════════════════════════════════ */}
      {takeaways?.length > 0 && (
        <section className="py-20 sm:py-24" style={{ background: 'linear-gradient(180deg, #f8f9fc 0%, #f1f5ff 100%)' }}>
          <div className="mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-14"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="inline-block text-orange-500 font-montserrat font-semibold text-xs uppercase tracking-widest mb-3">
                {takeawaysSuperText}
              </span>
              <h2 className="text-slate-900 font-rubik font-black text-[28px] sm:text-[38px] leading-tight">
                {takeawaysHeading}
              </h2>
              {takeawaysDescription && (
                <p className="text-slate-500 text-base max-w-xl mx-auto mt-3">{takeawaysDescription}</p>
              )}
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {takeaways.map((item, i) => {
                const Icon = getIcon(item.iconName);
                return (
                  <motion.div
                    key={item.title || i}
                    className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group relative overflow-hidden"
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    custom={i}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: item.color }}
                    />
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${item.color}12`, border: `1.5px solid ${item.color}28` }}
                    >
                      <Icon size={22} style={{ color: item.color }} />
                    </div>
                    <h3 className="text-slate-800 font-rubik font-bold text-[17px] mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ WHO SHOULD ATTEND — premium navy section ══════════════════════════
          Keep navy — it provides strong visual contrast and feels premium
      ═══════════════════════════════════════════════════════════════════════ */}
      {audience?.length > 0 && (
        <section className="py-20 sm:py-24 bg-[#0f2444] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
              backgroundSize: '38px 38px',
            }}
          />
          <div className="absolute top-0 left-1/4 w-[500px] h-72 bg-indigo-400 opacity-[0.08] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-72 bg-orange-400 opacity-[0.06] rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-14"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="inline-block text-amber-400 font-montserrat font-semibold text-xs uppercase tracking-widest mb-3">
                {audienceSuperText}
              </span>
              <h2 className="text-white font-rubik font-black text-[28px] sm:text-[38px] leading-tight">
                {audienceHeading}
              </h2>
              {audienceDescription && (
                <p className="text-white/55 text-base max-w-xl mx-auto mt-3">{audienceDescription}</p>
              )}
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {audience.map((item, i) => {
                const Icon = getIcon(item.iconName);
                return (
                  <motion.div
                    key={item.label || i}
                    className="flex items-center gap-4 bg-white/[0.06] border border-white/10 hover:border-white/25 rounded-2xl px-6 py-5 transition-all duration-200 hover:bg-white/10"
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    custom={i}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}20`, border: `1.5px solid ${item.color}40` }}
                    >
                      <Icon size={22} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-[15px]">{item.label}</p>
                      <p className="text-white/50 text-xs mt-0.5">{item.sub}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ EVENT HIGHLIGHTS ══════════════════════════════════════════════════ */}
      {highlights?.length > 0 && (
        <section className="py-20 sm:py-24 bg-white">
          <div className="mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-14"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="inline-block text-orange-500 font-montserrat font-semibold text-xs uppercase tracking-widest mb-3">
                {agendaSuperText}
              </span>
              <h2 className="text-slate-900 font-rubik font-black text-[28px] sm:text-[38px] leading-tight">
                {agendaHeading}
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {highlights.map((item, i) => {
                const Icon = getIcon(item.iconName);
                return (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={i * 0.15}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${item.color}12`, border: `1.5px solid ${item.color}30` }}
                    >
                      <Icon size={18} style={{ color: item.color }} />
                    </div>
                    <p className="text-slate-700 font-medium text-sm leading-relaxed">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              className="text-center mt-14"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <a
                href={ctaRegisterButtonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5"
              >
                {agendaRegisterButtonText}
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* ══ EVENT DETAILS ═════════════════════════════════════════════════════ */}
      {eventDetailRows?.length > 0 && (
        <section className="py-20 sm:py-24" style={{ background: 'linear-gradient(180deg, #f1f5ff 0%, #f8f9fc 100%)' }}>
          <div className="mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="inline-block text-orange-500 font-montserrat font-semibold text-xs uppercase tracking-widest mb-3">
                {eventDetailsSuperText}
              </span>
              <h2 className="text-slate-900 font-rubik font-black text-[28px] sm:text-[38px] leading-tight">
                {eventDetailsHeading}
              </h2>
            </motion.div>
            <motion.div
              className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {eventDetailRows.map((row, i) => (
                <div
                  key={i}
                  className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-8 py-5 ${i < eventDetailRows.length - 1 ? 'border-b border-slate-100' : ''} ${i % 2 === 0 ? '' : 'bg-slate-50/60'}`}
                >
                  <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest sm:w-32 shrink-0">
                    {row.label}
                  </span>
                  <span className="text-slate-800 font-semibold text-sm sm:text-base">{row.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ══ FAQ ═══════════════════════════════════════════════════════════════ */}
      {faqs?.length > 0 && (
        <section className="py-20 sm:py-24 bg-white">
          <div className="mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-14"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="inline-block text-orange-500 font-montserrat font-semibold text-xs uppercase tracking-widest mb-3">
                {faqSuperText}
              </span>
              <h2 className="text-slate-900 font-rubik font-black text-[28px] sm:text-[38px] leading-tight">
                {faqHeading}
              </h2>
              {faqDescription && <p className="text-slate-500 text-base max-w-xl mx-auto mt-3">{faqDescription}</p>}
            </motion.div>
            <FaqList faqs={faqs} />
          </div>
        </section>
      )}

      {/* ══ BOTTOM CTA ════════════════════════════════════════════════════════
          Deep navy with warm orange accent — premium and decisive
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-[#0f2444]">
        {/* Subtle top separator */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-indigo-900 opacity-60 blur-[140px]" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-400 opacity-[0.07] rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400 opacity-[0.06] rounded-full blur-[80px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <div className="inline-flex items-center gap-2 mb-5 bg-orange-500/15 border border-orange-400/30 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-orange-300 text-[11px] font-bold uppercase tracking-widest">{ctaBadgeText}</span>
            </div>
            <h2 className="text-white font-rubik font-black text-[30px] sm:text-[44px] lg:text-[52px] leading-tight mb-5">
              {ctaHeading}
            </h2>
            {ctaDescription && (
              <p className="text-white/55 text-base sm:text-lg max-w-xl mx-auto mb-12">{ctaDescription}</p>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={ctaRegisterButtonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-9 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base rounded-2xl transition-all duration-200 shadow-xl shadow-orange-500/20 hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                <ClipboardList size={18} />
                {ctaRegisterButtonText}
              </a>
              <button
                onClick={handleDownload}
                className="cursor-pointer inline-flex items-center gap-2.5 px-9 py-4 bg-white/10 hover:bg-white/18 text-white font-bold text-base rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-200 hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                <Download size={18} />
                {ctaBrochureButtonText}
              </button>
            </div>
            {ctaAudienceTags?.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-10">
                {ctaAudienceTags.map((tag, i) => (
                  <React.Fragment key={tag}>
                    {i > 0 && <span className="text-white/20 text-xs">·</span>}
                    <span className="text-white/45 text-xs font-medium tracking-wider">{tag}</span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
