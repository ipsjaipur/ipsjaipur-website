'use client';
import React from 'react';

const advisorsData = [
  {
    name: 'Dr. S.K. Agarwal',
    designation: 'Member, Board of Advisors',
    organization: 'Chairman, Agarwal Hospital',
    description:
      'Headed senior leadership positions across Public and Private Sector organizations, guiding institutional ethics and public governance.',
    initials: 'SA',
  },
  {
    name: 'Mr. Ashish Mittal',
    designation: 'Member, Board of Advisors',
    organization: 'Chairman, Agarwal Hospital',
    description:
      'Extensive operational leadership and enterprise management expertise from leading positions across private and public sectors.',
    initials: 'AM',
  },
  {
    name: 'Dr. Sudhir Agarwal',
    designation: 'Senior Vice-President & Advisor',
    organization: 'IPS Business School',
    description:
      'Worked with Hong Kong Shanghai Banking Corporation Ltd. (HSBC), IDBI Bank Ltd., and Citibank N.A. Heads corporate alliances and placement strategy.',
    initials: 'SA',
  },
  {
    name: 'Mr. Mohit Bhagat',
    designation: 'Strategic Head & Advisor',
    organization: 'IPS Business School',
    description:
      'Worked as Sr. Vice President with Kotak Mahindra Bank Ltd., North Head TATA Mutual Fund, BDM North ICICI Prudential Mutual Funds, State Head Rajasthan Franklin Templeton Mutual Funds.',
    initials: 'MB',
  },
  {
    name: 'Mr. Paresh Nankany',
    designation: 'Member, Board of Advisors',
    organization: 'Formerly North Head - ING Vysya, HDFC, IDBI & ICICI',
    description:
      'Worked as North Head - ING Vysya Bank Ltd., HDFC Bank Ltd., IDBI Bank Ltd., ICICI Bank Ltd. Mentors students in commercial banking and credit operations.',
    initials: 'PN',
  },
  {
    name: 'Dr. Deepti Agarwal',
    designation: 'Director & Executive Advisor',
    organization: 'IPS Business School',
    description:
      'Director - IPS Business School. Oversees academic execution, regulatory compliance (AICTE/RTU), faculty governance, and student development.',
    initials: 'DA',
  },
];

export default function BoardOfAdvisorsSection() {
  return (
    <section className="relative lg:py-20 py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          {/* Large Background Text */}
          <div className="absolute lg:-top-8 -top-4 left-0 right-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <h3
              className="text-[28px] md:text-[40px] lg:text-[60px] font-black text-gray-500/8 tracking-tight select-none whitespace-nowrap"
              style={{
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              Corporate Leadership
            </h3>
          </div>

          <h2 className="relative text-3xl md:text-3xl font-bold text-gray-900 mb-4">Guided by Industry Legends</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mx-auto mb-6"></div>
          <p className="lg:text-lg text-md text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The strategic trajectory, curriculum relevance, and Industrial association at IPS Business School are
            actively guided by a distinguished Board of Advisors comprising banking leaders, healthcare chairmen, asset
            managers, and academic visionaries.
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {advisorsData.map((advisor, index) => (
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
