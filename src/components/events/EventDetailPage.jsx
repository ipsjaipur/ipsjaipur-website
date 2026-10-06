'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import {
  Calendar,
  MapPin,
  Clock,
  Share2,
  User,
  ArrowLeft,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import CommonBanner from '@/components/courses/CommonBanner';
import { heroImage, cardImage, thumbImage } from '@/_utils/cloudinaryImage';
import parse from 'html-react-parser';

// ─── Gallery Lightbox ─────────────────────────────────────────────────────────
function GalleryLightbox({ images, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl leading-none"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[current]?.url}
          alt={images[current]?.alt || `Gallery image ${current + 1}`}
          className="w-full max-h-[80vh] object-contain rounded-lg"
        />
        <p className="text-center text-white/60 text-[13px] mt-3">
          {current + 1} / {images.length}
          {images[current]?.alt && <span> · {images[current].alt}</span>}
        </p>
      </div>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

// ─── Related Event Card ───────────────────────────────────────────────────────
function RelatedCard({ event }) {
  const dateLabel = event.eventDate ? format(new Date(event.eventDate), 'dd MMM yyyy') : null;
  return (
    <Link
      href={`/events/${event.slug}`}
      className="flex gap-3 p-3 rounded-lg border border-[#e2e8f0] hover:shadow-md transition group bg-white"
    >
      {event.featuredImage?.url ? (
        <img
          src={thumbImage(event.featuredImage.url)}
          alt={event.title}
          className="w-16 h-16 rounded object-cover shrink-0"
        />
      ) : (
        <div className="w-16 h-16 rounded shrink-0 bg-gradient-to-br from-[#2a3e61]/10 to-[#2a3e61]/20 flex items-center justify-center text-2xl">
          🎉
        </div>
      )}
      <div className="min-w-0">
        <h4 className="text-[13px] font-semibold text-[#222222] group-hover:text-[#2a3e61] transition line-clamp-2 leading-snug">
          {event.title}
        </h4>
        {dateLabel && (
          <p className="text-[11px] text-[#77838f] mt-1 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {dateLabel}
          </p>
        )}
      </div>
    </Link>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EventDetailPage({ event, related = [] }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const dateLabel = event.eventDate ? format(new Date(event.eventDate), 'dd MMMM yyyy') : null;
  const endDateLabel =
    event.eventEndDate && event.eventEndDate !== event.eventDate
      ? format(new Date(event.eventEndDate), 'dd MMMM yyyy')
      : null;

  const isUpcoming = event.eventStatus === 'upcoming';
  const galleryImages = (event.gallery || []).filter((g) => g?.url);

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.shortDescription || event.metaDescription,
    image: event.featuredImage?.url || event.ogImage,
    startDate: event.eventDate,
    endDate: event.eventEndDate || event.eventDate,
    location: {
      '@type': 'Place',
      name: event.location || 'IPS Business School, Jaipur',
      address: event.location || 'Jaipur, Rajasthan, India',
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizer || 'IPS Business School',
      url: 'https://www.ipsedu.in',
    },
    eventStatus: isUpcoming ? 'https://schema.org/EventScheduled' : 'https://schema.org/EventCompleted',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  };

  const bannerImageUrl = process.env.NEXT_PUBLIC_IMG_PATH + 'images/about/event-page-banner-img-2.webp';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />

      <CommonBanner pageTitle={event.title} normalFont bgImageUrl={bannerImageUrl} position="object-top" />
      <Breadcrumb pageName={event.title} detailPage={[{ slug: 'events', title: 'Events' }]} />

      <article className="py-10 px-4 min-h-screen">
        <div className="max-w-[1202px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── Main Content ── */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e2e8f0]"
              >
                {/* Featured image */}
                {event.featuredImage?.url && (
                  <div className="relative w-full overflow-hidden max-h-[484px]">
                    <img
                      src={heroImage(event.featuredImage.url)}
                      alt={event.featuredImage.alt || event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    {/* Status overlay */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full ${
                          isUpcoming ? 'bg-emerald-500 text-white' : 'bg-white/90 text-slate-700'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${isUpcoming ? 'bg-white animate-pulse' : 'bg-slate-400'}`}
                        />
                        {isUpcoming ? 'Upcoming' : 'Completed'}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-[16px] md:p-8 lg:p-10">
                  {/* Status badge (shown when no featured image) */}
                  {!event.featuredImage?.url && (
                    <div className="mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1 rounded-full ${
                          isUpcoming ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${isUpcoming ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}
                        />
                        {isUpcoming ? 'Upcoming' : 'Completed'}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-[20px] md:text-[30px] font-bold text-[#222222] leading-snug mb-5 font-rubik">
                    {event.title}
                  </h1>

                  {/* Short description */}
                  {event.shortDescription && (
                    <p className="text-[15px] text-[#4a5568] leading-relaxed mb-6 font-medium border-l-4 border-[#2a3e61] pl-4 bg-[#f8f9fa] py-3 rounded-r-lg">
                      {event.shortDescription}
                    </p>
                  )}

                  {/* Registration CTA for upcoming */}
                  {isUpcoming && event.registrationLink && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-[#2a3e61]/5 to-[#2a3e61]/10 rounded-xl border border-[#2a3e61]/20">
                      <p className="text-[14px] font-semibold text-[#222222] mb-2">Registration Open!</p>
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#eb5905] hover:bg-[#d44f04] text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg transition shadow-sm"
                      >
                        Register Now <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  {/* Main content */}
                  {event.content && (
                    <div className="blog-content prose prose-sm max-w-none mb-6">{parse(event.content)}</div>
                  )}

                  {/* Photo Gallery */}
                  {galleryImages.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-[#f4f6f9]">
                      <h2 className="text-[18px] font-bold text-[#222222] mb-4">Event Gallery</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {galleryImages.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setLightboxIndex(idx)}
                            className="relative overflow-hidden rounded-lg aspect-square group cursor-pointer"
                            aria-label={`View image ${idx + 1}`}
                          >
                            <img
                              src={cardImage(img.url)}
                              alt={img.alt || `Event photo ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                              <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                                ⊕
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              <div className="mt-6">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 text-[13px] text-[#77838f] hover:text-[#2a3e61] transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to all events
                </Link>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="space-y-6">
              {/* Quick info card */}
              <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
                <h3 className="text-[15px] font-bold text-[#222222] mb-4">Event Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#77838f]">Status</span>
                    <span
                      className={`font-semibold px-2.5 py-0.5 rounded-full text-[12px] ${
                        isUpcoming ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isUpcoming ? '🟢 Upcoming' : '✅ Completed'}
                    </span>
                  </div>
                  {dateLabel && (
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#77838f]">Date</span>
                      <span className="font-semibold text-[#222222] text-right">{dateLabel}</span>
                    </div>
                  )}
                  {endDateLabel && (
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#77838f]">End Date</span>
                      <span className="font-semibold text-[#222222]">{endDateLabel}</span>
                    </div>
                  )}
                  {event.eventTime && (
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#77838f]">Time</span>
                      <span className="font-semibold text-[#222222]">{event.eventTime}</span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-start justify-between text-[13px] gap-2">
                      <span className="text-[#77838f] shrink-0">Venue</span>
                      <span className="font-semibold text-[#222222] text-right">{event.location}</span>
                    </div>
                  )}
                  {event.organizer && (
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#77838f]">Organizer</span>
                      <span className="font-semibold text-[#222222]">{event.organizer}</span>
                    </div>
                  )}
                </div>

                {isUpcoming && event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 w-full bg-[#eb5905] hover:bg-[#d44f04] text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg transition"
                  >
                    Register Now <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Related events */}
              {related.length > 0 && (
                <div className="">
                  <h3 className="text-[15px] font-bold text-[#222222] mb-4">More Events</h3>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <RelatedCard key={r._id} event={r} />
                    ))}
                  </div>
                </div>
              )}

              {/* Admissions CTA */}
              <div className="bg-gradient-to-br from-[#eb5905] to-[#ff9e3d] rounded-xl p-6 text-white">
                <h3 className="text-[16px] font-bold mb-2">Admissions Open</h3>
                <p className="text-[13px] text-white/80 mb-4">MBA | BBA | BCA 2026–27</p>
                <a
                  href="https://admissions.ipsedu.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-[#eb5905] text-[13px] font-semibold px-5 py-2.5 rounded-lg transition hover:bg-white/90"
                >
                  Apply Now →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox images={galleryImages} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>

      <style jsx global>{`
        .blog-content h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 1.5rem 0 0.75rem;
          color: #222;
        }
        .blog-content h2 {
          font-size: 1.4rem;
          font-weight: 700;
          margin: 1.5rem 0 0.75rem;
          color: #222;
        }
        .blog-content h3 {
          font-size: 1.15rem;
          font-weight: 600;
          margin: 1.25rem 0 0.5rem;
          color: #222;
        }
        .blog-content p {
          margin: 0.75rem 0;
          line-height: 1.75;
          color: #4a5568;
          font-size: 15px;
        }
        .blog-content ul,
        .blog-content ol {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin: 0.35rem 0;
          line-height: 1.6;
          color: #4a5568;
          font-size: 15px;
        }
        .blog-content ul li {
          list-style-type: disc;
        }
        .blog-content ol li {
          list-style-type: decimal;
        }
        .blog-content strong {
          font-weight: 600;
          color: #222;
        }
        .blog-content em {
          font-style: italic;
        }
        .blog-content a {
          color: #2a3e61;
          text-decoration: underline;
        }
        .blog-content img {
          max-width: 100%;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        .blog-content blockquote {
          border-left: 4px solid #2a3e61;
          padding: 0.75rem 1rem;
          margin: 1rem 0;
          background: #f8f9fa;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 14px;
        }
        .blog-content th,
        .blog-content td {
          border: 1px solid #e2e8f0;
          padding: 0.5rem 0.75rem;
        }
        .blog-content th {
          background: #f4f6f9;
          font-weight: 600;
          color: #222;
        }
      `}</style>
    </>
  );
}
