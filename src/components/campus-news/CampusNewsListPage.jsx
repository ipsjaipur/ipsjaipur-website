'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Calendar, User, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import CommonBanner from '@/components/courses/CommonBanner';
import { getNews } from '@/_services/newsService';
import { cardImage } from '@/_utils/cloudinaryImage';

const CATEGORIES = [
  { label: 'All News', value: '' },
  { label: 'Placement News', value: 'Placement News' },
  { label: 'IPS News', value: 'IPS News' },
];

function NewsCard({ news, index }) {
  const publishedDate = news.publishedAt ? format(new Date(news.publishedAt), 'dd MMM yyyy') : '';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col"
    >
      <Link href={`/campus-news/${news.slug}`} className="block relative overflow-hidden h-52">
        {news.featuredImage?.url ? (
          <img
            src={cardImage(news.featuredImage.url)}
            alt={news.featuredImage.alt || news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2a3e61]/10 to-[#2a3e61]/20 flex items-center justify-center">
            <span className="text-[40px]">📰</span>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="bg-[#2a3e61] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {news.category}
          </span>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-[11px] text-[#77838f] mb-3">
          {publishedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {publishedDate}
            </span>
          )}
          {news.author && (
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {news.author}
            </span>
          )}
          {news.readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {news.readingTime} min
            </span>
          )}
        </div>

        <Link href={`/campus-news/${news.slug}`} className="block group/title mb-2">
          <h2 className="text-[16px] font-bold text-[#222222] group-hover/title:text-[#2a3e61] transition line-clamp-2 leading-snug">
            {news.title}
          </h2>
        </Link>

        {news.shortDescription && (
          <p className="text-[13px] text-[#77838f] leading-relaxed line-clamp-3 mb-4 flex-1">{news.shortDescription}</p>
        )}

        <Link
          href={`/campus-news/${news.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2a3e61] hover:gap-3 transition-all duration-200"
        >
          Read More →
        </Link>
      </div>
    </motion.article>
  );
}

export default function CampusNewsListPage() {
  const [news, setNews] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalDocs: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, activeCategory]);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getNews({ page, search: debouncedSearch, category: activeCategory });
      setNews(result.docs);
      setPagination({
        page: result.page,
        totalPages: result.totalPages,
        totalDocs: result.totalDocs,
      });
    } catch {
      /* fail silently */
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, activeCategory]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <>
      <CommonBanner pageTitle="Campus News" bgImageUrl="images/about/student-life.webp" position="object-center" />

      <section className="py-12 px-4  min-h-[60vh]">
        <div className="max-w-[1202px] mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-[28px] md:text-[36px] font-bold text-[#222222] figtree-font mb-3">
              Campus <span className="text-[#2a3e61]">News</span>
            </h1>
            <p className="text-[#77838f] text-[15px] max-w-xl mx-auto">
              Latest updates, placements, events and achievements
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-[#2a3e61] text-white shadow-md'
                    : 'bg-white text-[#2a3e61] border border-[#2a3e61]/30 hover:bg-[#2a3e61]/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="max-w-md mx-auto mb-10 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77838f]" />
            <input
              type="text"
              placeholder="Search news..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e2e8f0] bg-white text-[14px] text-[#222222] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#2a3e61]/30 focus:border-[#2a3e61] transition shadow-sm"
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden animate-pulse">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[40px] mb-4">📭</p>
              <h3 className="text-[18px] font-semibold text-[#222222] mb-2">
                {debouncedSearch || activeCategory ? 'No results found' : 'No news published yet'}
              </h3>
              <p className="text-[14px] text-[#77838f]">
                {debouncedSearch || activeCategory ? 'Try a different search or category' : 'Check back soon!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((n, i) => (
                <NewsCard key={n._id} news={n} index={i} />
              ))}
            </div>
          )}

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
