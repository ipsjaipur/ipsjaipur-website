'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, MessageCircle } from 'lucide-react';
import CommonBanner from '../courses/CommonBanner';
import Breadcrumb from '../common/Breadcrumb';
import { cloudinaryImage } from '@/_utils/cloudinaryImage';

// ── Static social icon definitions — only href comes from DB ─────────────────
const SOCIAL_ICONS = {
  facebook: {
    label: 'Facebook',
    hoverBg: 'hover:bg-[#1877f2]',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5">
        <path d="M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z" />
      </svg>
    ),
  },
  twitter: {
    label: 'Twitter',
    hoverBg: 'hover:bg-[#1da1f2]',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5">
        <path d="M523.4 215.7C523.7 220.2 523.7 224.8 523.7 229.3C523.7 368 418.1 527.9 225.1 527.9C165.6 527.9 110.4 510.7 64 480.8C72.4 481.8 80.6 482.1 89.3 482.1C138.4 482.1 183.5 465.5 219.6 437.3C173.5 436.3 134.8 406.1 121.5 364.5C128 365.5 134.5 366.1 141.3 366.1C150.7 366.1 160.1 364.8 168.9 362.5C120.8 352.8 84.8 310.5 84.8 259.5L84.8 258.2C98.8 266 115 270.9 132.2 271.5C103.9 252.7 85.4 220.5 85.4 184.1C85.4 164.6 90.6 146.7 99.7 131.1C151.4 194.8 229 236.4 316.1 240.9C314.5 233.1 313.5 225 313.5 216.9C313.5 159.1 360.3 112 418.4 112C448.6 112 475.9 124.7 495.1 145.1C518.8 140.6 541.6 131.8 561.7 119.8C553.9 144.2 537.3 164.6 515.6 177.6C536.7 175.3 557.2 169.5 576 161.4C561.7 182.2 543.8 200.7 523.4 215.7z" />
      </svg>
    ),
  },
  linkedin: {
    label: 'LinkedIn',
    hoverBg: 'hover:bg-[#0077b5]',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5">
        <path d="M196.3 512L103.4 512L103.4 212.9L196.3 212.9L196.3 512zM149.8 172.1C120.1 172.1 96 147.5 96 117.8C96 103.5 101.7 89.9 111.8 79.8C121.9 69.7 135.6 64 149.8 64C164 64 177.7 69.7 187.8 79.8C197.9 89.9 203.6 103.6 203.6 117.8C203.6 147.5 179.5 172.1 149.8 172.1zM543.9 512L451.2 512L451.2 366.4C451.2 331.7 450.5 287.2 402.9 287.2C354.6 287.2 347.2 324.9 347.2 363.9L347.2 512L254.4 512L254.4 212.9L343.5 212.9L343.5 253.7L344.8 253.7C357.2 230.2 387.5 205.4 432.7 205.4C526.7 205.4 544 267.3 544 347.7L544 512L543.9 512z" />
      </svg>
    ),
  },
  instagram: {
    label: 'Instagram',
    hoverBg: 'hover:bg-gradient-to-br hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045]',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5">
        <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
      </svg>
    ),
  },
};

export default function MainContact({ pageContent = {} }) {
  // ── Pull sections ──────────────────────────────────────────────────────────
  const bannerData = pageContent?.banner || {};
  const infoData = pageContent?.info || {};

  // ── Banner ─────────────────────────────────────────────────────────────────
  const bannerTitle = bannerData.bannerTitle || 'Contact Us';
  const bannerPosition = bannerData.bannerPosition || 'object-center';
  const bannerImageUrl = cloudinaryImage(bannerData.bannerImageUrl || '', 'f_auto,q_auto,w_1920');

  // ── Info ───────────────────────────────────────────────────────────────────
  const cardTitle = infoData.cardTitle || 'Contact Us';
  const cardSubtitle = infoData.cardSubtitle || 'IPS COLLEGE JAIPUR';

  const addresses = infoData.addresses ? [...infoData.addresses].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : [];

  const phoneLabel = infoData.phoneLabel || 'Phone';
  const phoneNumber = infoData.phoneNumber || '';
  const phoneHref = infoData.phoneHref || '#';

  const whatsappLabel = infoData.whatsappLabel || 'WhatsApp';
  const whatsappNumber = infoData.whatsappNumber || '';
  const whatsappHref = infoData.whatsappHref || '#';

  const emailLabel = infoData.emailLabel || 'Email';
  const emailAddress = infoData.emailAddress || '';
  const emailHref = infoData.emailHref || '#';

  const websiteLabel = infoData.websiteLabel || 'Website';
  const websiteDisplay = infoData.websiteDisplay || '';
  const websiteHref = infoData.websiteHref || '#';

  const socialHeading = infoData.socialHeading || 'Follow Us';
  // socialLinks from DB: [{ name: 'facebook', href: '…', order: 0 }, …]
  const socialLinks = infoData.socialLinks
    ? [...infoData.socialLinks].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : [];

  const streetViewEmbedUrl = infoData.streetViewEmbedUrl || '';
  const streetViewTitle = infoData.streetViewTitle || 'IPS Business School Street View';
  const locationEmbedUrl = infoData.locationEmbedUrl || '';
  const locationMapTitle = infoData.locationMapTitle || 'IPS Business School Location';

  // ── Animation ──────────────────────────────────────────────────────────────
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] },
    }),
  };

  return (
    <>
      <CommonBanner pageTitle={bannerTitle} bgImageUrl={bannerImageUrl} position={bannerPosition} />

      <div className="flex flex-col gap-2 justify-center">
        <Breadcrumb pageName={bannerTitle} />

        <section className="max-w-[1400px] mx-auto px-[16px] w-full md:pt-[24px] pb-[64px]">
          <div className="md:mx-0 mx-[16px]">
            {/* Main Contact Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Contact Info Card — col-span-2 */}
              <motion.div
                custom={0.1}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="border border-[#e9e9e9] bg-white rounded-lg overflow-hidden shadow-md col-span-2"
              >
                <div className="bg-[#e87816] text-white p-6">
                  <h2 className="text-[24px] md:text-[28px] font-rubik font-bold mb-2">{cardTitle}</h2>
                  <p className="text-[18px] md:text-[20px] font-rubik font-semibold">{cardSubtitle}</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Addresses */}
                  {addresses.length > 0 && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#f5f5f5] to-[#e9e9e9] rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#505050]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[16px] font-rubik font-semibold text-[#111111] mb-2">Campus Locations</h3>
                        <div className="space-y-3">
                          {addresses.map((addr, i) => (
                            <p key={addr._id || i} className="text-[14px] text-[#505050] font-rubik leading-[1.6]">
                              {addr.text}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Phone / WhatsApp / Email / Website */}
                  <div className="grid grid-cols-2 gap-6">
                    {phoneNumber && (
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#f5f5f5] to-[#e9e9e9] rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-[#505050]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-[16px] font-rubik font-semibold text-[#111111] mb-2">{phoneLabel}</h3>
                          <a
                            href={phoneHref}
                            className="text-[14px] text-[#505050] hover:text-[#e87816] font-rubik transition-colors duration-300 block"
                          >
                            {phoneNumber}
                          </a>
                        </div>
                      </div>
                    )}

                    {whatsappNumber && (
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#f5f5f5] to-[#e9e9e9] rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-[#505050]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-[16px] font-rubik font-semibold text-[#111111] mb-2">{whatsappLabel}</h3>
                          <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[14px] text-[#505050] hover:text-[#e87816] font-rubik transition-colors duration-300 block"
                          >
                            {whatsappNumber}
                          </a>
                        </div>
                      </div>
                    )}

                    {emailAddress && (
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#f5f5f5] to-[#e9e9e9] rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5 text-[#505050]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-[16px] font-rubik font-semibold text-[#111111] mb-2">{emailLabel}</h3>
                          <a
                            href={emailHref}
                            className="text-[14px] text-[#505050] hover:text-[#e87816] font-rubik transition-colors duration-300 block"
                          >
                            {emailAddress}
                          </a>
                        </div>
                      </div>
                    )}

                    {websiteDisplay && (
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#f5f5f5] to-[#e9e9e9] rounded-lg flex items-center justify-center">
                          <Globe className="w-5 h-5 text-[#505050]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-[16px] font-rubik font-semibold text-[#111111] mb-2">{websiteLabel}</h3>
                          <a
                            href={websiteHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[14px] text-[#505050] hover:text-[#e87816] font-rubik transition-colors duration-300 block"
                          >
                            {websiteDisplay}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Social Links — icons are static; only href comes from DB */}
                  {socialLinks.length > 0 && (
                    <div className="pt-4 border-t border-[#e9e9e9]">
                      <h3 className="text-[16px] font-rubik font-semibold text-[#111111] mb-4">{socialHeading}</h3>
                      <div className="flex flex-wrap items-center gap-3">
                        {socialLinks.map((social, index) => {
                          const icon = SOCIAL_ICONS[social.name];
                          if (!icon) return null;
                          return (
                            <motion.a
                              key={social._id || index}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`group w-10 h-10 rounded-full border-2 border-[#e9e9e9] flex items-center justify-center bg-white ${icon.hoverBg} hover:border-transparent transition-all duration-300`}
                              whileHover={{ y: -3, scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              aria-label={icon.label}
                            >
                              <div className="fill-[#505050] group-hover:fill-white transition-colors duration-300">
                                {icon.svg}
                              </div>
                            </motion.a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Street View Map */}
              {streetViewEmbedUrl && (
                <motion.div
                  custom={0.2}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="border border-[#e9e9e9] bg-white rounded-lg overflow-hidden shadow-md h-full min-h-[450px]"
                >
                  <iframe
                    src={streetViewEmbedUrl}
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={streetViewTitle}
                  />
                </motion.div>
              )}
            </div>

            {/* Location Map */}
            {locationEmbedUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="border border-[#e9e9e9] bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative w-full h-[350px] md:h-[360px]">
                  <iframe
                    src={locationEmbedUrl}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full border-0"
                    title={locationMapTitle}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
