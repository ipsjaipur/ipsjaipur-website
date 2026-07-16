'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CourseQuickLinks from '../CourseQuickLinks';

export default function EducationDetail() {
  const videoUrls = [
    {
      url: 'https://www.youtube.com/embed/ocaViRxJrdE?si=gmgh25qgaZeHh0hb',
    },
    {
      title: 'Raghav Sharma Video Resume',
      url: 'https://www.youtube.com/embed/4aq02tSiXd4?si=AawJvooDzO8Pflx0',
    },
  ];

  const documents = [
    'Applicant Photo',
    'Parent Photo',
    'Aadhar Card',
    'Pan Card',
    'X and XII Marksheets',
    'University Admission Letter',
    'Student / Parent Bank Details',
    'Salary Slip (If Employed)',
    'Residence Proof',
    'ITR/Form 16',
  ];

  const keyFeatures = [
    'Competitive interest rates',
    'Tie-ups with over 10+ leading Banks & NBFCs',
    'Quick and transparent loan processing',
    'No collateral required',
    'No Joining fees',
    'Loan coverage for program fees, Hostel fee and other educational expenses.',
  ];

  const eligibilityCriteria = ['Indian nationals', 'Admission to IPS COLLEGE academic programs'];

  return (
    <section className="max-w-[1400px] mx-auto md:px-[16px] w-full md:pt-[24px] pb-[64px]">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Main Content */}
        <motion.div
          className="flex-1 text-[#505050]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="border border-[#e9e9e9] bg-white rounded-lg p-6 md:mx-0 mx-[16px]">
            <motion.div initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {/* Welcome Section */}
              <div className="mb-8">
                <h2 className="text-[32px] font-rubik text-[#111111] font-medium mb-[26px]">
                  Education Loan Facilities
                </h2>
                <div className="space-y-4">
                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8]">
                    Welcome to IPS BUSINESS SCHOOL! At IPS BUSINESS SCHOOL, we&apos;re firm believers in the universal
                    right to education. We&apos;re on a mission to tear down financial barriers so that every deserving
                    student can chase their dreams without worry.
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8]">
                    How do we do it? With a range of financial support options like scholarships and educational loans,
                    we&apos;re here to ensure nothing stands in the way of your education.
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8]">
                    We believe the sky&apos;s the limit. With our unwavering support and your determination,
                    there&apos;s no goal that is impossible to achieve.
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8]">
                    And when it comes to financing, the choice is yours. Pick the bank that works best for you, and
                    let&apos;s make your education dreams a reality together.
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-bold leading-[1.8]">
                    Join IPS Business School, where possibilities are limitless, and your future is bright. Let&apos;s
                    embark on this journey together!
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8] italic">
                    40 banks have been registered so far and 71 loan schemes have been uploaded in Vidya Lakshmi Portal.
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8] italic">
                    IPS OFFICIALS NUMBER - Rohit sharma - 8955273791 | Sourav Nagi - 9509266472
                  </p>
                </div>
              </div>

              {/* Education Loan Assistance Section */}
              <div className="border border-[#e9e9e9] rounded-lg overflow-hidden mb-6">
                {/* Header */}
                <div className="bg-[#e87816] text-white py-3 px-6">
                  <h2 className="text-[20px] md:text-[24px] font-rubik font-semibold">Education Loan Assistance</h2>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8]">
                    We are pleased to announce our partnership with Kuhoo, to offer education loans tailored to meet the
                    diverse needs of our students. Kuhoo specializes in providing hassle-free financial solutions to
                    empower students to pursue their higher education goals without financial constraints.
                  </p>

                  {/* Key Features */}
                  <div>
                    <h3 className="text-[#505050] lg:text-[18px] text-[16px] font-rubik font-bold leading-[1.8] mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2 ml-6">
                      {keyFeatures.map((feature, index) => (
                        <li
                          key={index}
                          className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8] list-disc"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Eligibility Criteria */}
                  <div>
                    <h3 className="text-[#505050] lg:text-[18px] text-[16px] font-rubik font-bold leading-[1.8] mb-3">
                      Eligibility Criteria:
                    </h3>
                    <ul className="space-y-2 ml-6">
                      {eligibilityCriteria.map((criteria, index) => (
                        <li
                          key={index}
                          className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8] list-disc"
                        >
                          {criteria}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Documents */}
                  <div>
                    <h3 className="text-[#505050] lg:text-[18px] text-[16px] font-rubik font-bold leading-[1.8] mb-3">
                      Students may access the same and avail the facilities
                    </h3>
                    <ul className="space-y-2 ml-6">
                      {documents.map((doc, index) => (
                        <li
                          key={index}
                          className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8] list-disc"
                        >
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Sidebar with Quick Links and Videos */}
        <CourseQuickLinks videoUrls={videoUrls} />
      </div>
    </section>
  );
}
