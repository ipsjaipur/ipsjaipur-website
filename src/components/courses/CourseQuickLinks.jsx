'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import VideoPlayer from './VideoPlayer';
import Link from 'next/link';

export default function CourseQuickLinks({ videoUrls = [] }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');

  // Listen for form submission from nopaperforms
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

  const openVideoPopup = (url) => {
    const autoplayUrl = url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`;
    setActiveVideoUrl(autoplayUrl);
    setIsVideoOpen(true);
  };

  const closeVideoPopup = () => {
    setActiveVideoUrl('');
    setIsVideoOpen(false);
  };

  const quickLinks = [
    { name: 'Student Life', href: '/student-life' },
    { name: 'Placements', href: '/placements' },
    { name: 'Scholarships', href: '/scholarships' },
    { name: 'Infrastructure', href: '/infrastructure' },
    { name: 'Career @ IPS BUSINESS SCHOOL', href: '/career-ips-business-school' },
    { name: 'Anti Ragging', href: '/anti-ragging' },
    { name: 'Terms & Conditions', href: '/terms-conditions' },
  ];

  return (
    <aside className="w-full xl:max-w-[340px] shrink-0 xl:flex flex sm:grid grid-cols-2 flex-col gap-6 md:px-0 px-[16px]">
      {/* Enquiry Form */}
      <motion.div
        className="w-full bg-white rounded-lg shadow-xs overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          boxShadow: '0 4px 16px rgba(255, 107, 0, 0.1)',
        }}
      >
        <div className="bg-[#e87816] text-white text-center py-3 font-medium tracking-wide text-lg">Enquiry</div>
        <div className="p-4">
          <div className="npf_wgts" data-height="400px" data-w="403033ae15ee6358da0c4b73aa2f8df6">
            <iframe
              frameBorder="0"
              width="100%"
              height="400px"
              sandbox="allow-top-navigation allow-scripts allow-same-origin allow-downloads allow-popups allow-popups-to-escape-sandbox allow-forms"
              src="https://widgets.in8.nopaperforms.com/register?&amp;r=https://www.ipsedu.in/&amp;q=&amp;w=403033ae15ee6358da0c4b73aa2f8df6&amp;m=&amp;cu=https://www.ipsedu.in/mba.php&amp;redirect_url=https://www.ipsedu.in/thank-you"
            ></iframe>
          </div>
          <Script type="text/javascript" strategy="lazyOnload">
            {`
              var s=document.createElement("script");
              s.type="text/javascript"; s.async=true;
              s.src="https://widgets.in8.nopaperforms.com/emwgts.js";
              document.body.appendChild(s);
            `}
          </Script>
        </div>
      </motion.div>

      {/* Video Thumbnails */}
      {videoUrls.length > 0 && (
        <div className="gap-4 flex flex-col">
          {videoUrls.map((videoData, index) => (
            <motion.div
              key={index}
              className="w-full bg-white rounded-lg shadow-md overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 + index * 0.1 }}
              tabIndex={0}
              aria-label="Play video"
            >
              {videoData.title && (
                <div className="bg-[#e87816] text-white text-center py-3 font-medium tracking-wide text-base">
                  {videoData.title}
                </div>
              )}
              <div
                className="relative aspect-video w-full cursor-pointer "
                onClick={() => openVideoPopup(videoData.url)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openVideoPopup(videoData.url);
                  }
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={videoData.url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="pointer-events-none"
                  tabIndex="-1"
                ></iframe>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Digital Marketing Banner with Image */}
      <motion.div
        className="w-full bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
      >
        <div className="bg-[#e87816] text-white text-center py-3 font-medium tracking-wide text-base px-2">
          Digital Marketing (Intermediate Level 1) – Free Certification
        </div>
        <div className="w-full bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/about/image.webp`}
            alt="Digital Marketing Course"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Business Analytics Banner with Image */}
      <motion.div
        className="w-full bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
      >
        <div className="bg-[#e87816] text-white text-center py-3 font-medium tracking-wide text-base px-2">
          Business Analytics (Intermediate Level 1) – Free Certification
        </div>
        <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/about/image_1.webp`}
            alt="Business Analytics Course"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        className="w-full bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
      >
        <div className="bg-[#e87816] text-white text-center py-3 font-medium tracking-wide text-lg">Quick Links</div>
        <div className="flex flex-col">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100 last:border-b-0 hover:bg-orange-50 hover:text-[#e87816] transition-colors duration-200 flex items-center justify-between group"
            >
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#e87816] transition-colors" />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Video Player Modal */}
      <VideoPlayer isOpen={isVideoOpen} videoUrl={activeVideoUrl} onClose={closeVideoPopup} />
    </aside>
  );
}
