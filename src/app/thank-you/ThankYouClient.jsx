'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ThankYouClient() {
  const router = useRouter();

  useEffect(() => {
    // Optional: auto-redirect after 10s
    // const timer = setTimeout(() => router.push('/'), 10000);
    // return () => clearTimeout(timer);
  }, [router]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, when: 'beforeChildren', staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15, duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4 py-8 md:py-12">
      <motion.div
        className="w-full max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          variants={itemVariants}
        >
          {/* Header with Logo */}
          <motion.div className="bg-[#ffe4cc] py-8 px-6 text-center" variants={itemVariants}>
            <div className="flex justify-center mb-4">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMG_PATH || '/'}images/ipsnewlogofinalok.webp`}
                alt="IPS Business School"
                width={200}
                height={60}
                className="h-12 md:h-16 w-auto"
                priority
              />
            </div>
          </motion.div>

          {/* Success Icon */}
          <motion.div className="flex justify-center -mt-12 mb-6" variants={checkmarkVariants}>
            <div className="bg-white rounded-full p-3 shadow-xl">
              <div className="bg-green-500 rounded-full p-4">
                <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="px-6 md:px-12 pb-10">
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4"
              variants={itemVariants}
            >
              Thank You!
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-center text-gray-600 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Your form has been submitted successfully. Our admissions team will get in touch with
              you shortly to discuss your application and answer any questions you may have.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => router.push('/')}
                className="flex items-center cursor-pointer justify-center space-x-2 bg-gradient-to-r from-[#e87816] to-[#ff8c00] text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          className="text-center text-gray-500 text-sm mt-6 px-4"
          variants={itemVariants}
        >
          Need immediate assistance? Call us at{' '}
          <a href="tel:+918233970000" className="text-[#e87816] font-semibold hover:underline">
            +91 8233970000
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
