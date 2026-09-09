'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

// ── Static fallback data ───────────────────────────────────────────────────────
const IMG = process.env.NEXT_PUBLIC_IMG_PATH || '/';

const FALLBACK_SLIDES = [
  {
    src: `${IMG}images/home/ips-home-img-2.webp`,
    alt: 'IPS Business School - Main Campus Banner',
    priority: true,
  },
  {
    src: `${IMG}images/home/Ranked-banner.webp`,
    alt: 'IPS Business School - Ranked Among The Best',
    priority: false,
  },
];
const FALLBACK_SEO_H1 = 'Industry-Focused Learning at the Top Business Schools in Jaipur';

// ── Custom dot indicator ───────────────────────────────────────────────────────
function Dot() {
  return (
    <span className="inline-block lg:h-[10px] w-[8px] h-[8px] lg:w-[10px] rounded-full bg-white/65 shadow transition-[width,background] duration-300 ease-in-out" />
  );
}

// ── Animation variants ─────────────────────────────────────────────────────────
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.8, ease: 'easeOut' },
  },
};

export default function HomeBanner({ data }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Use DB data if available, otherwise fall back to static defaults
  const slides =
    data?.bannerSlides?.length > 0
      ? [...data.bannerSlides].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : FALLBACK_SLIDES;

  const seoH1 = data?.bannerSeoH1 || FALLBACK_SEO_H1;

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
        {seoH1}
      </h1>
      <div className="ips-banner-slider">
        <Slider {...settings}>
          {slides.map((slide, idx) => (
            <div key={slide._id || idx}>
              <motion.div className="relative w-full h-[170px] sm:h-[280px] md:h-[380px] lg:h-[470px] 2xl:h-[650px]">
                <Image
                  src={slide.src}
                  alt={slide.alt || ''}
                  fill
                  priority={slide.priority || false}
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
