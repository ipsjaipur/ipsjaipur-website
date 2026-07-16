'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CourseNavigation({ sections }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const navRef = useRef(null);
  const mobileNavRef = useRef(null);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = window.innerWidth < 768 ? 140 : 100; // Account for sticky nav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  // Intersection Observer for scroll-based active state
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  // Center active tab in mobile view
  useEffect(() => {
    if (mobileNavRef.current) {
      const activeButton = mobileNavRef.current.querySelector(`[data-section="${activeSection}"]`);
      if (activeButton) {
        const container = mobileNavRef.current;
        const buttonLeft = activeButton.offsetLeft;
        const buttonWidth = activeButton.offsetWidth;
        const containerWidth = container.offsetWidth;
        const scrollPosition = buttonLeft - containerWidth / 2 + buttonWidth / 2;

        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [activeSection]);

  return (
    <>
      {/* Desktop Sidebar Navigation - Sticky Left */}
      <aside className="hidden md:block md:w-[240px] lg:w-[220px] xl:w-[260px] shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
          <nav ref={navRef} className="border border-[#e9e9e9] bg-white rounded-lg overflow-hidden shadow-sm">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full cursor-pointer px-4 py-3 text-sm font-medium border-b border-[#e9e9e9] last:border-b-0 transition-all text-left ${
                  activeSection === section.id ? 'bg-[#e87816] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: index * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  {/* Icon Image - Only show if icon exists */}
                  {section.icon && (
                    <div className="w-5 h-5 shrink-0 relative">
                      <Image
                        src={section.icon}
                        alt={`${section.label} icon`}
                        width={20}
                        height={20}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <span className={section.icon ? '' : 'ml-0'}>{section.label}</span>
                </div>
              </motion.button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Horizontal Navigation */}
      <div className="md:hidden w-full sticky top-16 z-40 bg-white border-b border-[#e9e9e9] shadow-sm px-4 py-2 mb-4">
        <div
          ref={mobileNavRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {sections.map((section) => (
            <button
              key={section.id}
              data-section={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-4 py-2 text-xs font-normal rounded-full whitespace-nowrap transition-all snap-center shrink-0 flex items-center gap-2 ${
                activeSection === section.id ? 'bg-[#e87816] text-white shadow-md' : ' text-gray-700 hover:bg-gray-200'
              }`}
            >
              {/* Icon Image - Only show if icon exists */}
              {section.icon && (
                <div className="w-4 h-4 shrink-0 relative">
                  <Image
                    src={section.icon}
                    alt={`${section.label} icon`}
                    width={16}
                    height={16}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hide scrollbar for mobile nav */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
