'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// ── Static fallback ────────────────────────────────────────────────────────────
const IMG = process.env.NEXT_PUBLIC_IMG_PATH || '/';

const FALLBACK_IMAGES = Array.from({ length: 27 }, (_, i) => ({
  image: `${IMG}images/home/${i + 1}.webp`,
  id: i + 1,
}));

const textContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const textItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};
const sliderVariants = {
  hidden: { opacity: 0, scale: 0.95, x: 30 },
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut', delay: 0.2 } },
};

export default function StudentTestimonials({ data }) {
  const [autoplayDelay, setAutoplayDelay] = useState(1500);

  useEffect(() => {
    const handleResize = () => {
      setAutoplayDelay(window.innerWidth < 768 ? 0 : 1500);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const label = data?.testimonialsLabel || 'STUDENTS FEEDBACK';
  const heading = data?.testimonialsHeading || 'Our Students Says';
  const description =
    data?.testimonialsDescription ||
    'Discover how IPS Business School is transforming ambitions into achievements through quality education, practical learning, and student success stories';

  const images =
    data?.testimonialImages?.length > 0
      ? [...data.testimonialImages].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : FALLBACK_IMAGES.map((img) => ({ ...img, image: `${process.env.NEXT_PUBLIC_IMG_PATH}${img.image}` }));

  return (
    <section
      aria-label="Students Feedback"
      className="relative overflow-hidden py-[60px] md:py-[80px] lg:py-[100px] lg:px-[16px] bg-[#f8f9fa]"
    >
      <div className="relative w-full max-w-[1202px] mx-auto px-[16px] lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px] lg:gap-[60px] items-center">
          {/* Left Side - Content */}
          <motion.div
            className="lg:col-span-1 flex items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textContainerVariants}
          >
            <div className="w-full max-w-[500px]">
              <motion.p
                variants={textItemVariants}
                className="text-blue text-[12px] md:text-[14px] font-semibold uppercase tracking-wider mb-[4px] font-montserrat"
              >
                {label}
              </motion.p>

              <motion.h2
                variants={textItemVariants}
                className="text-ips-amber text-[28px] md:text-[40px] lg:text-[42px] font-bold leading-[1.2] mb-[20px] figtree-font"
              >
                {heading}
              </motion.h2>

              <motion.p
                variants={textItemVariants}
                className="text-[#77838F] text-[14px] md:text-[16px] leading-[1.7] mb-[30px] font-normal"
              >
                {description}
              </motion.p>

              <motion.button
                variants={textItemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-ips-orange text-white font-semibold text-[16px] md:text-[18px] px-[32px] py-[14px] rounded-[4px] hover:bg-[#e68a2e] transition-colors duration-300 shadow-md hover:shadow-lg figtree-font"
                aria-label="Read More"
              >
                Read More
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side - Testimonial Slider */}
          <motion.div
            className="lg:col-span-2 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sliderVariants}
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              centeredSlides={false}
              loop={true}
              autoplay={{ delay: autoplayDelay, disableOnInteraction: false, pauseOnMouseEnter: true }}
              speed={3000}
              grabCursor={true}
              allowTouchMove={true}
              breakpoints={{
                400: { slidesPerView: 1.2, spaceBetween: 15 },
                470: { slidesPerView: 1.9, spaceBetween: 15 },
                640: { slidesPerView: 2, spaceBetween: 18 },
                768: { slidesPerView: 1.8, spaceBetween: 20 },
                1024: { slidesPerView: 2, spaceBetween: 20 },
              }}
              className="students-testimonial-slider"
            >
              {images.map((item, idx) => (
                <SwiperSlide key={item._id || item.id || idx}>
                  <motion.div
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="bg-white rounded-[16px] overflow-hidden shadow-lg h-[280px] sm:h-[300px] md:h-[320px] lg:h-[380px]"
                  >
                    <div className="w-full h-full">
                      <img
                        src={item.image}
                        alt={`IPS Student Testimonial ${idx + 1}`}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        :global(.students-testimonial-slider .swiper-slide) {
          transition: transform 0.3s ease;
          height: auto;
        }
        :global(.students-testimonial-slider .swiper-wrapper) {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
}
