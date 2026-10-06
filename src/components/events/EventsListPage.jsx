'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import CommonBanner from '@/components/courses/CommonBanner';
import { getEvents } from '@/_services/eventService';
import { cardImage } from '@/_utils/cloudinaryImage';

function EventStatusBadge({ eventStatus }) {
  const isUpcoming = eventStatus === 'upcoming';
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
        isUpcoming
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : 'bg-slate-100 text-slate-600 border-slate-200'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isUpcoming ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
      {isUpcoming ? 'Upcoming' : 'Completed'}
    </span>
  );
}

function EventCard({ event, index }) {
  const dateLabel = event.eventDate ? format(new Date(event.eventDate), 'dd MMM yyyy') : null;
  const endDateLabel =
    event.eventEndDate && event.eventEndDate !== event.eventDate
      ? format(new Date(event.eventEndDate), 'dd MMM yyyy')
      : null;
  const isUpcoming = event.eventStatus === 'upcoming';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col"
    >
      {/* Image */}
      <Link href={`/events/${event.slug}`} className="block relative overflow-hidden h-52 shrink-0">
        {event.featuredImage?.url ? (
          <img
            src={cardImage(event.featuredImage.url)}
            alt={event.featuredImage.alt || event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2a3e61]/10 to-[#2a3e61]/20 flex items-center justify-center">
            <span className="text-[48px]">🎉</span>
          </div>
        )}

        {/* Date badge top-left */}
        {dateLabel && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-sm text-center min-w-[52px]">
            <p className="text-[18px] font-bold text-[#2a3e61] leading-none">
              {format(new Date(event.eventDate), 'dd')}
            </p>
            <p className="text-[10px] font-semibold text-[#77838f] uppercase tracking-wide">
              {format(new Date(event.eventDate), 'MMM')}
            </p>
          </div>
        )}

        {/* Status badge top-right */}
        <div className="absolute top-3 right-3">
          <EventStatusBadge eventStatus={event.eventStatus} />
        </div>
      </Link>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <Link href={`/events/${event.slug}`} className="block group/title mb-3">
          <h2 className="text-[16px] font-bold text-[#222222] group-hover/title:text-[#2a3e61] transition line-clamp-2 leading-snug">
            {event.title}
          </h2>
        </Link>

        {/* Meta info */}
        <div className="space-y-1.5 mb-3">
          {dateLabel && (
            <div className="flex items-center gap-1.5 text-[12px] text-[#77838f]">
              <Calendar className="w-3.5 h-3.5 shrink-0 text-[#2a3e61]" />
              <span>
                {dateLabel}
                {endDateLabel ? ` – ${endDateLabel}` : ''}
              </span>
            </div>
          )}
          {event.eventTime && (
            <div className="flex items-center gap-1.5 text-[12px] text-[#77838f]">
              <Clock className="w-3.5 h-3.5 shrink-0 text-[#2a3e61]" />
              <span>{event.eventTime}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-1.5 text-[12px] text-[#77838f]">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#2a3e61]" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
        </div>

        {/* Short description */}
        {event.shortDescription && (
          <p className="text-[13px] text-[#77838f] leading-relaxed line-clamp-2 mb-4 flex-1">
            {event.shortDescription}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2a3e61] hover:gap-3 transition-all duration-200"
          >
            {isUpcoming ? 'View Details →' : 'Read Recap →'}
          </Link>
          {isUpcoming && event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[12px] font-semibold text-white bg-[#eb5905] hover:bg-[#d44f04] px-3 py-1.5 rounded-lg transition shrink-0"
            >
              Register
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function EventsListPage() {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalDocs: 0 });
  const [counts, setCounts] = useState({ upcoming: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [activeEventStatus, setActiveEventStatus] = useState('');

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, activeEventStatus]);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getEvents({
        page,
        search: debouncedSearch,
        eventStatus: activeEventStatus,
      });
      setEvents(result.docs);
      setPagination({
        page: result.page,
        totalPages: result.totalPages,
        totalDocs: result.totalDocs,
      });
      setCounts({
        upcoming: result.upcomingCount,
        completed: result.completedCount,
      });
    } catch {
      /* fail silently */
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, activeEventStatus]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const bannerImageUrl = process.env.NEXT_PUBLIC_IMG_PATH + 'images/about/event-page-banner-img-2.webp';

  const upcomingEvents = events.filter((e) => e.eventStatus === 'upcoming');
  const completedEvents = events.filter((e) => e.eventStatus === 'completed');
  const showSplit = !activeEventStatus && upcomingEvents.length > 0 && completedEvents.length > 0;

  return (
    <>
      <CommonBanner pageTitle="Events & Activities" bgImageUrl={bannerImageUrl} position="object-top" />

      <section className="py-12 px-4 min-h-[60vh]">
        <div className="max-w-[1202px] mx-auto">
          {/* Section heading */}
          <div className="text-center mb-10">
            <h1 className="text-[28px] md:text-[36px] font-bold text-[#222222] figtree-font mb-3">
              Campus <span className="text-[#2a3e61]">Events</span>
            </h1>
            <p className="text-[#77838f] text-[15px] max-w-xl mx-auto">
              Workshops, seminars, cultural celebrations and everything that makes IPS come alive
            </p>
          </div>

          {/* Upcoming / Completed toggle */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { label: `All Events`, value: '' },
              { label: `Upcoming${counts.upcoming ? ` (${counts.upcoming})` : ''}`, value: 'upcoming' },
              { label: `Completed${counts.completed ? ` (${counts.completed})` : ''}`, value: 'completed' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveEventStatus(tab.value)}
                className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                  activeEventStatus === tab.value
                    ? 'bg-[#2a3e61] text-white shadow-md'
                    : 'bg-white text-[#2a3e61] border border-[#2a3e61]/30 hover:bg-[#2a3e61]/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category tabs — removed, only status toggle is shown */}

          {/* Search */}
          <div className="max-w-md mx-auto mb-10 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77838f]" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e2e8f0] bg-white text-[14px] text-[#222222] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#2a3e61]/30 focus:border-[#2a3e61] transition shadow-sm"
            />
          </div>

          {/* Content */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden animate-pulse">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[48px] mb-4">📅</p>
              <h3 className="text-[18px] font-semibold text-[#222222] mb-2">
                {debouncedSearch || activeEventStatus ? 'No results found' : 'No events published yet'}
              </h3>
              <p className="text-[14px] text-[#77838f]">
                {debouncedSearch || activeEventStatus
                  ? 'Try a different search or filter'
                  : 'Check back soon for upcoming events!'}
              </p>
            </div>
          ) : showSplit ? (
            <>
              {/* Upcoming section */}
              {upcomingEvents.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <h2 className="text-[20px] font-bold text-[#222222]">Upcoming Events</h2>
                    <span className="text-[13px] text-[#77838f]">({upcomingEvents.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((e, i) => (
                      <EventCard key={e._id} event={e} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-[#e2e8f0]" />
                <span className="text-[13px] font-semibold text-[#77838f] px-3">Past Events</span>
                <div className="flex-1 h-px bg-[#e2e8f0]" />
              </div>

              {/* Completed section */}
              {completedEvents.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedEvents.map((e, i) => (
                    <EventCard key={e._id} event={e} index={i} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((e, i) => (
                <EventCard key={e._id} event={e} index={i} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-[#e2e8f0] bg-white text-[#77838f] hover:bg-[#f4f6f9] transition disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-[13px] font-medium transition ${
                    page === p
                      ? 'bg-[#2a3e61] text-white shadow-sm'
                      : 'border border-[#e2e8f0] bg-white text-[#77838f] hover:bg-[#f4f6f9]'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page === pagination.totalPages}
                className="p-2 rounded-lg border border-[#e2e8f0] bg-white text-[#77838f] hover:bg-[#f4f6f9] transition disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
