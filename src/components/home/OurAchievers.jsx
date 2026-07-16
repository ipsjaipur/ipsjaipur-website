'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
const achieversData = [
  {
    id: 1,
    image: 'images/home/Gold_1.webp',
  },
  {
    id: 2,
    image: 'images/home/ayushi_kabra.webp',
  },
  {
    id: 3,
    image: 'images/home/ayushi-sharma.webp',
  },
  {
    id: 4,
    image: 'images/home/pooja_mondal.webp',
  },
];

export default function OurAchievers() {
  return (
    <section
      aria-label="Our Achievers"
      className="relative overflow-hidden pt-[64px] md:pt-[120px] pb-[34px] lg:pb-[64px] px-[16px]"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_IMG_PATH}images/home/achi-bg.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}

      {/* Content Container */}
      <div className="relative w-full max-w-[1202px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-[24px] md:mb-[40px] relative">
          {/* Background Text */}
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute left-[50%] lg:top-[-90%] top-[-30%] translate-x-[-50%] font-bold leading-tight figtree-font mb-4 text-[64px] lg:text-[156px]"
          >
            <span className="text-white/10 font-extrabold block">ACHIEVERS</span>
          </motion.p>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="relative"
          >
            <span className="text-white text-[32px] md:text-[40px] lg:text-[48px] font-bold figtree-font">
              Our Achievers
            </span>
          </motion.h2>
        </div>

        {/* Achievers Slider */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={15}
          centeredSlides={false}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          grabCursor={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
          }}
          className="achievers-slider"
        >
          {achieversData.map((achiever) => (
            <SwiperSlide key={achiever.id}>
              <div className="bg-white rounded-[20px] overflow-hidden shadow-lg h-[100%] sm:h-[190px] md:h-[100%] lg:h-[320px]">
                <div className="w-full h-full">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_PATH}${achiever.image}`}
                    alt="IPS Achiever"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Slider styling */}
      <style jsx>{`
        :global(.achievers-slider) {
          padding-bottom: 60px;
          padding-left: 5px;
          padding-right: 5px;
        }
        :global(.achievers-slider .swiper-pagination) {
          bottom: 15px !important;
        }
        :global(.achievers-slider .swiper-pagination-bullet) {
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          transition: all 0.3s ease;
        }
        :global(.achievers-slider .swiper-pagination-bullet-active) {
          background: #ff9e3d;
          width: 30px;
          border-radius: 5px;
        }
        :global(.achievers-slider .swiper-slide) {
          transition: transform 0.3s ease;
          height: auto;
        }
        :global(.achievers-slider .swiper-button-next),
        :global(.achievers-slider .swiper-button-prev) {
          color: #ff9e3d;
          background: rgba(255, 255, 255, 0.9);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        :global(.achievers-slider .swiper-button-next::after),
        :global(.achievers-slider .swiper-button-prev::after) {
          font-size: 20px;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
}
