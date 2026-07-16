import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import CourseQuickLinks from '../courses/CourseQuickLinks';

export default function About() {
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
    <div className="flex flex-col gap-2 justify-center">
      <CommonBanner pageTitle="IPS Ideology" bgImageUrl="images/about/about-us-image-3.webp" position="object-bottom" />
      <Breadcrumb pageName="IPS Ideology" />
      <div className="max-w-[1400px] mx-auto md:px-[16px] w-full md:pt-[24px] pb-[64px]">
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="text-[#444444]">
            <div className="border border-[#e9e9e9] px-[24px] md:px-[30px]">
              <div className="flex items-center border-b border-[#e9e9e9] pt-[10px] pb-[10px]">
                <h3 className="text-[20px] font-medium uppercase text-[#111111] mb-0">IPS IDEOLOGY</h3>
              </div>
              <div className="py-[30px] flex flex-col gap-6 text-[16px] leading-[28px] leading-relaxed text-justify text-gray-700">
                <p className="text-[#505050] text-center font-bold leading-[25px] text-[16px] ">
                  “Discover who you really are. Think independently. Find your own voice. IPS BUSINESS SCHOOL is one of
                  the Rajasthan’s elite business schools shaping business practice and transforming careers across the
                  globe.”
                </p>

                <p>
                  As one of the Rajasthans’s leading Business Schools, IPS BUSINESS SCHOOL brings together people,
                  cultures and ideas to change lives and to transform organisations. A global perspective and cultural
                  diversity are reflected in all aspects of our research and teaching.
                </p>

                <p>
                  For over twelve years, IPS, the Business School, has been at the forefront of Management Education,
                  developing and inspiring business leaders who strive to make a deep, positive and lasting impact on
                  the people, companies and society they serve.{' '}
                </p>

                <p>
                  The school’s integrated and up to date curriculum, close ties with Multinationals, and active
                  connection to the Global Network for Advanced Management ensure that IPS’s Management Students acquire
                  crucial techno Manage-mental skills and develop a genuine understanding of an increasingly complex
                  global context.
                </p>

                <h3 className="text-base font-bold text-gray-800 mt-4 border-b pb-1 border-gray-100">
                  Why Choose IPS BUSINESS SCHOOL?
                </h3>

                <div className="flex flex-col gap-5 mt-2 text-left">
                  <div className="flex gap-3 items-start">
                    <span className="text-amber-500 text-lg mt-0.5 shrink-0 select-none">💡</span>
                    <p>
                      <strong className="text-gray-800 font-bold">Excelling at Research:</strong> We strive for
                      excellence in research and innovation. We also come up with a panel of part-time Distinguished
                      Research Professors and Entrepreneurs whose Knowledge are shared with Management Folks at IPS.
                      These people concentrate on mentoring and promoting research of international significance and on
                      deepening international Knowledge by ties with Prestigious institutions.
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-amber-500 text-lg mt-0.5 shrink-0 select-none">💡</span>
                    <p>
                      <strong className="text-gray-800 font-bold">Excelling at Teaching:</strong> Our world-class
                      researchers and Entrepreneurs are also superb teachers, skilled at using a variety of teaching
                      methods to engage and instruct. We also employ Professors of Practice, people who combine academic
                      expertise with substantial business experience to aid the practical learning in the classroom.
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-amber-500 text-lg mt-0.5 shrink-0 select-none">💡</span>
                    <p>
                      <strong className="text-gray-800 font-bold">
                        Excelling in producing the most valuable Graduates:
                      </strong>{' '}
                      Those very bright students we recruit for management program, turns into fantastic graduates, with
                      a thirst for learning and a rounded approach to life and work. With academic theory and practical
                      skills, they hit the ground running in any company. More than all of this, we believe in the power
                      of creativity, of human imagination to do new things, to see things differently. And so do our
                      staff, our students, and our graduates. Do you?
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-amber-500 text-lg mt-0.5 shrink-0 select-none">💡</span>
                    <p>
                      <strong className="text-gray-800 font-bold">Excelling in On Job Training:</strong> Our Student
                      come up as a Prodigious Management Folk after graduation with our unique On Job Training
                      Methodology which they undergo during period of graduation with top corporate and multinationals.
                      More than all of this, we believe in the power of creativity, of human imagination to do new
                      things, to see things differently. And so do our staff, our students, and our graduates. Do you?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CourseQuickLinks videoUrls={videoUrls} />
        </div>
      </div>
    </div>
  );
}
