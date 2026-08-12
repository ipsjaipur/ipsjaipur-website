'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function ComparisonMatrix() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const comparisonData = [
    {
      dimension: 'Official Qualification',
      universityMBA: "Postgraduate **Master's Degree**",
      autonomousPGDM: 'Postgraduate **Diploma**',
      ipsHybridMBA: "UGC Master's Degree (RTU Affiliated)",
    },
    {
      dimension: 'Statutory Accreditation',
      universityMBA: 'UGC / University Recognition',
      autonomousPGDM: 'AICTE Approval only',
      ipsHybridMBA: 'AICTE Approved + RTU Affiliated',
    },
    {
      dimension: 'Ph.D. & Foreign Mobility',
      universityMBA: 'Direct Global Eligibility',
      autonomousPGDM: 'Requires AIU Equivalency Certificate',
      ipsHybridMBA: '100% Direct Global & Ph.D. Eligibility',
    },
    {
      dimension: 'Government & PSU Jobs',
      universityMBA: '100% Valid everywhere',
      autonomousPGDM: 'May require AIU Equivalence proof',
      ipsHybridMBA: '100% Accepted in UPSC, RPSC, Banking Officers',
    },
    {
      dimension: 'Practical Corporate Exposure',
      universityMBA: 'Traditionally 6-8 weeks summer project',
      autonomousPGDM: 'Case study oriented',
      ipsHybridMBA: 'Day-1 Corporate OJTA & Stipend Projects',
    },
    {
      dimension: 'Value-Added Modules',
      universityMBA: 'Basic university electives',
      autonomousPGDM: 'Institute dependent',
      ipsHybridMBA: 'AI/ML, Business Analytics & Digital Marketing',
    },
    {
      dimension: 'Fee Investment & ROI',
      universityMBA: 'Affordable regulated fee',
      autonomousPGDM: 'High private autonomous fees',
      ipsHybridMBA: 'High ROI at Affordable University Fee',
    },
  ];

  return (
    <section className="relative px-[16px] lg:py-[84px] py-[64px] bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/30 overflow-hidden">
      <motion.div
        className="w-full max-w-330 mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1,
            },
          },
        }}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUpVariants} className="text-center mb-8 md:mb-16 relative">
          {/* Large Background Text */}
          <div className="absolute lg:-top-8 -top-4 left-0 right-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <h3
              className="text-[28px] md:text-[40px] lg:text-[60px] font-black text-gray-500/8 tracking-tight select-none whitespace-nowrap"
              style={{
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              Comparison Matrix
            </h3>
          </div>

          <h2 className="relative text-3xl md:text-3xl font-bold text-gray-900 mb-4">Key Differences at a Glance</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mx-auto mb-6"></div>
        </motion.div>

        {/* Desktop Table View */}
        <motion.div variants={fadeInUpVariants} className="overflow-hidden rounded-2xl shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full bg-white border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-800 to-gray-900">
                  <th className="text-left text-white text-[12px] md:text-[14px] font-bold rubik-fonts md:px-6 px-3 py-2 md:py-5 border-b-2 border-gray-700 w-1/4">
                    Evaluation Dimension
                  </th>
                  <th className="text-center text-white text-[12px] md:text-[14px] font-bold rubik-fonts md:px-6 px-3 py-2 md:py-5 border-b-2 border-gray-700 w-1/4">
                    University MBA
                  </th>
                  <th className="text-center text-white text-[12px] md:text-[14px] font-bold rubik-fonts md:px-6 px-3 py-2 md:py-5 border-b-2 border-gray-700 w-1/4">
                    Autonomous PGDM
                  </th>
                  <th className="text-center text-yellow-300 text-[12px] md:text-[14px] font-bold rubik-fonts md:px-6 px-3 py-2 md:py-5 border-b-2 border-gray-700 w-1/4 bg-gradient-to-r from-gray-900 to-gray-800">
                    IPS Business School Hybrid MBA
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-blue-50/50 transition-colors duration-200`}
                  >
                    <td className="text-[12px] md:text-[14px] font-semibold text-gray-900 rubik-fonts md:px-6 px-3 py-2 min-w-[150px] md:py-5 border-b border-gray-200">
                      {row.dimension}
                    </td>
                    <td className="text-[12px] md:text-[14px] text-gray-700 rubik-fonts md:px-6 px-3 py-2 min-w-[150px] md:py-5 border-b border-gray-200 text-center">
                      {row.universityMBA}
                    </td>
                    <td className="text-[12px] md:text-[14px] text-gray-700 rubik-fonts md:px-6 px-3 py-2 min-w-[150px] md:py-5 border-b border-gray-200 text-center">
                      {row.autonomousPGDM}
                    </td>
                    <td className="text-[12px] md:text-[14px] font-medium text-gray-900 rubik-fonts md:px-6 px-3 py-2 min-w-[150px] md:py-5 border-b border-gray-200 bg-yellow-50 text-center">
                      {row.ipsHybridMBA}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
