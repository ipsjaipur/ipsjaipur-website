'use client';
import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import CourseQuickLinks from '../courses/CourseQuickLinks';

export default function MainCareer() {
  // Listen for form submission from nopaperforms
  const videoUrls = [
    {
      url: 'https://www.youtube.com/embed/ocaViRxJrdE?si=gmgh25qgaZeHh0hb',
    },
    {
      title: 'Raghav Sharma Video Resume',
      url: 'https://www.youtube.com/embed/4aq02tSiXd4?si=AawJvooDzO8Pflx0',
    },
  ];

  React.useEffect(() => {
    const handleFormSubmit = (event) => {
      // Check if the event is from nopaperforms iframe
      if (event.data && typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          // Detect successful form submission
          if (data.type === 'npf_form_submit' || data.event === 'form_submit' || data.status === 'success') {
            // Redirect to thank you page
            window.location.href = '/thank-you';
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }
      // Alternative: Check for specific messages from the form
      if (event.data === 'npf_form_submitted' || event.data === 'form_submitted') {
        window.location.href = '/thank-you';
      }
    };

    window.addEventListener('message', handleFormSubmit);
    return () => window.removeEventListener('message', handleFormSubmit);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 justify-center">
        {/* <PageBanner title="Career @ IPS BUSINESS SCHOOL" bgImageUrl="/images/about/image_2.webp" /> */}
        <CommonBanner
          pageTitle="Career @ IPS BUSINESS SCHOOL"
          normalFont={true}
          bgImageUrl="images/about/career-img.webp"
          position="center"
        />
        <Breadcrumb pageName="Career @ IPS BUSINESS SCHOOL" />
        <div className="max-w-[1400px] mx-auto md:px-[16px] w-full md:pt-[24px] pb-[64px]">
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 text-[#505050]">
              <div className="border border-[#e9e9e9] bg-white rounded-lg p-6 md:mx-0 mx-[16px]">
                <div className="text-[#505050] font-[14px] md:font-[16px] font-normal text-justify md:p-4 rubik-font leading-relaxed flex flex-col gap-4 md:gap-6">
                  <p>
                    * IPS BUSINESS SCHOOL has been a flag bearer pioneering the legacy of industry oriented Management
                    Education and an undisputed leader in Corporate connection in North India for over a period of 17+
                    glorious years
                  </p>
                  <h4 className="font-bold">We are looking for the professionals who are:</h4>
                  <p>* Sincere and committed to their professional and education.</p>
                  <p>
                    * Good Learners, having the capacity to assimilate new knowledge, develop new skills in the field of
                    academics, with a commitment to excellence and urge to grow faster than their colleagues elsewhere.
                  </p>
                  <p>
                    * Ready to accept the challenge pf extending their perception beyond the traditional system of
                    education.
                  </p>
                  <h4 className="font-bold">If you have it in you, IPS BUSINESS SCHOOL is the right place for you</h4>
                  <p>* Immense opportunities to grow personally and professionally</p>
                  <p>
                    * Sharing of revenue with faculty on income generated through consultancy, research and industry
                    projects.
                  </p>
                  <h4 className="font-bold">SENIOR LECTURERS / LECTURERS</h4>
                  <p>* Marketing</p>
                  <p>* HR</p>
                  <p>* Finance</p>
                  <p>* International Business</p>
                  <p>* Retail Management</p>
                  <p>* English</p>
                  <p>* Personality Development Trainer.</p>
                  <h4 className="font-bold">You may apply to</h4>
                  <p>
                    * Email your resume to <strong>careers@ipsedu.in</strong> or contact us at{' '}
                    <strong>+91-9829047517</strong>.
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
