'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Search,
  Edit2,
  Trash2,
  RefreshCw,
  Loader2,
  AlertCircle,
  Globe,
  CheckCircle,
  XCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipsedu.in';

export default function SeoListPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalDocs: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // ── Fetch list ────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '50',
        ...(search && { search }),
      });
      const res = await fetch(`/api/metadetails?${params}`);
      const data = await res.json();
      if (data.success) {
        setDocs(data.data.docs || []);
        setPagination({
          totalDocs: data.data.totalDocs,
          totalPages: data.data.totalPages,
          hasNextPage: data.data.hasNextPage,
          hasPrevPage: data.data.hasPrevPage,
        });
      }
    } catch {
      toast.error('Failed to load SEO records');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setPage(1), 400);
    return () => clearTimeout(t);
  }, [search]);

  // ── Toggle isActive ───────────────────────────────────────────────────────
  const toggleActive = async (doc) => {
    try {
      const res = await fetch(`/api/metadetails/${doc._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !doc.isActive }),
      });
      if (!res.ok) throw new Error();
      toast.success(doc.isActive ? 'Record disabled' : 'Record enabled');
      fetchData();
    } catch {
      toast.error('Failed to update record');
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const deleteRecord = async (id, name) => {
    if (!confirm(`Delete SEO record for "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/metadetails/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('SEO record deleted');
      fetchData();
    } catch {
      toast.error('Failed to delete record');
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-[20px] font-bold text-[#222222] font-rubik flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#eb5905]" />
            SEO Management
          </h1>
          <p className="text-[13px] text-[#77838f] mt-0.5">
            {pagination.totalDocs} &nbsp;pages · Manage meta titles, descriptions, keywords &amp; canonical URLs
          </p>
        </div>
        <Link
          href="/dashboard/seo/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#eb5905] hover:bg-[#d44f04] text-white text-[13px] font-semibold rounded-lg transition shadow-sm"
        >
          + Add Page SEO
        </Link>
      </div>

      {/* Search + refresh bar */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] mb-4 p-3 flex items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#77838f]" />
          <input
            type="text"
            placeholder="Search pages by name, slug, title or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-lg border border-[#e2e8f0] text-[13px] text-[#222222] bg-[#f8f9fa] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#eb5905]/30 focus:border-[#eb5905] transition"
          />
        </div>
        <button
          onClick={fetchData}
          className="p-2 rounded-lg border border-[#e2e8f0] text-[#77838f] hover:bg-[#f4f6f9] transition cursor-pointer"
          title="Refresh"
        >
          <RefreshCw className={cn('w-3.5 h-3.5', loading && 'animate-spin')} />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-6 h-6 text-[#eb5905] animate-spin" />
            <p className="text-[13px] text-[#77838f]">Loading SEO records…</p>
          </div>
        ) : docs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <AlertCircle className="w-8 h-8 text-[#e2e8f0]" />
            <p className="text-[14px] font-medium text-[#222222]">No SEO records found</p>
            <p className="text-[13px] text-[#77838f]">
              {search ? 'Try clearing your search.' : 'Click "Seed Missing Pages" to populate from defaults.'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#f4f6f9] bg-[#f8f9fa]">
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#77838f] uppercase tracking-wide w-44">
                      Page
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#77838f] uppercase tracking-wide">
                      Meta Title
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#77838f] uppercase tracking-wide w-32">
                      Robots
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#77838f] uppercase tracking-wide w-24">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-[11px] font-semibold text-[#77838f] uppercase tracking-wide w-32">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {docs.map((doc) => (
                      <motion.tr
                        key={doc._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-[#f4f6f9] last:border-0 hover:bg-[#f8f9fa] transition"
                      >
                        {/* Page name + slug */}
                        <td className="px-4 py-3">
                          <p className="text-[13px] font-semibold text-[#222222] truncate max-w-[160px]">
                            {doc.pageName}
                          </p>
                          <p className="text-[11px] text-[#77838f] mt-0.5 font-mono truncate max-w-[160px]">
                            /{doc.pageSlug === '/' ? '' : doc.pageSlug}
                          </p>
                        </td>

                        {/* Meta title + description */}
                        <td className="px-4 py-3">
                          <p className="text-[13px] text-[#222222] line-clamp-1">{doc.metaTitle}</p>
                          <p className="text-[11px] text-[#77838f] line-clamp-1 mt-0.5">{doc.metaDescription}</p>
                        </td>

                        {/* Robots */}
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              'text-[11px] font-medium px-2 py-0.5 rounded-full border',
                              doc.robots === 'index, follow'
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200',
                            )}
                          >
                            {doc.robots || 'index, follow'}
                          </span>
                        </td>

                        {/* Active badge */}
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleActive(doc)}
                            title={doc.isActive ? 'Click to disable' : 'Click to enable'}
                            className="cursor-pointer"
                          >
                            {doc.isActive ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                                <CheckCircle className="w-3 h-3" /> Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                                <XCircle className="w-3 h-3" /> Inactive
                              </span>
                            )}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <a
                              href={`${SITE_URL}/${doc.pageSlug === '/' ? '' : doc.pageSlug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded hover:bg-[#f4f6f9] text-[#77838f] hover:text-[#222222] transition"
                              title="View live page"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <Link
                              href={`/dashboard/seo/${doc._id}/edit`}
                              className="p-1.5 rounded hover:bg-[#f4f6f9] text-[#77838f] hover:text-[#eb5905] transition"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => deleteRecord(doc._id, doc.pageName)}
                              className="p-1.5 rounded hover:bg-red-50 text-[#77838f] hover:text-red-500 transition cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-[#f4f6f9]">
              {docs.map((doc) => (
                <div key={doc._id} className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-[#222222] truncate">{doc.pageName}</p>
                      <p className="text-[11px] text-[#77838f] font-mono">
                        /{doc.pageSlug === '/' ? '' : doc.pageSlug}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Link
                        href={`/dashboard/seo/${doc._id}/edit`}
                        className="p-1.5 text-[#77838f] hover:text-[#eb5905]"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => deleteRecord(doc._id, doc.pageName)}
                        className="p-1.5 text-[#77838f] hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#222222] line-clamp-1">{doc.metaTitle}</p>
                  <p className="text-[11px] text-[#77838f] line-clamp-2 mt-0.5">{doc.metaDescription}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => toggleActive(doc)} className="cursor-pointer">
                      {doc.isActive ? (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                          Inactive
                        </span>
                      )}
                    </button>
                    <span className="text-[10px] text-[#77838f]">{doc.robots}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[12px] text-[#77838f]">
            Page {page} of {pagination.totalPages} · {pagination.totalDocs} records
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!pagination.hasPrevPage || loading}
              className="p-2 rounded-lg border border-[#e2e8f0] text-[#77838f] hover:bg-[#f4f6f9] transition disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={!pagination.hasNextPage || loading}
              className="p-2 rounded-lg border border-[#e2e8f0] text-[#77838f] hover:bg-[#f4f6f9] transition disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
