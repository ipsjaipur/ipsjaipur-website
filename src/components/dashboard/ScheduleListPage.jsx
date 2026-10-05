'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  PlusCircle,
  Search,
  Trash2,
  Eye,
  EyeOff,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  RefreshCw,
  CalendarDays,
  Copy,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';

const STATUS_COLORS = {
  published: 'bg-green-50 text-green-700 border-green-200',
  draft: 'bg-amber-50 text-amber-700 border-amber-200',
};

function ScheduleListInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [docs, setDocs] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1, totalPages: 1, totalDocs: 0, hasNextPage: false, hasPrevPage: false,
  });
  const [counts, setCounts] = useState({ published: 0, draft: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '15',
        sort: '-createdAt',
        ...(statusFilter && { status: statusFilter }),
        ...(search && { search }),
      });
      const res = await fetch(`/api/schedules?${params}`);
      const data = await res.json();
      if (data.success) {
        setDocs(data.data.docs || []);
        setPagination({
          page: data.data.page,
          totalPages: data.data.totalPages,
          totalDocs: data.data.totalDocs,
          hasNextPage: data.data.hasNextPage,
          hasPrevPage: data.data.hasPrevPage,
        });
        setCounts({ published: data.data.publishedCount || 0, draft: data.data.draftCount || 0 });
      }
    } catch {
      toast.error('Failed to load schedules');
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Debounce search → reset to page 1
  useEffect(() => {
    const t = setTimeout(() => setPage(1), 400);
    return () => clearTimeout(t);
  }, [search]);

  const toggleStatus = async (doc) => {
    const newStatus = doc.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/schedules/${doc._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      toast.success(`Schedule ${newStatus === 'published' ? 'published' : 'unpublished'}`);
      fetchData();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const deleteOne = async (id) => {
    if (!confirm('Delete this schedule permanently?')) return;
    try {
      const res = await fetch(`/api/schedules/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Schedule deleted');
      fetchData();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const copyLink = (slug) => {
    const url = `${window.location.origin}/schedule/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied!');
  };

  const STATUS_TABS = [
    { label: 'All', value: '' },
    { label: `Published (${counts.published})`, value: 'published' },
    { label: `Drafts (${counts.draft})`, value: 'draft' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-[20px] font-bold text-[#222222] font-rubik flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-[#eb5905]" />
            Schedules
          </h1>
          <p className="text-[13px] text-[#77838f] mt-0.5">
            {pagination.totalDocs} total · {counts.published} published · {counts.draft} drafts
          </p>
        </div>
        <Link
          href="/dashboard/schedules/create"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#eb5905] hover:bg-[#d44f04] text-white text-[13px] font-semibold rounded-lg transition shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          New Schedule
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] mb-4">
        {/* Status tabs */}
        <div className="flex items-center gap-0 border-b border-[#e2e8f0] px-4">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => { setStatusFilter(tab.value); setPage(1); }}
              className={cn(
                'px-4 py-3 text-[13px] font-medium border-b-2 transition-colors cursor-pointer',
                statusFilter === tab.value
                  ? 'border-[#eb5905] text-[#eb5905]'
                  : 'border-transparent text-[#77838f] hover:text-[#222222]',
              )}
            >
              {tab.label}
            </button>
          ))}
          <div className="ml-auto">
            <button onClick={fetchData} className="p-2 text-[#77838f] hover:text-[#222222] cursor-pointer" title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77838f]" />
            <input
              type="text"
              placeholder="Search schedules..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#e2e8f0] text-[13px] text-[#222222] bg-[#f8f9fa] placeholder:text-[#bbb] focus:outline-none focus:ring-2 focus:ring-[#eb5905]/30 focus:border-[#eb5905] transition"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-6 h-6 text-[#eb5905] animate-spin" />
          </div>
        ) : docs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <AlertCircle className="w-8 h-8 text-[#bbb]" />
            <p className="text-[14px] text-[#77838f]">No schedules found</p>
            <Link
              href="/dashboard/schedules/create"
              className="text-[13px] text-[#eb5905] font-medium hover:underline"
            >
              Create your first schedule
            </Link>
          </div>
        ) : (
          <AnimatePresence>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[#e2e8f0] bg-[#f8f9fa]">
                  <th className="text-left px-5 py-3 font-semibold text-[#4a5568]">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#4a5568] hidden sm:table-cell">Slug</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#4a5568] hidden md:table-cell">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#4a5568] hidden lg:table-cell">Created</th>
                  <th className="px-4 py-3 text-right font-semibold text-[#4a5568]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {docs.map((doc, i) => (
                  <motion.tr
                    key={doc._id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-[#f4f6f9] last:border-0 hover:bg-[#f8f9fa] transition group"
                  >
                    {/* Title */}
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-[#222222] line-clamp-1">{doc.title}</p>
                    </td>
                    {/* Slug */}
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <code className="text-[11px] bg-[#f4f6f9] px-2 py-0.5 rounded text-[#4a5568] font-mono">
                        {doc.slug}
                      </code>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded border', STATUS_COLORS[doc.status])}>
                        {doc.status}
                      </span>
                    </td>
                    {/* Created */}
                    <td className="px-4 py-3.5 text-[#77838f] hidden lg:table-cell">
                      {formatDistanceToNow(new Date(doc.createdAt), { addSuffix: true })}
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        {/* Copy link */}
                        <button
                          onClick={() => copyLink(doc.slug)}
                          title="Copy student link"
                          className="p-1.5 rounded hover:bg-[#f4f6f9] text-[#77838f] hover:text-[#222222] transition cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        {/* Toggle status */}
                        <button
                          onClick={() => toggleStatus(doc)}
                          title={doc.status === 'published' ? 'Unpublish' : 'Publish'}
                          className="p-1.5 rounded hover:bg-[#f4f6f9] text-[#77838f] hover:text-[#222222] transition cursor-pointer"
                        >
                          {doc.status === 'published' ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                        {/* Edit */}
                        <Link
                          href={`/dashboard/schedules/${doc._id}/edit`}
                          title="Edit"
                          className="p-1.5 rounded hover:bg-[#f4f6f9] text-[#77838f] hover:text-[#222222] transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        {/* Delete */}
                        <button
                          onClick={() => deleteOne(doc._id)}
                          title="Delete"
                          className="p-1.5 rounded hover:bg-red-50 text-[#77838f] hover:text-red-500 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </AnimatePresence>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-1">
          <p className="text-[13px] text-[#77838f]">
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={!pagination.hasPrevPage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-[13px] text-[#4a5568] hover:bg-[#f4f6f9] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination.hasNextPage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-[13px] text-[#4a5568] hover:bg-[#f4f6f9] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ScheduleListPage() {
  return (
    <Suspense>
      <ScheduleListInner />
    </Suspense>
  );
}
