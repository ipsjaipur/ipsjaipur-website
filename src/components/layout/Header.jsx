'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Phone, Menu, X, ChevronRight, PhoneCall, Mail } from 'lucide-react';
import { topBarContact, topBarLinks, applyButton, announcement, mainNav, helpline, MailBox } from './navData';
import { usePathname, useRouter } from 'next/navigation';
import { handleHashNavigation } from '@/utils/scrollToSection';
import Slider from 'react-slick';
import Marquee from 'react-fast-marquee';

// ─── WhatsApp Icon ─────────────────────────────────────────────────────────────
const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M8 0C3.58 0 0 3.58 0 8c0 1.4.37 2.72 1.01 3.86L0 16l4.25-1.11A7.96 7.96 0 0 0 8 16c4.42 0 8-3.58 8-8s-3.58-8-8-8zm3.93 11.07c-.17.47-1 .9-1.38.96-.35.05-.8.07-1.28-.08a11.7 11.7 0 0 1-1.16-.43C6.5 10.8 5.3 9.3 5.2 9.17c-.1-.13-.8-1.07-.8-2.04 0-.97.5-1.44.68-1.64.18-.2.39-.25.52-.25h.37c.12 0 .28-.05.44.33l.56 1.4c.05.12.08.26.02.4l-.2.4-.3.3c-.1.1-.2.2-.09.4.12.2.52.86 1.12 1.4.77.68 1.42.9 1.62 1 .2.1.32.08.44-.05l.6-.7c.13-.17.26-.13.44-.08l1.38.65c.2.1.33.14.38.22.05.08.05.47-.12.94z"
      fill="#25D366"
    />
  </svg>
);

// ─── Email Icon ────────────────────────────────────────────────────────────────
const MailIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// ─── Header Component ──────────────────────────────────────────────────────────
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [forceCloseDropdowns, setForceCloseDropdowns] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Slick slider settings for announcements
  const announcementSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
    pauseOnHover: true,
  };

  // ── Collapse top bars on scroll ────────────────────────────────────────────
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const HIDE_THRESHOLD = 100; // Hide after scrolling down 100px
    const SHOW_AT_TOP = 20; // Show when near top (within 20px)

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          setScrolled((prev) => {
            // Near top of page - always show
            if (currentScrollY < SHOW_AT_TOP) {
              lastScrollY = currentScrollY;
              return false;
            }

            // Scrolled down past threshold - hide
            if (!prev && currentScrollY > HIDE_THRESHOLD) {
              lastScrollY = currentScrollY;
              return true;
            }

            // Already hidden - keep hidden unless near top
            if (prev && currentScrollY >= SHOW_AT_TOP) {
              lastScrollY = currentScrollY;
              return true;
            }

            lastScrollY = currentScrollY;
            return prev;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Body scroll lock when mobile menu open ─────────────────────────────────
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
    return () => document.body.classList.remove('drawer-open');
  }, [isMobileMenuOpen]);

  // ── Close mobile drawer when resizing to desktop ──────────────────────────
  useEffect(() => {
    const handleResize = () => {
      // Close mobile menu when viewport becomes desktop-sized (lg breakpoint = 1024px)
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // ── Handle hash navigation ─────────────────────────────────────────────────
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) handleHashNavigation(hash);
  }, [pathname]);

  // ── Close dropdowns on route change ────────────────────────────────────────
  useEffect(() => {
    setForceCloseDropdowns(true);
    const timer = setTimeout(() => {
      setForceCloseDropdowns(false);
    }, 100); // Keep class for 100ms to ensure dropdown closes

    return () => clearTimeout(timer);
  }, [pathname]);

  // ── Nav click handler ──────────────────────────────────────────────────────
  const handleNavClick = (e, href) => {
    e.preventDefault();

    // Guard against undefined href
    if (!href) {
      console.warn('Navigation clicked without href');
      return;
    }

    const url = new URL(href, window.location.origin);
    const hash = url.hash;
    const path = url.pathname;
    setIsMobileMenuOpen(false);
    if (hash) {
      if (pathname === '/' && path === '/') {
        handleHashNavigation(hash);
      } else {
        router.push('/');
        setTimeout(() => handleHashNavigation(hash), 300);
      }
    } else {
      router.push(href);
    }
  };

  const toggleMobileAccordion = (label) => setOpenMobileAccordion((prev) => (prev === label ? null : label));

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* ══ Row 2: Announcement Bar ═════════════════════════════════════════════ */}
      <div
        className={`bg-white overflow-hidden transition-all duration-300 ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <div className="bg-[#ffe4cc] lg:rounded-b-[40px] rounded-b-[20px] py-[6px]">
          <div className="mx-auto max-w-[1202px] px-4 flex items-center h-9">
            {/* Left — contact info */}
            <div className="flex justify-between w-full">
              <div className="w-full lg:max-w-[463px] sm:max-w-[300px] max-w-[260px]">
                <Marquee gradient={false} speed={70} pauseOnHover={true}>
                  <Link
                    target="_blank"
                    href={'https://admissions.ipsedu.in/'}
                    className="sm:text-[16px] text-[14px] px-[190px] font-montserrat text-ips-orange"
                  >
                    Admissions Open for MBA | BBA | BCA 2026 - 27
                  </Link>
                </Marquee>
              </div>
              <div className="flex items-center  text-nowrap">
                <div className="lg:flex hidden items-center text-[15px] text-gray-700">
                  <a
                    href={topBarContact.phone.link}
                    className="flex items-center gap-1.5 hover:text-orange-500 transition"
                  >
                    <Phone size={13} className="text-orange-500" />
                    {topBarContact.phone.text}
                  </a>
                  <span className="px-[8px] text-[#00000040] font-normal text-[15px]">/</span>
                  <a
                    href={topBarContact.email.link}
                    className="text-[15px] flex items-center gap-1.5 hover:text-orange-500 transition"
                  >
                    <svg
                      xmlns="http://w3.org"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-orange-500"
                    >
                      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" />
                      <path d="m22 6-10 7L2 6" />
                    </svg>
                    {topBarContact.email.text}
                  </a>
                  <span className="px-[8px] text-[#00000040] font-normal text-[15px]">/</span>
                </div>

                {/* Right — program links + Apply button */}
                <div className="flex items-center text-[15px]">
                  {topBarLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-gray-700 lg:block hidden hover:text-orange-500 font-normal transition"
                    >
                      {link.label} <span className="px-[8px] text-[#00000040] font-normal text-[15px]">/</span>
                    </Link>
                  ))}
                  <Link href={applyButton.href} target="_blank" className="ml-2 lg:max-w-[120px] max-w-[90px]">
                    <img
                      src={process.env.NEXT_PUBLIC_IMG_PATH + 'images/ap-bt.png'}
                      className="img-fluid"
                      alt="Apply Now at IPS Business School"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ Row 3: Main Nav ═════════════════════════════════════════════════════ */}
      <nav className={`bg-white ${forceCloseDropdowns ? 'force-close-dropdowns' : ''}`}>
        <div className="mx-auto max-w-[1202px] px-4 flex items-center justify-between h-16">
          {/* Logo — left */}
          <Link href="/" className="shrink-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/ipsnewlogofinalok.webp`}
              alt="IPS Business School"
              width={180}
              height={60}
              priority
              loading="eager"
              style={{ width: '180px', height: 'auto' }}
            />
          </Link>

          {/* Desktop nav links — center */}
          <ul className="hidden lg:flex items-center gap-1 text-[13px] font-semibold text-gray-800">
            {mainNav.map((item) => (
              <li key={item.label} className="main-nav-item relative">
                {item.children ? (
                  // Parent item with dropdown - no href
                  <span className="flex items-center gap-0.5 px-3 py-2 hover:text-orange-500 transition cursor-pointer">
                    {item.label}
                    <ChevronDown size={12} />
                  </span>
                ) : (
                  // Regular link item
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center gap-0.5 px-3 py-2 hover:text-orange-500 transition cursor-pointer"
                  >
                    {item.label}
                  </a>
                )}
                {item.children && (
                  <ul className="main-nav-dropdown">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          onClick={(e) => {
                            // Additional click handler for dropdown items
                            setForceCloseDropdowns(true);
                            setTimeout(() => setForceCloseDropdowns(false), 100);
                          }}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* IPS College logo — right (desktop) */}
          <div className="hidden lg:flex items-center">
            <Link href="/" className="shrink-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/IPSJAIPURLOGO.webp`}
                alt="IPS College Jaipur"
                width={120}
                height={40}
                style={{ width: '120px', height: 'auto' }}
              />
            </Link>
          </div>

          {/* Mobile: Phone + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {/* <a href={helpline.link} className="p-2 text-orange-500 transition" aria-label="Call">
              <Phone size={20} />
            </a> */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 transition"
              aria-label="Menu"
            >
              {<Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ══ Mobile Drawer ════════════════════════════════════════════════════════ */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="mobile-drawer-panel">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/IPSJAIPURLOGO.webp`}
              alt="IPS Business School"
              width={110}
              height={36}
              style={{ width: '110px', height: 'auto' }}
            />
            <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close">
              <X size={24} />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {mainNav.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleMobileAccordion(item.label)}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-500 rounded transition"
                      >
                        {item.label}
                        {openMobileAccordion === item.label ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>
                      <div className={`mobile-accordion-content ${openMobileAccordion === item.label ? 'open' : ''}`}>
                        <ul className="ml-4 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-500 rounded transition"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2.5 text-sm font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-500 rounded transition"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Drawer footer */}
          <div className="p-4 border-t space-y-2">
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              {topBarLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:border-orange-500 hover:text-orange-500 transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* <Link
              href={applyButton.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-center rounded font-semibold transition"
            >
              {applyButton.text}
            </Link> */}
            <a
              href={helpline.link}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-gray-300 rounded hover:border-orange-500 hover:text-orange-500 transition"
            >
              <Phone size={18} />
              <div className="flex flex-col items-start leading-tight text-sm">
                <span className="text-xs text-gray-500">{helpline.label}</span>
                <span className="font-semibold">{helpline.phoneNumber}</span>
              </div>
            </a>
            <a
              href={MailBox.link}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-gray-300 rounded hover:border-orange-500 hover:text-orange-500 transition"
            >
              <Mail size={18} />
              <div className="flex flex-col items-start leading-tight text-sm">
                <span className="font-semibold">{MailBox.mail}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
