import React, { useRef } from 'react';

import Marquee from 'react-fast-marquee';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Custom Arrow Components for Placement Students - Top Right Position
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

export default function StudentPlacements() {
  const sliderRef = useRef(null);

  const placementStudents = [
    { name: 'Zomato Placement', image: 'images/home/Zomatoo.webp' },
    { name: 'Zomato Placement 2', image: 'images/home/Zomato (2).webp' },
    { name: 'Unique Builders', image: 'images/home/Unique Builders.webp' },
    { name: 'TCS Placement 1', image: 'images/home/tcs1.webp' },
    { name: 'TCS Placement 2', image: 'images/home/tcs (1).webp' },
    { name: 'Sintex', image: 'images/home/Sintex.webp' },
    { name: 'Namdev 1', image: 'images/home/namdev.webp' },
    { name: 'Namdev 2', image: 'images/home/namdev (2).webp' },
    { name: 'MRF', image: 'images/home/mrf (1).webp' },
    { name: 'LIC', image: 'images/home/lic.webp' },
    { name: 'Kotak', image: 'images/home/kotak.webp' },
    { name: 'ICICI', image: 'images/home/icici (1).webp' },
    { name: 'HDFC 1', image: 'images/home/hffc.webp' },
    { name: 'HDFC 2', image: 'images/home/hffc (2).webp' },
    { name: 'HDFC Mutual Fund', image: 'images/home/hdfc mutual fund.webp' },
    { name: 'HDFC Life', image: 'images/home/hdfc life (2).webp' },
    { name: 'GSK', image: 'images/home/gsk (1).webp' },
    { name: 'Deutsche Bank', image: 'images/home/deutsche bank.webp' },
    { name: 'CUB 1', image: 'images/home/cub.webp' },
    { name: 'CUB 2', image: 'images/home/cub (2).webp' },
    { name: 'Axis Bank', image: 'images/home/axis bank.webp' },
    { name: 'Archer and Bulls', image: 'images/home/Archer and Bulls.webp' },
  ];

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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
      {/* Placement Students Section */}
      <section className="px-[16px] lg:py-[64px] py-[40px]">
        <motion.div
          className="w-full max-w-[1320px] mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Title and Arrows Section */}
          <motion.div
            className="flex flex-row justify-between items-center gap-4 lg:mb-8 mb-4"
            variants={fadeInUpVariants}
          >
            <h2 className="text-gray-900 font-bold rubik-fonts text-[28px] md:text-[32px] lg:text-[36px]">
              <span className="text-[#FF9E3D]"> PLACEMENTS </span>
            </h2>

            {/* Custom Navigation Arrows - Top Right */}
            <div className="flex gap-3">
              <PlacementPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
              <PlacementNextArrow onClick={() => sliderRef.current?.slickNext()} />
            </div>
          </motion.div>

          {/* Slider */}
          <motion.div className="placement-students-slider mb-[12px]" variants={fadeInUpVariants}>
            <Slider ref={sliderRef} {...sliderSettings}>
              {placementStudents.map((student, index) => (
                <div key={index} className="px-2 sm:px-3 pt-[10px]">
                  <motion.div
                    className="rounded-xl overflow-hidden transition-all duration-300 bg-white"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative w-full" style={{ aspectRatio: '555 / 345' }}>
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMG_PATH}${student.image}`}
                        alt={student.name}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </motion.div>

          {/* Placement Coordinator Contact Details Marquee */}
          <motion.div className="py-5 px-4 rounded-lg" variants={scaleInVariants}>
            <Marquee gradient={false} speed={50} pauseOnHover={true}>
              <div className="pl-[20px] flex items-center gap-8 text-[14px] md:text-[16px] font-normal text-gray-800 rubik-fonts">
                <span>
                  <strong>Placement Coordinator Contact Details: Prof. Sudhir Agarwal :</strong>{' '}
                  <a href="tel:919829016449" className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors">
                    +91 9829016449
                  </a>{' '}
                  |{' '}
                  <a href="tel:918233970000" className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors">
                    +91 82339700000
                  </a>
                </span>
                <span className="mx-4 text-[#FF6B00]">•</span>
                <span>
                  For Placements send your Queries to{' '}
                  <a href="mailto:sudhir@ipsedu.in" className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors">
                    sudhir@ipsedu.in
                  </a>{' '}
                  or{' '}
                  <a href="mailto:info@ipsedu.in" className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors">
                    info@ipsedu.in
                  </a>
                </span>
              </div>
            </Marquee>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
