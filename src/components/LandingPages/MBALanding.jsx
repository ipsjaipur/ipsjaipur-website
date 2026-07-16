'use client';
import Image from 'next/image';
import Script from 'next/script';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  BrainCircuit,
  Share2,
  Plane,
  BookOpenCheck,
  Users,
  Network,
  Layers,
  CalendarCheck,
  MonitorPlay,
  BarChart3,
  FileText,
  Briefcase,
  Award,
  GraduationCap,
  ClipboardList,
  Globe,
  Atom,
  Lightbulb,
  FlaskConical,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────
   Framer Motion — shared variants
   ───────────────────────────────────────────────────────────────────────── */

// Fade up — used for headings, section wrappers, single elements
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Fade in — used for images, full sections
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};

// Stagger container — wraps grids of cards
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// Card item — child of staggerContainer
const cardItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Slide in from left
const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Slide in from right
const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

/* Reusable scroll-triggered wrapper */
function ScrollReveal({ children, variants = fadeUp, className = '', delay = 0, once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px 0px' });
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Data constants
   ───────────────────────────────────────────────────────────────────────── */

const IPS_EDGE_FEATURES = [
  {
    icon: BrainCircuit,
    label: 'AI/ML & Business Analytics\nIntegrated Course',
  },
  {
    icon: Share2,
    label: 'Complete Digital\nMarketing Training',
  },
  {
    icon: Plane,
    label: 'Foreign Internships\nEvery Year*',
  },
  {
    icon: BookOpenCheck,
    label: 'Study + Work Model for Hands-\non Experience',
  },
  {
    icon: Users,
    label: 'Best Placement Opportunities\nwith Top Recruiters',
  },
  {
    icon: Network,
    label: 'Mentorship from Entrepreneurs,\nExperts & Global Faculty',
  },
];

const MBA_FEATURES = [
  {
    icon: Layers,
    label: 'Dual Specialization',
    highlight: false,
  },
  {
    icon: CalendarCheck,
    label: '3-Month Foreign\nInternships Program*',
    highlight: true,
  },
  {
    icon: MonitorPlay,
    label: 'Live Projects with\nReal Clients',
    highlight: false,
  },
  {
    icon: BarChart3,
    label: 'Additional Business\nAnalytics Course',
    highlight: false,
  },
  {
    icon: FileText,
    label: 'Additional Digital\nMarketing Course',
    highlight: false,
  },
  {
    icon: Briefcase,
    label: '3-Month Foreign\nInternships Program*',
    highlight: true,
  },
  {
    icon: Award,
    label: 'Career Development Cell\nfor Best Placements',
    highlight: true,
  },
  {
    icon: GraduationCap,
    label: 'Study + Work Model',
    highlight: false,
  },
];

const STATS = [
  { value: 17, suffix: ' +', label: 'Years Of Experience' },
  { value: 10, suffix: ' k+', label: 'Years Of Experience' },
  { value: 30, suffix: ' +', label: 'Recruiters' },
  { value: 40, suffix: ' +', label: 'Collaborations' },
];

/* Animated counter hook */
function useCountUp(target, duration = 2000, enabled = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 26);
    return () => clearInterval(timer);
  }, [enabled, target, duration]);
  return count;
}

const WHY_IPS = [
  {
    icon: ClipboardList,
    title: '1. Real Skills Through On-Job Training',
    body: "Work while you study. With IPS's unique Study + Work model, students train with top corporates – gaining experience before they graduate.",
  },
  {
    icon: Globe,
    title: '2. Foreign Programs That Open Global Doors',
    body: 'Experience international business firsthand through our 3-month foreign training & exchange programs – because global exposure creates global leaders.',
  },
  {
    icon: Lightbulb,
    title: '3. Where Teaching Sparks Transformation',
    body: 'Our faculty = industry experts + academic brilliance. Learn from researchers, entrepreneurs, and Professors of Practice who turn theory into hands-on knowledge.',
  },
  {
    icon: Atom,
    title: '4. Producing Graduates Companies Compete For',
    body: "IPS grads don't just pass – they lead. We shape curious minds into confident professionals who thrive in fast-paced global work environments.",
  },
  {
    icon: FlaskConical,
    title: '5. Where Innovation & Creativity Thrive Daily',
    body: 'At IPS, we believe in bold thinking, creative learning, and empowering students to see – and shape – the world differently.',
  },
  {
    icon: BookOpenCheck,
    title: '6. Where Research Meets Real-World Impact',
    body: 'We go beyond textbooks – our part-time Distinguished Research Professors & Entrepreneurs bring global insights and real-world innovation to the classroom.',
  },
];

const HIRING_PARTNERS = [
  { name: 'Accenture', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-24-1.webp` },
  { name: 'Amazon', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-25-1.webp` },
  { name: 'Microsoft', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-26-1.webp` },
  { name: 'Airtel', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-27-1.webp` },
  { name: 'Deloitte', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/image-8-1.webp` },
  { name: 'Wipro', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/image-7-1.webp` },
  { name: 'Asian Paints', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-28-1.webp` },
  { name: 'Infosys', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/LOGOS-_-BG-1.webp` },
  { name: 'LG', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-30-1.webp` },
  { name: 'HDFC Bank', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/LOGOS-_-BG.webp` },
  { name: 'ICICI Bank', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-32-1.webp` },
  { name: 'Axis Bank', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-33-1.webp` },
  { name: 'AU Small Finance', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-34-1.webp` },
  { name: 'TCS', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/image-10-1.webp` },
  { name: 'EY', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/image-6-1.webp` },
  { name: 'Deutsche Bank', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/image-9-1-1.webp` },
  { name: 'Hyundai', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-35-1.webp` },
  { name: 'Kotak', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-36-1.webp` },
  { name: 'LIC', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-37-1.webp` },
  { name: 'Paytm', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-38-1.webp` },
  { name: 'ITC', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-39-1.webp` },
  { name: 'Reliance Jio', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-40-1.webp` },
  { name: 'MRF', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-41-1.webp` },
  { name: 'Unilever', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/BG-42-1.webp` },
  { name: 'KPMG', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/image-11-2.webp` },
  { name: 'McKinsey', src: `${process.env.NEXT_PUBLIC_IMG_PATH}landing/image-12-2.webp` },
];

export default function MBALanding() {
  /* Intersection observer for counter trigger */
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  /* Sticky apply bar — show after hero scrolls out of view */
  const heroRef = useRef(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setShowStickyBar(!entry.isIntersecting), { threshold: 0 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      {/* NoPaperForms widget script */}
      <Script src="https://widgets.in8.nopaperforms.com/emwgts.js" strategy="afterInteractive" />

      <div className="min-h-screen flex flex-col font-archivo">
        {/* ───────────────── HEADER ───────────────── */}
        <header className="bg-white shadow-md z-50">
          <div className="max-w-[1240px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMG_PATH}landing/lp-logo.webp`}
                alt="IPS College Jaipur"
                width={140}
                height={55}
                className="sm:h-12 h-8 w-auto object-contain"
                priority
              />
            </div>

            {/* Badges — AICTE + RTU */}
            <div className="flex justify-between gap-20">
              <div className="flex items-center gap-6">
                {/* AICTE badge */}
                <div className="flex items-center gap-2">
                  {/* Replace src with actual AICTE logo path */}
                  <div className="flex items-center justify-center overflow-hidden ">
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMG_PATH}landing/acitve-approved.webp`}
                      alt="AICTE Approved"
                      width={118}
                      height={48}
                      className="object-contain min-w-[90px]"
                    />
                  </div>
                </div>

                {/* RTU badge */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center overflow-hidden ">
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMG_PATH}landing/affilited-logo.webp`}
                      alt="Affiliated with RTU"
                      width={118}
                      height={48}
                      className="object-contain  min-w-[90px]"
                    />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="md:flex hidden flex-wrap items-center gap-4 text-sm text-gray-700">
                <a
                  href="tel:+918233970000"
                  className="flex items-center gap-1.5 hover:text-orange-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h1.5a1 1 0 01.98.804l.74 3.698a1 1 0 01-.27.958l-1.2 1.2a16.016 16.016 0 006.6 6.6l1.2-1.2a1 1 0 01.958-.27l3.698.74A1 1 0 0121 17.5V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                    />
                  </svg>
                  +91-8233970000
                </a>
                <a
                  href="https://wa.me/919829016449"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
                >
                  {/* WhatsApp icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.17 1.6 5.99L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 22c-1.85 0-3.65-.5-5.22-1.44l-.37-.22-3.87 1.02 1.04-3.77-.24-.39A9.93 9.93 0 012 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm5.44-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.14 8.14 0 01-2.4-1.48 9.03 9.03 0 01-1.66-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.2-.24-.58-.48-.5-.67-.51H6.9c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.06 2.85 1.2 3.05c.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.62.7.22 1.34.19 1.84.12.56-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.19-.57-.34z" />
                  </svg>
                  +91-9829016449
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* ───────────────── HERO SECTION ───────────────── */}
        <section ref={heroRef} className="relative flex-1 min-h-[500px] lg:min-h-[600px] overflow-hidden">
          {/* Background image — add your hero image path here */}
          <div className="absolute inset-0">
            <img
              src={`${process.env.NEXT_PUBLIC_IMG_PATH}landing/hero-bg.png`}
              alt="IPS MBA Campus"
              className="object-cover object-center w-full h-full"
            />
            {/* Dark overlay for text readability */}
          </div>

          {/* Content grid */}
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 py-10 lg:py-16 flex flex-col md:flex-row items-center justify-between gap-10">
            {/* ── Left: headline ── */}
            <motion.div
              className="flex-1 text-white flex flex-col justify-center lg:pt-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            >
              {/* MBA pill */}
              <div className="mb-4 max-w-[120px]">
                {/* monitor icon */}
                <img
                  src={`${process.env.NEXT_PUBLIC_IMG_PATH}landing/mba-logo.webp`}
                  alt="IPS MBA Campus"
                  className="object-cover object-center w-full"
                />
              </div>

              <h1 className="font-extrabold leading-tight uppercase tracking-wide">
                <span className="lg:text-[42px] text-[32px] font-normal"> Earn While</span>
                <span className="text-white block lg:text-[74px] font-bold text-[40px] lg:leading-[74px]">
                  You Learn
                </span>
              </h1>
              <p className="mt-3 text-base sm:text-lg text-gray-200 drop-shadow">
                Build your career while you build your degree.
              </p>
            </motion.div>

            {/* ── Right: NoPaperForms widget ── */}
            <motion.div
              id="register-form"
              className="w-full max-w-md lg:max-w-[420px] flex-shrink-0 bg-[#E87816] rounded-md pb-3 px-[6] pt-[14]"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
            >
              {/* Orange header bar */}
              <div className="text-white text-center">
                <h2 className="text-xl font-bold tracking-wide">Registration Form</h2>
              </div>

              {/* Widget iframe wrapper */}
              <div className="npf_wgts slider_npf" data-height="462px" data-w="403033ae15ee6358da0c4b73aa2f8df6">
                <iframe
                  frameBorder="0"
                  width="100%"
                  height="462px"
                  sandbox="allow-top-navigation allow-scripts allow-same-origin allow-downloads allow-popups allow-popups-to-escape-sandbox"
                  src="https://widgets.in8.nopaperforms.com/register?&r=&q=&w=403033ae15ee6358da0c4b73aa2f8df6&m=&cu=https://ipscollege.com/landing/"
                  title="Registration Form"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───────────────── IPS EDGE SECTION ───────────────── */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-[1240px] mx-auto">
            <ScrollReveal className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                The IPS Edge: <span className="text-[#FB7C1B]">Built For The Bold</span>
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-500">
                Learn from leaders, work with the best, and train for tomorrow – all in one MBA journey.
              </p>
            </ScrollReveal>

            <ScrollReveal variants={staggerContainer}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {IPS_EDGE_FEATURES.map(({ icon: Icon, label }, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardItem}
                    className="flex items-center gap-4 rounded-lg px-5 py-5 shadow-md"
                    style={{ background: 'linear-gradient(90deg, #FE8C00 0%, #F83600 100%)' }}
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-md flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" strokeWidth={1.6} />
                    </div>
                    <p className="text-white font-semibold text-sm sm:text-base leading-snug whitespace-pre-line">
                      {label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ───────────────── WHAT YOU'LL GET SECTION ───────────────── */}
        <section className="bg-[#F9FAFB] py-14 px-4">
          <div className="max-w-[1240px] mx-auto">
            <ScrollReveal className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                What You'll Get In The <span className="text-orange-500">IPS MBA</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                At IPS, your MBA is more than just a degree – It's your career kickstart. With a future-ready curriculum
                and real-world exposure, you don't just learn – you earn, apply, and grow.
              </p>
            </ScrollReveal>

            <ScrollReveal variants={staggerContainer}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {MBA_FEATURES.map(({ icon: Icon, label, highlight }, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardItem}
                    className="bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center text-center px-5 py-8 shadow-sm"
                  >
                    <div className="w-16 h-16 flex items-center justify-center mb-5">
                      <Icon className="w-10 h-10" style={{ color: '#FE8C00' }} strokeWidth={1.5} />
                    </div>
                    <p className="text-sm sm:text-[15px] font-medium text-gray-700 leading-snug">
                      {label.split('\n').map((line, i) => (
                        <span key={i}>
                          {highlight && i === 1 ? <span className="text-orange-500">{line}</span> : line}
                          {i === 0 && <br />}
                        </span>
                      ))}
                    </p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ───────────────── STATS / LAUNCHPAD SECTION ───────────────── */}
        <section ref={statsRef} className="relative overflow-hidden py-10 sm:py-14">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={`${process.env.NEXT_PUBLIC_IMG_PATH}landing/download-bg.webp`}
              alt=""
              className="w-full h-full object-cover object-center"
            />
            {/* Warm orange overlay so numbers stay readable */}
            <div className="absolute inset-0 bg-orange-600/60" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-[1240px] mx-auto px-4">
            <ScrollReveal className="flex justify-center mb-8">
              <p className="text-white text-base sm:text-lg font-medium tracking-wide">
                Visionary <span className="font-bold">Talent</span> Launchpad
              </p>
            </ScrollReveal>

            <ScrollReveal variants={staggerContainer}>
              <div className="grid grid-cols-2 sm:grid-cols-4 justify-center text-center gap-8 sm:gap-4">
                {STATS.map(({ value, suffix, label }, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, scale: 0.7 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
                    }}
                  >
                    <StatItem target={value} suffix={suffix} label={label} enabled={statsVisible} />
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ───────────────── WHY IPS SECTION ───────────────── */}
        <section className="bg-[#F9FAFB] py-14 px-4">
          <div className="max-w-[1240px] mx-auto">
            <ScrollReveal className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                <span className="text-orange-500">Why IPS</span> Stands Out From The Crowd.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-500">
                On-job training, foreign programs, and industry-driven education.
              </p>
            </ScrollReveal>

            <ScrollReveal variants={staggerContainer}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {WHY_IPS.map(({ icon: Icon, title, body }, idx) => (
                  <motion.div
                    key={idx}
                    variants={idx % 2 === 0 ? slideLeft : slideRight}
                    className="bg-white border border-gray-200 rounded-xl flex items-start gap-4 px-6 py-6 shadow-sm"
                  >
                    <div className="flex-shrink-0 w-12 h-12 border border-orange-200 rounded-lg flex items-center justify-center bg-orange-50">
                      <Icon className="w-6 h-6" style={{ color: '#FE8C00' }} strokeWidth={1.6} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-orange-500 mb-1 leading-snug">{title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ───────────────── HIRING PARTNERS SECTION ───────────────── */}
        <section className="bg-white py-14 px-4">
          <div className="max-w-[1240px] mx-auto">
            <ScrollReveal className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                <span className="text-orange-500">Hiring Partners.</span> Who Trust IPS.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-500">
                Our students are not just placed – they're chosen by industry leaders.
              </p>
            </ScrollReveal>

            <ScrollReveal variants={staggerContainer}>
              <div className="flex flex-wrap justify-center gap-3">
                {HIRING_PARTNERS.map(({ name, src }, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardItem}
                    className="w-[calc(33.333%-8px)] sm:w-[calc(25%-9px)] md:w-[calc(16.666%-10px)] flex items-center justify-center h-20 bg-white"
                  >
                    <img src={src} alt={name} className="max-h-20 max-w-full object-contain" />
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ───────────────── PLACEMENTS SLIDER SECTION ───────────────── */}
        <section className="relative overflow-hidden py-14 px-4 bg-[#F9FAFB]">
          <div className="relative z-10 max-w-[1240px] mx-auto">
            <ScrollReveal className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                They Dreamt It. <span className="text-orange-500">IPS Made It Happen.</span>
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-500">
                See how IPS students turned ambition into offers.
              </p>
            </ScrollReveal>

            <ScrollReveal variants={fadeIn}>
              <div className="lp-placement-slider lg:px-0 px-[8px]">
                <LandingPlacementSlider />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ───────────────── YOUTUBE SHORTS SECTION ───────────────── */}
        <section className="bg-white py-14 px-4">
          <div className="max-w-[1240px] mx-auto">
            <ScrollReveal className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                The IPS Experience – <span className="text-orange-500">Through Their Eyes</span>
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-500">
                Honest voices. Big wins. And stories you'll want to be part of.
              </p>
            </ScrollReveal>

            <ScrollReveal variants={fadeIn}>
              <div className="youtube-shorts-slider lg:px-0 px-[8px]">
                <YouTubeShortsSlider />
              </div>
            </ScrollReveal>
          </div>
        </section>
        {/* ─────────────────  Life @ IPS   ───────────────── */}
        <section className="relative overflow-hidden py-14 px-4 bg-[#F9FAFB]">
          <div className="relative z-10 max-w-[1240px] mx-auto">
            <ScrollReveal className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Life @ <span className="text-orange-500"> IPS</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal variants={fadeIn}>
              <img src={`${process.env.NEXT_PUBLIC_IMG_PATH}landing/single-imag.webp`} className="w-full" />
            </ScrollReveal>
          </div>
        </section>

        {/* ───────────────── CTA BANNER ───────────────── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-[1240px] mx-auto">
            <ScrollReveal
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.98 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: 'easeOut' } },
              }}
            >
              <div
                className="flex flex-col sm:flex-row overflow-hidden rounded-xl shadow-lg px-6 py-6 gap-4"
                style={{ background: 'linear-gradient(90deg, #FE8C00 0%, #F83600 100%)' }}
              >
                {/* Left image strip */}
                <div className="sm:w-[320px] w-full flex-shrink-0">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_PATH}landing/image-36.webp`}
                    alt="IPS MBA student"
                    className="w-full h-full object-cover object-center"
                    style={{ minHeight: '180px' }}
                  />
                </div>

                {/* Right content */}
                <div className="flex flex-col justify-center gap-4">
                  <h2 className="text-white text-xl sm:text-2xl font-medium leading-snug">
                    Real Skills. Foreign Exposure. A<br />
                    Future-Ready MBA.
                  </h2>
                  <p className="text-white/85 text-sm leading-relaxed">
                    From hands-on Business Analytics &amp; Digital Marketing to a 3-month international training — this
                    is where careers take off, not just begin.
                  </p>
                  <div>
                    <a
                      href="#register-form"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById('register-form')
                          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="inline-block border border-white text-white text-sm font-semibold px-6 py-2.5 rounded hover:bg-white hover:text-orange-500 transition-colors duration-200"
                    >
                      Start Your Journey Now
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ───────────────── FAQ SECTION ───────────────── */}
        <section className="bg-white py-14 px-4">
          <div className="max-w-[1240px] mx-auto">
            <ScrollReveal className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Frequently <span className="text-orange-500">Asked Questions</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variants={fadeIn} className="w-full max-w-4xl mx-auto">
              <Accordion type="single" collapsible defaultValue="faq-1" className="w-full max-w-4xl mx-auto">
                <AccordionItem value="faq-1">
                  <AccordionTrigger className="cursor-pointer">
                    What are the eligibility criteria for the MBA program at IPS?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-[#7A7A7A]">
                      You must have a bachelor’s degree in any discipline with a minimum of 50% marks (45% for reserved
                      categories).
                    </p>{' '}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-2">
                  <AccordionTrigger className="cursor-pointer">Is the MBA program AICTE approved? </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-[#7A7A7A]">
                      Yes, our MBA program is AICTE approved and affiliated with CCS University.
                    </p>{' '}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-3">
                  <AccordionTrigger className="cursor-pointer">What is the Study + Work Model? </AccordionTrigger>
                  <AccordionContent>
                    {' '}
                    <p className="text-[#7A7A7A]">
                      It’s a unique structure where students work with companies while studying, gaining hands-on
                      industry experience and a monthly stipend.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-4">
                  <AccordionTrigger className="cursor-pointer">
                    Are there opportunities for international exposure?{' '}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-[#7A7A7A]">
                      Yes! IPS offers 3-month foreign training and student exchange programs every year for global
                      learning and networking.{' '}
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-5">
                  <AccordionTrigger className="cursor-pointer">
                    Do you offer training in Business Analytics and Digital Marketing?{' '}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-[#7A7A7A]">
                      Yes, both are integrated into the MBA curriculum as certified additional courses to make students
                      future-ready.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollReveal>
          </div>
        </section>

        {/* ───────────────── FOOTER ───────────────── */}
        <footer className="bg-black px-4 pt-12 pb-6">
          <div className="max-w-[1240px] mx-auto">
            <ScrollReveal variants={staggerContainer}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-10 border-b border-white/10">
                {/* Col 1 — Logo + about */}
                <motion.div variants={slideLeft} className="flex flex-col gap-5">
                  <div className="bg-white rounded-md inline-flex p-3 w-fit">
                    {/* Replace src with actual logo URL */}
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMG_PATH}landing/image-35.webp`}
                      alt="IPS College Jaipur"
                      className="h-24 w-auto object-contain"
                    />
                  </div>
                  <p className="text-white text-xs sm:text-sm leading-relaxed">
                    IPS COLLEGE, JAIPUR Is One Of The Rajasthan's Elite Business Schools Shaping Business Practice And
                    Transforming Careers Across The Globe." As One Of The Rajasthans's Leading Business Schools, IPS
                    COLLEGE JAIPUR .
                  </p>
                </motion.div>

                {/* Col 2 — Address */}
                <motion.div variants={fadeUp}>
                  <h3 className="text-orange-500 font-semibold text-base mb-5">Address:</h3>
                  <div className="flex flex-col gap-5">
                    {/* Address 1 */}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                      </div>
                      <p className="text-white text-xs sm:text-sm leading-relaxed">
                        A 1, Padmawati Colony - B, Pandit T.N. Mishra Marg, Nirman Nagar, Jaipur, Rajasthan, INDIA -
                        302019
                      </p>
                    </div>

                    {/* Address 2 */}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                      </div>
                      <p className="text-white text-xs sm:text-sm leading-relaxed">
                        Rohini Nagar, Phase 3, Chandawas, Sanganer - Renwal Road, Jaipur, Rajasthan, INDIA - 303904
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Col 3 — Contact */}
                <motion.div variants={slideRight}>
                  <h3 className="text-orange-500 font-semibold text-base mb-5">Contact:</h3>
                  <div className="flex flex-col gap-4">
                    {/* Phone */}
                    <a
                      href="tel:+918233970000"
                      className="flex items-center gap-3 text-white text-xs sm:text-sm hover:text-white transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-white flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h1.5a1 1 0 01.98.804l.74 3.698a1 1 0 01-.27.958l-1.2 1.2a16.016 16.016 0 006.6 6.6l1.2-1.2a1 1 0 01.958-.27l3.698.74A1 1 0 0121 17.5V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                        />
                      </svg>
                      +91-8233970000
                    </a>

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/919829016449"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white text-xs sm:text-sm hover:text-white transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-white flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.17 1.6 5.99L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 22c-1.85 0-3.65-.5-5.22-1.44l-.37-.22-3.87 1.02 1.04-3.77-.24-.39A9.93 9.93 0 012 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm5.44-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.14 8.14 0 01-2.4-1.48 9.03 9.03 0 01-1.66-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.2-.24-.58-.48-.5-.67-.51H6.9c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.06 2.85 1.2 3.05c.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.62.7.22 1.34.19 1.84.12.56-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.19-.57-.34z" />
                      </svg>
                      +91-9829016449
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:info@ipsedu.in"
                      className="flex items-center gap-3 text-white text-xs sm:text-sm hover:text-white transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-white flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      info@ipsedu.in
                    </a>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>

            <ScrollReveal variants={fadeIn} className="pt-5 text-center">
              <p className="text-white text-xs sm:text-sm">© Copyright IPS Business School All Rights Reserved</p>
            </ScrollReveal>
          </div>
        </footer>
      </div>

      {/* ───────────────── STICKY APPLY BAR (mobile only) ───────────────── */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-50
          flex sm:hidden
          transition-transform duration-500 ease-in-out
          ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <button
          type="button"
          onClick={() => {
            document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          className="w-full py-4 text-white text-base font-bold tracking-wide uppercase shadow-2xl"
          style={{ background: 'linear-gradient(90deg, #FE8C00 0%, #F83600 100%)' }}
        >
          Apply Now
        </button>
      </div>
    </>
  );
}

/* ── Individual stat counter ── */
function StatItem({ target, suffix, label, enabled }) {
  const count = useCountUp(target, 800, enabled);
  return (
    <div className="text-white">
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-none">
        {count}
        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">{suffix}</span>
      </div>
      <p className="mt-2 text-xs sm:text-sm font-light tracking-wide opacity-90">{label}</p>
    </div>
  );
}

/* ── YouTube Shorts data ── */
const YOUTUBE_SHORTS = [
  { url: 'https://youtube.com/shorts/6rzYURI39s0?si=SRsUQ89ytV7gfjHG', id: '6rzYURI39s0' },
  { url: 'https://youtube.com/shorts/UMh5xmC1PfM?si=DPfFcbwNgZj5tBly', id: 'UMh5xmC1PfM' },
  { url: 'https://youtube.com/shorts/dKTusBSD8Ao?si=0BIoWnNs4yrv7SUV', id: 'dKTusBSD8Ao' },
  { url: 'https://youtube.com/shorts/1dJfWRGIPeU?si=wgoAz-KYs4YbFZOV', id: '1dJfWRGIPeU' },
  { url: 'https://youtube.com/shorts/6DEBjj2XQAo?si=Yp6YZMTbzLvEJ4Rj', id: '6DEBjj2XQAo' },
  { url: 'https://youtube.com/shorts/Cgj691xJMbY?si=1MmtCmxe1dOHLe5-', id: 'Cgj691xJMbY' },
  { url: 'https://youtube.com/shorts/9sU-6fggTkg?si=W7lsuEs_H4oiSD9A', id: '9sU-6fggTkg' },
];

/* ── YouTube Shorts arrow buttons ── */
function ShortsNextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg transition-all duration-300 items-center justify-center group hover:scale-110 hidden md:flex"
      style={{ background: 'linear-gradient(90deg, #FE8C00 0%, #F83600 100%)' }}
      aria-label="Next slide"
    >
      <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
    </button>
  );
}

function ShortsPrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg transition-all duration-300 items-center justify-center group hover:scale-110 hidden md:flex"
      style={{ background: 'linear-gradient(90deg, #FE8C00 0%, #F83600 100%)' }}
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-5 h-5 text-white group-hover:-translate-x-0.5 transition-transform duration-300" />
    </button>
  );
}

/* ── YouTube Shorts slider component ── */
function YouTubeShortsSlider() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <ShortsNextArrow />,
    prevArrow: <ShortsPrevArrow />,
    customPaging: () => (
      <button type="button" className="p-0" aria-label="Go to slide">
        <span className="inline-block h-[8px] w-[8px] rounded-full bg-gray-300 shadow transition-[width,background-color] duration-300 ease-in-out" />
      </button>
    ),
    appendDots: (dots) => <ul className="flex items-center justify-center gap-[6px] p-0 m-0 list-none mt-7">{dots}</ul>,
    responsive: [
      /* ≥1280px — 4 cards */
      { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 1, arrows: true } },
      /* ≥1024px — 3 cards */
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1, arrows: true } },
      /* ≥640px — 2 cards */
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, arrows: false, dots: true } },
      /* <640px — 1 card */
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true } },
    ],
  };

  return (
    <Slider {...sliderSettings}>
      {YOUTUBE_SHORTS.map((short, idx) => (
        <div key={idx} className="px-2">
          <a
            href={short.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden shadow-md group"
            aria-label={`Watch YouTube Short ${idx + 1}`}
          >
            {/* 9:16 portrait ratio for Shorts */}
            <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
              <img
                src={`https://i.ytimg.com/vi/${short.id}/hqdefault.jpg`}
                alt={`IPS Student Story ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:bg-red-700 transition-colors duration-300">
                  <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {/* YouTube badge */}
              <div className="absolute bottom-2 right-2 bg-black/70 rounded px-1.5 py-0.5 flex items-center gap-1">
                <svg className="w-4 h-3" viewBox="0 0 24 17" fill="none" aria-hidden="true">
                  <path
                    d="M23.495 2.656a3.016 3.016 0 0 0-2.122-2.135C19.505 0 12 0 12 0S4.495 0 2.627.521A3.016 3.016 0 0 0 .505 2.656 31.388 31.388 0 0 0 0 8.5a31.388 31.388 0 0 0 .505 5.844 3.016 3.016 0 0 0 2.122 2.135C4.495 17 12 17 12 17s7.505 0 9.373-.521a3.016 3.016 0 0 0 2.122-2.135A31.388 31.388 0 0 0 24 8.5a31.388 31.388 0 0 0-.505-5.844z"
                    fill="#FF0000"
                  />
                  <path d="M9.545 12.023V4.977L15.818 8.5l-6.273 3.523z" fill="white" />
                </svg>
                <span className="text-white text-[10px] font-semibold leading-none">YouTube</span>
              </div>
            </div>
          </a>
        </div>
      ))}
    </Slider>
  );
}

/* ── Placement slider arrow buttons ── */
function PlacementNextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg transition-all duration-300 items-center justify-center group hover:scale-110 hidden md:flex"
      style={{ background: 'linear-gradient(90deg, #FE8C00 0%, #F83600 100%)' }}
      aria-label="Next slide"
    >
      <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
    </button>
  );
}

function PlacementPrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg transition-all duration-300 items-center justify-center group hover:scale-110 hidden md:flex"
      style={{ background: 'linear-gradient(90deg, #FE8C00 0%, #F83600 100%)' }}
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-5 h-5 text-white group-hover:-translate-x-0.5 transition-transform duration-300" />
    </button>
  );
}

/* ── Placement slider component ── */
function LandingPlacementSlider() {
  const placementStudents = [
    { name: 'Zomato Placement', image: 'images/home/Zomatoo.webp' },
    { name: 'Zomato Placement 2', image: 'images/home/Zomato (2).webp' },
    { name: 'Unique Builders', image: 'images/home/Unique Builders.webp' },
    { name: 'TCS Placement 1', image: 'images/home/tcs1.webp' },
    { name: 'TCS Placement 2', image: 'images/home/tcs (1).webp' },
    { name: 'Sintex', image: 'images/home/Sintex.webp' },
    { name: 'Namdev 1', image: 'images/home/namdev.webp' },
    { name: 'Namdev 2', image: 'images/home/namdev (2).webp' },
    { name: 'MRF', image: 'images/home/mrf (1).webp' },
    { name: 'LIC', image: 'images/home/lic.webp' },
    { name: 'ICICI', image: 'images/home/icici (1).webp' },
    { name: 'HDFC 1', image: 'images/home/hffc.webp' },
    { name: 'HDFC 2', image: 'images/home/hffc (2).webp' },
    { name: 'HDFC Mutual Fund', image: 'images/home/hdfc mutual fund.webp' },
    { name: 'HDFC Life', image: 'images/home/hdfc life (2).webp' },
    { name: 'GSK', image: 'images/home/gsk (1).webp' },
    { name: 'Deutsche Bank', image: 'images/home/deutsche bank.webp' },
    { name: 'CUB 1', image: 'images/home/cub.webp' },
    { name: 'CUB 2', image: 'images/home/cub (2).webp' },
    { name: 'Axis Bank', image: 'images/home/axis bank.webp' },
    { name: 'Archer and Bulls', image: 'images/home/Archer and Bulls.webp' },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <PlacementNextArrow />,
    prevArrow: <PlacementPrevArrow />,
    customPaging: () => (
      <button type="button" className="p-0">
        <span className="inline-block h-[8px] w-[8px] rounded-full bg-gray-300 shadow transition-[width,background] duration-300 ease-in-out" />
      </button>
    ),
    appendDots: (dots) => <ul className="flex items-center justify-center gap-2 p-0 m-0 list-none mt-10">{dots}</ul>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1, arrows: true } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true } },
    ],
  };

  return (
    <Slider {...sliderSettings}>
      {placementStudents.map((student, idx) => (
        <div key={idx} className="px-2 sm:px-3">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={`${process.env.NEXT_PUBLIC_IMG_PATH}${student.image}`}
              alt={student.name}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}
