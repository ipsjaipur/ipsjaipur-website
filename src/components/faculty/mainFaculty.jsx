'use client';
import { useState } from 'react';
import SidebarLayout from '../common/SidebarLayout';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import CourseQuickLinks from '../courses/CourseQuickLinks';

export default function MainFaculty({ facultyContent }) {
  const [activeTab, setActiveTab] = useState('visiting-faculty');

  // ── Banner ──────────────────────────────────────────────────────────────────
  const bannerData = facultyContent.banner;
  const bannerTitle = bannerData.bannerTitle;
  const bannerPosition = bannerData.bannerPosition;
  const imgBase = process.env.NEXT_PUBLIC_IMG_PATH || '';
  const bannerImageUrl = bannerData.bannerImageUrl || `${imgBase}${bannerData.bannerImageUrl}`;

  // ── Faculty section ─────────────────────────────────────────────────────────
  const facultySection = facultyContent.faculty;
  const facultySectionTitle = facultySection.facultySectionTitle;
  const facultyColName = facultySection.facultyColName;
  const facultyColExp = facultySection.facultyColExp;
  const facultyMembers = [...facultySection.facultyMembers].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // ── Mentors section ─────────────────────────────────────────────────────────
  const mentorsSection = facultyContent.mentors;
  const mentorsSectionTitle = mentorsSection.mentorsSectionTitle;
  const mentorsColName = mentorsSection.mentorsColName;
  const mentorsColQual = mentorsSection.mentorsColQual;
  const mentors = [...mentorsSection.mentors].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // ── Tabs ────────────────────────────────────────────────────────────────────
  const facultyTabs = [
    { id: 'visiting-faculty', label: facultySectionTitle },
    { id: 'corporate-speakers', label: mentorsSectionTitle },
  ];

  const videoUrls = [
    { url: 'https://www.youtube.com/embed/ocaViRxJrdE?si=gmgh25qgaZeHh0hb' },
    { title: 'Raghav Sharma Video Resume', url: 'https://www.youtube.com/embed/4aq02tSiXd4?si=AawJvooDzO8Pflx0' },
  ];

  return (
    <div className="flex flex-col justify-center">
      <CommonBanner pageTitle={bannerTitle} bgImageUrl={bannerImageUrl} position={bannerPosition} />
      <Breadcrumb pageName={bannerTitle} />
      <div className="max-w-[1400px] mx-auto md:px-[16px] w-full md:pt-[24px] pb-[64px]">
        <div className="flex flex-col xl:flex-row gap-6 md:gap-8 justify-center">
          <SidebarLayout tabs={facultyTabs} activeTab={activeTab} onTabClick={setActiveTab}>
            <div className="flex flex-col xl:flex-row gap-6 md:gap-8 px-[16px] md:px-0 pb-[14px]">
              <div className="flex-1">
                {/* ── Core & Visiting Faculty tab ─────────────────────────── */}
                {activeTab === 'visiting-faculty' && (
                  <div className="text-[#444444] border border-[#e9e9e9]">
                    <div className="flex items-center border-b border-[#e9e9e9] pt-[10px] pb-[10px] px-[24px] md:px-[30px]">
                      <h3 className="text-[18px] md:text-[20px] font-medium uppercase text-[#111111] mb-0">
                        {facultySectionTitle}
                      </h3>
                    </div>
                    <div className="overflow-x-auto p-[20px] md:p-[30px]">
                      <table className="w-full border border-gray-400 border-collapse text-center">
                        <thead>
                          <tr className="border-b border-gray-400 font-bold text-[#333]">
                            <th className="w-1/2 border-r border-gray-400 font-bold p-1 text-[15px]">
                              {facultyColName}
                            </th>
                            <th className="w-1/2 p-1 font-bold">{facultyColExp}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {facultyMembers.map((faculty, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-400 last:border-b-0 hover:bg-gray-50/50 transition-colors font-[Rubik]"
                            >
                              <td className="w-1/2 border-r border-gray-400 p-3 md:p-4 align-middle font-[Rubik]">
                                <div className="font-[Rubik] text-[#333333] text-[15px] md:text-[16px] mb-1">
                                  {faculty.name}
                                </div>
                                {faculty.qualification && (
                                  <div className="text-[12px] text-[#505050] leading-relaxed max-w-sm mx-auto">
                                    {faculty.qualification}
                                  </div>
                                )}
                                {faculty.designation && (
                                  <div className="text-[12px] text-[#505050] leading-relaxed max-w-sm mx-auto">
                                    ({faculty.designation})
                                  </div>
                                )}
                              </td>
                              <td className="w-1/2 p-3 md:p-4 align-middle text-[14px] md:text-[16px] text-[#505050] leading-normal">
                                {faculty.experience}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ── Corporate Speakers / Mentors tab ───────────────────── */}
                {activeTab === 'corporate-speakers' && (
                  <div className="text-[#444444] border border-[#e9e9e9]">
                    <div className="flex items-center border-b border-[#e9e9e9] pt-[10px] pb-[10px] px-[24px] md:px-[30px]">
                      <h3 className="text-[18px] md:text-[20px] font-medium uppercase text-[#111111] mb-0">
                        {mentorsSectionTitle}
                      </h3>
                    </div>
                    <div className="overflow-x-auto p-[20px] md:p-[30px]">
                      <table className="w-full border border-gray-400 border-collapse text-center">
                        <thead>
                          <tr className="border-b border-gray-400 font-bold text-[#333]">
                            <th className="w-1/2 border-r border-gray-400 font-bold p-1 text-[15px]">
                              {mentorsColName}
                            </th>
                            <th className="w-1/2 p-1 font-bold">{mentorsColQual}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mentors.map((mentor, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-400 last:border-b-0 hover:bg-gray-50/50 transition-colors font-[Rubik]"
                            >
                              <td className="w-1/2 border-r border-gray-400 p-3 md:p-4 align-middle font-[Rubik]">
                                <div className="font-[Rubik] text-[#505050] text-[15px] md:text-[16px] mb-1">
                                  {mentor.name}
                                </div>
                                {mentor.qualification && (
                                  <div className="text-[12px] text-[#505050] leading-relaxed max-w-sm mx-auto">
                                    {mentor.qualification}
                                  </div>
                                )}
                              </td>
                              <td className="w-1/2 p-3 md:p-4 align-middle text-[14px] md:text-[16px] text-[#505050] leading-normal">
                                {mentor.experience}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
              <CourseQuickLinks videoUrls={videoUrls} />
            </div>
          </SidebarLayout>
        </div>
      </div>
    </div>
  );
}
