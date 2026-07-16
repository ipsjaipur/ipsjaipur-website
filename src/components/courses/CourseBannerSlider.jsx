'use client';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

// ── Animation variants ─────────────────────────────────────────────────────
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
      when: 'beforeChildren',
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
    },
  },
};

/**
 * Reusable course banner slider component
 * @param {Array} slides - Array of slide objects with { id, src, alt, priority }
 */
export default function CourseBannerSlider({ slides = [], courseName = null, position, improveContrast }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1700,
    autoplay: true,
    fade: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: true,
  };

  // Return null if no slides provided
  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <motion.section
      aria-label="Course banner slider"
      className="leading-none overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="ips-banner-slider">
        <Slider {...settings}>
          {slides?.map((slide) => (
            <div key={slide.id}>
              <motion.div
                className={`relative w-full h-[120px] sm:h-[240px] md:h-[270px] lg:h-[300px] xl:h-[480px] overflow-hidden`}
                variants={imageVariants}
              >
                <img
                  src={process.env.NEXT_PUBLIC_IMG_PATH + slide.src}
                  alt={slide.alt}
                  className={`object-cover ${(position && position) || ' object-top'} w-full h-full`}
                  style={{ filter: improveContrast && 'contrast(105%)' }}
                />
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </motion.section>
  );
}
