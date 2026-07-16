'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CourseQuickLinks from '../CourseQuickLinks';
import Image from 'next/image';

export default function AntiRaggingDetail() {
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
              {/* Header */}
              <div className="mb-8">
                {/* Main Content */}
                <div className="space-y-4">
                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8]">
                    * Ragging in any form is prohibited at IPS Jaipur. It is a punishable offence according to the
                    guidelines of the Honorable Supreme Court of India.
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8]">
                    * IPS Jaipur has &lsquo;zero tolerance policy&lsquo; on ragging.
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8]">
                    * Students are thus warned against any type of ragging activities in the institute campus/hostel and
                    any other place. Those found indulging in any activity which directly or indirectly amounts to
                    ragging shall be penalized appropriately as per AICTE Notification F. No. 37-3/Legal/AICTE/2009
                    Dated 1.07.09 (available on AICTE web portal:{' '}
                    <a
                      href="http://aicte-india.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#e87816] hover:underline"
                    >
                      aicte-india.org
                    </a>
                    )
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8]">
                    * Students in distress owing to ragging related activity can contact any of the following persons:
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8] pl-6">
                    * Munmun Ghosh (M: 8233960000)
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8] pl-6">
                    * Prof Sudhir Agarwal (M: 8233970000)
                  </p>

                  {/* Notice Section */}
                  <div className="mt-8 mb-6">
                    <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-bold leading-[1.8]">
                      NOTICE: Anti Ragging
                    </p>
                  </div>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8]">
                    * Ragging is an act of aggression committed by an individual or a group of individuals over another
                    individual or a group of individuals where the first group, by virtue of their being senior to the
                    second group, somehow get the authority and audacity to commit the act and the second group, by
                    virtue of their being new to the institution are automatic victims. Any interaction which is
                    aggressive and asymmetric (not on equal footing) is ragging.
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8]">
                    * Ragging is not only a form of abuse, a serious act of indiscipline and misconduct but is also
                    considered a &quot;crime&quot; under the Prohibition of Ragging Act and the directives issued by the
                    Hon&apos;ble Supreme Court of India from time to time. Todays Special Code KITKAT.
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8]">
                    * Complaints related to ragging can be lodged with the Police as an FIR and punishment may lead to
                    rustication from Jaipuria, Jaipur as well as imprisonment. Students are advised in their own
                    interest to abstain from and dissuade others from any Ragging Activities, failing which they will be
                    liable for punishment and penalties as per the law.
                  </p>

                  <p className="text-[#505050] lg:text-[16px] text-[14px] font-rubik font-normal leading-[1.8]">
                    * The students at the time of registration to the PGDM programme are required to submit an
                    undertaking (on A4 sheet and on a stamp paper of appropriate value, as instructed by AICTE) signed
                    by themselves and their parents/guardians affirming that their ward is liable to
                    punishment/rustication from the institute on the occasion of being found guilty of indulging in
                    ragging activities.
                  </p>

                  {/* Download PDF Section */}
                  <div className="mt-8 flex justify-start">
                    <a
                      href={`${process.env.NEXT_PUBLIC_IMG_PATH}images/courses/AntiRagging-AffidavitForm-IPSBSCHOOL.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-[#e87816] text-white font-rubik font-normal rounded-lg hover:bg-[#d16910] transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Download Anti-Ragging Affidavit Form
                    </a>
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
