'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

// ── Slides data ────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    src: `images/home/ips-banner.webp`,
    alt: 'IPS Business School - Main Campus Banner',
    priority: true,
  },
  {
    id: 2,
    src: `images/home/Ranked-banner.webp`,
    alt: 'IPS Business School - Ranked Among The Best',
    priority: false,
  },
];

// ── Custom dot indicator ───────────────────────────────────────────────────
// slick manages slick-active on the parent <li>; active style is in globals.css
function Dot() {
  return (
    <span className="inline-block lg:h-[10px] w-[8px] h-[8px] lg:w-[10px] rounded-full bg-white/65 shadow transition-[width,background] duration-300 ease-in-out" />
  );
}

// ── Animation variants ─────────────────────────────────────────────────────
const containerVariants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
    },
  },
};

const dotsVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.8,
      ease: 'easeOut',
    },
  },
};

export default function HomeBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to ensure proper mounting
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: true,
    customPaging: (i) => (
      <button type="button" aria-label={`Go to slide ${i + 1}`}>
        <Dot />
      </button>
    ),
    appendDots: (dots) => (
      <motion.ul
        className="flex items-center justify-center gap-2 p-0 m-0 list-none"
        variants={dotsVariants}
        initial="visible"
        animate="visible"
      >
        {dots}
      </motion.ul>
    ),
  };

  return (
    <motion.section
      aria-label="Hero banner slider"
      className="leading-none overflow-hidden"
      variants={containerVariants}
      initial="visible"
      animate="visible"
    >
      {/* SEO H1 tag - hidden but present for search engines */}
      <h1 className="absolute opacity-0 pointer-events-none" style={{ position: 'absolute', left: '-9999px' }}>
        Industry-Focused Learning at the Top Business Schools in Jaipur
      </h1>
      <div className="ips-banner-slider">
        <Slider {...settings}>
          {SLIDES.map((slide) => (
            <div key={slide.id}>
              <motion.div className="relative w-full h-[170px] sm:h-[280px] md:h-[380px] lg:h-[470px] 2xl:h-[650px]">
                <Image
                  src={process.env.NEXT_PUBLIC_IMG_PATH + slide.src}
                  alt={slide.alt}
                  fill
                  priority={slide.priority}
                  className="object-cover object-center sm:object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  unoptimized
                  quality={100}
                  draggable={false}
                />
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </motion.section>
  );
}
