'use client';
import Marquee from 'react-fast-marquee';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
// Custom Arrow Components
function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-[-16px] cursor-pointer top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF9E3D] hover:from-[#FF9E3D] hover:to-[#FF6B00] shadow-lg hover:shadow-xl transition-all duration-300 items-center justify-center group hover:scale-110 hidden md:flex"
      aria-label="Next slide"
    >
      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-[-16px] top-1/2 cursor-pointer -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF9E3D] hover:from-[#FF9E3D] hover:to-[#FF6B00] shadow-lg hover:shadow-xl transition-all duration-300 items-center justify-center group hover:scale-110 hidden md:flex"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-x-0.5 transition-transform duration-300" />
    </button>
  );
}

export default function Placements() {
  const companyLogos = [
    { name: 'Bajaj Finserv', logo: 'images/home/bajajfinserv.webp' },
    { name: 'Deutsche Bank', logo: 'images/home/Deutsche.webp' },
    { name: 'GSK', logo: 'images/home/gsk.webp' },
    { name: 'ICICI', logo: 'images/home/ICICI.webp' },
    { name: 'MRF', logo: 'images/home/MRF.webp' },
    { name: 'PWC', logo: 'images/home/PWC.webp' },
    { name: 'Wipro', logo: 'images/home/Wipro.webp' },
    { name: 'TCS', logo: 'images/home/TCS.webp' },
    { name: 'Zomato', logo: 'images/home/Zomato.webp' },
    { name: 'PWC', logo: 'images/home/PWC.webp' },
    { name: 'Reliance Jio', logo: 'images/home/reliancejio.webp' },
  ];

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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => (
      <button type="button" aria-label={`Go to slide ${i + 1}`} className="p-0" style={{ padding: '0px' }}>
        <span className="inline-block h-[8px] w-[8px] rounded-full bg-white/65 shadow transition-[width,background] duration-300 ease-in-out" />
      </button>
    ),
    appendDots: (dots) => <ul className="flex items-center justify-center gap-2 p-0 m-0 list-none mt-6">{dots}</ul>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
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
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const fadeInLeftVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const fadeInRightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const scaleInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      aria-label="Placements"
      className="relative overflow-hidden pt-[60px] pb-[104px] md:pt-[80px] lg:px-[16px]"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_IMG_PATH}images/home/pl-1.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 h-full w-full bg-[#2a3e61aa]"></div>

      {/* Content Container */}
      <motion.div
        className="relative w-full max-w-[1202px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <div className="flex lg:px-0 px-[16px] flex-col lg:flex-row justify-between mb-[24px] md:mb-[50px] items-start lg:items-center gap-6 lg:gap-8">
          <motion.div className="w-full lg:max-w-[500px]" variants={fadeInLeftVariants}>
            <h2 className="text-white font-bold leading-tight figtree-font mb-2 text-[32px] md:text-[42px] lg:text-[48px]">
              Our <span className="text-[#FF9E3D]">Placements</span>
            </h2>
            <p className="text-white text-[14px] md:text-[16px] font-medium figtree-font">
              Strong placement support with dedicated career guidance, complemented by regular workshops, seminars, and
              industry interaction sessions.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div className="grid grid-cols-3 sm:grid-cols-3 gap-4 w-full lg:w-auto" variants={fadeInRightVariants}>
            <motion.div className="bg-white rounded-xl px-2 sm:px-6 py-4 min-w-[120px] sm:min-w-[150px] text-center shadow-lg">
              <div className="text-[#FF6B00] text-[18px] sm:text-[32px] font-extrabold figtree-font leading-none">
                26 LPA+
              </div>
              <div className="text-gray-600 text-[11px] sm:text-[14px] font-bold figtree-font mt-2">
                Highest Package Offered
              </div>
            </motion.div>
            <motion.div className="bg-white rounded-xl px-2 sm:px-6 py-4 min-w-[120px] sm:min-w-[150px] text-center shadow-lg">
              <div className="text-[#FF6B00] text-[18px] sm:text-[32px] font-extrabold figtree-font leading-none">
                5.5 LPA+
              </div>
              <div className="text-gray-600 text-[11px] sm:text-[14px] font-bold figtree-font mt-2">
                Average Package Offered
              </div>
            </motion.div>
            <motion.div className="bg-white rounded-xl px-2 sm:px-6 py-4 min-w-[120px] sm:min-w-[150px] text-center shadow-lg">
              <div className="text-[#FF6B00] text-[18px] sm:text-[32px] font-extrabold figtree-font leading-none">
                100+
              </div>
              <div className="text-gray-600 text-[11px] sm:text-[14px] font-bold figtree-font mt-2">
                Top Recruiting Companies
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Company Logos Marquee */}
        <motion.div className="mb-[24px] md:mb-[50px]" variants={scaleInVariants}>
          <Marquee gradient={false} speed={100} pauseOnHover={true} className="py-4">
            {companyLogos.map((company, index) => (
              <div
                key={index}
                className="mx-2 flex items-center justify-center bg-white rounded-lg px-2 py-0 shadow-md hover:shadow-lg transition-shadow duration-300"
                style={{ width: '120px', height: '60px' }}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_IMG_PATH}${company.logo}`}
                  alt={company.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </Marquee>
        </motion.div>

        {/* Placement Students Slider */}
        <motion.div className="placement-slider lg:px-0 px-[8px]" variants={fadeInUpVariants}>
          <Slider {...sliderSettings}>
            {placementStudents.map((student, index) => (
              <div key={index} className="px-2 sm:px-3">
                <motion.div className="rounded-xl overflow-hidden shadow-lg transition-shadow duration-300">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_PATH}${student.image}`}
                    alt={student.name}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </motion.div>
    </section>
  );
}
