'use client';
import React from 'react';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { cloudinaryImage } from '@/_utils/cloudinaryImage';

export default function PlacementUpdates({ data, coordinatorData }) {
  const rawUpdates =
    data?.placementUpdates?.length > 0
      ? [...data.placementUpdates].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : [];

  // Hide section if no student data
  if (rawUpdates.length === 0) return null;

  const heading = data?.updatesHeading || 'PLACEMENT UPDATES';

  const placementUpdates = rawUpdates.map((s) => ({
    ...s,
    image: cloudinaryImage(s.image, 'f_auto,q_auto,w_400'),
  }));

  const coord = coordinatorData?.coordinator || {};
  const coordName = coord.name || '';
  const coordPhone1 = coord.phone1 || '';
  const coordPhone2 = coord.phone2 || '';
  const coordEmail1 = coord.email1 || '';
  const coordEmail2 = coord.email2 || '';
  const hasCoord = !!(coordName || coordPhone1 || coordEmail1);

  // Split heading for orange highlight on last word "UPDATES"
  const headingUpper = heading.toUpperCase();
  const lastSpace = headingUpper.lastIndexOf(' ');
  const headingStart = lastSpace > -1 ? heading.slice(0, lastSpace + 1) : '';
  const headingEnd = lastSpace > -1 ? heading.slice(lastSpace + 1) : heading;

  return (
    <section className="px-[16px] py-[64px] bg-linear-to-b from-white to-gray-50">
      <motion.div className="w-full max-w-330 mx-auto relative">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 lg:mb-12"
        >
          <h2 className="text-gray-900 font-bold rubik-fonts text-[28px] md:text-[32px] lg:text-[40px] lg:mb-4 mb-2">
            {headingStart}
            <span className="text-[#FF9E3D]">{headingEnd}</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-1 bg-[#FF9E3D] mx-auto rounded-full"
          />
        </motion.div>

        {/* Coordinator Marquee — only if coordinator data exists */}
        {hasCoord && (
          <motion.div className="mb-8">
            <Marquee gradient={false} speed={50} pauseOnHover={true}>
              <div className="flex pl-20 items-center gap-8 text-[14px] md:text-[16px] font-normal text-gray-800 rubik-fonts">
                {coordName && (
                  <span>
                    <strong>Placement Coordinator Contact Details: {coordName} :</strong>{' '}
                    {coordPhone1 && (
                      <a
                        href={`tel:${coordPhone1.replace(/[\s+]/g, '')}`}
                        className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors"
                      >
                        {coordPhone1}
                      </a>
                    )}
                    {coordPhone2 && (
                      <>
                        {' '}
                        |{' '}
                        <a
                          href={`tel:${coordPhone2.replace(/[\s+]/g, '')}`}
                          className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors"
                        >
                          {coordPhone2}
                        </a>
                      </>
                    )}
                  </span>
                )}
                {(coordEmail1 || coordEmail2) && (
                  <>
                    <span className="mx-4 text-[#FF6B00]">•</span>
                    <span>
                      For Placements send your Queries to{' '}
                      {coordEmail1 && (
                        <a
                          href={`mailto:${coordEmail1}`}
                          className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors"
                        >
                          {coordEmail1}
                        </a>
                      )}
                      {coordEmail2 && (
                        <>
                          {' '}
                          or{' '}
                          <a
                            href={`mailto:${coordEmail2}`}
                            className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors"
                          >
                            {coordEmail2}
                          </a>
                        </>
                      )}
                    </span>
                  </>
                )}
              </div>
            </Marquee>
          </motion.div>
        )}

        {/* Placement Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          {placementUpdates.map((student, index) => (
            <motion.div
              key={student?._id || index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: (index % 4) * 0.05 }}
              className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 border border-gray-100 shadow-md hover:shadow-xl"
            >
              <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                <img
                  src={student?.image}
                  alt={student?.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                  loading="lazy"
                />
              </div>
              <div className="p-3 md:p-4 text-center">
                <h3 className="text-gray-900 font-bold text-[14px] md:text-[16px] lg:text-[18px] mb-1 rubik-fonts line-clamp-1">
                  {student?.name}
                </h3>
                <p className="text-[#FF6B00] font-medium text-[12px] md:text-[14px] rubik-fonts line-clamp-2">
                  Placed at {student?.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
