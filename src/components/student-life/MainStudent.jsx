'use client';
import PageBanner from '../common/PageBanner';
import Breadcrumb from '../common/Breadcrumb';
import SidebarWidgets from '../common/SidebarWidgets';
import Script from 'next/script';
import { motion } from 'framer-motion';
import CourseNavigation from '../courses/CourseNavigation';
import CommonBanner from '../courses/CommonBanner';
import CourseQuickLinks from '../courses/CourseQuickLinks';

export default function StudentLife() {
  const sections = [
    { id: 'student-life', label: 'Student Life' },
    { id: 'life-at-campus', label: 'Life at Campus' },
    { id: 'student-club', label: 'STUDENTS CLUB (MANAGEMENT)' },
    { id: 'sports-club', label: 'Sports Club' },
    { id: 'indoor-games', label: 'Indoor Games' },
    { id: 'committees', label: 'Committees' },
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

  return (
    <>
      <div className="flex flex-col gap-2 justify-center">
        {/* <PageBanner title="Student Life" bgImageUrl="/images/about/image_2.webp" /> */}
        <CommonBanner pageTitle="Student Life" bgImageUrl="images/about/student-img-2.webp" position="object-top" />
        <Breadcrumb pageName="Student Life" />
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
                  <div className="flex items-center border-b border-[#e9e9e9] pt-[10px] pb-[10px]" id="student-life">
                    <h3 className="text-[18px] md:text-[20px] font-medium uppercase text-[#111111] mb-0">
                      Student Life
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex flex-col gap-4 md:gap-6" id="life-at-campus">
                      <img src="images/student-life/campus-image.webp" className="mx-auto" alt="" />
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        The Sports Club believes in keeping Fit the Fittest. The skill development of managing a team
                        and leading from the front can be best taught by engaging a student into a sports activity.
                      </p>
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        IPS’s life is very vivacious as it is situated at very peaceful and very calm city Jaipur
                        popularly known as pink city, here students live their life absolutely. The environment is so
                        helpful and courageous that every student is ready to take any demanding academic challenges.
                        The life at IPS is very effervescent and resilient. The peppy environment and the zeal to
                        celebrate each festival in the campus give the closeness with IPS family.
                      </p>
                    </div>
                    <div className="flex flex-col gap-4 md:gap-6" id="student-club">
                      <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">
                        STUDENTS CLUB (MANAGEMENT):
                      </h4>
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        IPS BUSINESS SCHOOL has the Student's Council, which is headed by Club Coordinators and acts as
                        a guiding system for the Institute's success. The council comprises of various Clubs as:-
                      </p>
                      <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">MARCOS CLUB:</h4>
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        Liasioning with corporate faculties for weekly presentations.
                      </p>
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        Liasioning with bodies like CII & FICCI.
                      </p>
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        Arranging Industrial visits and Media management activities.
                      </p>
                      <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">HCORE CLUB:</h4>
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        Managing industry interaction programs.
                      </p>
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        Industry mentorship programs etc.
                      </p>
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        Sending greetings to business barons, political leaders etc.
                      </p>
                      <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">
                        FINNACLE CLUB:
                      </h4>
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        Updation of Business news.
                      </p>
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        Planning and organizing the events and cultural activities.
                      </p>
                      <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">HCORE CLUB:</h4>
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        Liasioning with corporate faculties for weekly presentations.
                      </p>
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        Liasioning with bodies like CII & FICCI.
                      </p>
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        Arranging Industrial visits and Media management activities.
                      </p>
                    </div>
                    <div className="flex flex-col gap-4 md:gap-6" id="sports-club">
                      <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">Sports Club:</h4>
                      <img src="images/student-life/sports-club.webp" className="mx-auto px-2" alt="" />
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        The Sports Club believes in keeping Fit the Fittest. The skill development of managing a team
                        and leading from the front can be best taught by engaging a student into a sports activity.
                      </p>
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        At IPS, we organize activities like T-20 Tournaments, Volleyball Tournaments, Basketball
                        Tournaments and many more which not only gives physical strength but also develop a team spirit
                        among the students.
                      </p>
                    </div>
                    <div className="flex flex-col gap-4 md:gap-6" id="indoor-games">
                      <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">
                        Indoor Games:
                      </h4>
                      <img src="images/student-life/gym-membership.webp" className="mx-auto px-2" alt="" />
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        To keep up the enthusiasm of the students and the environment of the campus full of life and
                        energy we have indoor gamesactivities which includeTable Tennis, Carom, Chess, Billiards and
                        many more.
                      </p>
                      <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                        Such activities also keep up the minds of the young bloods relaxed and refresh for continuous
                        learning.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2" id="committees">
                      <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">Committees:</h4>
                      <div className="flex flex-col gap-4 mb-2">
                        <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">
                          Placement Committee:
                        </h4>
                        <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                          This committee frequently interacts with the corporate world, thereby developing and
                          maintaining symbiotic relations. It undertakes various activities related to campus placement
                          for final year students and summer training for the first year students.
                        </p>
                      </div>
                      <div className="flex flex-col gap-4 mb-2">
                        <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">
                          Seminar Committee:
                        </h4>
                        <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                          They organize several seminars on topics of current importance and relevance. They interact
                          with CEOs, Entrepreneurs, Consultants, Managers and Professionals from various spheres of
                          business, who are invited as Guest Speakers in order to throw light on the subject matter,
                          with a view to change mindsets and broaden horizons.{' '}
                        </p>
                      </div>
                      <div className="flex flex-col gap-4 mb-2">
                        <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">
                          Alumni Committee:
                        </h4>
                        <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                          This committee works as a bridge between the alumni and the alma mater, both at the corporate
                          and personal level. We look up to our alumni, as they are our best ambassadors in the
                          corporate world and a vital link in the Industry -Institute relationship.
                        </p>
                      </div>
                      <div className="flex flex-col gap-4 mb-2">
                        <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">
                          Sports Committee:
                        </h4>
                        <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                          Students, who are under constant pressure to learn and excel, need space and time to relax and
                          revitalize themselves. The sports teams headed by students organize cricket, basketball,
                          volleyball, football and badminton matches, to enliven the sporting spirit and enable students
                          to rejuvenate themselves.
                        </p>
                      </div>
                      <div className="flex flex-col gap-4 mb-2">
                        <h4 className="text-[#111111] rubik-font font-medium text-[18px] md:text-[22px]">
                          Cultural Committee:
                        </h4>
                        <p className="text-[14px] rubik-font font-normal md:text-[16px] text-[#505050] text-justify">
                          This committee aims to encourage the students to participate in various inter-collegiate
                          events and to develop their latent potential in dance, drama, creativity, management games,
                          organisation skills, etc.
                        </p>
                      </div>
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
