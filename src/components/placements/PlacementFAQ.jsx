'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function PlacementFAQ() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: 'Consulting',
      answer: `Consulting is one of the most popular industries for IPS BUSINESS SCHOOL MBAs. In the last 5 years, approximately 30% of IPS MBA graduates have pursued careers in the consulting industry as well as in strategy roles across other sectors. IPS's top consulting hirers have consistently been the premier management consulting firms; in addition, many IPS MBA grads have also pursued roles in specialty boutique firms that focus in particular sectors as well as in leading innovation & design consultancies. IPS MBAs value both long-term and immediate benefits of a career serving clients through the consulting role as well as the opportunity to work in dynamic teams with inspiring leaders. And a career in consulting is often seen as the ideal means to feed their appetite for continued learning and growth.`,
    },
    {
      question: 'Investment Management',
      answer:
        'Investment Management is one of the most highly sought after industries at IPS BUSINESS SCHOOL. Student interest and those coming into school with buy-side experience has grown steadily, with over 11% of the MBA class actively pursuing internship and full-time opportunities in IM. These students are working in a range of different funds including Hedge Funds, Mutual Funds, Pension Funds, Private Wealth Management, Family Offices, Endowments, Investor Relations, and Fund of Funds. Some of the positions that our graduates have recently filled include Research Analyst, Investment Analyst, Equity/Credit Research Analyst; Investment Consultant; Portfolio Manager; and Quantitative Analyst.',
    },
    {
      question: 'Consumer Product and Packaged Goods',
      answer:
        'In the last decade, an increasing number of IPS BUSINESS SCHOOL MBA graduates have pursued successful careers in Consumer Packaged Goods (CPG), working in brand management, corporate finance, supply chain operations, business development, and corporate strategy. MBA interns regularly fill positions at LG Electronics, Adani, Unilever, PepsiCo, Bajaj and Reliance among other industry leaders.',
    },
    {
      question: 'Private Equity/Venture Capital',
      answer:
        'Private Equity is one of the top career choices of students entering IPS BUSINESS SCHOOL. Approximately over 10% of current IPS students have prior experience in private equity or venture capital, often combined with prior experience in investment banking. Our Placement office regularly hosts workshops on the networking process, interview preparation, offer management, and more.',
    },
    {
      question: 'Startups/ Entrepreneurship and Fintech',
      answer:
        'Entrepreneurship is a primary area of interest for IPS BUSINESS SCHOOL MBAs, many of whom are considering joining a startup or starting their own business in the short or long term. Startups across industries, sizes, and stages are hiring IPS MBAs because they bring a "get it done" approach – a mix of functional and people skills that can impact scaling companies. Students have worked internships or accepted full-time jobs at companies such as Analha, HR Bot, White Hat Jr., CarDekho, Thrillophilia, among others. The Placement Office also provides career education for students targeting startups to showcase nuances of the job search and hiring processes that are different from cyclical MBA recruiting.',
    },
    {
      question: 'General Management',
      answer:
        'Every year for the last decade, over 10% of IPS BUSINESS SCHOOL MBA graduates have pursued opportunities in general management, including elite leadership development programs, in areas such as brand/product management, business development, corporate finance, and supply chain operations. Some of the top companies across sectors and industries who regularly hire IPS MBA graduates include: Amazon, HDFC, VIVO, Aditya Birla, Reliance, Axis Bank, ICICI, TCS, Shriram Group, Samsung, and Bank of Baroda among others.',
    },
    {
      question: 'Investment Banking',
      answer: `Each year, approximately 15% of the graduating class pursues careers in the investment banking industry. IPS BUSINESS SCHOOL's renowned finance faculty helps shape the future leaders of the banking industry. As IPS's most popular academic major, the finance curriculum allows students to build skills in quantitative ability, negotiation, client relationships and corporate development. Our placement office is here to provide all that your firm needs to execute a successful recruitment strategy. We collaborate with your corporation to develop an effective strategy while tailoring to your size, location, budget and hiring needs.`,
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const faqVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
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
        {/* Section Header */}
        <motion.div className="text-center mb-6" variants={titleVariants}>
          <h2 className="text-gray-900 font-bold rubik-font text-[28px] md:text-[32px] lg:text-[36px] mb-4">
            Industry <span className="text-[#eb5905]">Hiring Practices</span>
          </h2>
          <p className="text-gray-700 text-[14px] md:text-[16px] max-w-4xl mx-auto leading-relaxed">
            IPS BUSINESS SCHOOL students are interested in business careers across all functions and industries. The IPS
            MBA Placement office is organized into teams aligned by industry to provide targeted expertise and resources
            for both employers and students. Learn how best to recruit for your industry.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
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
                  className={`w-5 h-5 text-[#eb5905] transition-transform duration-300 shrink-0 ml-2 ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <motion.div
                id={`faq-content-${index}`}
                initial={false}
                animate={{
                  height: openFAQ === index ? 'auto' : 0,
                  opacity: openFAQ === index ? 1 : 0,
                }}
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
