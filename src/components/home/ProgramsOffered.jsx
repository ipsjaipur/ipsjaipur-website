'use client';
import { Clock, User, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function ProgramsOffered() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const programs = [
    {
      id: 1,
      badge: 'MBA',
      title: 'MBA Dual Major Specialization',
      image: 'images/home/mba.webp',
      description:
        'MBA at IPS Business College empowers future leaders with industry-focused learning, Practical exposure, and strong placement support',
      hoverTitle: 'MBA Dual Major Specialization',
      features: [
        'Master of Business Administration (MBA) Degree with Dual Specialization.',
        "Realtime Corporate Experience through Regular OJT's (On Job Training) & Live Projects.",
        'Additional AI/Business Analytics Course.',
        'Additional Digital Marketing Course.',
        '3 Months International, Trainings & Exchange Program (Sponsored / Optional)*.',
        'Best Placements.',
      ],
      approvals: [
        { name: 'AICTE', logo: 'images/home/aicte.webp' },
        { name: 'RTU', logo: 'images/home/rtu.webp' },
      ],
      duration: '2 years',
      eligibility: 'Check Eligibility',
      buttonText: 'Read More',
      link: '/mba',
    },
    {
      id: 2,
      badge: 'BBA',
      title: 'Bachelor of Business Administration',
      image: 'images/home/bba.webp',
      description:
        'BBA at IPS Business College builds strong business foundations with practical exposure and industry-oriented learning.',
      hoverTitle: 'Bachelor of Business Administration',
      features: [
        "Bachelor of Business Administration (BBA) Degree with Work Experience (with Regular On Job Training's - OJT's).",
        'Additional AI/Business Analytics Course.',
        'Additional Digital Marketing Course.',
        'Advanced Excel Course.',
        'Industry Specialized Certifications*.',
        'Best Placements.',
        '3 Months International, Trainings & Exchange Program (Sponsored / Optional)*.',
      ],
      approvals: [
        { name: 'AICTE', logo: 'images/home/aicte.webp' },
        { name: 'RTU', logo: 'images/home/rtu.webp' },
      ],
      duration: '3 years',
      eligibility: 'Check Eligibility',
      buttonText: 'Read More',
      link: '/bba',
    },
    {
      id: 3,
      badge: 'BCA',
      title: 'Bachelor of Computer Applications',
      image: 'images/home/bca.webp',
      description:
        'BCA at IPS Business College equips students with cutting-edge IT skills, programming expertise, and real-world project experience',
      hoverTitle: 'Bachelor of Computer Applications',
      features: [
        'Bachelor of Computer Application (BCA) Degree with Work Experience (with Regular On Job Training - OJT).',
        'Additional AI/Data Analytics Course.',
        'Additional Digital Marketing Course.',
        'Additional Cyber Security Course.',
        'Additional Cloud Computing Course.',
        'Live Industry Projects*.',
        'Best Placements.',
        '3 Months International, Trainings & Exchange Program (Sponsored / Optional)*.',
      ],
      approvals: [
        { name: 'AICTE', logo: 'images/home/aicte.webp' },
        { name: 'RTU', logo: 'images/home/rtu.webp' },
      ],
      duration: '3 years',
      eligibility: 'Check Eligibility',
      buttonText: 'Read More',
      link: '/bca',
    },
  ];

  return (
    <section
      aria-label="Programs Offered"
      className="relative overflow-hidden py-[60px] md:py-[80px] px-[16px]"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_IMG_PATH}images/home/bg-co2.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute top-0 left-0 h-full w-full" style={{ background: '#ffffffdc' }}></div>
      {/* Content Container */}
      <div className="relative w-full max-w-[1202px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-[60px]">
          <h2 className="text-[#FF9E3D]  font-bold leading-tight figtree-font text-[32px] md:text-[42px] lg:text-[48px]">
            Programs Offered
          </h2>
          <div className="text-gray-600 relative font-medium text-[14px] md:text-[16px] figtree-font">
            Discover Your Perfect Program
            <div className="absolute bottom-[-10px] left-[50%] translate-x-[-50%] w-[60px] h-px border-b border-dashed border-[#ff9e3d]"></div>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col h-full group"
              onMouseEnter={() => setHoveredCard(program.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Image */}
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMG_PATH}${program.image}`}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Orange Badge */}
                <div className="absolute bottom-0 left-0 bg-[#FF6B00] text-white px-4 py-1 rounded-tr-[10px] lg:text-lg text-[12px] font-semibold figtree-font z-10">
                  {program.badge}
                </div>
              </div>

              {/* Card Content Container - Default State */}
              <div className="relative p-4 flex flex-col flex-grow">
                <div
                  className={`transition-all duration-500 ${
                    hoveredCard === program.id
                      ? 'opacity-0 -translate-y-4 pointer-events-none'
                      : 'opacity-100 translate-y-0'
                  }`}
                >
                  <h3 className="text-[#FF6B00] font-bold text-[16px] lg:text-[18px] figtree-font mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-[12px] lg:text-[14px] figtree-font leading-relaxed mb-6 flex-grow">
                    {program.description}
                  </p>
                </div>

                {/* Bottom Section - Default State */}
                <div
                  className={`mt-auto ${
                    hoveredCard === program.id ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  } transition-opacity duration-300`}
                >
                  {/* Approvals */}
                  <div className="grid grid-cols-2 items-center lg:gap-4 gap-2 mb-4 border-t border-gray-200 pt-4">
                    <div className="flex w-full items-center gap-2 border border-dashed p-3 rounded-xl">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMG_PATH}${program.approvals[0].logo}`}
                        alt={program.approvals[0].name}
                        className="h-[30px] w-[30px] object-contain"
                      />
                      <div className="lg:text-[12px] text-[10px] font-semibold text-gray-700 figtree-font">
                        Approved by <span className="block text-(--color-ips-orange)">AICTE</span>
                      </div>
                    </div>
                    <div className="flex w-full items-center gap-2 border border-dashed rounded-3 p-3 rounded-xl">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMG_PATH}${program.approvals[1].logo}`}
                        alt={program.approvals[1].name}
                        className="h-[30px] w-[30px] object-contain"
                      />
                      <div className="lg:text-[12px] text-[10px] font-semibold text-gray-700 figtree-font">
                        Affiliated with
                        <span className="block text-(--color-ips-orange)"> RTU</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 justify-between gap-1">
                    <div className="flex items-center gap-1 text-[10px] text-gray-600 figtree-font">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FF6B00]" />
                        <span className="text-[#FF6B00] text-[10px] font-normal cursor-pointer hover:underline">
                          {program.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-[#FF6B00]" />
                      <span className="text-[#FF6B00] text-[10px] font-normal cursor-pointer hover:underline">
                        {program.eligibility}
                      </span>
                    </div>
                    <Link
                      href={program.link}
                      className="flex items-center justify-end gap-1 text-[#FF6B00] font-normal text-[12px] figtree-font hover:gap-2 transition-all duration-300"
                    >
                      <span>{program.buttonText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Hover Overlay - Covers Entire Card */}
              <div
                className={`absolute inset-0 bg-white rounded-xl p-6 flex flex-col transition-all duration-500 ${
                  hoveredCard === program.id
                    ? 'opacity-100 translate-y-0 pointer-events-auto z-30'
                    : 'opacity-0 translate-y-4 pointer-events-none z-20'
                }`}
              >
                <div className="grow">
                  <h3 className="text-[#FF6B00] font-bold text-[18px] md:text-[20px] figtree-font mb-3">
                    {program.hoverTitle}
                  </h3>
                  <ul className="space-y-2 mb-4">
                    {program.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-[10px] md:text-[12px] text-gray-600 figtree-font transition-all duration-300"
                        style={{
                          opacity: hoveredCard === program.id ? 1 : 0,
                          transform: hoveredCard === program.id ? 'translateX(0)' : 'translateX(-10px)',
                          transitionDelay: hoveredCard === program.id ? `${index * 50}ms` : '0ms',
                        }}
                      >
                        <span className="text-[#FF6B00] flex-shrink-0 mt-[-2px]">●</span>
                        <span className="leading-tight text-[14px] font-medium text-(--color-ips-steel)">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Section in Hover State */}
                <div className="mt-auto border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={program.link}
                      className="flex items-center gap-1 text-[#FF6B00] font-semibold text-[14px] figtree-font hover:gap-2 transition-all duration-300"
                    >
                      <span>{program.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
