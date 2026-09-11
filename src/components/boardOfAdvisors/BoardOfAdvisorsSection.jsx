'use client';
import React from 'react';

export default function BoardOfAdvisorsSection({ advisorsData = {} }) {
  // ── Pull fields with exact static defaults as fallbacks ───────────────────
  const ghostText = advisorsData.ghostText || 'Corporate Leadership';
  const sectionHeading = advisorsData.sectionHeading || 'Guided by Industry Legends';
  const sectionSubtitle =
    advisorsData.sectionSubtitle ||
    'The strategic trajectory, curriculum relevance, and Industrial association at IPS Business School are actively guided by a distinguished Board of Advisors comprising banking leaders, healthcare chairmen, asset managers, and academic visionaries.';

  const advisors =
    advisorsData.advisors?.length > 0 ? [...advisorsData.advisors].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : [];

  return (
    <section className="relative lg:py-20 py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          {/* Large Background Ghost Text */}
          <div className="absolute lg:-top-8 -top-4 left-0 right-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <h3
              className="text-[28px] md:text-[40px] lg:text-[60px] font-black text-gray-500/8 tracking-tight select-none whitespace-nowrap"
              style={{ lineHeight: 1, letterSpacing: '-0.02em' }}
            >
              {ghostText}
            </h3>
          </div>

          <h2 className="relative text-3xl md:text-3xl font-bold text-gray-900 mb-4">{sectionHeading}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mx-auto mb-6"></div>
          <p className="lg:text-lg text-md text-gray-600 max-w-4xl mx-auto leading-relaxed">{sectionSubtitle}</p>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {advisors.map((advisor, index) => (
            <div
              key={index}
              className="group bg-white overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 transform hover:-translate-y-2 flex flex-col"
            >
              {/* Card Content */}
              <div className="p-8 flex-grow flex flex-col">
                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                  {advisor.name}
                </h3>

                {/* Designation */}
                <p className="text-sm text-orange-500 font-semibold mb-2">{advisor.designation}</p>

                {/* Organization */}
                <p className="text-sm text-gray-700 font-medium mb-4 border-b border-gray-200 pb-4">
                  {advisor.organization}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed flex-grow">{advisor.description}</p>
              </div>

              {/* Bottom Accent Line */}
              <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
