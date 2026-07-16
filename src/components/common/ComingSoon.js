'use client'
import { motion } from 'framer-motion';
import { Clock, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ComingSoon({
  title = "Coming Soon",
  subtitle = "We're working on something amazing!",
  message = "This page is under construction. Stay tuned for exciting updates.",
  showBackButton = true
}) {
  return (
    <div className="min-h-[70vh] py-[64px] lg:py-[90px] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-54 h-54 bg-[#eb5905] rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-54 h-54 bg-[#222222] rounded-full opacity-5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              duration: 0.8
            }}
            className="inline-flex items-center justify-center mb-8 relative"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-[#eb5905] rounded-full opacity-20 blur-xl"
              />
              <div className="relative bg-gradient-to-br from-[#eb5905] to-[#ff9e3d] p-4 rounded-full">
                <Clock className="w-12 h-12 sm:w-14 sm:h-14 text-white" strokeWidth={1.5} />
              </div>
            </div>
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-2 -right-5"
            >
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[#eb5905]" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg sm:text-3xl lg:text-4xl font-bold text-[#222222] mb-4 font-montserrat"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl sm:text-2xl lg:text-2xl font-semibold text-[#eb5905] mb-6"
          >
            {subtitle}
          </motion.h2>

          {/* Message */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg lg:text-xl text-[#77838f] max-w-2xl mx-auto mb-10 leading-relaxed px-4"
          >
            {message}
          </motion.p>

          {/* Back to Home Button */}
          {showBackButton && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#222222] hover:bg-[#eb5905] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span>Back to Home</span>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
