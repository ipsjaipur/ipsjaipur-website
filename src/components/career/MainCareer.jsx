'use client';

import React from 'react';
import CommonBanner from '../courses/CommonBanner';
import Breadcrumb from '../common/Breadcrumb';
import CourseQuickLinks from '../courses/CourseQuickLinks';
import { cloudinaryImage } from '@/_utils/cloudinaryImage';

// ─── Static fallback defaults — exact original production content ──────────────

const DEFAULT_BANNER_TITLE = 'Career @ IPS BUSINESS SCHOOL';
const DEFAULT_BANNER_POSITION = 'object-center';

const DEFAULT_INTRO =
  'IPS BUSINESS SCHOOL has been a flag bearer pioneering the legacy of industry oriented Management Education and an undisputed leader in Corporate connection in North India for over a period of 17+ glorious years';

const DEFAULT_REQUIREMENTS_HEADING = 'We are looking for the professionals who are:';
const DEFAULT_REQUIREMENTS = [
  'Sincere and committed to their professional and education.',
  'Good Learners, having the capacity to assimilate new knowledge, develop new skills in the field of academics, with a commitment to excellence and urge to grow faster than their colleagues elsewhere.',
  'Ready to accept the challenge pf extending their perception beyond the traditional system of education.',
];

const DEFAULT_PERKS_HEADING = 'If you have it in you, IPS BUSINESS SCHOOL is the right place for you';
const DEFAULT_PERKS = [
  'Immense opportunities to grow personally and professionally',
  'Sharing of revenue with faculty on income generated through consultancy, research and industry projects.',
];

const DEFAULT_OPENINGS_HEADING = 'SENIOR LECTURERS / LECTURERS';
const DEFAULT_OPENINGS = [
  {
    department: 'SENIOR LECTURERS / LECTURERS',
    roles: [
      'Marketing',
      'HR',
      'Finance',
      'International Business',
      'Retail Management',
      'English',
      'Personality Development Trainer.',
    ],
  },
];

const DEFAULT_CONTACT_HEADING = 'You may apply to';
const DEFAULT_CONTACT_EMAIL = 'careers@ipsedu.in';
const DEFAULT_CONTACT_PHONE = '+91-9829047517';

// ─── Static sidebar video URLs (unchanged) ─────────────────────────────────────
const VIDEO_URLS = [
  { url: 'https://www.youtube.com/embed/ocaViRxJrdE?si=gmgh25qgaZeHh0hb' },
  {
    title: 'Raghav Sharma Video Resume',
    url: 'https://www.youtube.com/embed/4aq02tSiXd4?si=AawJvooDzO8Pflx0',
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function MainCareer({ pageContent = {} }) {
  const bannerData = pageContent?.banner || {};
  const introData = pageContent?.intro || {};
  const requirementsData = pageContent?.requirements || {};
  const perksData = pageContent?.perks || {};
  const openingsData = pageContent?.openings || {};
  const contactData = pageContent?.contact || {};

  // ── Banner ────────────────────────────────────────────────────────────────
  const bannerTitle = bannerData.bannerTitle || DEFAULT_BANNER_TITLE;
  const bannerPosition = bannerData.bannerPosition || DEFAULT_BANNER_POSITION;

  // Cloudinary-optimised when a DB image is set; falls back to original static image
  const bannerImageUrl = bannerData.bannerImageUrl
    ? cloudinaryImage(bannerData.bannerImageUrl, 'f_auto,q_auto,w_1920')
    : process.env.NEXT_PUBLIC_IMG_PATH + 'images/about/career-img.webp';

  // ── Text content ──────────────────────────────────────────────────────────
  const introParagraph = introData.introParagraph || DEFAULT_INTRO;

  const requirementsHeading = requirementsData.requirementsHeading || DEFAULT_REQUIREMENTS_HEADING;
  const requirements =
    requirementsData.requirements?.length > 0
      ? [...requirementsData.requirements].sort((a, b) => a.order - b.order)
      : DEFAULT_REQUIREMENTS.map((text, i) => ({ text, order: i }));

  const perksHeading = perksData.perksHeading || DEFAULT_PERKS_HEADING;
  const perks =
    perksData.perks?.length > 0
      ? [...perksData.perks].sort((a, b) => a.order - b.order)
      : DEFAULT_PERKS.map((text, i) => ({ text, order: i }));

  const openings =
    openingsData.openings?.length > 0 ? [...openingsData.openings].sort((a, b) => a.order - b.order) : DEFAULT_OPENINGS;

  const contactHeading = contactData.contactHeading || DEFAULT_CONTACT_HEADING;
  const contactEmail = contactData.contactEmail || DEFAULT_CONTACT_EMAIL;
  const contactPhone = contactData.contactPhone || DEFAULT_CONTACT_PHONE;

  return (
    <>
      <div className="flex flex-col gap-2 justify-center">
        <CommonBanner pageTitle={bannerTitle} normalFont={true} bgImageUrl={bannerImageUrl} position={bannerPosition} />
        <Breadcrumb pageName={bannerTitle} />
        <div className="max-w-[1400px] mx-auto md:px-[16px] w-full md:pt-[24px] pb-[64px]">
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 text-[#505050]">
              <div className="border border-[#e9e9e9] bg-white rounded-lg p-6 md:mx-0 mx-[16px]">
                <div className="text-[#505050] font-[14px] md:font-[16px] font-normal text-justify md:p-4 rubik-font leading-relaxed flex flex-col gap-4 md:gap-6">
                  <p>* {introParagraph}</p>

                  <h4 className="font-bold">{requirementsHeading}</h4>
                  {requirements.map((req, idx) => (
                    <p key={idx}>* {req.text}</p>
                  ))}

                  <h4 className="font-bold">{perksHeading}</h4>
                  {perks.map((perk, idx) => (
                    <p key={idx}>* {perk.text}</p>
                  ))}

                  {openings.map((opening, idx) => (
                    <React.Fragment key={idx}>
                      <h4 className="font-bold">{opening.department}</h4>
                      {(opening.roles || []).map((role, rIdx) => (
                        <p key={rIdx}>* {role}</p>
                      ))}
                    </React.Fragment>
                  ))}

                  <h4 className="font-bold">{contactHeading}</h4>
                  {contactEmail && (
                    <p>
                      * Email your resume to <strong>{contactEmail}</strong> or contact us at{' '}
                      <strong>{contactPhone}</strong>.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <CourseQuickLinks videoUrls={VIDEO_URLS} />
          </div>
        </div>
      </div>
    </>
  );
}
