'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MotionImage = motion(Image);

export default function CommonBanner({ pageTitle, normalFont, bgImageUrl, position, page }) {
  return (
    <div className="relative w-full h-[200px] sm:h-[350px] md:h-[400px] lg:h-[400px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <MotionImage
          src={`${process.env.NEXT_PUBLIC_IMG_PATH}${bgImageUrl}`}
          alt="Anti Ragging Policy - IPS Business School"
          fill
          priority
          sizes="100vw"
          quality={100}
          className={`object-cover ${(position && position) || 'object-top'}`}
          initial={{
            scale: 1.2, // Start zoomed in
          }}
          whileInView={{
            scale: 1, // Zoom out
          }}
          transition={{
            duration: 2.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/65 to-black/55"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Main Heading */}
          {(page == 'BLOG_DETAIL' && (
            <motion.h1
              className={`text-[24px] line-clamp-3 sm:text-xl md:text-2xl lg:text-4xl font-bold text-white lg:mb-4 mb-2 font-rubik tracking-tight`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {pageTitle}
            </motion.h1>
          )) || (
            <>
              <motion.h1
                className={`${(normalFont && 'text-[32px] sm:text-xl md:text-2xl lg:text-4xl') || 'text-[32px] sm:text-4xl md:text-5xl lg:text-6xl '} font-bold text-white lg:mb-4 mb-2 font-rubik tracking-tight`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {pageTitle}
              </motion.h1>
            </>
          )}
          {/* Decorative Line */}
          <motion.div
            className="lg:mt-6 mt-4 flex items-center justify-center gap-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="h-0.5 w-16 sm:w-24 bg-white/30"></div>
            <div className="h-1 w-8 sm:w-12 bg-[#e87816]"></div>
            <div className="h-0.5 w-16 sm:w-24 bg-white/30"></div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        {/* <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        /> */}
        {/* <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 bg-[#e87816]/10 rounded-full blur-xl z-[99]"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        /> */}
      </div>
    </div>
  );
}
