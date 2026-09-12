'use client';
import React, { useRef } from 'react';
import Marquee from 'react-fast-marquee';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cloudinaryImage } from '@/_utils/cloudinaryImage';

function PlacementNextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF9E3D] hover:from-[#FF9E3D] hover:to-[#FF6B00] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
      aria-label="Next placement slide"
    >
      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
    </button>
  );
}

function PlacementPrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF9E3D] hover:from-[#FF9E3D] hover:to-[#FF6B00] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
      aria-label="Previous placement slide"
    >
      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:-translate-x-0.5 transition-transform duration-300" />
    </button>
  );
}

/**
 * StudentPlacements — placement photo slider + coordinator marquee.
 * Hidden entirely if no placementStudents in CMS.
 *
 * Props:
 *  placementsData  — home-page CMS `placements` section doc
 *  coordinatorData — placements-page CMS `coordinator` section doc
 */
export default function StudentPlacements({ placementsData, coordinatorData }) {
  const sliderRef = useRef(null);

  const rawStudents =
    placementsData?.placementStudents?.length > 0
      ? [...placementsData.placementStudents].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : [];

  // Hide section completely if no slider images
  if (rawStudents.length === 0) return null;

  const placementStudents = rawStudents.map((s) => ({
    ...s,
    image: cloudinaryImage(s.image, 'f_auto,q_auto,w_1200'),
  }));

  const coord = coordinatorData?.coordinator || {};
  const coordName = coord.name || '';
  const coordPhone1 = coord.phone1 || '';
  const coordPhone2 = coord.phone2 || '';
  const coordEmail1 = coord.email1 || '';
  const coordEmail2 = coord.email2 || '';
  const hasCoord = !!(coordName || coordPhone1 || coordEmail1);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };
  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="px-[16px] lg:py-[64px] py-[40px]">
      <motion.div
        className="w-full max-w-330 mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Title + Arrows */}
        <motion.div
          className="flex flex-row justify-between items-center gap-4 lg:mb-8 mb-4"
          variants={fadeInUpVariants}
        >
          <h2 className="text-gray-900 font-bold rubik-fonts text-[28px] md:text-[32px] lg:text-[36px]">
            <span className="text-[#FF9E3D]"> PLACEMENTS </span>
          </h2>
          <div className="flex gap-3">
            <PlacementPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
            <PlacementNextArrow onClick={() => sliderRef.current?.slickNext()} />
          </div>
        </motion.div>

        {/* Slider */}
        <motion.div className="placement-students-slider mb-[12px]" variants={fadeInUpVariants}>
          <Slider ref={sliderRef} {...sliderSettings}>
            {placementStudents.map((student, index) => (
              <div key={student._id || index} className="px-2 sm:px-3 pt-[10px]">
                <motion.div
                  className="rounded-xl overflow-hidden transition-all duration-300 bg-white"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative w-full" style={{ aspectRatio: '555 / 345' }}>
                    <img
                      src={student.image}
                      alt={student.name}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </motion.div>

        {/* Coordinator Marquee — only if coordinator data exists */}
        {hasCoord && (
          <motion.div className="py-5 px-4 rounded-lg" variants={scaleInVariants}>
            <Marquee gradient={false} speed={50} pauseOnHover={true}>
              <div className="pl-[20px] flex items-center gap-8 text-[14px] md:text-[16px] font-normal text-gray-800 rubik-fonts">
                {coordName && (
                  <span>
                    <strong>Placement Coordinator Contact Details: {coordName} :</strong>{' '}
                    {coordPhone1 && (
                      <a
                        href={`tel:${coordPhone1.replace(/[\s+]/g, '')}`}
                        className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors"
                      >
                        {coordPhone1}
                      </a>
                    )}
                    {coordPhone2 && (
                      <>
                        {' '}
                        |{' '}
                        <a
                          href={`tel:${coordPhone2.replace(/[\s+]/g, '')}`}
                          className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors"
                        >
                          {coordPhone2}
                        </a>
                      </>
                    )}
                  </span>
                )}
                {(coordEmail1 || coordEmail2) && (
                  <>
                    <span className="mx-4 text-[#FF6B00]">•</span>
                    <span>
                      For Placements send your Queries to{' '}
                      {coordEmail1 && (
                        <a
                          href={`mailto:${coordEmail1}`}
                          className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors"
                        >
                          {coordEmail1}
                        </a>
                      )}
                      {coordEmail2 && (
                        <>
                          {' '}
                          or{' '}
                          <a
                            href={`mailto:${coordEmail2}`}
                            className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors"
                          >
                            {coordEmail2}
                          </a>
                        </>
                      )}
                    </span>
                  </>
                )}
              </div>
            </Marquee>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
