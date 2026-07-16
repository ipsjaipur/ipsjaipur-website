'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VideoPlayer from '../courses/VideoPlayer';

export default function ResumeBook() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');

  const openVideoPopup = (url) => {
    const autoplayUrl = url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`;
    setActiveVideoUrl(autoplayUrl);
    setIsVideoOpen(true);
  };

  const closeVideoPopup = () => {
    setActiveVideoUrl('');
    setIsVideoOpen(false);
  };

  const videoResumes = [
    {
      id: 1,
      title: 'Nidhi Tiwari (MBA 2020-22)',
      videoUrl: 'https://www.youtube.com/embed/q1V_IjL_PbM',
      thumbnailUrl: 'https://img.youtube.com/vi/q1V_IjL_PbM/hqdefault.jpg',
    },
    {
      id: 2,
      title: 'Nisha Vyas (MBA 2020-22)',
      videoUrl: 'https://www.youtube.com/embed/qXcFj-_SUIk',
      thumbnailUrl: 'https://img.youtube.com/vi/qXcFj-_SUIk/hqdefault.jpg',
    },
    {
      id: 3,
      title: 'Prerna Kheshwani (BBA 2020-23)',
      videoUrl: 'https://www.youtube.com/embed/JuXA0cJMuqM',
      thumbnailUrl: 'https://img.youtube.com/vi/JuXA0cJMuqM/hqdefault.jpg',
    },
    {
      id: 4,
      title: 'Durjoy Sarkar (MBA 2020-22)',
      videoUrl: 'https://www.youtube.com/embed/bgwGTrhWvSs',
      thumbnailUrl: 'https://img.youtube.com/vi/bgwGTrhWvSs/hqdefault.jpg',
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
      <section className="py-[64px] px-[16px] bg-[#f1f183]">
        <motion.div
          className="w-full max-w-[1320px] mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-8" variants={titleVariants}>
            <h2 className="text-gray-900 font-bold rubik-fonts text-[28px] md:text-[32px] lg:text-[36px] mb-4">
              Resume Book
            </h2>
            <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              The Classes of MBA Resume Books are now available. Search our database of IPS BUSINESS SCHOOL MBA students
              or alumni to find talented candidates for your openings.
            </p>
          </motion.div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {videoResumes.map((video, index) => (
              <motion.div
                key={video.id}
                variants={cardVariants}
                className="group cursor-pointer"
                onClick={() => openVideoPopup(video.videoUrl)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openVideoPopup(video.videoUrl);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Play video resume of ${video.title}`}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                    <iframe
                      src={video.videoUrl}
                      title={`IPS BUSINESS SCHOOL: ${video.title} | Video Résumé`}
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      tabIndex="-1"
                    />
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="text-gray-900 font-semibold text-sm md:text-base line-clamp-2 group-hover:text-[#e87816] transition-colors duration-300">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div className="text-center" variants={cardVariants}>
            <a
              href="https://www.youtube.com/channel/UCDAbHzu7iO893x7IyT5JttQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-[#C8501F] hover:bg-[#A83F18] text-white font-semibold rounded-md shadow-[0_8px_20px_-6px_rgba(200,80,31,0.45)] hover:shadow-[0_12px_26px_-6px_rgba(200,80,31,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              View More....
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Video Player Modal */}
      <VideoPlayer isOpen={isVideoOpen} videoUrl={activeVideoUrl} onClose={closeVideoPopup} />
    </>
  );
}
