'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';
import { motion } from 'framer-motion';
import CourseNavigation from '../courses/CourseNavigation';
import CourseQuickLinks from '../courses/CourseQuickLinks';
import CommonBanner from '../courses/CommonBanner';
import Breadcrumb from '../common/Breadcrumb';

/**
 * Infrastructure page component.
 * All content comes from the `pageContent` prop (MongoDB via server component).
 * No static fallback data — if pageContent is missing the parent page calls notFound().
 */
export default function MainFaculty({ pageContent }) {
  const [activeGallery, setActiveGallery] = useState(null);

  const handleNext = (e) => {
    e.stopPropagation();
    if (!activeGallery) return;
    setActiveGallery((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (!activeGallery) return;
    setActiveGallery((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }));
  };

  // ── Derive data from pageContent ──────────────────────────────────────────
  const banner = pageContent?.banner || {};
  const intro = pageContent?.intro || {};
  const navData = pageContent?.navigation || {};
  const sidebarData = pageContent?.sidebar || {};

  // Ordered section keys that render as cards (same order as static data)
  const SECTION_ORDER = [
    'classrooms',
    'auditorium',
    'labs',
    'library',
    'sports',
    'wifi',
    'parking',
    'hostels',
    'location',
    'transport',
    'nearby',
    'ecosystem',
  ];

  const sections = (navData.navItems || []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const sidebarVideos = (sidebarData.sidebarVideos || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((v) => ({ url: v.url, title: v.title || '' }));

  const bannerImageUrl = banner.bannerImageUrl || '';
  const bannerPosition = banner.bannerPosition || 'object-bottom';
  const bannerTitle = banner.bannerTitle || 'Infrastructure';

  return (
    <>
      <CommonBanner pageTitle={bannerTitle} bgImageUrl={bannerImageUrl} position={bannerPosition} />
      <Breadcrumb pageName={bannerTitle} />

      <section className="max-w-[1400px] mx-auto md:px-[16px] w-full md:pt-[24px] pb-[64px]">
        <div className="flex flex-col xl:flex-row gap-6">
          <motion.div
            className="flex-1 text-[#444444]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="flex flex-col md:flex-row md:gap-6 gap-4 max-w-full 2xl:max-w-[1020px] xl:max-w-[990px] lg:max-w-[1120px]">
              <CourseNavigation sections={sections} />

              <div className="w-full lg:px-0 px-[16px] min-w-0 flex-1">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-6"
                >
                  {/* ── Intro card (#campus anchor) ───────────────────────── */}
                  <div className="border border-[#e9e9e9]" id="campus">
                    <div className="py-[10px] px-[24px] md:px-[30px] border-b border-[#e9e9e9] pb-[10px]">
                      <h2 className="text-[18px] md:text-[24px] font-semibold text-[#e87816] tracking-wide uppercase">
                        {intro.introHeading}
                      </h2>
                      <p className="text-[14px] md:text-[16px] font-semibold text-gray-800">{intro.introSubheading}</p>
                    </div>
                    <div className="p-[24px] md:p-[30px]">
                      <p className="text-[14px] text-[#505050] leading-relaxed text-justify">
                        {intro.introDescription}
                      </p>
                    </div>
                  </div>

                  {/* ── Content sections ──────────────────────────────────── */}
                  {SECTION_ORDER.map((key) => {
                    const section = pageContent?.[key];
                    if (!section) return null;

                    const hasImages = (section.images && section.images.length > 0) || section.image;

                    return (
                      <div key={key} id={key} className="border border-[#e9e9e9]">
                        {(section.title || section.subtitle) && (
                          <div className="py-[10px] px-[24px] md:px-[30px] border-b border-[#e9e9e9] pb-[10px]">
                            {section.title && (
                              <h2 className="text-[18px] md:text-[24px] font-semibold text-[#e87816] tracking-wide uppercase">
                                {section.title}
                              </h2>
                            )}
                            {section.subtitle && (
                              <p className="text-[14px] md:text-[16px] text-[#505050]">{section.subtitle}</p>
                            )}
                          </div>
                        )}

                        <div className="p-[24px] md:p-[30px] flex flex-col gap-4 md:gap-6">
                          {section.description && (
                            <p className="text-[14px] md:text-[16px] text-[#505050] leading-relaxed text-justify whitespace-pre-line">
                              {section.description}
                            </p>
                          )}

                          {hasImages && (
                            <div className="w-full max-w-full overflow-hidden">
                              <Swiper
                                modules={[Autoplay]}
                                spaceBetween={16}
                                slidesPerView={1}
                                loop={true}
                                speed={1000}
                                autoplay={{
                                  disableOnInteraction: false,
                                  pauseOnMouseEnter: true,
                                }}
                                allowTouchMove={true}
                                breakpoints={{
                                  640: {
                                    slidesPerView: section.images && section.images.length > 1 ? 2 : 1,
                                  },
                                }}
                                className="infrastructure-swiper w-full"
                              >
                                {section.images &&
                                  section.images.map((imgUrl, index) => (
                                    <SwiperSlide key={index}>
                                      <div className="overflow-hidden w-full h-[200px] sm:h-[260px] md:h-[320px] rounded-md relative">
                                        <img
                                          onClick={() =>
                                            setActiveGallery({
                                              images: section.images,
                                              currentIndex: index,
                                            })
                                          }
                                          src={imgUrl}
                                          alt={`${section.title || 'Campus Section'} view ${index + 1}`}
                                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 absolute inset-0"
                                          loading="lazy"
                                        />
                                      </div>
                                    </SwiperSlide>
                                  ))}

                                {section.image && (
                                  <SwiperSlide>
                                    <div className="overflow-hidden w-full h-[200px] sm:h-[260px] md:h-[320px] rounded-md relative">
                                      <img
                                        onClick={() =>
                                          setActiveGallery({
                                            images: [section.image],
                                            currentIndex: 0,
                                          })
                                        }
                                        src={section.image}
                                        alt={section.title || 'Campus'}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 absolute inset-0"
                                        loading="lazy"
                                      />
                                    </div>
                                  </SwiperSlide>
                                )}
                              </Swiper>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </motion.div>

          <CourseQuickLinks videoUrls={sidebarVideos} />
        </div>
      </section>

      {/* ── Lightbox modal ─────────────────────────────────────────────────── */}
      {activeGallery && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 select-none animate-fade"
          onClick={() => setActiveGallery(null)}
        >
          <button
            className="cursor-pointer absolute top-4 right-4 z-[1000] text-white hover:text-gray-300 bg-white/10 hover:bg-white/20 w-11 h-11 rounded-full flex items-center justify-center transition-all text-2xl shadow-lg"
            onClick={() => setActiveGallery(null)}
          >
            &times;
          </button>

          <div className="relative flex items-center justify-center w-full max-w-[95vw] md:max-w-[85vw] lg:max-w-[75vw] h-[80vh]">
            {activeGallery.images.length > 1 && (
              <button
                className="cursor-pointer absolute left-2 md:left-4 z-50 bg-black/50 hover:bg-black/75 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-transform active:scale-95 text-xl font-bold border border-white/10"
                onClick={handlePrev}
              >
                &#10094;
              </button>
            )}

            <div className="w-full h-full flex flex-col items-center justify-center p-2">
              <img
                src={activeGallery.images[activeGallery.currentIndex]}
                alt={`Gallery item ${activeGallery.currentIndex + 1}`}
                className="max-w-full max-h-[70vh] object-contain rounded-md shadow-2xl transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              />

              {activeGallery.images.length > 1 && (
                <p className="text-white/60 text-sm mt-4 font-light tracking-wide">
                  {activeGallery.currentIndex + 1} / {activeGallery.images.length}
                </p>
              )}
            </div>

            {activeGallery.images.length > 1 && (
              <button
                className="cursor-pointer absolute right-2 md:right-4 z-50 bg-black/50 hover:bg-black/75 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-transform active:scale-95 text-xl font-bold border border-white/10"
                onClick={handleNext}
              >
                &#10095;
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
