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
} from 'lucide-react';
import toast from 'react-hot-toast';

// ─── The 5 DB sections that make up "Page Data" ───────────────────────────────
const DATA_SECTIONS = ['intro', 'requirements', 'perks', 'openings', 'contact'];

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

function BulletList({ items, onUpdate, onAdd, onRemove, placeholder }) {
  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-start gap-2">
          <GripVertical className="w-4 h-4 text-[#aab4bf] mt-2.5 shrink-0" />
          <textarea
            value={item.text || ''}
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

// ─── Opening department card ───────────────────────────────────────────────────

function OpeningCard({ opening, idx, onChange, onRemove }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="border border-[#e2e8f0] rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-[#f8fafc]">
        <GripVertical className="w-4 h-4 text-[#aab4bf] shrink-0" />
        <span className="flex-1 text-[13px] font-semibold text-[#222] truncate">
          {opening.department || `Department ${idx + 1}`}
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
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
              Department / Position Group
            </label>
            <input
              type="text"
              value={opening.department || ''}
              onChange={(e) => onChange({ ...opening, department: e.target.value })}
              placeholder="e.g. SENIOR LECTURERS / LECTURERS"
              className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide">
                Roles / Subjects
              </label>
              <button
                type="button"
                onClick={() => onChange({ ...opening, roles: [...(opening.roles || []), ''] })}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#eb5905] hover:underline cursor-pointer"
              >
                <PlusCircle className="w-3 h-3" />
                Add Role
              </button>
            </div>
            {(opening.roles || []).length === 0 && <p className="text-[12px] text-[#77838f] italic">No roles yet.</p>}
            <div className="space-y-2">
              {(opening.roles || []).map((role, rIdx) => (
                <div key={rIdx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => {
                      const next = (opening.roles || []).map((r, i) => (i === rIdx ? e.target.value : r));
                      onChange({ ...opening, roles: next });
                    }}
                    placeholder={`Role ${rIdx + 1}`}
                    className="flex-1 border border-[#e2e8f0] rounded-lg px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                  />
                  <button
                    type="button"
                    onClick={() => onChange({ ...opening, roles: (opening.roles || []).filter((_, i) => i !== rIdx) })}
                    className="p-1.5 text-[#aab4bf] hover:text-red-500 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main editor — fetches all 5 sections, saves all 5 together ───────────────

export default function CareerPageDataEditor() {
  // Keyed map: { intro: {...}, requirements: {...}, perks: {...}, openings: {...}, contact: {...} }
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all 5 sections from the same API used by every other editor
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/career-content', { credentials: 'include' });
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

  // Save all 5 sections via the same PUT /api/career-content used everywhere
  async function handleSave() {
    if (!data) return;
    setSaving(true);
    try {
      const results = await Promise.all(
        DATA_SECTIONS.map((key) =>
          fetch('/api/career-content', {
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

  function listUpdater(sectionKey, listKey) {
    return {
      update: (idx, text) =>
        setSection(sectionKey, {
          ...data[sectionKey],
          [listKey]: (data[sectionKey][listKey] || []).map((item, i) => (i === idx ? { ...item, text } : item)),
        }),
      add: () =>
        setSection(sectionKey, {
          ...data[sectionKey],
          [listKey]: [
            ...(data[sectionKey][listKey] || []),
            { text: '', order: (data[sectionKey][listKey] || []).length },
          ],
        }),
      remove: (idx) =>
        setSection(sectionKey, {
          ...data[sectionKey],
          [listKey]: (data[sectionKey][listKey] || [])
            .filter((_, i) => i !== idx)
            .map((item, i) => ({ ...item, order: i })),
        }),
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
        <Link href="/dashboard/page-content/career" className="hover:text-[#eb5905] transition">
          Career Page
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-[#222] font-medium">Page Data</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[20px] font-bold text-[#222]">Page Data</h1>
          <p className="text-[13px] text-[#77838f] mt-0.5">
            Introduction, requirements, perks, openings, and contact — all saved together.
          </p>
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
          {/* ── Introduction ────────────────────────────────────────────── */}
          <Card title="Introduction Paragraph">
            <p className="text-[12px] text-[#77838f]">
              Opening statement about IPS shown at the top of the career page.
            </p>
            <textarea
              value={data.intro?.introParagraph || ''}
              onChange={(e) => setSection('intro', { ...data.intro, introParagraph: e.target.value })}
              rows={4}
              placeholder="IPS BUSINESS SCHOOL has been a flag bearer…"
              className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-y"
            />
          </Card>

          {/* ── Requirements ────────────────────────────────────────────── */}
          <Card title="Requirements — We Are Looking For">
            {(() => {
              const { update, add, remove } = listUpdater('requirements', 'requirements');
              return (
                <>
                  <FieldInput
                    label="Section Heading"
                    value={data.requirements?.requirementsHeading}
                    onChange={(v) => setSection('requirements', { ...data.requirements, requirementsHeading: v })}
                    placeholder="We are looking for the professionals who are:"
                  />
                  <BulletList
                    items={data.requirements?.requirements || []}
                    onUpdate={update}
                    onAdd={add}
                    onRemove={remove}
                    placeholder="Requirement"
                  />
                </>
              );
            })()}
          </Card>

          {/* ── Perks ───────────────────────────────────────────────────── */}
          <Card title="Perks / Why Join IPS">
            {(() => {
              const { update, add, remove } = listUpdater('perks', 'perks');
              return (
                <>
                  <FieldInput
                    label="Section Heading"
                    value={data.perks?.perksHeading}
                    onChange={(v) => setSection('perks', { ...data.perks, perksHeading: v })}
                    placeholder="If you have it in you, IPS BUSINESS SCHOOL is the right place for you"
                  />
                  <BulletList
                    items={data.perks?.perks || []}
                    onUpdate={update}
                    onAdd={add}
                    onRemove={remove}
                    placeholder="Perk"
                  />
                </>
              );
            })()}
          </Card>

          {/* ── Openings ────────────────────────────────────────────────── */}
          <Card title="Current Openings">
            <FieldInput
              label="Section Heading"
              value={data.openings?.openingsHeading}
              onChange={(v) => setSection('openings', { ...data.openings, openingsHeading: v })}
              placeholder="Current Openings"
            />
            <div className="space-y-3">
              {(data.openings?.openings || []).map((opening, idx) => (
                <OpeningCard
                  key={idx}
                  opening={opening}
                  idx={idx}
                  onChange={(val) => {
                    const next = (data.openings.openings || []).map((o, i) => (i === idx ? val : o));
                    setSection('openings', { ...data.openings, openings: next });
                  }}
                  onRemove={() => {
                    const next = (data.openings.openings || [])
                      .filter((_, i) => i !== idx)
                      .map((o, i) => ({ ...o, order: i }));
                    setSection('openings', { ...data.openings, openings: next });
                  }}
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  const next = [
                    ...(data.openings?.openings || []),
                    { department: '', roles: [], order: (data.openings?.openings || []).length },
                  ];
                  setSection('openings', { ...data.openings, openings: next });
                }}
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#eb5905] border border-[#eb5905]/30 rounded-lg px-3 py-1.5 hover:bg-[#eb5905]/5 transition cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Add Department
              </button>
            </div>
          </Card>

          {/* ── Contact ─────────────────────────────────────────────────── */}
          <Card title="Contact / How to Apply">
            <FieldInput
              label="Section Heading"
              value={data.contact?.contactHeading}
              onChange={(v) => setSection('contact', { ...data.contact, contactHeading: v })}
              placeholder="You may apply to"
            />
            <FieldInput
              label="Email Address"
              value={data.contact?.contactEmail}
              onChange={(v) => setSection('contact', { ...data.contact, contactEmail: v })}
              placeholder="careers@ipsedu.in"
              hint="Rendered as a mailto: link on the live page."
            />
            <FieldInput
              label="Phone Number"
              value={data.contact?.contactPhone}
              onChange={(v) => setSection('contact', { ...data.contact, contactPhone: v })}
              placeholder="+91-9829047517"
              hint="Rendered as a tel: link on the live page."
            />
          </Card>
        </div>
      )}
    </div>
  );
}
