'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Image,
  FileText,
  Table2,
  Loader2,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  GitCompare,
} from 'lucide-react';
import toast from 'react-hot-toast';

const BASE = '/dashboard/page-content/mba-vs-pgdm';

const SECTIONS = [
  {
    key:         'banner',
    label:       'Banner',
    description: 'Hero banner image, page title, and image focal position',
    icon:        Image,
    color:       '#eb5905',
  },
  {
    key:         'content',
    label:       'Page Content',
    description: 'Main heading, intro text, approval cards (AICTE & RTU), and the IPS Hybrid Solution CTA card',
    icon:        FileText,
    color:       '#8B5CF6',
  },
  {
    key:         'comparison',
    label:       'Comparison Matrix & Features',
    description: 'Comparison table rows (University MBA vs PGDM vs IPS Hybrid) and the 3 feature cards below',
    icon:        Table2,
    color:       '#0EA5E9',
  },
];

export default function MbaVsPgdmPageSectionsPage() {
  const [status,  setStatus]  = useState({});
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  async function fetchStatus() {
    setLoading(true);
    try {
      const res  = await fetch('/api/mba-vs-pgdm-content', { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        const map = {};
        for (const key of SECTIONS.map((s) => s.key)) {
          map[key] = data.data[key] ? 'seeded' : 'empty';
        }
        setStatus(map);
      }
    } catch {
      toast.error('Failed to load section status');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchStatus(); }, []);

  async function handleSeed(force = false) {
    if (
      force &&
      !window.confirm(
        'This will OVERWRITE all MBA vs PGDM page sections with the original static defaults. Are you sure?'
      )
    )
      return;

    setSeeding(true);
    try {
      const res  = await fetch(
        `/api/mba-vs-pgdm-content/seed${force ? '?force=true' : ''}`,
        { method: 'POST', credentials: 'include' }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(force ? 'All sections reset to defaults' : 'Missing sections seeded successfully');
        fetchStatus();
      } else {
        toast.error(data.message || 'Seed failed');
      }
    } catch {
      toast.error('Request failed');
    } finally {
      setSeeding(false);
    }
  }

  const anyEmpty = Object.values(status).some((v) => v === 'empty');

  return (
    <div className="max-w-[900px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[12px] text-[#77838f] mb-4">
        <Link href="/dashboard/page-content" className="hover:text-[#eb5905] transition">
          Page Content
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#222] font-medium">MBA vs PGDM Page</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#eb5905]/10 rounded-xl flex items-center justify-center">
            <GitCompare className="w-5 h-5 text-[#eb5905]" />
          </div>
          <div>
            <h1 className="text-[20px] font-bold text-[#222]">MBA vs PGDM Page</h1>
            <p className="text-[12px] text-[#77838f]">Edit each section individually. Changes save per section.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="/mba-vs-pgdm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#4a5568] border border-[#e2e8f0] rounded-lg px-3 py-2 hover:bg-[#f4f6f9] transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Live
          </a>

          {anyEmpty && (
            <button
              type="button"
              onClick={() => handleSeed(false)}
              disabled={seeding || loading}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white bg-[#eb5905] rounded-lg px-3 py-2 hover:bg-[#c94f05] transition disabled:opacity-60 cursor-pointer"
            >
              {seeding ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
              Seed Missing
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSeed(true)}
            disabled={seeding || loading}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#ef4444] border border-red-200 rounded-lg px-3 py-2 hover:bg-red-50 transition disabled:opacity-60 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Warning when DB not seeded */}
      {!loading && anyEmpty && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[13px] font-semibold text-amber-800">
              Some sections are not in the database yet
            </p>
            <p className="text-[12px] text-amber-700 mt-0.5">
              Click <strong>Seed Missing</strong> to populate them with the current static content.
              Safe — won&apos;t overwrite existing data.
            </p>
          </div>
        </div>
      )}

      {/* Section grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-[#eb5905] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SECTIONS.map((section) => {
            const Icon     = section.icon;
            const isSeeded = status[section.key] === 'seeded';
            return (
              <Link
                key={section.key}
                href={`${BASE}?section=${section.key}`}
                className="group flex items-start gap-4 bg-white border border-[#e2e8f0] rounded-2xl p-5 hover:border-[#eb5905]/40 hover:shadow-md transition-all duration-200"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: `${section.color}15`, color: section.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[14px] font-semibold text-[#222] group-hover:text-[#eb5905] transition-colors">
                      {section.label}
                    </p>
                    <span
                      className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isSeeded
                          ? 'bg-green-50 text-green-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {isSeeded ? 'In DB' : 'Not seeded'}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#77838f] leading-relaxed">{section.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#aab4bf] group-hover:text-[#eb5905] shrink-0 mt-1 transition-colors" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
