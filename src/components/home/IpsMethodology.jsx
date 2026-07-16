'use client';
import { motion } from 'framer-motion';
import { FlaskConical, BookOpen, Users, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import React from 'react';

export default function IpsMethodology() {
  return (
    <section
      aria-label="IPS Methodology"
      className="relative overflow-hidden py-[40px] md:py-[60px] lg:py-[80px] px-[16px]"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      <div className="lg:block hidden absolute h-full w-[28%] right-0 top-0 bg-ips-amber"></div>

      {/* Content Container */}
      <div className="relative w-full max-w-[1202px]  mx-auto flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-10 lg:gap-12">
        {/* ── Left: Content Section ─────────────────────────── */}
        <motion.div
          className="flex-1 w-full lg:max-w-[600px] lg:order-0 order-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Section Label */}
          <motion.p
            className="text-(--color-blue) font-semibold text-[14px] md:text-[15px] lg:text-[16px] uppercase tracking-wide mb-2 figtree-font"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
          >
            START TODAY
          </motion.p>

          {/* Main Heading */}
          <motion.h2
            className="text-(--color-ips-amber) font-bold leading-tight figtree-font text-[28px] md:text-[36px] lg:text-[40px] mb-4 md:mb-5 lg:mb-6"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.3 }}
          >
            About IPS Business School
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-[#77838F] text-[14px] md:text-[15px] font-normal lg:text-[16px] leading-relaxed mb-4 figtree-font"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.3 }}
          >
            IPS Business School is a centre of technical management and computer education. It is one of the{' '}
            <strong>top business schools in Jaipur</strong>, shaping business practices and transforming careers across
            the globe. It has been trusted by students for the last two decades because of its close-knitted placement
            network and top-notch infrastructure. Here are other reasons students choose IPS:
          </motion.p>

          {/* Feature List */}
          <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 figtree-font">
            {[
              {
                icon: FlaskConical,
                title: 'Research Excellence',
                text: 'Our panel includes part-time distinguished research professors and entrepreneurs who encourage our students to engage in research and innovation.',
                delay: 0.3,
              },
              {
                icon: BookOpen,
                title: 'Teaching Excellence',
                text: 'Our teaching faculty consists of world-class researchers, entrepreneurs, and professors of Practice who have witnessed it firsthand, and transfer their insights and aid practical learning in the classroom.',
                delay: 0.38,
              },
              {
                icon: Users,
                title: 'Producing the Most Valuable Graduates',
                text: 'We are listed among the top B schools in Jaipur because we turn our students into fantastic graduates with a thirst for learning and a rounded approach to life & work.',
                delay: 0.46,
              },
              {
                icon: Briefcase,
                title: 'On-the-Job Training',
                text: 'On-the-job training is fundamental to our teaching methodology at IPS, where students work with top corporate and multinationals while studying.',
                delay: 0.54,
              },
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 text-[#77838F] text-[13px] md:text-[14px] lg:text-[15px] figtree-font"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.2, ease: 'easeOut', delay: item.delay }}
              >
                <item.icon className="text-[#FF6B00] mt-[2px] shrink-0" size={18} />
                <span>
                  <strong className="text-[#444] font-semibold">{item.title}:</strong> {item.text}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Read More Button */}
          <Link href="/about">
            <motion.button
              type="button"
              className="bg-[#FF6B00] cursor-pointer text-white font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-md hover:bg-[#E55A00] transition-all duration-300 text-[14px] md:text-[15px] lg:text-[16px] montserrat-font hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.2, ease: 'easeOut', delay: 0.3 }}
            >
              Read More
            </motion.button>
          </Link>
        </motion.div>

        {/* ── Right: Form Section ─────────────────────────── */}
        <motion.div
          className="w-full lg:max-w-[420px] lg:sticky lg:top-[100px]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.2, ease: 'easeOut', delay: 0.4 }}
        >
          <div
            className="bg-white rounded-2xl shadow-md p-4 md:p-8 transition-transform duration-300"
            style={{
              boxShadow: '0 4px 16px rgba(255, 107, 0, 0.1)',
            }}
          >
            {/* Form Header */}
            <h3 className="text-blue font-bold text-[18px] md:text-[20px] lg:text-[22px] text-center mb-6 montserrat-font">
              Enquiry Now
            </h3>

            {/* NoPaperForms Widget */}
            <div className="npf_wgts" data-height="486px" data-w="403033ae15ee6358da0c4b73aa2f8df6">
              <iframe
                frameBorder="0"
                width="100%"
                height="486px"
                sandbox="allow-top-navigation allow-scripts allow-same-origin allow-downloads allow-popups allow-popups-to-escape-sandbox allow-forms"
                src="https://widgets.in8.nopaperforms.com/register?&amp;r=&amp;q=&amp;w=403033ae15ee6358da0c4b73aa2f8df6&amp;m=&amp;cu=https://www.ipsedu.in/about.php&amp;redirect_url=https://www.ipsedu.in/thank-you"
              ></iframe>
            </div>
          </div>

          {/* NoPaperForms Script Loader */}
          <Script type="text/javascript" strategy="lazyOnload" id="nopaperforms-widget-script">
            {`
              var s=document.createElement("script"); 
              s.type="text/javascript"; 
              s.async=true;
              s.src="https://widgets.in8.nopaperforms.com/emwgts.js"; 
              document.body.appendChild(s);
            `}
          </Script>
        </motion.div>
      </div>
    </section>
  );
}
