'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, BookOpen, GraduationCap, Users, Building2 } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const numberVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.section
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #222222 50%, #2a2a2a 100%)',
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated background elements with IPS orange accents */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
          style={{ background: 'rgba(235, 89, 5, 0.08)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(255, 158, 61, 0.06)' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: 'rgba(235, 89, 5, 0.04)' }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto py-20">
        <div className="flex flex-col items-center text-center">
          {/* Graduation cap icon floating above 404 */}
          <motion.div className="mb-6" variants={iconVariants}>
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <GraduationCap
                  size={80}
                  className="text-[#eb5905] opacity-90"
                  strokeWidth={1.5}
                />
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-[#ff9e3d] rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* 404 Number with animation */}
          <motion.div className="mb-8" variants={numberVariants}>
            <h1 className="text-[120px] sm:text-[160px] md:text-[200px] lg:text-[240px] font-bold leading-none tracking-tight rubik-font">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #eb5905 0%, #ff9e3d 50%, #eb5905 100%)',
                }}
              >
                404
              </span>
            </h1>
          </motion.div>

          {/* Main heading */}
          <motion.div className="mb-6 max-w-3xl" variants={itemVariants}>
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 rubik-font">
              Oops! Looks Like You've Taken a Wrong Turn
            </h2>
            <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed mb-2">
              This page isn't part of our curriculum. But don't worry, even the best students get lost sometimes!
            </p>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              Let's get you back to learning and exploring IPS Academy.
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/"
                className="inline-flex cursor-pointer items-center justify-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide w-full sm:w-auto min-w-[200px] rounded-lg text-white transition-all duration-300 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #eb5905 0%, #ff9e3d 100%)',
                }}
              >
                <Home size={18} />
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
