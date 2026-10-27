'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Loader2,
  Save,
  ExternalLink,
  AlertCircle,
  PlusCircle,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUpload from '../../home-page/ImageUpload';

// ─── The 3 DB sections that make up "Page Data" ───────────────────────────────
const DATA_SECTIONS = ['main', 'assistance', 'videos'];

// ─── Tiny shared field primitives ─────────────────────────────────────────────

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
      <h2 className="text-[14px] font-bold text-[#222]">{title}</h2>
      {children}
    </div>
  );
}

function FieldInput({ label, value, onChange, placeholder = '', hint = '' }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">{label}</label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
      />
      {hint && <p className="text-[11px] text-[#77838f] mt-1">{hint}</p>}
    </div>
  );
}

// Simple string-list editor with add / remove / move up-down
function StringList({ items, onUpdate, onAdd, onRemove, onMoveUp, onMoveDown, placeholder }) {
  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-start gap-2">
          <div className="flex flex-col gap-0.5 mt-2 shrink-0">
            <button
              type="button"
              onClick={() => onMoveUp(idx)}
              disabled={idx === 0}
              className="p-0.5 text-[#aab4bf] hover:text-[#eb5905] disabled:opacity-30 transition cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onMoveDown(idx)}
              disabled={idx === items.length - 1}
              className="p-0.5 text-[#aab4bf] hover:text-[#eb5905] disabled:opacity-30 transition cursor-pointer"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            value={item}
            onChange={(e) => onUpdate(idx, e.target.value)}
            rows={2}
            placeholder={`${placeholder} ${idx + 1}`}
            className="flex-1 border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-y"
          />
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="p-2 text-[#aab4bf] hover:text-red-500 transition cursor-pointer shrink-0 mt-0.5"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#eb5905] border border-[#eb5905]/30 rounded-lg px-3 py-1.5 hover:bg-[#eb5905]/5 transition cursor-pointer"
      >
        <PlusCircle className="w-3.5 h-3.5" />
        Add Item
      </button>
    </div>
  );
}

// ─── Video card ────────────────────────────────────────────────────────────────

function VideoCard({ video, idx, total, onChange, onRemove, onMoveUp, onMoveDown }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="border border-[#e2e8f0] rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-[#f8fafc]">
        <GripVertical className="w-4 h-4 text-[#aab4bf] shrink-0" />
        <span className="flex-1 text-[13px] font-semibold text-[#222] truncate">
          {video.title || video.url || `Video ${idx + 1}`}
        </span>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="p-1 text-[#77838f] hover:text-[#222] transition cursor-pointer"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="p-1 text-[#aab4bf] hover:text-red-500 transition cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      {expanded && (
        <div className="p-4 space-y-3">
          <FieldInput
            label="Title (optional — shown as header above video)"
            value={video.title}
            onChange={(v) => onChange({ ...video, title: v })}
            placeholder="e.g. Raghav Sharma Video Resume"
          />
          <FieldInput
            label="YouTube Embed URL"
            value={video.url}
            onChange={(v) => onChange({ ...video, url: v })}
            placeholder="https://www.youtube.com/embed/..."
            hint="Use the /embed/ URL, not the watch URL."
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onMoveUp}
              disabled={idx === 0}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4a5568] border border-[#e2e8f0] rounded-lg px-2.5 py-1.5 hover:bg-[#f4f6f9] disabled:opacity-40 transition cursor-pointer"
            >
              <ArrowUp className="w-3 h-3" /> Move Up
            </button>
            <button
              type="button"
              onClick={onMoveDown}
              disabled={idx === total - 1}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4a5568] border border-[#e2e8f0] rounded-lg px-2.5 py-1.5 hover:bg-[#f4f6f9] disabled:opacity-40 transition cursor-pointer"
            >
              <ArrowDown className="w-3 h-3" /> Move Down
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main editor — fetches all 3 sections, saves all 3 together ───────────────

export default function EducationLoanPageDataEditor() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/education-loan-content', { credentials: 'include' });
      const json = await res.json();
      if (json.success) {
        const map = {};
        for (const key of DATA_SECTIONS) {
          map[key] = json.data[key] || { section: key };
        }
        setData(map);
      } else {
        setError(json.message || 'Failed to load');
      }
    } catch (e) {
      setError(e.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    try {
      const results = await Promise.all(
        DATA_SECTIONS.map((key) =>
          fetch('/api/education-loan-content', {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data[key], section: key }),
          }).then((r) => r.json()),
        ),
      );
      const failed = results.filter((r) => !r.success);
      if (failed.length > 0) {
        toast.error('Some sections failed to save');
      } else {
        const map = {};
        results.forEach((r, i) => {
          map[DATA_SECTIONS[i]] = r.data;
        });
        setData(map);
        toast.success('Page data saved successfully');
      }
    } catch (e) {
      toast.error(e.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  // ── Section-level state helpers ───────────────────────────────────────────
  function setSection(key, val) {
    setData((prev) => ({ ...prev, [key]: val }));
  }

  // String list helper (returns update / add / remove / moveUp / moveDown)
  function strListHelper(sectionKey, listKey) {
    return {
      update: (idx, text) =>
        setSection(sectionKey, {
          ...data[sectionKey],
          [listKey]: (data[sectionKey][listKey] || []).map((item, i) => (i === idx ? text : item)),
        }),
      add: () =>
        setSection(sectionKey, {
          ...data[sectionKey],
          [listKey]: [...(data[sectionKey][listKey] || []), ''],
        }),
      remove: (idx) =>
        setSection(sectionKey, {
          ...data[sectionKey],
          [listKey]: (data[sectionKey][listKey] || []).filter((_, i) => i !== idx),
        }),
      moveUp: (idx) => {
        if (idx === 0) return;
        const list = [...(data[sectionKey][listKey] || [])];
        [list[idx - 1], list[idx]] = [list[idx], list[idx - 1]];
        setSection(sectionKey, { ...data[sectionKey], [listKey]: list });
      },
      moveDown: (idx) => {
        const list = [...(data[sectionKey][listKey] || [])];
        if (idx === list.length - 1) return;
        [list[idx], list[idx + 1]] = [list[idx + 1], list[idx]];
        setSection(sectionKey, { ...data[sectionKey], [listKey]: list });
      },
    };
  }

  // Video list helper
  function videoHelper() {
    return {
      update: (idx, val) =>
        setSection('videos', {
          ...data.videos,
          videoUrls: (data.videos.videoUrls || []).map((v, i) => (i === idx ? val : v)),
        }),
      add: () =>
        setSection('videos', {
          ...data.videos,
          videoUrls: [...(data.videos.videoUrls || []), { title: '', url: '', order: (data.videos.videoUrls || []).length }],
        }),
      remove: (idx) =>
        setSection('videos', {
          ...data.videos,
          videoUrls: (data.videos.videoUrls || [])
            .filter((_, i) => i !== idx)
            .map((v, i) => ({ ...v, order: i })),
        }),
      moveUp: (idx) => {
        if (idx === 0) return;
        const list = [...(data.videos.videoUrls || [])];
        [list[idx - 1], list[idx]] = [list[idx], list[idx - 1]];
        setSection('videos', { ...data.videos, videoUrls: list.map((v, i) => ({ ...v, order: i })) });
      },
      moveDown: (idx) => {
        const list = [...(data.videos.videoUrls || [])];
        if (idx === list.length - 1) return;
        [list[idx], list[idx + 1]] = [list[idx + 1], list[idx]];
        setSection('videos', { ...data.videos, videoUrls: list.map((v, i) => ({ ...v, order: i })) });
      },
    };
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-[860px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[12px] text-[#77838f] mb-4 flex-wrap">
        <Link href="/dashboard/page-content" className="hover:text-[#eb5905] transition">
          Page Content
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link href="/dashboard/page-content/education-loan" className="hover:text-[#eb5905] transition">
          Education Loan Page
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-[#222] font-medium">Page Data</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[20px] font-bold text-[#222]">Page Data</h1>
          <p className="text-[13px] text-[#77838f] mt-0.5">
            Education Loan Facilities content, loan assistance details, and sidebar videos — all saved together.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="/documents-required-for-education-loan"
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
            <p className="text-[14px] font-semibold text-red-700">Failed to load</p>
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
          {/* ── Education Loan Facilities (Main Content) ─────────────────── */}
          <Card title="Education Loan Facilities — Heading & Image">
            <p className="text-[12px] text-[#77838f]">
              The main heading and the image shown right below it on the page.
            </p>
            <FieldInput
              label="Section Heading"
              value={data.main?.mainHeading}
              onChange={(v) => setSection('main', { ...data.main, mainHeading: v })}
              placeholder="Education Loan Facilities"
            />
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Image (shown after the heading)
              </label>
              <p className="text-[11px] text-[#77838f] mb-2">
                Upload an image to display below the heading. Leave empty to hide the image.
              </p>
              <ImageUpload
                label="Heading Image"
                value={data.main?.mainImageUrl || ''}
                onChange={(v) => setSection('main', { ...data.main, mainImageUrl: v })}
                aspectHint="Landscape image recommended"
                maxWidth="100%"
                previewHeight="180px"
                objectFit="cover"
              />
            </div>
          </Card>

          {/* ── Intro Paragraphs ─────────────────────────────────────────── */}
          <Card title="Education Loan Facilities — Intro Paragraphs">
            <p className="text-[12px] text-[#77838f]">The welcome paragraphs shown under the heading.</p>
            {(() => {
              const { update, add, remove, moveUp, moveDown } = strListHelper('main', 'introParagraphs');
              return (
                <StringList
                  items={data.main?.introParagraphs || []}
                  onUpdate={update}
                  onAdd={add}
                  onRemove={remove}
                  onMoveUp={moveUp}
                  onMoveDown={moveDown}
                  placeholder="Paragraph"
                />
              );
            })()}
          </Card>

          {/* ── Bold closing paragraph + italic notes ───────────────────── */}
          <Card title="Closing Paragraph & Notes">
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Bold Closing Paragraph
              </label>
              <textarea
                value={data.main?.boldParagraph || ''}
                onChange={(e) => setSection('main', { ...data.main, boldParagraph: e.target.value })}
                rows={3}
                placeholder="Join IPS Business School, where possibilities are limitless…"
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-y"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Vidya Lakshmi Note (italic)
              </label>
              <textarea
                value={data.main?.vidyaLakshmiNote || ''}
                onChange={(e) => setSection('main', { ...data.main, vidyaLakshmiNote: e.target.value })}
                rows={2}
                placeholder="40 banks have been registered so far…"
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-y"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                IPS Officials Note (italic)
              </label>
              <textarea
                value={data.main?.officialsNote || ''}
                onChange={(e) => setSection('main', { ...data.main, officialsNote: e.target.value })}
                rows={2}
                placeholder="IPS OFFICIALS NUMBER - …"
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-y"
              />
            </div>
          </Card>

          {/* ── Education Loan Assistance ────────────────────────────────── */}
          <Card title="Education Loan Assistance — Header & Intro">
            <FieldInput
              label="Box Heading"
              value={data.assistance?.assistanceHeading}
              onChange={(v) => setSection('assistance', { ...data.assistance, assistanceHeading: v })}
              placeholder="Education Loan Assistance"
            />
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Intro Paragraph
              </label>
              <textarea
                value={data.assistance?.assistanceIntro || ''}
                onChange={(e) => setSection('assistance', { ...data.assistance, assistanceIntro: e.target.value })}
                rows={4}
                placeholder="We are pleased to announce our partnership with Kuhoo…"
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-y"
              />
            </div>
          </Card>

          {/* ── Key Features ─────────────────────────────────────────────── */}
          <Card title="Key Features">
            <FieldInput
              label="Sub-heading"
              value={data.assistance?.keyFeaturesHeading}
              onChange={(v) => setSection('assistance', { ...data.assistance, keyFeaturesHeading: v })}
              placeholder="Key Features"
            />
            {(() => {
              const { update, add, remove, moveUp, moveDown } = strListHelper('assistance', 'keyFeatures');
              return (
                <StringList
                  items={data.assistance?.keyFeatures || []}
                  onUpdate={update}
                  onAdd={add}
                  onRemove={remove}
                  onMoveUp={moveUp}
                  onMoveDown={moveDown}
                  placeholder="Feature"
                />
              );
            })()}
          </Card>

          {/* ── Eligibility Criteria ─────────────────────────────────────── */}
          <Card title="Eligibility Criteria">
            <FieldInput
              label="Sub-heading"
              value={data.assistance?.eligibilityHeading}
              onChange={(v) => setSection('assistance', { ...data.assistance, eligibilityHeading: v })}
              placeholder="Eligibility Criteria:"
            />
            {(() => {
              const { update, add, remove, moveUp, moveDown } = strListHelper('assistance', 'eligibilityCriteria');
              return (
                <StringList
                  items={data.assistance?.eligibilityCriteria || []}
                  onUpdate={update}
                  onAdd={add}
                  onRemove={remove}
                  onMoveUp={moveUp}
                  onMoveDown={moveDown}
                  placeholder="Criteria"
                />
              );
            })()}
          </Card>

          {/* ── Required Documents ──────────────────────────────────────── */}
          <Card title="Required Documents">
            <FieldInput
              label="Sub-heading"
              value={data.assistance?.documentsHeading}
              onChange={(v) => setSection('assistance', { ...data.assistance, documentsHeading: v })}
              placeholder="Students may access the same and avail the facilities"
            />
            {(() => {
              const { update, add, remove, moveUp, moveDown } = strListHelper('assistance', 'documents');
              return (
                <StringList
                  items={data.assistance?.documents || []}
                  onUpdate={update}
                  onAdd={add}
                  onRemove={remove}
                  onMoveUp={moveUp}
                  onMoveDown={moveDown}
                  placeholder="Document"
                />
              );
            })()}
          </Card>

          {/* ── Sidebar Videos ───────────────────────────────────────────── */}
          <Card title="Sidebar Videos">
            <p className="text-[12px] text-[#77838f]">
              YouTube videos shown in the right sidebar. Use the embed URL format.
            </p>
            <div className="space-y-3">
              {(data.videos?.videoUrls || []).map((video, idx) => {
                const vh = videoHelper();
                return (
                  <VideoCard
                    key={idx}
                    video={video}
                    idx={idx}
                    total={(data.videos?.videoUrls || []).length}
                    onChange={(val) => vh.update(idx, val)}
                    onRemove={() => vh.remove(idx)}
                    onMoveUp={() => vh.moveUp(idx)}
                    onMoveDown={() => vh.moveDown(idx)}
                  />
                );
              })}
              <button
                type="button"
                onClick={() => videoHelper().add()}
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#eb5905] border border-[#eb5905]/30 rounded-lg px-3 py-1.5 hover:bg-[#eb5905]/5 transition cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Add Video
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Sticky save bar */}
      {data && !loading && (
        <div className="sticky bottom-4 mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#eb5905] text-white text-[13px] font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-[#c94f05] transition disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );
}
