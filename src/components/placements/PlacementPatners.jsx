'use client';
import React from 'react';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';

export default function PlacementPatners() {
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

  return (
    <>
      <section className="py-[64px] bg-accent/50">
        <h2 className="text-center text-gray-900 font-bold rubik-fonts text-[28px] md:text-[32px] lg:text-[36px] lg:mb-[24px] mb-[12px]">
          INTERNSHIP & <span className="text-[#FF9E3D]">PLACEMENT</span> PARTNERS
        </h2>
        <motion.div className="" variants={scaleInVariants}>
          <Marquee gradient={false} speed={100} pauseOnHover={true} className="py-4">
            {companyLogos.map((company, index) => (
              <div
                key={index}
                className="mx-2 flex items-center justify-center border lg:w-[190px] lg:h-[90px] w-[160px] h-[70px] border-gray-200 p-1 bg-white rounded-lg px-2 py-0 transition-shadow duration-300"
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
      </section>
    </>
  );
}
