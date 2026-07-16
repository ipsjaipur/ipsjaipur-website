'use client';
import { useState } from 'react';
import SidebarLayout from '../common/SidebarLayout';
import PageBanner from '../common/PageBanner';
import Breadcrumb from '../common/Breadcrumb';
import SidebarWidgets from '../common/SidebarWidgets';
import Script from 'next/script';
import { facultyData, mentorData } from '../layout/facultyData';
import CommonBanner from '../courses/CommonBanner';
import CourseQuickLinks from '../courses/CourseQuickLinks';
export default function MainFaculty() {
  const [activeTab, setActiveTab] = useState('visiting-faculty');

  const facultyTabs = [
    { id: 'visiting-faculty', label: 'Core & Visiting Faculty' },
    { id: 'corporate-speakers', label: 'Corporate Speakers / Mentors' },
  ];

  const videoUrls = [
    {
      url: 'https://www.youtube.com/embed/ocaViRxJrdE?si=gmgh25qgaZeHh0hb',
    },
    {
      title: 'Raghav Sharma Video Resume',
      url: 'https://www.youtube.com/embed/4aq02tSiXd4?si=AawJvooDzO8Pflx0',
    },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="flex flex-col justify-center">
      <CommonBanner pageTitle="Faculty" bgImageUrl="images/about/faculty-img.webp" />
      <Breadcrumb pageName="Faculty" />
      <div className="max-w-[1400px] mx-auto md:px-[16px] w-full md:pt-[24px] pb-[64px]">
        <div className="flex flex-col xl:flex-row gap-6 md:gap-8 justify-center ">
          <SidebarLayout tabs={facultyTabs} activeTab={activeTab} onTabClick={handleTabChange}>
            <div className="flex flex-col xl:flex-row gap-6 md:gap-8 px-[16px] md:px-0 pb-[14px]">
              <div className="flex-1">
                {activeTab === 'visiting-faculty' && (
                  <div className="text-[#444444] border border-[#e9e9e9]">
                    <div className="">
                      <div className="flex items-center border-b border-[#e9e9e9] pt-[10px] pb-[10px]  px-[24px] md:px-[30px]">
                        <h3 className="text-[18px] md:text-[20px] font-medium uppercase text-[#111111] mb-0">
                          Core & Visiting Faculty
                        </h3>
                      </div>
                      <div className="overflow-x-auto p-[20px]  md:p-[30px] ">
                        <table className="w-full border border-gray-400 border-collapse text-center">
                          <thead>
                            <tr className="border-b border-gray-400 font-bold text-[#333]">
                              <th className="w-1/2 border-r border-gray-400 font-bold  p-1 text-[15px]">
                                Faculty Name
                              </th>
                              <th className="w-1/2  p-1 font-bold ">Experience</th>
                            </tr>
                          </thead>
                          <tbody>
                            {facultyData.map((faculty, index) => (
                              <tr
                                key={index}
                                className="border-b border-gray-400 last:border-b-0 hover:bg-gray-50/50 transition-colors font-[Rubik]"
                              >
                                {/* Column 1: Name and Credentials */}
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

                                {/* Column 2: Professional Tenure */}
                                <td className="w-1/2 p-3 md:p-4 align-middle text-[14px] md:text-[16px] text-[#505050] leading-normal">
                                  {faculty.experience}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'corporate-speakers' && (
                  <div className="text-[#444444] border border-[#e9e9e9]">
                    <div className="">
                      <div className="flex items-center border-b border-[#e9e9e9] pt-[10px] pb-[10px]  px-[24px] md:px-[30px]">
                        <h3 className="text-[18px] md:text-[20px] font-medium uppercase text-[#111111] mb-0">
                          Corporate Speakers / Mentors
                        </h3>
                      </div>
                      <div className="overflow-x-auto p-[20px]  md:p-[30px] ">
                        <table className="w-full border border-gray-400 border-collapse text-center">
                          <thead>
                            <tr className="border-b border-gray-400 font-bold text-[#333]">
                              <th className="w-1/2 border-r border-gray-400 font-bold  p-1 text-[15px]">
                                Name & Designation
                              </th>
                              <th className="w-1/2  p-1 font-bold ">Qualification</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mentorData.map((faculty, index) => (
                              <tr
                                key={index}
                                className="border-b border-gray-400 last:border-b-0 hover:bg-gray-50/50 transition-colors font-[Rubik]"
                              >
                                <td className="w-1/2 border-r border-gray-400 p-3 md:p-4 align-middle font-[Rubik]">
                                  <div className="font-[Rubik] text-[#505050] text-[15px] md:text-[16px] mb-1">
                                    {faculty.name}
                                  </div>
                                  {faculty.qualification && (
                                    <div className="text-[12px] text-[#505050] leading-relaxed max-w-sm mx-auto">
                                      {faculty.qualification}
                                    </div>
                                  )}
                                </td>

                                {/* Column 2: Professional Tenure */}
                                <td className="w-1/2 p-3 md:p-4 align-middle text-[14px] md:text-[16px] text-[#505050] leading-normal">
                                  {faculty.experience}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
