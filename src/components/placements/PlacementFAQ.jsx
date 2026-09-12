'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * PlacementFAQ — industry hiring practices accordion.
 * Hidden entirely if no faqs in CMS.
 *
 * Props:
 *  data — placements-page CMS `faq` section doc
 */
export default function PlacementFAQ({ data }) {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = data?.faqs?.length > 0 ? [...data.faqs].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : [];

  // Hide section if no FAQ items
  if (faqs.length === 0) return null;

  const heading = data?.faqHeading || 'Industry Hiring Practices';
  const subText = data?.faqSubText || '';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };
  const faqVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  };

  return (
    <section className="py-[64px] px-[16px] bg-white">
      <motion.div
        className="w-full max-w-[900px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-6" variants={titleVariants}>
          <h2 className="text-gray-900 font-bold rubik-font text-[28px] md:text-[32px] lg:text-[36px] mb-4">
            Industry <span className="text-[#eb5905]">Hiring Practices</span>
          </h2>
          {subText && (
            <p className="text-gray-700 text-[14px] md:text-[16px] max-w-4xl mx-auto leading-relaxed">{subText}</p>
          )}
        </motion.div>

        {/* Accordion */}
        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq._id || index}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-shadow duration-300"
              variants={faqVariants}
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full px-4 lg:px-6 py-3 lg:py-4 text-left cursor-pointer font-semibold text-gray-800 bg-gray-50 transition-colors flex justify-between items-center text-[14px] lg:text-[16px] rubik-font"
                aria-expanded={openFAQ === index}
                aria-controls={`faq-content-${index}`}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#eb5905] transition-transform duration-300 shrink-0 ml-2 ${openFAQ === index ? 'rotate-180' : ''}`}
                />
              </button>

              <motion.div
                id={`faq-content-${index}`}
                initial={false}
                animate={{ height: openFAQ === index ? 'auto' : 0, opacity: openFAQ === index ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-4 lg:px-6 py-4 bg-white text-gray-700 text-[14px] lg:text-[15px] rubik-font leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
