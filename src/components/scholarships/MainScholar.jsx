import React from 'react';
import SidebarWidgets from '../common/SidebarWidgets';
import Breadcrumb from '../common/Breadcrumb';
import Script from 'next/script';
import CommonBanner from '../courses/CommonBanner';
import CourseQuickLinks from '../courses/CourseQuickLinks';

export default function MainScholar() {
  const videoUrls = [
    {
      url: 'https://www.youtube.com/embed/ocaViRxJrdE?si=gmgh25qgaZeHh0hb',
    },
    {
      title: 'Raghav Sharma Video Resume',
      url: 'https://www.youtube.com/embed/4aq02tSiXd4?si=AawJvooDzO8Pflx0',
    },
  ];

  return (
    <>
      <CommonBanner
        pageTitle="Scholarships"
        bgImageUrl="images/about/scollarship-bg-img-2.webp"
        position="object-center"
      />
      <div className="flex flex-col gap-2 justify-center">
        <Breadcrumb pageName="Scholarships" />
        <div className="max-w-[1400px] mx-auto md:px-[16px] w-full md:pt-[24px] pb-[64px]">
          <div className="flex flex-col xl:flex-row gap-6">
            <div>
              <div className="border border-[#e9e9e9] bg-white rounded-lg p-6 md:mx-0 mx-[16px]">
                <div className="text-[#505050] flex flex-col gap-4 md:gap-6">
                  <img src="/images/scholarships/IPSSCHOOLARSHIP.webp" alt="IPS Business School Scholarships" />
                  <p className="text-[14px] md:text-[16px] font-normal rubik-font text-justify">
                    * All sorts of Government Scholarships are admissible at IPS BUSINESS SCHOOL for SC, ST, OBC, SBC,
                    Minority (with BPL card). Fees reimbursed as per rules of Govt. of Rajasthan.
                  </p>
                  <h4 className="text-[14px] md:text-[16px] font-semibold rubik-font text-justify">
                    Minority communities Scholarship:
                  </h4>
                  <p className="text-[14px] md:text-[16px] font-normal rubik-font text-justify">
                    * For getting this scholarship, following conditions are there – Students who have got admission in
                    a recognized college to pursue technical / professional courses and should have not less than 50%
                    marks at higher secondary / graduation level. The annual family income of the beneficiary / parent
                    or guardian should not exceed Rs. 2.5 lakh per annum.
                  </p>
                  <h4 className="text-[14px] md:text-[16px] font-semibold rubik-font text-justify">
                    Social Justice & Empowerment Department, Govt of Rajasthan Scholarship:
                  </h4>
                  <p className="text-[14px] md:text-[16px] font-normal rubik-font text-justify">
                    * The department functions as a nodal agency for implementing programmes for upliftment of SCc, STc,
                    OBCs, Minorities and other socially & economically weaker sections of the Society. Scholarships will
                    be paid to the students Whose parents / guardians’ income from all sources does not exceed Rs.
                    2,00,000/ – per annum.
                  </p>
                </div>
              </div>
            </div>
            <CourseQuickLinks videoUrls={videoUrls} />
          </div>
        </div>
      </div>
    </>
  );
}
