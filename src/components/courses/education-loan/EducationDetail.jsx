'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CourseQuickLinks from '../CourseQuickLinks';
import { cloudinaryImage } from '@/_utils/cloudinaryImage';

// ─── Static fallback defaults — exact original production content ──────────────

const DEFAULT_MAIN_HEADING = 'Education Loan Facilities';

const DEFAULT_INTRO_PARAGRAPHS = [
  "Welcome to IPS BUSINESS SCHOOL! At IPS BUSINESS SCHOOL, we're firm believers in the universal right to education. We're on a mission to tear down financial barriers so that every deserving student can chase their dreams without worry.",
  "How do we do it? With a range of financial support options like scholarships and educational loans, we're here to ensure nothing stands in the way of your education.",
  "We believe the sky's the limit. With our unwavering support and your determination, there's no goal that is impossible to achieve.",
  "And when it comes to financing, the choice is yours. Pick the bank that works best for you, and let's make your education dreams a reality together.",
];

const DEFAULT_BOLD_PARAGRAPH =
  "Join IPS Business School, where possibilities are limitless, and your future is bright. Let's embark on this journey together!";

const DEFAULT_VIDYA_LAKSHMI_NOTE =
  '40 banks have been registered so far and 71 loan schemes have been uploaded in Vidya Lakshmi Portal.';

const DEFAULT_OFFICIALS_NOTE = 'IPS OFFICIALS NUMBER - Rohit sharma - 8955273791 | Sourav Nagi - 9509266472';

const DEFAULT_ASSISTANCE_HEADING = 'Education Loan Assistance';
const DEFAULT_ASSISTANCE_INTRO =
  'We are pleased to announce our partnership with Kuhoo, to offer education loans tailored to meet the diverse needs of our students. Kuhoo specializes in providing hassle-free financial solutions to empower students to pursue their higher education goals without financial constraints.';

const DEFAULT_KEY_FEATURES_HEADING = 'Key Features';
const DEFAULT_KEY_FEATURES = [
  'Competitive interest rates',
  'Tie-ups with over 10+ leading Banks & NBFCs',
  'Quick and transparent loan processing',
  'No collateral required',
  'No Joining fees',
  'Loan coverage for program fees, Hostel fee and other educational expenses.',
];

const DEFAULT_ELIGIBILITY_HEADING = 'Eligibility Criteria:';
const DEFAULT_ELIGIBILITY_CRITERIA = ['Indian nationals', 'Admission to IPS COLLEGE academic programs'];

const DEFAULT_DOCUMENTS_HEADING = 'Students may access the same and avail the facilities';
const DEFAULT_DOCUMENTS = [
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

const DEFAULT_VIDEO_URLS = [
  { url: 'https://www.youtube.com/embed/ocaViRxJrdE?si=gmgh25qgaZeHh0hb' },
  {
    title: 'Raghav Sharma Video Resume',
    url: 'https://www.youtube.com/embed/4aq02tSiXd4?si=AawJvooDzO8Pflx0',
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function EducationDetail({ pageContent = {} }) {
  const mainData = pageContent?.main || {};
  const assistanceData = pageContent?.assistance || {};
  const videosData = pageContent?.videos || {};

  // ── Main content ──────────────────────────────────────────────────────────
  const mainHeading = mainData.mainHeading || DEFAULT_MAIN_HEADING;
  const mainImageUrl = mainData.mainImageUrl ? cloudinaryImage(mainData.mainImageUrl, 'f_auto,q_auto,w_1200') : '';
  const introParagraphs = mainData.introParagraphs?.length > 0 ? mainData.introParagraphs : DEFAULT_INTRO_PARAGRAPHS;
  const boldParagraph = mainData.boldParagraph || DEFAULT_BOLD_PARAGRAPH;
  const vidyaLakshmiNote = mainData.vidyaLakshmiNote || DEFAULT_VIDYA_LAKSHMI_NOTE;
  const officialsNote = mainData.officialsNote || DEFAULT_OFFICIALS_NOTE;

  // ── Assistance ────────────────────────────────────────────────────────────
  const assistanceHeading = assistanceData.assistanceHeading || DEFAULT_ASSISTANCE_HEADING;
  const assistanceIntro = assistanceData.assistanceIntro || DEFAULT_ASSISTANCE_INTRO;
  const keyFeaturesHeading = assistanceData.keyFeaturesHeading || DEFAULT_KEY_FEATURES_HEADING;
  const keyFeatures = assistanceData.keyFeatures?.length > 0 ? assistanceData.keyFeatures : DEFAULT_KEY_FEATURES;
  const eligibilityHeading = assistanceData.eligibilityHeading || DEFAULT_ELIGIBILITY_HEADING;
  const eligibilityCriteria =
    assistanceData.eligibilityCriteria?.length > 0 ? assistanceData.eligibilityCriteria : DEFAULT_ELIGIBILITY_CRITERIA;
  const documentsHeading = assistanceData.documentsHeading || DEFAULT_DOCUMENTS_HEADING;
  const documents = assistanceData.documents?.length > 0 ? assistanceData.documents : DEFAULT_DOCUMENTS;

  // ── Videos ─────────────────────────────────────────────────────────────────
  const videoUrls =
    videosData.videoUrls?.length > 0
      ? [...videosData.videoUrls].sort((a, b) => (a.order || 0) - (b.order || 0))
      : DEFAULT_VIDEO_URLS;

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
                <h2 className="text-[32px] font-rubik text-[#111111] font-medium mb-[26px]">{mainHeading}</h2>

                {/* Image shown after the heading (admin upload) */}
                {mainImageUrl && (
                  <div className="mb-6 overflow-hidden rounded-lg">
                    <img src={mainImageUrl} alt={mainHeading} className="w-full h-auto object-cover" loading="lazy" />
                  </div>
                )}

                <div className="space-y-4">
                  {introParagraphs.map((para, index) => (
                    <p
                      key={index}
                      className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8]"
                    >
                      {para}
                    </p>
                  ))}

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-bold leading-[1.8]">
                    {boldParagraph}
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8] italic">
                    {vidyaLakshmiNote}
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8] italic">
                    {officialsNote}
                  </p>
                </div>
              </div>

              {/* Education Loan Assistance Section */}
              <div className="border border-[#e9e9e9] rounded-lg overflow-hidden mb-6">
                {/* Header */}
                <div className="bg-[#e87816] text-white py-3 px-6">
                  <h2 className="text-[20px] md:text-[24px] font-rubik font-semibold">{assistanceHeading}</h2>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8]">
                    {assistanceIntro}
                  </p>

                  {/* Key Features */}
                  <div>
                    <h3 className="text-[#505050] lg:text-[18px] text-[16px] font-rubik font-bold leading-[1.8] mb-3">
                      {keyFeaturesHeading}
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
                      {eligibilityHeading}
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
                      {documentsHeading}
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
