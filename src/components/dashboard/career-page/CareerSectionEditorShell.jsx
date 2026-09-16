'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, Loader2, Save, ExternalLink, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Shell that handles fetching, saving, and layout for a single
 * Career page section editor.
 *
 * Props:
 *  - sectionKey : 'banner' | 'intro' | 'requirements' | 'perks' | 'openings' | 'contact'
 *  - title      : string
 *  - description: string
 *  - children   : (data, setData, saving) => ReactNode
 */
export default function CareerSectionEditorShell({
  sectionKey,
  title,
  description,
  children,
}) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(`/api/career-content?section=${sectionKey}`, {
        credentials: 'include',
      });
      const json = await res.json();
      if (json.success) {
        setData(json.data || { section: sectionKey });
      } else {
        setError(json.message || 'Failed to load');
      }
    } catch (e) {
      setError(e.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }, [sectionKey]);

  useEffect(() => { load(); }, [load]);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    try {
      const res  = await fetch('/api/career-content', {
        method:      'PUT',
        credentials: 'include',
        headers:     { 'Content-Type': 'application/json' },
        body:        JSON.stringify({ ...data, section: sectionKey }),
      });
      const json = await res.json();
      if (json.success) {
        setData(json.data);
        toast.success('Section saved successfully');
      } else {
        toast.error(json.message || 'Save failed');
      }
    } catch (e) {
      toast.error(e.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-[860px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[12px] text-[#77838f] mb-4 flex-wrap">
        <Link href="/dashboard/page-content" className="hover:text-[#eb5905] transition">
          Page Content
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link
          href="/dashboard/page-content/career"
          className="hover:text-[#eb5905] transition"
        >
          Career Page
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-[#222] font-medium">{title}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[20px] font-bold text-[#222]">{title}</h1>
          {description && (
            <p className="text-[13px] text-[#77838f] mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="/career-ips-business-school"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#4a5568] border border-[#e2e8f0] rounded-lg px-3 py-2 hover:bg-[#f4f6f9] transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Live
          </a>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading || !data}
            className="inline-flex items-center gap-2 bg-[#eb5905] text-white text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-[#c94f05] transition disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Body */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#eb5905] animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-red-200 flex items-start gap-3 p-6">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[14px] font-semibold text-red-700">Failed to load section</p>
            <p className="text-[13px] text-red-500 mt-0.5">{error}</p>
            <button
              onClick={load}
              className="mt-3 text-[12px] font-semibold text-[#eb5905] hover:underline cursor-pointer"
            >
              Try again
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {children(data, setData, saving)}
        </div>
      )}
    </div>
  );
}
