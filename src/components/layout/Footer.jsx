'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FixedActionButtons from '../common/FixedActionButtons';
import { MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

// ─── Social Icons ─────────────────────────────────────────────────────────────
const SOCIAL_ICONS = {
  instagram: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zM8 3.892a4.108 4.108 0 1 0 0 8.216 4.108 4.108 0 0 0 0-8.216zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
    </svg>
  ),
  facebook: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
    </svg>
  ),
  twitter: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
    </svg>
  ),
};

// ─── Map Pin Icon ─────────────────────────────────────────────────────────────
const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

// ─── Scroll to Top Icon ───────────────────────────────────────────────────────
const ScrollToTopIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

// ─── Footer Static Data ───────────────────────────────────────────────────────
const FOOTER_DATA = {
  about: {
    heading: 'About Us',
    description:
      'IPS College, Jaipur is one of the Rajasthan’s elite business schools shaping business practice and transforming careers across the globe.” As one of the Rajasthans’s leading Business Schools, IPS COLLEGE JAIPUR .',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.7127097952143!2d75.75276527497212!3d26.88086726145918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db4f750821f2b%3A0x9070c7c87969b72d!2sIPS%20BUSINESS%20SCHOOL!5e0!3m2!1sen!2sin!4v1696853531497!5m2!1sen!2sin',
    downloadLocationPdf: '/images/home/IPS-googlemap.pdf',
  },
  courses: {
    heading: 'Our Courses',
    links: [
      { label: 'MBA (Master in Business Administration)', href: '/mba' },
      { label: 'BBA (Bachelor of Business Administration)', href: '/bba' },
      { label: 'BCA (Bachelor of Computer Applications)', href: '/bca' },
    ],
  },
  importantLinks: {
    heading: 'Quick Links',
    links: [
      { label: 'Student Life', href: '/student-life' },
      { label: 'Placements', href: '/placements' },
      { label: 'Scholarships', href: '/scholarships' },
      { label: 'Infrastructure', href: '/infrastructure' },
      { label: 'Career @ IPS BUSINESS SCHOOL', href: '/career-ips-business-school' },
      { label: 'Anti Ragging', href: '/anti-ragging' },
      { label: 'Blogs', href: '/blogs' },
      // { label: 'News & Updates', href: '/campus-news' },
      { label: 'Terms & Conditions', href: '/terms-conditions' },
    ],
  },
  contact: {
    heading: 'Connect with Us',
    collegeName: 'IPS COLLEGE JAIPUR',
    addresses: [
      {
        text: 'A 1, Padmawati Colony – B, Pandit T.N. Mishra Marg, Nirman Nagar, Jaipur, Rajasthan, INDIA - 302019',
      },
      {
        text: 'Rohini Nagar, Phase 3, Chandawas, Sanganer - Rewari Road, Jaipur, Rajasthan, INDIA - 303904',
      },
    ],
    email: 'info@ipsedu.in',
    phones: [{ number: '+918233970000', type: 'whatsapp', waLink: 'https://wa.me/918233970000' }],
    social: [
      {
        platform: 'instagram',
        href: 'https://www.instagram.com/ipsbschool/?next=https%3A%2F%2Fwww.instagram.com%2Fstories%2Fipsbschool%2F3337108388024043690%2F',
        label: 'Instagram',
      },
      { platform: 'facebook', href: 'https://www.facebook.com/ipsbusinessschool', label: 'Facebook' },
      { platform: 'linkedin', href: 'https://www.linkedin.com/school/1024483/admin/feed/posts/', label: 'LinkedIn' },
      { platform: 'twitter', href: 'https://twitter.com/home', label: 'Twitter' },
    ],
  },
  bottom: {
    copyright: `© ${new Date().getFullYear()} IPS College Jaipur. All rights reserved.`,
    credit: { label: 'Designed & Developed by Mediagarh', href: 'https://mediagarh.com' },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function Footer() {
  const { about, courses, importantLinks, contact, bottom } = FOOTER_DATA;
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ── Show/Hide Scroll to Top button based on scroll position ─────────────────
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Scroll to Top function ───────────────────────────────────────────────────
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="w-full max-w-[1202px] mx-auto sm:px-[16px] px-[26px] lg:mb-[-90px] lg:mt-[90px] mt-[24px] mb-[-120px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-visible rounded-[12px] sm:p-[20px] p-[16px]"
        >
          {/* Background Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-cover rounded-[12px]"
            style={{
              backgroundImage: "url('/images/home/graduation-bg.webp')",
              backgroundPosition: 'top center',
            }}
          />

          {/* Graduation Cap */}
          <motion.div
            initial={{ opacity: 0, y: -30, rotate: -12 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute lg:-top-16 -top-10 lg:-left-16 -left-9 z-20"
          >
            <img src="/images/home/cap-bg.webp" alt="" className="lg:w-40 w-[96px] select-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative bg-[#fffffff2] z-10 flex flex-col lg:flex-row items-center justify-between lg:gap-10 gap-6 lg:px-[40px] px-[16px] py-[16px] lg:py-[24px] rounded-[12px]"
          >
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
              className="max-w-[700px]"
            >
              <p className="uppercase tracking-[4px] text-[#29456C] lg:text-start text-center lg:text-sm text-[10px] font-semibold mb-3">
                READY TO TAKE THE NEXT STEP?
              </p>

              <h2 className="lg:text-[32px] text-[22px] leading-tight lg:text-start text-center font-medium text-ips-amber">
                Apply Now & Begin Your Journey Toward a
                <br />
                Successful Career!
              </h2>
            </motion.div>

            {/* Right */}
            <motion.a
              href="https://admissions.ipsedu.in/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#f56a00] cursor-pointer hover:bg-[#e35f00] text-white text-[16px] md:text-[18px] font-semibold px-[24px] py-[12px] rounded-lg transition"
            >
              Apply Now
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      <footer className="bg-[#2a3e61] text-white">
        {/* ══ Main Grid ══════════════════════════════════════════════════════════ */}
        <div className="mx-auto max-w-[1202px] px-4 pb-12 pt-[150px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* ── Col 1: About Us ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-4">
              {/* Institute Logo */}
              <div className="flex">
                <Image
                  src="/images/ips-logo.png"
                  alt="IPS College of Professional Studies"
                  width={220}
                  height={90}
                  className="object-contain"
                  style={{ width: '220px', height: 'auto' }}
                />
              </div>

              {/* Description */}
              <p className="text-[12px] text-gray-300 leading-relaxed">{about.description}</p>

              {/* Google Map Embed */}
              <div className="w-full rounded overflow-hidden border border-gray-600 relative">
                <iframe
                  src={about.mapEmbedUrl}
                  width="100%"
                  height="160"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="IPS Business School Location"
                />
              </div>

              {/* Download Location button */}
              <a
                href={about.downloadLocationPdf}
                download="IPS-googlemap.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-[13px] font-medium rounded transition w-full sm:w-auto"
              >
                <MapPinIcon />
                Download Location
              </a>
            </div>

            {/* ── Col 2: Courses ──────────────────────────────────────────────── */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-bold text-white border-b border-gray-600 pb-2">{courses.heading}</h3>
              <ul className="flex flex-col gap-3">
                {courses.links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[13px] text-gray-300 hover:text-orange-400 transition-colors leading-snug block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Important Links ──────────────────────────────────────── */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-bold text-white border-b border-gray-600 pb-2">{importantLinks.heading}</h3>
              <ul className="flex flex-col gap-2">
                {importantLinks.links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[13px] text-gray-300 hover:text-orange-400 transition-colors block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 4: Contact Us ───────────────────────────────────────────── */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-bold text-white border-b border-gray-600 pb-2">{contact.heading}</h3>

              {/* College name */}
              {/* <p className="text-[13px] font-bold text-white flex items-center gap-1.5">
                <span>🏛</span>
                {contact.collegeName}
              </p> */}

              {/* Addresses */}
              <div className="flex flex-col gap-3">
                {contact.addresses.map((addr, i) => (
                  <div key={i} className="flex items-start gap-2 text-[12px] text-gray-300 leading-relaxed">
                    <span className="text-orange-400 mt-0.5 shrink-0">
                      <MapPin size={15} />
                    </span>
                    <span>{addr.text}</span>
                  </div>
                ))}
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 text-[13px]">
                <span className="text-orange-400 text-[15px] ">✉</span>
                <a href={`mailto:${contact.email}`} className="text-gray-300 hover:text-orange-400 transition-colors">
                  {contact.email}
                </a>
              </div>

              {/* Phones */}
              <div className="flex flex-col gap-1.5">
                {contact.phones.map((phone) => (
                  <div key={phone.number} className="flex items-center gap-2 text-[13px]">
                    <span className="text-orange-400">{phone.type === 'whatsapp' ? <Phone size={15} /> : '📞'}</span>
                    <a
                      href={phone.type === 'whatsapp' ? phone.waLink : `tel:${phone.number.replace(/\s/g, '')}`}
                      target={phone.type === 'whatsapp' ? '_blank' : undefined}
                      rel={phone.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
                      className="text-gray-300 hover:text-orange-400 transition-colors"
                    >
                      {phone.number}
                    </a>
                  </div>
                ))}
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-2 mt-1">
                {contact.social.map(({ platform, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors"
                  >
                    {SOCIAL_ICONS[platform]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ Bottom Bar ═════════════════════════════════════════════════════════ */}
        <div className="border-t border-gray-700">
          <div className="mx-auto max-w-[1400px] px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-gray-400">
            <span>{bottom.copyright}</span>
            <a
              href={bottom.credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {bottom.credit.label}
            </a>
          </div>
        </div>

        {/* ══ Scroll to Top Button ═══════════════════════════════════════════════ */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 cursor-pointer right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center group ${
            showScrollTop
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <span className="relative z-10">
            <ScrollToTopIcon />
            {/* Animated ring effect */}
            <span className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></span>
          </span>
          {/* Pulse effect */}
          <span className="absolute inset-0 rounded-full bg-orange-400 opacity-75 animate-ping-slow"></span>
        </button>
        <FixedActionButtons />
        {/* ══ Custom Keyframes for Animation ════════════════════════════════════ */}
        <style jsx>{`
          @keyframes ping-slow {
            0% {
              transform: scale(1);
              opacity: 0.75;
            }
            50% {
              transform: scale(1.15);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }
          .animate-ping-slow {
            animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
        `}</style>
      </footer>
    </>
  );
}
