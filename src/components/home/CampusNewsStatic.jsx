'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample news data
const placementsNews = [
  {
    id: 1,
    image: 'images/home/news-image-1.webp',
    title: 'Kajal Bhardwaj Secures Campus Placement at Airtel as Key Account Manager',
  },
  {
    id: 2,
    image: 'images/home/news-image-2.webp',
    title: 'Tanya Singh Secures Campus Placement at Vivo as Brand Manager',
  },
  {
    id: 3,
    image: 'images/home/news-image-3.webp',
    title: 'IPS Business School Student Rahul Saini Placed at MRF as Territory Manager',
  },
  {
    id: 4,
    image: 'images/home/news-image-4.webp',
    title: 'Deeya Kumawat Secures Campus Placement at Deutsche Bank as Documentary Trade Analyst',
  },
];

const ipsNews = [
  {
    id: 1,
    image: 'images/home/news-image-5.webp',
    title: 'Virendra Singh Secures Campus Placement at Reliance as Customer Development Manager',
  },
  {
    id: 2,
    image: 'images/home/news-image-6.webp',
    title: 'Govind Khandelwal Secures Campus Placement at Unilever as Territory Manager',
  },
];

const centerSlides = [
  {
    id: 1,
    image: 'images/home/new-girl.webp',
    badge: 'IPS Blogs',
    title:
      'Ips Business School Collaborates With Iims, Iits, Xlri, And Mica Enabling World-class Education Accessible For Jaipurites ...',
  },
  {
    id: 2,
    image: 'images/home/new-girl.webp',
    badge: 'IPS Blogs',
    title: 'Excellence in Business Education - IPS Business School Leading the Way',
  },
  {
    id: 3,
    image: 'images/home/new-girl.webp',
    badge: 'IPS Blogs',
    title: 'Campus Life at IPS - Where Learning Meets Innovation',
  },
];

export default function CampusNewsStatic() {
  return (
    <section
      aria-label="Campus News"
      className="relative overflow-hidden pt-[80px] md:pt-[100px] pb-[40px] px-[16px] bg-white"
    >
      {/* Content Container */}
      <div className="relative w-full max-w-[1202px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-[60px] md:mb-[60px] relative">
          {/* Background Text */}
          <p className="absolute left-[50%] top-[-50%] md:top-[-70%] translate-x-[-50%] font-bold leading-tight figtree-font text-[60px] md:text-[100px] lg:text-[156px]">
            <span className="text-[#1B2E4A]/5 font-extrabold block">NEWS</span>
          </p>

          {/* Main Title */}
          <h2 className="relative">
            <span className="text-[#1a237e] text-[32px] md:text-[40px] lg:text-[48px] font-bold figtree-font">
              Campus <span className="text-[#FF9E3D]">News</span>
            </span>
          </h2>
        </div>

        {/* News Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Left Section - Placements News */}
          <div className="w-full lg:w-[280px] xl:w-[390px] flex-shrink-0">
            <h3 className="text-[#1B2E4A] text-[20px] md:text-[24px] font-bold mb-6 figtree-font">Placements News</h3>
            <div className="space-y-2">
              {placementsNews.map((news) => (
                <div
                  key={news.id}
                  className="flex gap-3 p-2 border border-[#c2c2c2] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className="w-[60px] h-[60px] flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMG_PATH}${news.image}`}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1B2E4A] text-[12px] leading-tight line-clamp-3 font-medium">{news.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Section - Main Slider */}
          <div className="w-full lg:flex-1 lg:max-w-[400px] xl:max-w-[404px]">
            <div className="relative overflow-hidden h-[400px] md:h-[400px] lg:h-[404px] w-full">
              <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                navigation={false}
                className="campus-news-main-slider h-full"
              >
                {centerSlides.map((slide) => (
                  <SwiperSlide key={slide.id} className="h-full ">
                    <div className="relative w-full h-full group cursor-pointer rounded-md ">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMG_PATH}${slide.image}`}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4">
                        <span className="inline-block bg-[#C8501F] text-white text-[11px] md:text-[12px] font-semibold px-3 py-1.5 rounded-full mb-3">
                          {slide.badge}
                        </span>
                        <h4 className="text-white text-[16px] md:text-[18px] lg:text-[16px] font-bold leading-snug line-clamp-3 figtree-font">
                          {slide.title}
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Right Section - IPS News */}
          <div className="w-full lg:w-[252px] xl:w-[257px] flex-shrink-0">
            <h3 className="text-[#1B2E4A] text-[20px] md:text-[24px] font-bold mb-4 figtree-font">IPS News</h3>
            <div className="space-y-2 lg:block grid grid-cols-2 gap-4">
              {ipsNews.slice(0, 2).map((news) => (
                <div
                  key={news.id}
                  className="rounded-lg overflow-hidden p-2 hover:shadow-lg transition-shadow cursor-pointer group bg-white border border-gray-100"
                >
                  <div className="w-full h-[110px] overflow-hidden  rounded-md">
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMG_PATH}${news.image}`}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="lg:p-3 p-2">
                    <p title={news.title} className="text-[#1B2E4A] text-[12px] leading-tight line-clamp-2 font-medium">
                      {news.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        :global(.campus-news-main-slider) {
          width: 100%;
          height: 100%;
        }
        :global(.campus-news-main-slider .swiper-wrapper) {
          height: 100%;
        }
        :global(.campus-news-main-slider .swiper-slide) {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        :global(.figtree-font) {
          font-family:
            'Figtree',
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            sans-serif;
        }
      `}</style>
    </section>
  );
}
