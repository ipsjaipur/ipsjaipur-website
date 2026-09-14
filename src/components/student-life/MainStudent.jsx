'use client';
import Breadcrumb from '../common/Breadcrumb';
import { motion } from 'framer-motion';
import CourseNavigation from '../courses/CourseNavigation';
import CommonBanner from '../courses/CommonBanner';
import CourseQuickLinks from '../courses/CourseQuickLinks';
import { cloudinaryImage } from '@/_utils/cloudinaryImage';

export default function MainStudent({ pageContent = {} }) {
  // ── Pull sections ────────────────────────────────────────────────────────────
  const bannerData = pageContent?.banner || {};
  const campusData = pageContent?.campus || {};
  const clubData = pageContent?.['student-club'] || {};
  const sportsData = pageContent?.['sports-club'] || {};
  const indoorData = pageContent?.['indoor-games'] || {};
  const committeesData = pageContent?.committees || {};
  const sidebarData = pageContent?.sidebar || {};

  // ── Banner ───────────────────────────────────────────────────────────────────
  const bannerTitle = bannerData.bannerTitle || 'Student Life';
  const bannerImageUrl = cloudinaryImage(
    bannerData.bannerImageUrl || `${process.env.NEXT_PUBLIC_IMG_PATH}images/about/student-img-2.webp`,
    'f_auto,q_auto,w_1920',
  );
  const bannerPosition = bannerData.bannerPosition || 'object-top';

  // ── Campus ───────────────────────────────────────────────────────────────────
  const campusImageUrl =
    campusData.campusImageUrl || `${process.env.NEXT_PUBLIC_IMG_PATH}images/student-life/campus-image.webp`;
  const campusImageAlt = campusData.campusImageAlt || 'IPS Business School Campus Life';
  const campusParagraphs = campusData.campusParagraphs || [];

  // ── Student Club ─────────────────────────────────────────────────────────────
  const studentClubHeading = clubData.studentClubHeading || 'STUDENTS CLUB (MANAGEMENT):';
  const studentClubIntro = clubData.studentClubIntro || '';
  const clubs = clubData.clubs ? [...clubData.clubs].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : [];

  // ── Sports Club ──────────────────────────────────────────────────────────────
  const sportsClubHeading = sportsData.sportsClubHeading || 'Sports Club:';
  const sportsClubImageUrl =
    sportsData.sportsClubImageUrl || `${process.env.NEXT_PUBLIC_IMG_PATH}images/student-life/sports-club.webp`;
  const sportsClubImageAlt = sportsData.sportsClubImageAlt || 'IPS Sports Club Activities';
  const sportsClubParagraphs = sportsData.sportsClubParagraphs || [];

  // ── Indoor Games ─────────────────────────────────────────────────────────────
  const indoorGamesHeading = indoorData.indoorGamesHeading || 'Indoor Games:';
  const indoorGamesImageUrl =
    indoorData.indoorGamesImageUrl || `${process.env.NEXT_PUBLIC_IMG_PATH}images/student-life/gym-membership.webp`;
  const indoorGamesImageAlt = indoorData.indoorGamesImageAlt || 'IPS Indoor Games and Gym Facilities';
  const indoorGamesParagraphs = indoorData.indoorGamesParagraphs || [];

  // ── Committees ───────────────────────────────────────────────────────────────
  const committeesHeading = committeesData.committeesHeading || 'Committees:';
  const committees = committeesData.committees
    ? [...committeesData.committees].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : [];

  // ── Sidebar videos ───────────────────────────────────────────────────────────
  const videoUrls = sidebarData.sidebarVideos
    ? [...sidebarData.sidebarVideos]
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map(({ url, title }) => ({ url, title }))
    : [];

  // ── Navigation sections ──────────────────────────────────────────────────────
  const sections = [
    { id: 'student-life', label: 'Student Life' },
    { id: 'life-at-campus', label: 'Life at Campus' },
    { id: 'student-club', label: studentClubHeading.replace(/:$/, '') },
    { id: 'sports-club', label: sportsClubHeading.replace(/:$/, '') },
    { id: 'indoor-games', label: indoorGamesHeading.replace(/:$/, '') },
    { id: 'committees', label: committeesHeading.replace(/:$/, '') },
  ];

  return (
    <>
      <div className="flex flex-col gap-2 justify-center">
        <CommonBanner pageTitle={bannerTitle} bgImageUrl={bannerImageUrl} position={bannerPosition} />
        <Breadcrumb pageName={bannerTitle} />
      </div>

      <section className="max-w-[1400px] mx-auto md:px-[16px] w-full md:pt-[24px] pb-[64px]">
        <div className="flex flex-col xl:flex-row gap-6">
          <motion.div
            className="flex-1 text-[#444444]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="flex flex-col md:flex-row md:gap-6 gap-4">
              <CourseNavigation sections={sections} />

              <div className="border border-[#e9e9e9] bg-white rounded-lg p-6 md:mx-0 mx-[16px]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-6"
                >
                  {/* ── Student Life heading ──────────────────────────────── */}
                  <div className="flex items-center border-b border-[#e9e9e9] pt-[10px] pb-[10px]" id="student-life">
                    <h3 className="text-[18px] md:text-[20px] font-medium uppercase text-[#111111] mb-0">
                      Student Life
                    </h3>
                  </div>

                  <div className="flex flex-col gap-4 md:gap-6">
                    {/* ── Life at Campus ──────────────────────────────────── */}
                    <div className="flex flex-col gap-4 md:gap-6" id="life-at-campus">
                      <img src={campusImageUrl} className="mx-auto" alt={campusImageAlt} />
                      {campusParagraphs.map((para, i) => (
                        <p
                          key={i}
                          className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify"
                        >
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* ── Students Club ───────────────────────────────────── */}
                    <div className="flex flex-col gap-4 md:gap-6" id="student-club">
                      <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">
                        {studentClubHeading}
                      </h4>
                      {studentClubIntro && (
                        <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                          {studentClubIntro}
                        </p>
                      )}
                      {clubs.map((club, i) => (
                        <div key={i} className="flex flex-col gap-2">
                          <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">
                            {club.name}:
                          </h4>
                          {(club.bullets || []).map((bullet, j) => (
                            <p
                              key={j}
                              className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify"
                            >
                              {bullet}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* ── Sports Club ─────────────────────────────────────── */}
                    <div className="flex flex-col gap-4 md:gap-6" id="sports-club">
                      <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">
                        {sportsClubHeading}
                      </h4>
                      <img src={sportsClubImageUrl} className="mx-auto px-2" alt={sportsClubImageAlt} />
                      {sportsClubParagraphs.map((para, i) => (
                        <p
                          key={i}
                          className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify"
                        >
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* ── Indoor Games ────────────────────────────────────── */}
                    <div className="flex flex-col gap-4 md:gap-6" id="indoor-games">
                      <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">
                        {indoorGamesHeading}
                      </h4>
                      <img src={indoorGamesImageUrl} className="mx-auto px-2" alt={indoorGamesImageAlt} />
                      {indoorGamesParagraphs.map((para, i) => (
                        <p
                          key={i}
                          className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify"
                        >
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* ── Committees ──────────────────────────────────────── */}
                    <div className="flex flex-col gap-2" id="committees">
                      <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">
                        {committeesHeading}
                      </h4>
                      {committees.map((committee, i) => (
                        <div key={i} className="flex flex-col gap-4 mb-2">
                          <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">
                            {committee.name}:
                          </h4>
                          <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                            {committee.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <CourseQuickLinks videoUrls={videoUrls} />
        </div>
      </section>
    </>
  );
}
