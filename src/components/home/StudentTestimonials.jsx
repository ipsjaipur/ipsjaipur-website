'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
const studentsData = [
  { id: 1, image: 'images/home/1.webp' },
  { id: 2, image: 'images/home/2.webp' },
  { id: 3, image: 'images/home/3.webp' },
  { id: 4, image: 'images/home/4.webp' },
  { id: 5, image: 'images/home/5.webp' },
  { id: 6, image: 'images/home/6.webp' },
  { id: 7, image: 'images/home/7.webp' },
  { id: 8, image: 'images/home/8.webp' },
  { id: 9, image: 'images/home/9.webp' },
  { id: 10, image: 'images/home/10.webp' },
  { id: 11, image: 'images/home/11.webp' },
  { id: 12, image: 'images/home/12.webp' },
  { id: 13, image: 'images/home/13.webp' },
  { id: 14, image: 'images/home/14.webp' },
  { id: 15, image: 'images/home/15.webp' },
  { id: 16, image: 'images/home/16.webp' },
  { id: 17, image: 'images/home/17.webp' },
  { id: 18, image: 'images/home/18.webp' },
  { id: 19, image: 'images/home/19.webp' },
  { id: 20, image: 'images/home/20.webp' },
  { id: 21, image: 'images/home/21.webp' },
  { id: 22, image: 'images/home/22.webp' },
  { id: 23, image: 'images/home/23.webp' },
  { id: 24, image: 'images/home/24.webp' },
  { id: 25, image: 'images/home/25.webp' },
  { id: 26, image: 'images/home/26.webp' },
  { id: 27, image: 'images/home/27.webp' },
];

// Stagger container for the left text block
const textContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// Right side slider entrance
const sliderVariants = {
  hidden: { opacity: 0, scale: 0.95, x: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.2 },
  },
};

export default function StudentTestimonials() {
  const [autoplayDelay, setAutoplayDelay] = useState(1500);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setAutoplayDelay(0);
      } else {
        setAutoplayDelay(1500);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
                STUDENTS FEEDBACK
              </motion.p>

              <motion.h2
                variants={textItemVariants}
                className="text-ips-amber text-[28px] md:text-[40px] lg:text-[42px] font-bold leading-[1.2] mb-[20px] figtree-font"
              >
                Our Students Says
              </motion.h2>

              <motion.p
                variants={textItemVariants}
                className="text-[#77838F] text-[14px] md:text-[16px] leading-[1.7] mb-[30px] font-normal"
              >
                Discover how IPS Business School is transforming ambitions into achievements through quality education,
                practical learning, and student success stories
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
              autoplay={{
                delay: autoplayDelay,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
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
              {studentsData.map((student) => (
                <SwiperSlide key={student.id}>
                  <motion.div
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="bg-white rounded-[16px] overflow-hidden shadow-lg h-[280px] sm:h-[300px] md:h-[320px] lg:h-[380px]"
                  >
                    <div className="w-full h-full">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMG_PATH}${student.image}`}
                        alt={`IPS Student Testimonial ${student.id}`}
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
