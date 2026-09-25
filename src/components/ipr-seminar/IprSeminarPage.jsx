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
} from 'lucide-react';

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
};

// ─── IPR Topic Cards ──────────────────────────────────────────────────────────
const iprTopics = [
  {
    icon: Lightbulb,
    title: 'Patents',
    desc: 'Protect inventions & innovation.',
    color: '#f5c518',
    bg: 'rgba(245,197,24,0.12)',
  },
  {
    icon: Copyright,
    title: 'Copyright',
    desc: 'Protect creative expression.',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.12)',
  },
  {
    icon: BadgeCheck,
    title: 'Trademarks',
    desc: 'Protect identity & brand value.',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.12)',
  },
  {
    icon: Palette,
    title: 'Designs',
    desc: 'Protect unique creations.',
    color: '#f472b6',
    bg: 'rgba(244,114,182,0.12)',
  },
  {
    icon: ShieldCheck,
    title: 'IP Rights',
    desc: 'Understand the legal framework.',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.12)',
  },
];

// ─── Key takeaways ────────────────────────────────────────────────────────────
const takeaways = [
  {
    icon: ShieldCheck,
    title: 'Protect What You Create',
    desc: 'Understand the importance of protecting original ideas, inventions and creative work.',
    color: '#eb5905',
  },
  {
    icon: Scale,
    title: 'Understand Your Rights',
    desc: 'Get familiar with the fundamentals of Intellectual Property Rights.',
    color: '#60a5fa',
  },
  {
    icon: BadgeCheck,
    title: 'Protect Your Identity',
    desc: 'Learn how trademarks help protect brands and business identity.',
    color: '#34d399',
  },
  {
    icon: TrendingUp,
    title: 'Create Value From Ideas',
    desc: 'Understand how intellectual property can contribute to innovation and business value.',
    color: '#f5c518',
  },
  {
    icon: Lock,
    title: 'Understand the Legal Framework',
    desc: 'Develop a basic understanding of the legal side of intellectual property.',
    color: '#a78bfa',
  },
  {
    icon: FileText,
    title: 'Navigate IP in Practice',
    desc: 'Learn how to apply IP knowledge in real-world scenarios — from registration to enforcement.',
    color: '#34d399',
  },
];

// ─── Who should attend ────────────────────────────────────────────────────────
const audience = [
  {
    icon: GraduationCap,
    label: 'Students',
    sub: 'Curious about innovation, creativity and entrepreneurship.',
    color: '#f5c518',
  },
  { icon: BookOpen, label: 'Researchers', sub: 'Working on ideas, research or inventions.', color: '#60a5fa' },
  { icon: Building2, label: 'Entrepreneurs', sub: 'Building a brand, product or business.', color: '#34d399' },
  {
    icon: Palette,
    label: 'Creators',
    sub: 'Creating original content, designs or intellectual work.',
    color: '#f472b6',
  },
  { icon: Scale, label: 'Professionals', sub: 'Looking to understand the role of IP in business.', color: '#a78bfa' },
  { icon: Lightbulb, label: 'Innovators', sub: 'Turning ideas into something valuable.', color: '#eb5905' },
];

// ─── Programme / Agenda ───────────────────────────────────────────────────────
const agenda = [
  { time: '09:00 AM', session: 'Registration & Welcome Tea', type: 'break' },
  { time: '09:30 AM', session: 'Inauguration & Lamp Lighting Ceremony', type: 'ceremony' },
  { time: '10:00 AM', session: 'Keynote: Overview of Intellectual Property Rights', type: 'keynote' },
  { time: '11:00 AM', session: 'Session I — Patents & Innovations: Filing & Strategy', type: 'session' },
  { time: '12:00 PM', session: 'Session II — Copyright Law & Digital Content', type: 'session' },
  { time: '01:00 PM', session: 'Lunch Break & Networking', type: 'break' },
  { time: '02:00 PM', session: 'Session III — Trademarks, Branding & Brand Protection', type: 'session' },
  { time: '03:00 PM', session: 'Session IV — Design Rights & Industrial Designs', type: 'session' },
  { time: '04:00 PM', session: 'Panel Discussion: IP Strategy for Startups & SMEs', type: 'panel' },
  { time: '05:00 PM', session: 'Open Q&A, Certificates & Valedictory', type: 'ceremony' },
];

const agendaTypeStyles = {
  keynote: { dot: '#f5c518', label: 'Keynote' },
  session: { dot: '#60a5fa', label: 'Session' },
  panel: { dot: '#34d399', label: 'Panel' },
  ceremony: { dot: '#a78bfa', label: 'Ceremony' },
  break: { dot: '#77838f', label: 'Break' },
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Who can register?',
    a: 'Students, researchers, entrepreneurs, creators, professionals and individuals interested in Intellectual Property Rights.',
  },
  {
    q: 'What topics will be covered?',
    a: 'Patents, Copyright, Trademarks, Designs and Intellectual Property Rights.',
  },
  {
    q: 'When is the seminar?',
    a: '9 October 2026, Friday, from 8:00 AM onwards.',
  },
  {
    q: 'Where is it being held?',
    a: 'IPS College, Jaipur.',
  },
  {
    q: 'How can I register?',
    a: 'Click the "Register Now" button on this page to complete your registration.',
  },
];

// ─── Google Form link ─────────────────────────────────────────────────────────
const GOOGLE_FORM_URL = 'https://forms.gle/gKvijjLixjP61rmB8';

// ─── FAQ list — accordion, default first open ────────────────────────────────
function FaqList() {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <FaqItem key={i} faq={faq} index={i} isOpen={openIndex === i} onToggle={() => toggle(i)} />
      ))}
    </div>
  );
}

// ─── Collapsible FAQ item ─────────────────────────────────────────────────────
function FaqItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index * 0.4}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-[#0d1b2e] font-semibold text-[15px]">{faq.q}</span>
        <ChevronDown
          size={18}
          className={`text-[#77838f] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-[#77838f] text-sm leading-relaxed border-t border-gray-50 pt-4">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function IprSeminarPage() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/images/brochure/IPS_IPR_International_Seminar_Brochure.pdf';
    link.download = 'IPS-Business-School-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white font-rubik">
      {/* ══════════════════════════════════════════════════════════════════════
          HERO — pure CSS / no image dependency
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[580px] lg:min-h-[680px] flex items-center overflow-hidden bg-[#080f1c]">
        {/* ── Background: layered CSS gradients + geometric shapes ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Deep radial glow — top-left */}
          <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-[#1a2d50] opacity-60 blur-[120px]" />
          {/* Gold accent glow — top-right */}
          <div className="absolute -top-20 right-0 w-[500px] h-[400px] rounded-full bg-[#f5c518] opacity-[0.06] blur-[100px]" />
          {/* Orange accent glow — bottom-right */}
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-[#eb5905] opacity-[0.08] blur-[90px]" />
          {/* Fine dot grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #f5c518 1px, transparent 0)',
              backgroundSize: '36px 36px',
            }}
          />
          {/* Diagonal line accent */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="#f5c518" strokeWidth="1" />
            <line x1="0" y1="20%" x2="80%" y2="100%" stroke="#60a5fa" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* ── Left: Text content ── */}
            <div>
              {/* Live badge */}
              <motion.div
                className="inline-flex items-center gap-2 mb-6"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <span className="flex items-center gap-2 bg-[#f5c518]/12 border border-[#f5c518]/35 text-[#f5c518] text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f5c518] animate-pulse" />
                  IPS Business School &amp; IPS College · 9 October 2026
                </span>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                <p className="text-[#f5c518] font-montserrat font-semibold text-sm sm:text-base tracking-[0.2em] uppercase mb-3">
                  International Seminar on
                </p>
                <h1 className="text-white font-rubik font-black text-[38px] sm:text-[52px] lg:text-[64px] leading-[0.95] tracking-tight mb-4">
                  Intellectual
                  <br />
                  Property <span className="text-[#f5c518]">Rights</span>
                </h1>
                <div className="flex items-center gap-3 mt-5 mb-2">
                  <div className="h-[2px] w-12 bg-gradient-to-r from-[#f5c518] to-transparent rounded-full" />
                  <p className="text-white/60 font-montserrat font-bold sm:text-xs text-[10px] uppercase tracking-[0.25em]">
                    Ideas Today. Impact Tomorrow.
                  </p>
                </div>
                <p className="text-white/55 text-sm sm:text-base leading-relaxed mt-4 max-w-md">
                  Understand Patents, Copyrights, Trademarks, Designs and Intellectual Property Rights — and how they
                  can help protect ideas, creativity and innovation.
                </p>
              </motion.div>

              {/* Meta chips */}
              <motion.div
                className="flex flex-wrap gap-3 mt-8 mb-10"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <div className="flex items-center gap-2.5 bg-white/6 border border-white/12 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                  <CalendarDays size={17} className="text-[#f5c518] shrink-0" />
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">9 October 2026</p>
                    <p className="text-white/45 text-[11px]">Friday · 8:00 AM onwards</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/6 border border-white/12 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                  <MapPin size={17} className="text-[#f5c518] shrink-0" />
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">IPS College</p>
                    <p className="text-white/45 text-[11px]">Jaipur, Rajasthan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-[#eb5905]/15 border border-[#eb5905]/30 rounded-xl px-4 py-2.5">
                  <Star size={17} className="text-[#eb5905] shrink-0" />
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">Free Entry</p>
                    <p className="text-white/45 text-[11px]">All Welcome</p>
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
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 sm:w-auto w-full justify-center bg-[#eb5905] hover:bg-[#c94d04] text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-[#eb5905]/30 hover:shadow-[#eb5905]/50 hover:-translate-y-0.5"
                >
                  <ClipboardList size={16} />
                  Register Now — Free
                </a>
                <button
                  onClick={handleDownload}
                  className="cursor-pointer inline-flex items-center gap-2 sm:w-auto w-full justify-center px-7 py-3.5 bg-white/8 hover:bg-white/15 text-white font-bold text-sm rounded-xl border border-white/18 hover:border-[#f5c518]/40 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Download size={16} />
                  Download Brochure
                </button>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                className="flex flex-wrap gap-2 mt-8"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
              >
                {['AICTE Approved', 'RTU Affiliated'].map((badge) => (
                  <span
                    key={badge}
                    className="text-[11px] font-semibold text-white/40 uppercase tracking-wider border border-white/10 rounded-full px-3 py-1"
                  >
                    {badge}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Hero image — visible on all screen sizes ── */}
            <motion.div
              className="flex justify-center lg:justify-end items-center mt-4 lg:mt-0"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[460px]">
                {/* Outer glow ring */}
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#f5c518]/10 via-[#eb5905]/5 to-transparent blur-xl pointer-events-none" />

                {/* Image frame — aspect-ratio keeps it proportional on all screens */}
                <div
                  className="relative w-full rounded-[1.75rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/40"
                  style={{ aspectRatio: '460/640' }}
                >
                  <Image
                    src="/images/event-img.webp"
                    alt="International IPR Seminar 2026 — IPS Business School Jaipur"
                    fill
                    priority
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 420px, 460px"
                    quality={90}
                    className="object-cover object-center"
                  />

                  {/* Gradient overlay — bottom fade for download button */}
                  <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080f1c]/95 to-transparent pointer-events-none" />

                  {/* Download poster button */}
                  <a
                    href="/images/event-img.webp"
                    download="IPR-Seminar-2026-Poster.webp"
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-5 py-2.5 bg-[#f5c518] hover:bg-[#d4a900] text-[#0d1b2e] font-bold text-[13px] rounded-xl shadow-lg shadow-black/30 transition-all duration-200 hover:-translate-x-1/2 hover:-translate-y-0.5 whitespace-nowrap z-10"
                  >
                    <Download size={15} />
                    Download Poster
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          IPR TOPICS STRIP
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0d1b2e] border-t border-white/8 py-14">
        <div className="mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="inline-block text-[#f5c518] font-montserrat font-semibold text-xs uppercase tracking-widest mb-3">
              Topics Covered
            </span>
            <h2 className="text-white font-rubik font-black text-[22px] sm:text-[30px] leading-tight">
              Know What You Can Protect.
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {iprTopics.map((topic, i) => (
              <motion.div
                key={topic.title}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/8 hover:border-white/20 transition-all duration-200 group cursor-default"
                style={{ background: topic.bg }}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${topic.color}20`, border: `1.5px solid ${topic.color}35` }}
                >
                  <topic.icon size={20} style={{ color: topic.color }} />
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">{topic.title}</p>
                  <p className="text-white/45 text-[11px] mt-0.5 leading-tight">{topic.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ABOUT THE SEMINAR — text left + stats infographic right
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Text */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <span className="inline-block text-[#eb5905] font-montserrat font-semibold text-xs uppercase tracking-widest mb-3">
                About the Event
              </span>
              <h2 className="text-[#0d1b2e] font-rubik font-black text-[28px] sm:text-[36px] lg:text-[42px] leading-tight mb-6">
                Your Idea Has Value. <span className="text-[#eb5905]">Do You Know How to Protect It?</span>
              </h2>
              <p className="text-[#77838f] text-base leading-relaxed mb-4">
                Whether you are a student, researcher, entrepreneur, creator or professional, understanding Intellectual
                Property Rights can help you recognise, protect and manage the value behind your ideas.
              </p>
              <p className="text-[#77838f] text-base leading-relaxed mb-8">
                Presented by IPS Business School &amp; IPS College, Jaipur, this International Seminar brings together
                experts and curious minds to explore how IP rights protect creativity, fuel innovation and build
                competitive advantage — completely free for all attendees.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: ShieldCheck, label: 'AICTE Approved', color: '#2a3e61' },
                  { icon: BadgeCheck, label: 'RTU Affiliated', color: '#2a3e61' },
                  { icon: Star, label: 'Free Entry', color: '#eb5905' },
                ].map(({ icon: Icon, label, color }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
                    style={{ color, background: `${color}10`, borderColor: `${color}25` }}
                  >
                    <Icon size={12} /> {label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* ── About section image ── */}
            {/* TODO: Drop your AI image at /images/ipr-seminar/ipr-about-visual.webp
                Prompt at the bottom of this file */}
            <motion.div
              className="relative"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Outer glow */}
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#eb5905]/8 via-[#f5c518]/5 to-transparent blur-2xl pointer-events-none" />

              {/* Image frame */}
              <div
                className="relative rounded-[1.75rem] overflow-hidden shadow-2xl shadow-[#0d1b2e]/25 border border-white/8 max-w-[520px] mx-auto lg:ml-auto"
                style={{ aspectRatio: '4/5' }}
              >
                {/* ── Real image — swap src once generated ── */}
                <Image
                  src="/images/event-img-2.webp"
                  alt="Experts presenting at the International IPR Seminar, IPS Business School Jaipur"
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  quality={90}
                  className="object-cover object-center"
                />

                {/* Inline bottom badge strip */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-5">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={15} className="text-[#f5c518]" />
                    <div>
                      <p className="text-white font-bold text-sm leading-tight">9 October 2026</p>
                      <p className="text-white/45 text-[11px]">IPS College, Jaipur</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating AICTE badge */}
              <motion.div
                className="absolute -top-2 -left-2 sm:-left-6 flex items-center gap-2.5 bg-[#f5c518] rounded-2xl shadow-xl shadow-[#f5c518]/25 px-4 py-2.5"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.45 }}
              >
                <ShieldCheck size={16} className="text-[#0d1b2e] shrink-0" />
                <div>
                  <p className="text-[#0d1b2e] font-black text-xs leading-tight">AICTE Approved</p>
                  <p className="text-[#0d1b2e]/55 text-[10px]">RTU Affiliated</p>
                </div>
              </motion.div>

              {/* Floating attendees badge */}
              <motion.div
                className="absolute -bottom-2 -right-2 sm:-right-6 flex items-center gap-2.5 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-2.5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65, duration: 0.45 }}
              >
                <div className="w-8 h-8 rounded-full bg-[#0d1b2e] flex items-center justify-center shrink-0">
                  <Users size={14} className="text-[#f5c518]" />
                </div>
                <div>
                  <p className="text-[#0d1b2e] font-black text-sm leading-tight">500+ Attendees</p>
                  <p className="text-[#77838f] text-[11px]">Expected</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          KEY TAKEAWAYS — 2×3 grid
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-[#f8f9fc]">
        <div className="mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="inline-block text-[#eb5905] font-montserrat font-semibold text-xs uppercase tracking-widest mb-3">
              What You Will Take Away
            </span>
            <h2 className="text-[#0d1b2e] font-rubik font-black text-[28px] sm:text-[38px] leading-tight">
              Turn Your Ideas Into Protected Assets.
            </h2>
            <p className="text-[#77838f] text-base max-w-xl mx-auto mt-3">
              Leave the seminar with actionable knowledge and a stronger understanding of how to protect and leverage
              your intellectual property.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {takeaways.map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-250 group relative overflow-hidden"
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={i}
              >
                {/* Top color stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: item.color }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200"
                  style={{ background: `${item.color}12`, border: `1.5px solid ${item.color}25` }}
                >
                  <item.icon size={22} style={{ color: item.color }} />
                </div>
                <h3 className="text-[#0d1b2e] font-rubik font-bold text-[17px] mb-2">{item.title}</h3>
                <p className="text-[#77838f] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          WHO SHOULD ATTEND — dark section with 6-card audience grid
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-[#0d1b2e] relative overflow-hidden">
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #f5c518 1px, transparent 0)',
            backgroundSize: '38px 38px',
          }}
        />
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-64 bg-[#f5c518] opacity-[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-64 bg-[#eb5905] opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="inline-block text-[#f5c518] font-montserrat font-semibold text-xs uppercase tracking-widest mb-3">
              Open For All
            </span>
            <h2 className="text-white font-rubik font-black text-[28px] sm:text-[38px] leading-tight">
              This Seminar Is For You If You Are…
            </h2>
            <p className="text-white/40 text-base max-w-xl mx-auto mt-3">
              The IPR Seminar welcomes everyone with a curious mind and an interest in protecting ideas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {audience.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-4 bg-white/[0.04] border border-white/8 hover:border-white/20 rounded-2xl px-6 py-5 transition-all duration-200 group hover:bg-white/8"
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={i}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200"
                  style={{ background: `${item.color}15`, border: `1.5px solid ${item.color}25` }}
                >
                  <item.icon size={22} style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-white font-bold text-[15px]">{item.label}</p>
                  <p className="text-white/40 text-xs mt-0.5">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          EVENT HIGHLIGHTS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="inline-block text-[#eb5905] font-montserrat font-semibold text-xs uppercase tracking-widest mb-3">
              What to Expect
            </span>
            <h2 className="text-[#0d1b2e] font-rubik font-black text-[28px] sm:text-[38px] leading-tight">
              One Seminar. Multiple Perspectives.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Globe, text: 'International perspective on Intellectual Property Rights', color: '#60a5fa' },
              { icon: Lightbulb, text: 'Insights into patents, copyright, trademarks and designs', color: '#f5c518' },
              { icon: ShieldCheck, text: 'Understanding IP protection and legal frameworks', color: '#34d399' },
              { icon: TrendingUp, text: 'Innovation and entrepreneurship-focused discussions', color: '#eb5905' },
              { icon: Star, text: 'Opportunities to learn from experts', color: '#a78bfa' },
              { icon: Users, text: 'Interactive learning and knowledge exchange', color: '#f472b6' },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                className="flex items-start gap-4 bg-[#f8f9fc] rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i * 0.15}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${item.color}15`, border: `1.5px solid ${item.color}30` }}
                >
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <p className="text-[#0d1b2e] font-medium text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Mid-page CTA */}
          <motion.div
            className="text-center mt-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#eb5905] hover:bg-[#c94d04] text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-[#eb5905]/30 hover:shadow-[#eb5905]/50 hover:-translate-y-0.5"
            >
              {' '}
              Register now →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          EVENT DETAILS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-[#0d1b2e] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #f5c518 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="inline-block text-[#f5c518] font-montserrat font-semibold text-xs uppercase tracking-widest mb-3">
              Mark Your Calendar
            </span>
            <h2 className="text-white font-rubik font-black text-[28px] sm:text-[38px] leading-tight">Event Details</h2>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              { label: 'Event', value: 'International Seminar on Intellectual Property Rights' },
              { label: 'Presented By', value: 'IPS Business School & IPS College, Jaipur' },
              { label: 'Date', value: '9 October 2026, Friday' },
              { label: 'Time', value: '8:00 AM onwards' },
              { label: 'Venue', value: 'IPS College, Jaipur' },
              { label: 'Theme', value: 'Ideas Today. Impact Tomorrow.' },
            ].map((row, i) => (
              <div
                key={row.label}
                className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-8 py-5 ${i < 5 ? 'border-b border-white/8' : ''}`}
              >
                <span className="text-white/40 text-xs font-semibold uppercase tracking-widest sm:w-32 shrink-0">
                  {row.label}
                </span>
                <span className="text-white font-semibold text-sm sm:text-base">{row.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-[#f8f9fc]">
        <div className="mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="inline-block text-[#eb5905] font-montserrat font-semibold text-xs uppercase tracking-widest mb-3">
              Got Questions?
            </span>
            <h2 className="text-[#0d1b2e] font-rubik font-black text-[28px] sm:text-[38px] leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[#77838f] text-base max-w-xl mx-auto mt-3">
              Everything you need to know before registering for the seminar.
            </p>
          </motion.div>

          <FaqList />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          BOTTOM CTA — pure CSS dark banner, no image
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 bg-[#080f1c] overflow-hidden">
        {/* Gold top rule */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f5c518] to-transparent" />

        {/* Background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#1a2d50] opacity-40 blur-[140px]" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#f5c518] opacity-[0.04] rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#eb5905] opacity-[0.05] rounded-full blur-[80px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #f5c518 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1202px] px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <div className="inline-flex items-center gap-2 mb-5 bg-[#f5c518]/10 border border-[#f5c518]/25 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f5c518] animate-pulse" />
              <span className="text-[#f5c518] text-[11px] font-bold uppercase tracking-widest">
                9 October 2026 · IPS College, Jaipur
              </span>
            </div>
            <h2 className="text-white font-rubik font-black text-[30px] sm:text-[44px] lg:text-[52px] leading-tight mb-5">
              Have an Idea? Know How to Protect It.
            </h2>
            <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto mb-12">
              Don&apos;t miss the opportunity to understand Intellectual Property Rights and their relevance to
              innovation, creativity and business.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-9 py-4 bg-[#eb5905] hover:bg-[#c94d04] text-white font-bold text-base rounded-2xl transition-all duration-200 shadow-xl shadow-[#eb5905]/25 hover:shadow-[#eb5905]/45 hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                <ClipboardList size={18} />
                Register Now →
              </a>
              <button
                onClick={handleDownload}
                className="cursor-pointer inline-flex items-center gap-2.5 px-9 py-4 bg-white/8 hover:bg-white/14 text-white font-bold text-base rounded-2xl border border-white/15 hover:border-[#f5c518]/40 transition-all duration-200 hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                <Download size={18} />
                Download Brochure
              </button>
            </div>

            {/* Audience tag row */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-10">
              {['Students', 'Researchers', 'Entrepreneurs', 'Creators', 'Professionals', 'Innovators'].map((tag, i) => (
                <React.Fragment key={tag}>
                  {i > 0 && <span className="text-white/15 text-xs">·</span>}
                  <span className="text-white/35 text-xs font-medium tracking-wider">{tag}</span>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
