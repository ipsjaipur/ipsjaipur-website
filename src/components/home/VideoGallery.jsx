'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import Link from 'next/link';
import { motion } from 'framer-motion';
const videoData = [
  {
    thumbnail: 'images/home/thumb-10.webp',
    url: 'https://www.instagram.com/reel/C7WDKsxsSef/?igsh=aTYzZ2x6b2s1aTZw',
  },
  {
    thumbnail: 'images/home/thumb-11.webp',
    url: 'https://www.instagram.com/reel/DLCOt4XSp-j/?igsh=YmU1ZWFpZWVxdXRl',
  },
  {
    thumbnail: 'images/home/thumb-12.webp',
    url: 'https://www.instagram.com/reel/DLJz3VeOddn/?igsh=N3dqNmM5aGZicXY0',
  },
  {
    thumbnail: 'images/home/thumb-18.webp',
    url: 'https://www.instagram.com/reel/DLmb3ZehEjI/?igsh=MTQ5MXl3YXRsdWlkMg==',
  },
  {
    thumbnail: 'images/home/thumb-19.webp',
    url: 'https://www.instagram.com/reel/DLjYvVeB8hD/?igsh=MTZldWFjOWI4NG41Yw==',
  },
  {
    thumbnail: 'images/home/thumb-16.webp',
    url: 'https://www.instagram.com/reel/DLUM0hlO86L/?igsh=cTFtN3J5bWJwODdp',
  },
  {
    thumbnail: 'images/home/thumb-1.webp',
    url: 'https://www.instagram.com/reel/DGubqWIMt31/?igsh=MTd1ZnoydmduZDhqMA==',
  },
  {
    thumbnail: 'images/home/thumb-2.webp',
    url: 'https://www.instagram.com/reel/DGj73Zehrg8/?igsh=MWFncHppczM4MDgxMg==',
  },
  {
    thumbnail: 'images/home/thumb-3.webp',
    url: 'https://www.instagram.com/reel/DFumty9Bnpn/?igsh=MTgzc251eTI4MXc0dg==',
  },
  {
    thumbnail: 'images/home/thumb-4.webp',
    url: 'https://www.instagram.com/reel/DFZ3nhuvUA1/?igsh=amFjN2QwbXhhenU5',
  },
  {
    thumbnail: 'images/home/thumb-5.webp',
    url: 'https://www.instagram.com/reel/DAiVFkYs3_b/?igsh=MWR3bzFuaWhmbTlqdg==',
  },
  {
    thumbnail: 'images/home/thumb-6.webp',
    url: 'https://www.instagram.com/reel/C_9mxoDvmFY/?igsh=MTZ6aHM3ODU0OTExcA==',
  },
  {
    thumbnail: 'images/home/thumb-7.webp',
    url: 'https://www.instagram.com/reel/C-mqI3mt-qs/?igsh=aGRvOGFvNDN6YnUw',
  },
  {
    thumbnail: 'images/home/thumb-8.webp',
    url: 'https://www.instagram.com/reel/C73L0-TtJHH/?igsh=MWx2dm1vaG50NDU1Mg==',
  },
  {
    thumbnail: 'images/home/thumb-9.webp',
    url: 'https://www.instagram.com/reel/C7oLXWOyl6_/?igsh=YnJzMGVkcGtiZ3Bs',
  },
];

// Background "GALLERY" text — soft scale-in
const bgTextVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 0.2,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

// "Video Gallery" heading — fade up
const headingVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut', delay: 0.15 },
  },
};

// Slider entrance
const sliderVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.25 },
  },
};

export default function VideoGallery() {
  return (
    <section
      aria-label="Video Gallery"
      className="relative overflow-hidden pt-[80px] md:pt-[160px] pb-[80px] lg:px-[16px]"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_IMG_PATH}images/home/wave-bg.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative w-full max-w-[1202px] mx-auto">
        <motion.div
          className="text-center mb-[40px] lg:mb-[60px] relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4, margin: '0px 0px -200px 0px' }}
        >
          <motion.p
            variants={bgTextVariants}
            className="absolute left-[50%] lg:top-[-90%] top-[-30%] translate-x-[-50%] font-bold leading-tight figtree-font mb-4 text-[64px] lg:text-[156px]"
          >
            <span className="text-gradient-gray font-extrabold block md:inline">GALLERY</span>
          </motion.p>
          <motion.h2 variants={headingVariants} className="relative -mt-8 md:-mt-12">
            <span className="text-[#1a237e] text-[32px] md:text-[40px] lg:text-[48px] font-bold figtree-font">
              Video <span className="text-[#FF9E3D]">Gallery</span>
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: '0px 0px -200px 0px' }}
          variants={sliderVariants}
        >
          <Swiper
            modules={[EffectCoverflow, Autoplay, Pagination]}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            slidesPerView="auto"
            speed={1500}
            autoplay={{ delay: 1000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            allowTouchMove
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            className="video-coverflow-slider"
          >
            {videoData.map((item, i) => (
              <SwiperSlide key={i} className="!w-[180px] sm:!w-[210px] md:!w-[240px] lg:!w-[273px] rounded-2xl">
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-[9/16] overflow-hidden rounded-2xl group"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_PATH}${item.thumbnail}`}
                    alt={`Video reel ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 bg-black/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white translate-x-px">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Pagination bullet styling, scoped to this slider */}
      <style>
        {`
        .video-coverflow-slider {
          padding-bottom: 40px;
          }
        .video-coverflow-slider .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(26, 35, 126, 0.3);
          opacity: 1;
        }
       .video-coverflow-slider .swiper-pagination-horizontal {
        bottom: 0px !important; 
        }
        .video-coverflow-slider .swiper-pagination-bullet-active {
          background: #ff9e3d;
        }
        
        /* Hide pagination dots on mobile */
        @media (max-width: 768px) {
          .video-coverflow-slider .swiper-pagination {
            display: none !important;
          }
          .video-coverflow-slider {
            padding-bottom: 20px;
          }
        }
      `}
      </style>
    </section>
  );
}
